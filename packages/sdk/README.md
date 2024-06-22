# Spore DOB render SDK

## Installation
```bash
npm i @didhq/did-render-sdk
```

## Usage

### Examples
[SDK Docs](./packages/sdk/README.md)

[Browser Example](../../examples/browser-env)

[NodeJs Example](../../examples/node-env)


### Render by token key
```ts
import { renderByTokenKey } from '@didhq/did-render-sdk'

const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
await renderByTokenKey(tokenKey) // returns base64 encoded image starts with data:image/svg+xml;base64,
```

### Render by dob decode server
```ts
import { renderByDobDecodeResponse } from '@didhq/did-render-sdk'

const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
const response = await fetch('https://dob-decode-server', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 2,
    jsonrpc: "2.0",
    method: "dob_decode",
    params: [tokenKey],
  }),
});
const dobDecodeResult = response.json();
await renderByDobDecodeResponse(dobDecodeResult.result) // <svg ... />
```

### Config
#### Config DOB Decode server

[DOB Decode server source code](https://github.com/sporeprotocol/dob-decoder-standalone-server)
```ts
import { 
  config, // step1: import
  renderByTokenKey,
} from '@didhq/did-render-sdk'

// step2: set
config.setDobDecodeServerURL('https://dob-decode-server')

const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
await renderByTokenKey(tokenKey) // this function will query the configured decode service to read the data required for rendering
```