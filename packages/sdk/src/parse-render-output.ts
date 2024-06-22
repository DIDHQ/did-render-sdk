import { RenderOutput } from './types';


export function parseRenderOutput(renderOutput: RenderOutput[]) {
  const accountTrait = renderOutput
    .find((r) => r.name === 'Account')
    ?.traits.find((t) => 'String' in t)
  if (accountTrait === undefined)
    throw new Error('Cannot find account in render output')
  if (typeof accountTrait.String !== 'string') {
    throw new Error('Account trait value should be of type: string')
  }
  const account = accountTrait.String
  const splitted = account.split('.')
  if (splitted.length !== 2 || splitted[0].length < 1 || splitted[1] !== 'bit') {
    throw new Error('Invalid did account')
  }

  const expireAtTrait = renderOutput
    .find((r) => r.name === 'ExpireAt')
    ?.traits.find((t) => 'Timestamp' in t)
  if (expireAtTrait === undefined)
    throw new Error('Cannot find expire at in render output')
  if (typeof expireAtTrait.Timestamp !== 'number') {
    throw new Error('ExpireAt trait value should be of type: number')
  }
  const timestamp = expireAtTrait.Timestamp

  const expireAt = new Date(timestamp * 1000)
  return {
    account,
    expireAt,
  }
}
