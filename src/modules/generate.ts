import axios from 'axios'

const { VUE_APP_TOKEN: token } = process.env
console.log(process.env)
export async function generate (url: string) {
  const body = { url }
  const { data } = await axios.post(`https://api.pics.ee/v1/links?access_token=${token}&caller=client-simple&lang=zh-tw`, body)

  return data.data.picseeUrl as string
}
