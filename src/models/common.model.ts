import { BaseResponse } from "../interface/common.interface";

const createSuccessResponse = (resData: any): BaseResponse => {
    return {
        data: resData,
        isSuccess: true,
        error: {
            errorCode: "",
            errorMessage: ""
        }
    }
}

const createErrorResponse = (errorMessage: string, errorCode: number): BaseResponse => {
    return {
        data: "",
        isSuccess: false,
        error: {
            errorMessage,
            errorCode
        }
    }
}

export {
    createSuccessResponse,
    createErrorResponse
}