import { getPool } from '.'
import { Provider } from '../types/provider'

export async function getProvidersByEmails(
     emails: string[]
): Promise<Provider[]> {
     const pool = await getPool()
     const res = await pool.query(
          `SELECT 
            p.[Provider Email Address], 
            p.[Provider ID], 
            ds.[Subregion]
        FROM 
            [dbo].[Provider] p
        JOIN 
            [dbo].[DataUser] ds 
            ON ds.[Email] = p.[Provider Email Address]
        WHERE 
            p.[Provider Active Status] = 'ACTIVE' and p.[Provider Email Address] in (${emails.map((email) => `${email}`).join(',')})
        ORDER BY 
            p.[Provider ID];`
     )
     return res.recordsets as unknown as Provider[]
}
