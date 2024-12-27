import { apiKey } from '..'
import { IProviderDocument, IProviderDocumentUploadDTO } from '../types'
import { getFileContent } from './get-files-from-sharepoint'

async function uploadProviderDocument(providerDocument: IProviderDocument) {
     const { title, kind, fileContent } = providerDocument
     const headers = {
          Accept: 'application/json',
          'x-api-key': apiKey!,
     }
     const formData = new FormData()
     formData.append('title', title)
     formData.append('kind', kind)
     formData.append('content', fileContent)
     const sendFile = async () => {
          try {
               const response = await fetch(
                    `https://api.medallion.co/api/v1/org/providers/${providerPk}/documents/`,
                    {
                         method: 'POST',
                         headers: {
                              ...headers,
                         },
                         body: formData,
                    }
               )
               if (!response.ok) {
                    throw new Error(await response.text())
               }
               return response.ok
          } catch (error) {
               console.error('Error uploading file:', error)
               return false
          }
     }
     return sendFile()
}

async function uploadProviderDocuments(
     providerDTO: IProviderDocumentUploadDTO,
     providerMap: Map<string, { providerId: string; updated: boolean }>
) {
     const workEmail = providerMap.has(providerDTO.workEmail)
     const map = providerMap.get(
          workEmail ? providerDTO.workEmail : providerDTO.email
     )
     if (!map) return
     const providerDocuments: IProviderDocument[] = await Promise.all(
          providerDTO.files.map(async (f) => ({
               ...f,
               providerPk: map.providerId,
               fileContent: await getFileContent(
                    'https://attainaba.sharepoint.com/sites/bi',
                    f.path
               ),
          }))
     )
     const res = await Promise.all(
          providerDocuments.map((d) => uploadProviderDocument(d))
     )
     map.updated = res.every(Boolean)
}
export { uploadProviderDocuments }
