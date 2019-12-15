import { IsPhoneNumber, IsNotEmpty } from "class-validator";

export class createCustomerDto {

    @IsNotEmpty()
    full_name: string;

    @IsPhoneNumber("VN")
    phone: string;

    @IsNotEmpty()
    address: string;
}

export class updateCustomerDto {

    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    full_name: string;

    @IsPhoneNumber("VN")
    phone: string;

    @IsNotEmpty()
    address: string;
}

export class deleteCustomerDto {
    @IsNotEmpty()
    uuid: string;
}