import type { ContactMessage, ContactResult, ContactService } from '../contact.service';

const ENDPOINT = 'https://api.web3forms.com/submit';

export class Web3FormsAdapter implements ContactService {
  constructor(
    private readonly accessKey: string,
    private readonly endpoint: string = ENDPOINT
  ) {}

  get formAction(): string {
    return this.endpoint;
  }

  get formFields(): Readonly<Record<string, string>> {
    return { access_key: this.accessKey };
  }

  async send(message: ContactMessage): Promise<ContactResult> {
    if (!this.accessKey) return { ok: false, reason: 'misconfigured' };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: this.accessKey,
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
        }),
      });

      return response.ok ? { ok: true } : { ok: false, reason: 'rejected' };
    } catch {
      return { ok: false, reason: 'network' };
    }
  }
}
