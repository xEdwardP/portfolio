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

  async send(message: ContactMessage, captchaToken: string): Promise<ContactResult> {
    if (!this.accessKey) return { ok: false, reason: 'misconfigured' };
    if (!captchaToken?.trim()) return { ok: false, reason: 'captcha' };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: this.accessKey,
          'h-captcha-response': captchaToken,
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
        }),
      });

      if (!response.ok) return { ok: false, reason: 'rejected' };
      const result: unknown = await response.json();
      return result !== null &&
        typeof result === 'object' &&
        'success' in result &&
        result.success === true
        ? { ok: true }
        : { ok: false, reason: 'rejected' };
    } catch {
      return { ok: false, reason: 'network' };
    }
  }
}
