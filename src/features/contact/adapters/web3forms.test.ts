import { afterEach, describe, expect, it, vi } from 'vitest';
import { Web3FormsAdapter } from './web3forms';

const message = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'I would like to talk about a project you published on the portfolio.',
};

const endpoint = 'https://example.test/submit';
const captchaToken = 'dummy-captcha-token';

function stubFetch(implementation: typeof fetch) {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(implementation);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Web3FormsAdapter', () => {
  it('reports a missing access key without calling the network', async () => {
    const fetchSpy = stubFetch(async () => new Response(null, { status: 200 }));

    const result = await new Web3FormsAdapter('', endpoint).send(message, captchaToken);

    expect(result).toEqual({ ok: false, reason: 'misconfigured' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sends the access key alongside the message fields', async () => {
    const fetchSpy = stubFetch(async () => Response.json({ success: true }));

    await new Web3FormsAdapter('test-key', endpoint).send(message, captchaToken);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toEqual({
      access_key: 'test-key',
      'h-captcha-response': captchaToken,
      ...message,
    });
  });

  it('succeeds on a 2xx response', async () => {
    stubFetch(async () => Response.json({ success: true }));

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message, captchaToken)
    ).resolves.toEqual({
      ok: true,
    });
  });

  it('reports a rejection when the provider refuses the message', async () => {
    stubFetch(async () => new Response(null, { status: 422 }));

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message, captchaToken)
    ).resolves.toEqual({
      ok: false,
      reason: 'rejected',
    });
  });

  it('exposes the form endpoint and public access key', () => {
    const adapter = new Web3FormsAdapter('test-key', endpoint);

    expect(adapter.formAction).toBe(endpoint);
    expect(adapter.formFields).toEqual({ access_key: 'test-key' });
  });

  it('reports a network failure instead of throwing', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message, captchaToken)
    ).resolves.toEqual({
      ok: false,
      reason: 'network',
    });
  });

  it.each(['', '   '])(
    'rejects an empty captcha token without a request',
    async (token) => {
      const fetchSpy = stubFetch(async () => Response.json({ success: true }));

      await expect(
        new Web3FormsAdapter('test-key', endpoint).send(message, token)
      ).resolves.toEqual({ ok: false, reason: 'captcha' });
      expect(fetchSpy).not.toHaveBeenCalled();
    }
  );

  it('does not report success when the provider rejects a token in a 200 response', async () => {
    stubFetch(async () => Response.json({ success: false, message: 'Invalid captcha' }));

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message, captchaToken)
    ).resolves.toEqual({ ok: false, reason: 'rejected' });
  });
});
