export interface BaseResponse {
    isSuccess: boolean;
    data: any | undefined;
    error: {
        errorCode: number | string;
        errorMessage: string;
    }
}