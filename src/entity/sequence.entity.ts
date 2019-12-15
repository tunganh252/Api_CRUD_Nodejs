import { Entity, Index, Column, BeforeInsert, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity("sequence")
export class SequenceEntity {
    @ObjectIdColumn()
    uuid: ObjectID;
    
    @Column({ primary: true })
    id: string;

    @Column({
        default: 0
    })
    sequence: number;
}