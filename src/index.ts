import { app } from '@azure/functions'
import dotenv from 'dotenv'
import medallionApi from '@api/medallion-api'
dotenv.config()
if (!process.env.API_KEY) {
     throw new Error('Failed to get api key')
}
medallionApi.auth(process.env.API_KEY)
app.setup({
     enableHttpStream: true,
})
