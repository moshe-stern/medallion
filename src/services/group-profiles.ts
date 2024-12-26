import medallionApi from '@api/medallion-api'

export async function getGroupProfileIdByName(name?: string) {
     const res = await medallionApi.p_api_v1_group_profiles_list_groupProfiles({
          name,
     })
     const data = res.data.results
     if (!data?.length) return
     return data[0].id
}
