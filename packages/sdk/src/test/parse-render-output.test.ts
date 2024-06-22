import { describe, expect, it } from 'vitest'
import { parseRenderOutput } from '../parse-render-output'


describe('function parseRenderOutput', async () => {
  it('case: normal result', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
          {
            String: 'emoji😈.bit'
          }
        ]
      },
      {
        name: 'ExpireAt',
        traits: [
          {
            Timestamp: 1750509768
          }
        ]
      }
    ]
    const res = parseRenderOutput(renderOutput)
    expect(res).toEqual({ account: 'emoji😈.bit', expireAt: new Date(1750509768 * 1000)})
  })

  it('case: invalid account', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
          {
            String: 'emoj.i😈.bit'
          }
        ]
      },
      {
        name: 'ExpireAt',
        traits: [
          {
            Timestamp: 1750509768
          }
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Invalid did account')
  })


  it('case: invalid account', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
          {
            String: 'emoj.i😈bit'
          }
        ]
      },
      {
        name: 'ExpireAt',
        traits: [
          {
            Timestamp: 1750509768
          }
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Invalid did account')
  })

  it('case: missing account', () => {
    const renderOutput = [
      {
        name: 'ExpireAt',
        traits: [
          {
            Timestamp: 1750509768
          }
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Cannot find account in render output')
  })

  it('case: missing account', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
        ]
      },
      {
        name: 'ExpireAt',
        traits: [
          {
            Timestamp: 1750509768
          }
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Cannot find account in render output')
  })

  it('case: missing expireAt', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
          {
            String: 'emoji😈.bit'
          }
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Cannot find expire at in render output')
  })

  it('case: missing expireAt', () => {
    const renderOutput = [
      {
        name: 'Account',
        traits: [
          {
            String: 'emoji😈.bit'
          }
        ]
      },
      {
        name: 'ExpireAt',
        traits: [
        ]
      }
    ]
    expect(() => parseRenderOutput(renderOutput)).toThrowError('Cannot find expire at in render output')
  })
})
