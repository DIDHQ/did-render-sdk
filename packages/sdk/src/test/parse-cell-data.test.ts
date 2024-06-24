import { describe, expect, it } from 'vitest'
import {
  _parseDidDataFromSporeContent,
} from '../parse-cell-data'

describe('function _parseDidDataFromSporeContent', async () => {
  it('case: normal result', () => {
    const data =
      '0x0001a7d4860aaf1dc83daedf75d6022811d2c2ae250be61ac0660000000032303233303831382e626974'
    expect(_parseDidDataFromSporeContent(data)).toStrictEqual({
      account: '20230818.bit',
      expireAt: 1723865830000,
      witnessHash: 'a7d4860aaf1dc83daedf75d6022811d2c2ae250b',
    })
  })

  it('case: emoji result', () => {
    const data =
      '0x0001a7d4860aaf1dc83daedf75d6022811d2c2ae250bc8a8566800000000656d6f6a69f09f98882e626974'
    expect(_parseDidDataFromSporeContent(data)).toStrictEqual({
      account: 'emoji😈.bit',
      expireAt: 1750509768000,
      witnessHash: 'a7d4860aaf1dc83daedf75d6022811d2c2ae250b',
    })
  })

})
