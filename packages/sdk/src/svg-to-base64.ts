export async function toBase64(str: string) {
  if (typeof window !== 'undefined') {
    async function toBase64(str: string) {
      // use a FileReader to generate a base64 data URI:
      const base64url = await new Promise<string>(r => {
        const reader = new FileReader()
        reader.onload = () => r(reader.result as string)
        reader.readAsDataURL(new Blob([new TextEncoder().encode(str)]))
      });
      // remove the `data:...;base64,` part from the start
      return base64url.slice(base64url.indexOf(',') + 1);
    }

    const base64url = await toBase64(str)

    return base64url.slice(base64url.indexOf(',') + 1) // browser
  }
  return Buffer.from(str).toString('base64') // nodejs
}

export async function svgToBase64(svgCode: string) {
  return 'data:image/svg+xml;base64,' + await toBase64(svgCode)
}
