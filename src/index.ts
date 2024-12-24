import { app } from '@azure/functions'
import dotenv from 'dotenv'
import medallionApi from '@api/medallion-api'
import { auth } from 'attain-aba-shared'

dotenv.config()
auth(process.env.DB_API_KEY!)
export const apiKey = process.env.DEVELOPMENT
     ? process.env.API_KEY
     : process.env.PROD_API_KEY
medallionApi.auth(apiKey as string)

app.setup({
     enableHttpStream: true,
})
