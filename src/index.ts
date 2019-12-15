import { config } from 'dotenv';
import { resolve } from 'path';

const fileConfig = process.env.NODE_ENV === "production" ? "" : "./config/.config.development.env";
config({ path: resolve(__dirname, fileConfig) });

import './db'
import './server'
