import { BaseController, HttpMethod } from '../shared/BaseController';
import { Request, Response } from 'express';
import { CustomerModel } from '../models/customer.model';
import { ValidatorMiddleware } from '../shared/ValidatorReq';
import { createCustomerDto, updateCustomerDto, deleteCustomerDto } from '../dto/customer.dto';
import { createSuccessResponse, createErrorResponse } from '../models/common.model';

const customerApi = new BaseController("/customer");
const customerModel = new CustomerModel();

customerApi.createMethod(HttpMethod.GET, "/get-customer", async (req: Request, res: Response) => {
    const { customer, pager } = await customerModel.getPagerCustomer(Number(req.query.limit), Number( req.query.pageNum));
    res.send(createSuccessResponse({
        data: customer,
        pager
    })).status(200)
});

customerApi.createMethod(HttpMethod.POST, "/create-customer", async (req: Request, res: Response) => {
    const [customerData, errors] = await ValidatorMiddleware(createCustomerDto)(req, res);
    if (errors) {
        res.status(422)
        res.send(createErrorResponse(errors, 422));
        return;
    }
    const [customer, error] = await customerModel.createCustomer(customerData);
    if (error) {
        res.status(422)
        res.send(createErrorResponse(error, 422));
        return;
    }
    res.send(createSuccessResponse(customer)).status(200);
});

customerApi.createMethod(HttpMethod.PUT, "/update-customer", async (req: Request, res: Response) => {
    const [customerData, errors] = await ValidatorMiddleware(updateCustomerDto)(req, res);
    if (errors) {
        res.status(422)
        res.send(createErrorResponse(errors, 422));
        return;
    }
    const [customer, error] = await customerModel.updateCustomer(customerData);
    if (error) {
        res.status(422)
        res.send(createErrorResponse(error, 422)).status(422);
        return;
    }
    res.send(createSuccessResponse(customer)).status(200);
})

customerApi.createMethod(HttpMethod.DELETE, "/delete-customer", async (req: Request, res: Response) => {
    const [customerData, errors] = await ValidatorMiddleware(deleteCustomerDto)(req, res);
    if (errors) {
        res.status(422)
        res.send(createErrorResponse(errors, 422)).status(422);
        return;
    }
    const [, error] = await customerModel.deleteCustomer(customerData);
    if (error) {
        res.status(422)
        res.send(createErrorResponse(error, 422));
        return;
    }
    res.send(createSuccessResponse({})).status(200);
})

export default customerApi;