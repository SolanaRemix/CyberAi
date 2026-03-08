export interface CyberAiClientOptions {
  baseUrl: string;
}

export class CyberAiClient {
  constructor(private readonly opts: CyberAiClientOptions) {}

  async listContracts() {
    const res = await fetch(`${this.opts.baseUrl}/contracts`);
    if (!res.ok) throw new Error(`Failed to fetch contracts: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
