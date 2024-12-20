import { app } from '@azure/functions'
import dotenv from 'dotenv'
import medallionApi from '@api/medallion-api'

dotenv.config()
export const apiKey = process.env.DEVELOPMENT
     ? process.env.API_KEY
     : process.env.PROD_API_KEY
medallionApi.auth(apiKey as string)

app.setup({
     enableHttpStream: true,
})
