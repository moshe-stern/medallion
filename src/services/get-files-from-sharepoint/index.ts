const tenantId = process.env.TENANT_ID!
const clientId = process.env.CLIENT_ID!
const clientSecret = process.env.CLIENT_SECRET!
const sharepointDomainName = process.env.SHARE_POINT_DOMAIN!
const resource = process.env.RESOURCE!

async function getAccessToken(): Promise<string> {
     const tokenUrl = `https://accounts.accesscontrol.windows.net/${tenantId}/tokens/OAuth/2`
     const data = new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          resource: `${resource}/${sharepointDomainName}@${tenantId}`,
     })

     try {
          const response = await fetch(tokenUrl, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: data.toString(),
          })

          if (!response.ok) {
               throw new Error(
                    `Failed to retrieve access token: ${response.statusText}`
               )
          }

          const responseData = await response.json()
          return responseData.access_token
     } catch (error) {
          console.error('Error fetching access token:', error)
          throw error
     }
}

async function getFileContent(url: string, filePath: string): Promise<Blob> {
     const token = await getAccessToken()
     const fileUrl = `${url}/_api/web/GetFileByServerRelativeUrl('/${filePath}')/$value`
     try {
          const response = await fetch(fileUrl, {
               method: 'GET',
               headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
               },
          })
          if (!response.ok) {
               throw new Error(
                    `Failed to retrieve file: ${response.statusText}`
               )
          }
          return response.blob()
     } catch (error) {
          console.error('Error fetching file:', error)
          throw error
     }
}

export { getFileContent }
