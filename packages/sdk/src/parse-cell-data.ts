import { BytesLike, bytify } from "./bytify";

const PREFIX_SIZE = 1
const VER_SIZE = 1
const WITNESS_HASH_SIZE = 20
const EXPIRE_AT_SIZE = 8

const byteToHex: string[] = [];

for (let n = 0; n <= 0xff; ++n)
{
    const hexOctet = n.toString(16).padStart(2, "0");
    byteToHex.push(hexOctet);
}

function toHex(buf: Uint8Array)
{
    const hexOctets = []; // new Array(buff.length) is even faster (preallocates necessary array size), then use hexOctets[i] instead of .push()

    for (let i = 0; i < buf.length; ++i)
        hexOctets.push(byteToHex[buf[i]]);

    return hexOctets.join("");
}

export interface DidData {
    account: string, expireAt: number, witnessHash: string
}

/**
 * Internal use only.
 * @private
 * 
*/
export function _parseDidDataFromSporeContent(content: BytesLike): DidData {
    const uint8Array = bytify(content)
    const data = uint8Array.buffer
    const account = new TextDecoder('utf-8').decode(data.slice(PREFIX_SIZE + VER_SIZE + WITNESS_HASH_SIZE + EXPIRE_AT_SIZE))
    const expireAt = parseInt(new DataView(data, PREFIX_SIZE + VER_SIZE + WITNESS_HASH_SIZE, EXPIRE_AT_SIZE).getBigUint64(0, true).toString(10)) * 1000
    const witnessHash = toHex(uint8Array.slice(PREFIX_SIZE + VER_SIZE, PREFIX_SIZE + VER_SIZE + WITNESS_HASH_SIZE))

    return {
        account,
        expireAt,
        witnessHash
    }
}
