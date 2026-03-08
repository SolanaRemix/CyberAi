export interface CyberAiClientOptions {
  baseUrl: string;
}

export class CyberAiClient {
  constructor(private readonly opts: CyberAiClientOptions) {}

  async listContracts(): Promise<unknown[]> {
    const res = await fetch(`${this.opts.baseUrl}/contracts`);
    if (!res.ok) throw new Error(`Failed to fetch contracts: ${res.status} ${res.statusText}`);
    return (await res.json()) as unknown[];
  }
}
