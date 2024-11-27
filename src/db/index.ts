import { DefaultAzureCredential } from '@azure/identity'
import sql from 'mssql'

const server = 'attainbi.database.windows.net'
const database = 'AttainDM.Payroll'
let pool: sql.ConnectionPool | null = null
export async function getPool() {
     if (pool) {
          return pool
     }
     const credential = new DefaultAzureCredential()
     const tokenResponse = await credential.getToken(
          'https://database.windows.net/.default'
     )
     const config: sql.config = {
          server: server,
          database: database,
          options: {
               encrypt: true,
               trustServerCertificate: false,
          },
          driver: 'msnodesqlv8',
          authentication: {
               type: 'azure-active-directory-access-token',
               options: {
                    token: tokenResponse.token,
               },
          },
     }
     pool = await sql.connect(config)
     return pool
}

export async function select(
     cols: string[],
     table: DbTables,
     where?: { col: string; equals: string }
) {
     try {
          const pool = await getPool()
          const colsMap = cols.map((col) => `[${col}]`)
          const whereObj = `${
               where ? `WHERE [${where.col}] = '${where.equals}'` : ''
          }`
          return pool.query(
               `SELECT ${colsMap.join(',')} FROM [dbo].[${table}] ${whereObj}`
          )
     } catch (error) {
          console.error(error)
     }
}
