import { app, HttpResponseInit } from '@azure/functions'
import { medallionPagination } from '../services'
import medallionApi from '@api/medallion-api'

async function handleMemberInvites(): Promise<HttpResponseInit> {
     try {
          const members = await medallionPagination<{
               user: { email: string }
               id: string
          }>('https://app.medallion.co/p/api/v1/organizations/members/')
          const filtered = members.filter(
               (m) => !m.user.email.includes('sunrise')
          )
          const createInvite = async (membership_id: string) => {
               try {
                    const res =
                         await medallionApi.p_api_v1_organizations_invites_create_invites(
                              {
                                   membership_id,
                              },
                              {
                                   organization_id:
                                        'a9121f2f-7482-4084-b488-214a993d0b9a',
                              }
                         )
                    return {
                         ...res,
                         membership_id,
                         organization_id:
                              'a9121f2f-7482-4084-b488-214a993d0b9a',
                         sent: false,
                    }
               } catch (error) {
                    console.error(error)
                    return {
                         membership_id,
                         organization_id:
                              'a9121f2f-7482-4084-b488-214a993d0b9a',
                         sent: false,
                    }
               }
          }
          return {
               body: JSON.stringify({
                    results: await Promise.all(
                         filtered.map((f) => createInvite(f.id))
                    ),
               }),
          }
     } catch (error) {
          return {
               body: JSON.stringify({
                    error:
                         (error as Error).message ||
                         'An unknown error occurred',
               }),
               status: 500,
          }
     }
}

app.http('send-member-invites', {
     methods: ['POST'],
     authLevel: 'function',
     handler: handleMemberInvites,
})
