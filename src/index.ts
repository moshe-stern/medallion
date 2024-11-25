import { app } from '@azure/functions';
import dotenv from 'dotenv'
dotenv.config()
app.setup({
    enableHttpStream: true,
});
