import { CustomerEntity } from '../entity/customer.entity';
import { getManager, EntityManager } from 'typeorm';
import { SequenceModel } from './sequence.model';
import { createCustomerDto, updateCustomerDto, deleteCustomerDto } from '../dto/customer.dto';

export class CustomerModel {
    private readonly manager: EntityManager;
    private readonly sequenceService: SequenceModel;
    constructor() {
        this.manager = getManager();
        this.sequenceService = new SequenceModel();
    }

    async createCustomer(cusData: createCustomerDto): Promise<[CustomerEntity, any]> {
        const customer = new CustomerEntity();
        customer.phone = cusData.phone;
        customer.full_name = cusData.full_name;
        customer.address = cusData.address;
        customer.id = await this.sequenceService.updateSequence("customer");
        try {
            const newCustomer = await this.manager.save(customer);
            return [newCustomer, undefined]
        } catch (error) {
            return [undefined, error]
        }
    }

    async getPagerCustomer(limit: number, pageNum: number): Promise<any> {
        const [customer, total] = await this.manager.findAndCount(CustomerEntity, {
            skip: (pageNum - 1) * limit,
            take: limit,
        })
        const totalPage = parseInt(String((total / limit) + 0.5), 10);
        return {
            customer,
            pager: {
                pageSize: customer.length,
                pageNum,
                total,
                totalPage
            }
        }
    }
    async updateCustomer(cusData: updateCustomerDto): Promise<[CustomerEntity, string | undefined]> {
        const customer = await this.manager.findOne(CustomerEntity, cusData.uuid)
        if (!customer) {
            return [undefined, "customer not found"];
        }
        Object.assign(customer, cusData);
        await this.manager.update(CustomerEntity, cusData.uuid, customer);
        return [customer, undefined]
    }

    async deleteCustomer(cusData: deleteCustomerDto): Promise<[boolean, string]> {
        const customer = await this.manager.findOne(CustomerEntity, cusData.uuid);
        if (!customer) {
            return [false, "customer not found"];
        }
        await this.manager.delete(CustomerEntity, cusData.uuid);
        return [true, undefined];
    }
}
