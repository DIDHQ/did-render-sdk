export class Config {
  private _dobDecodeServerURL = 'http://localhost:8090'

  get dobDecodeServerURL() {
    return this._dobDecodeServerURL
  }

  setDobDecodeServerURL(dobDecodeServerURL: string): void {
    this._dobDecodeServerURL = dobDecodeServerURL
  }
}

export const config = new Config()
