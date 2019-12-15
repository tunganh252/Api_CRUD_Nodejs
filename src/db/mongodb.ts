import { createConnection } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { SequenceEntity } from '../entity/sequence.entity';
createConnection({
    logging: true,
    synchronize: true,
    type: "mongodb",
    database: "vcteam",
    entities: [CustomerEntity, SequenceEntity],
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-4javv.mongodb.net/test?retryWrites=true&w=majority`,
}).then(async (connection) => {
    console.log("Connection success");
}).catch((error) => {
    console.log("Connection failed: ", error);
});