import { apiKey } from '../..'

const BASE_URL = 'https://app.medallion.co/p/api/v1'
async function medallionPagination<T>(
     url: string,
     searchParams?: Record<string, string>
): Promise<T[]> {
     const vals: T[] = []
     const pagination = { limit: 100, offset: 0 }
     const urlSearchParams = new URLSearchParams(searchParams)
     const queryString = urlSearchParams.toString()
     try {
          const res = await doFetch(url + '?' + queryString)
          const data = (await res.json()) as { count?: number; results?: T[] }
          const count = data.count
          vals.push(...(data.results || []))
          const promises: Promise<Response>[] = []
          const iterate = (count || 1) / 100 - 1
          if (iterate <= 1) return vals
          for (let i = 0; i < iterate; i++) {
               pagination.offset += 100
               const paginationQuery = `?limit=${pagination.limit}&offset=${pagination.offset}`
               promises.push(doFetch(url + paginationQuery + '&' + queryString))
          }
          const resolved = await Promise.all(promises)
          const resolvedJson = await Promise.all(
               resolved.map((res) =>
                    res.json().then((res) => (res as { results?: T[] }).results)
               )
          )
          resolvedJson.forEach((j) => vals.push(...(j || [])))
     } catch (error) {
          console.error(error)
     }
     return vals
}

function doFetch(url: string) {
     return fetch(url, {
          headers: {
               Accept: 'application/json',
               'x-api-key': apiKey!,
          },
     })
}

export { medallionPagination, doFetch, BASE_URL }
