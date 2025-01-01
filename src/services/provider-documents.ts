import { apiKey } from '..'
import { IProviderDocument, IProviderDocumentUploadDTO } from '../types'
import { getFileContent } from './get-files-from-sharepoint'
import medallionApi from '@api/medallion-api'

async function uploadProviderDocument(providerDocument: IProviderDocument) {
     const { title, kind, fileContent, providerPk, id } = providerDocument

     const sendFile = async () => {
          const headers = {
               Accept: 'application/json',
               'x-api-key': apiKey!,
          }
          const formData = new FormData()
          formData.append('title', title)
          formData.append('kind', kind)
          formData.append('content', fileContent!)
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
     return id
          ? medallionApi.api_v1_org_providers_documents_partial_update_providerDocuments(
                 { title },
                 { provider_pk: providerPk, id: id! }
            )
          : sendFile()
}

async function updateProviderDocuments(
     providerDTO: IProviderDocumentUploadDTO,
     providerMap: Map<
          string,
          {
               providerId: string
               updated: boolean
               currentDocs: { id: string; kind: string }[]
          }
     >
) {
     const map = providerMap.get(
          providerDTO.providerId
     )
     if (!map) return
     const providerDocuments: IProviderDocument[] = await Promise.all(
          providerDTO.files.map(async (f) => {
               const id = map.currentDocs.find((d) => d.kind === f.kind)?.id
               const payload = {
                    ...f,
                    id,
                    providerPk: map.providerId,
                    fileContent:
                         (!id &&
                              (await getFileContent(
                                   'https://attainaba.sharepoint.com/sites/bi',
                                   'sites/bi/Shared Documents/Power Automate/Medallion/Paycom-Documents/' +
                                        f.path
                              ))) ||
                         undefined,
               }
               return payload
          })
     )
     const res = await Promise.all(
          providerDocuments.map((d) => uploadProviderDocument(d))
     )
     map.updated = res.every(Boolean)
}

async function getCurrentProviderDocuments(providerId: string) {
     const res =
          await medallionApi.api_v1_org_providers_documents_list_providerDocuments(
               { provider_pk: providerId }
          )
     return (res.data.results || []).map((d) => ({
          kind: d.kind,
          id: d.id,
     }))
}

async function handleProviderDocumentsUpload(
     payload: IProviderDocumentUploadDTO[]
) {

     const providerMap = new Map<
          string,
          {
               providerId: string
               updated: boolean
               currentDocs: { id: string; kind: string }[]
          }
     >()
     await Promise.all(
          payload.map(async (p) => {
               const docs = await getCurrentProviderDocuments(p.providerId)
               providerMap.set(p.providerId, {
                    providerId: p.providerId,
                    currentDocs: docs,
                    updated: false,
               })
          })
     )

     await Promise.all(
          payload.map((p) => updateProviderDocuments(p, providerMap))
     )
     return providerMap
}
export {
     updateProviderDocuments,
     getCurrentProviderDocuments,
     handleProviderDocumentsUpload,
}
