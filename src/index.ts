import { app } from '@azure/functions'
import dotenv from 'dotenv'
import medallionApi from '@api/medallion-api'

dotenv.config()
const apiKey = process.env.DEVELOPMENT
     ? process.env.API_KEY
     : process.env.PROD_API_KEY
medallionApi.auth(apiKey as string)

export async function medallionPagination<T>(
     url: string,
     searchParams?: Record<string, string>
) {
     const vals: T[] = []
     const urlSearchParams = new URLSearchParams(searchParams)
     const queryString = urlSearchParams.toString()
     let nextUrl: string | undefined = url + '?' + queryString
     try {
          const getData = async () => {
               const res = await fetch(nextUrl!, {
                    headers: {
                         Accept: 'application/json',
                         'x-api-key': apiKey!,
                    },
               })
               if (!res.ok) {
                    throw new Error('Failed to fetch')
               }
               const data = (await res.json()) as {
                    next?: string
                    results?: T[]
               }
               if (data.results) vals.push(...data.results)
               if (!data.next) {
                    nextUrl = undefined
                    return
               }
               nextUrl = data.next + '&' + queryString
          }
          await getData()
          while (nextUrl) await getData()
          return vals
     } catch (error) {
          console.error(error)
     }
}

app.setup({
     enableHttpStream: true,
})
