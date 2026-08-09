export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFailure = 'misconfigured' | 'rejected' | 'network';

export type ContactResult = { ok: true } | { ok: false; reason: ContactFailure };

export interface ContactService {
  send(message: ContactMessage): Promise<ContactResult>;

  readonly formAction: string;

  readonly formFields: Readonly<Record<string, string>>;
}
