import { dobDecode } from './api/dobDecode'
import { renderByDobDecodeResponse } from './render-by-dob-decode-response'

export async function renderByTokenKey(
  tokenKey: string,
) {
  const dobDecodeResponse = await dobDecode(tokenKey)
  return renderByDobDecodeResponse(dobDecodeResponse.result)
}
