import { FC, useState } from 'react'
import {
  svgToBase64,
  renderByDobDecodeResponse
} from '@didhq/did-render-sdk'

export const TraitsParser: FC = () => {
  const [traitsText, setRenderOutput] = useState<string>(JSON.stringify({"jsonrpc":"2.0","result":"{\"render_output\":\"[{\\\"name\\\":\\\"Account\\\",\\\"traits\\\":[{\\\"String\\\":\\\"20230707.bit\\\"}]},{\\\"name\\\":\\\"ExpireAt\\\",\\\"traits\\\":[{\\\"Timestamp\\\":1720081906}]}]\",\"dob_content\":\"01a7d4860aaf1dc83daedf75d6022811d2c2ae250bf25d86660000000032303233303730372e626974\"}","id":2}))
  const [imgSrc, setImgSrc] = useState('')
  const onRender = async () => {
    try {
      const svgCode = renderByDobDecodeResponse(JSON.parse(traitsText).result)
      // const items = JSON.parse(traitsText) as RenderOutput[]
      // const { traits, indexVarRegister } = traitsParser(items)
      // const renderOptions = renderTextParamsParser(traits, indexVarRegister)
      // const svgCode = await renderTextSvg(renderOptions)
      setImgSrc(await svgToBase64(svgCode))

    } catch (error) {
      alert(error instanceof Error ? error.message : error)
      console.error(error)
    }
  }

  return (
    <div>
      <textarea
        style={{ width: '100%', height: '300px' }}
        value={traitsText}
        onChange={(e) => setRenderOutput(e.target.value)}
      />
      <button onClick={onRender}>Render</button>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="output"
            style={{
              width: '500px',
              height: 'auto',
              fontSize: '20px',
              marginTop: '20px',
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
