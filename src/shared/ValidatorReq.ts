import { NextFunction, Request, Response } from "express";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

const toValidate = (metaType: Function): boolean => {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
}
export const buildError = (errors) => {
    let result = "";
    errors.forEach(el => {
        let prop = el.property;
        Object.entries(el.constraints).forEach(constraint => {
            result += `${constraint[1]}. `;
        });
    });
    return result;
}
export const ValidatorMiddleware = (metaType: any) => async (req: Request, res: Response): Promise<any[]> => {

    if (!metaType || !toValidate(metaType)) {
        return [req.body, false];
    }
    const object = plainToClass(metaType, req.body);
    const errors = await validate(object);
    if (errors.length > 0) {
        return [undefined, buildError(errors)];
    }
    return [(object as typeof metaType), false];
}