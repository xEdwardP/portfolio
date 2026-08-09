import { afterEach, describe, expect, it, vi } from 'vitest';
import { Web3FormsAdapter } from './web3forms';

const message = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'I would like to talk about a project you published on the portfolio.',
};

const endpoint = 'https://example.test/submit';

function stubFetch(implementation: typeof fetch) {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(implementation);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Web3FormsAdapter', () => {
  it('reports a missing access key without calling the network', async () => {
    const fetchSpy = stubFetch(async () => new Response(null, { status: 200 }));

    const result = await new Web3FormsAdapter('', endpoint).send(message);

    expect(result).toEqual({ ok: false, reason: 'misconfigured' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sends the access key alongside the message fields', async () => {
    const fetchSpy = stubFetch(async () => new Response(null, { status: 200 }));

    await new Web3FormsAdapter('test-key', endpoint).send(message);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toEqual({
      access_key: 'test-key',
      ...message,
    });
  });

  it('succeeds on a 2xx response', async () => {
    stubFetch(async () => new Response(null, { status: 200 }));

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message)
    ).resolves.toEqual({
      ok: true,
    });
  });

  it('reports a rejection when the provider refuses the message', async () => {
    stubFetch(async () => new Response(null, { status: 422 }));

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message)
    ).resolves.toEqual({
      ok: false,
      reason: 'rejected',
    });
  });

  it('exposes a no-JS fallback that posts to the same endpoint', () => {
    const adapter = new Web3FormsAdapter('test-key', endpoint);

    expect(adapter.formAction).toBe(endpoint);
    expect(adapter.formFields).toEqual({ access_key: 'test-key' });
  });

  it('reports a network failure instead of throwing', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });

    await expect(
      new Web3FormsAdapter('test-key', endpoint).send(message)
    ).resolves.toEqual({
      ok: false,
      reason: 'network',
    });
  });
});
