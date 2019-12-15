
import { getManager, EntityManager, getConnection } from 'typeorm';
import { SequenceEntity } from '../entity/sequence.entity';

export class SequenceModel {
    private readonly manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    async updateSequence(name: string): Promise<number> {

        let seq = await this.manager.findOne(SequenceEntity, {
            id: name
        });
        if (!seq) {
            seq = new SequenceEntity();
            seq.id = name;
            seq.sequence = 0;
            seq = await this.manager.getRepository(SequenceEntity).save(seq);
            return seq.sequence;
        }
        seq.sequence += 1;
        seq = await this.manager.getRepository(SequenceEntity).save(seq);
        return seq.sequence;

    }
}