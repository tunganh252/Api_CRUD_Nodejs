import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';

@Entity("customer")
export class CustomerEntity {
    @ObjectIdColumn()
    uuid: ObjectID;

    @Column({ unique: true })
    id: number;

    @Column()
    code: string;

    @BeforeInsert()
    createCode() {
        this.code = `KH ${this.id + 1}`;
    }

    @Column()
    full_name: string;

    @Column()
    @IsPhoneNumber("VN")
    phone: string;

    @Column()
    address: string;


}