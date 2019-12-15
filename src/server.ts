import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
export const server = express();
server.use(cors());
server.use(json())
server.use(urlencoded({ extended: true }));

import './controllers';

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));