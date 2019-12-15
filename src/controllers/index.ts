import customerApi from './customer';
import { server } from '../server';

server.use('/api', customerApi.server);

