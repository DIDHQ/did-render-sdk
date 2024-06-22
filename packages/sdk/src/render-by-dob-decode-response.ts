import type {
  DobDecodeResult,
  RenderOutput,
} from './types'
import { renderDidToSvg } from './render-did-to-svg'
import { parseRenderOutput } from './parse-render-output'

export function renderByDobDecodeResponse(dob0Data: DobDecodeResult | string) {
  if (typeof dob0Data === 'string') {
    dob0Data = JSON.parse(dob0Data) as DobDecodeResult
  }
  if (typeof dob0Data.render_output === 'string') {
    dob0Data.render_output = JSON.parse(
      dob0Data.render_output,
    ) as RenderOutput[]
  }

  const { account, expireAt } = parseRenderOutput(dob0Data.render_output)
  const svg = renderDidToSvg(account, expireAt)
  return svg
}
