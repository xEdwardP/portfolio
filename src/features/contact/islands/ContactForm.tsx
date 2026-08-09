import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import type { ContactFailure } from '../contact.service';
import { validate, type ContactInput, type FieldName } from '../schema';
import { createContactService } from '../service';

export interface ContactLabels {
  fields: Record<FieldName, string>;
  errors: Record<FieldName, string>;
  failures: Record<ContactFailure, string>;
  send: string;
  sending: string;
  success: string;
  honeypot: string;
}

interface Props {
  labels: ContactLabels;
  accessKey: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'failed'; reason: ContactFailure };

const empty: ContactInput = { name: '', email: '', subject: '', message: '' };

const control =
  'w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text transition placeholder:text-muted';

function focusField(form: HTMLFormElement, field: FieldName) {
  const element = form.elements.namedItem(field);
  if (element instanceof HTMLElement) element.focus();
}

export default function ContactForm({ labels, accessKey }: Props) {
  const service = useMemo(() => createContactService(accessKey), [accessKey]);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(empty);
  const [invalid, setInvalid] = useState<FieldName[]>([]);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const sending = status.kind === 'sending';

  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setInvalid((current) => current.filter((name) => name !== field));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;

    if (new FormData(form).get('company')) {
      setValues(empty);
      setStatus({ kind: 'sent' });
      return;
    }

    const result = validate(values);
    if (!result.ok) {
      setInvalid(result.invalid);
      setStatus({ kind: 'idle' });
      focusField(form, result.invalid[0]);
      return;
    }

    setInvalid([]);
    setStatus({ kind: 'sending' });

    const outcome = await service.send(result.data);

    if (outcome.ok) {
      setValues(empty);
      setStatus({ kind: 'sent' });
    } else {
      setStatus({ kind: 'failed', reason: outcome.reason });
    }
  }

  function field(name: FieldName, type: 'text' | 'email' | 'textarea') {
    const failed = invalid.includes(name);
    const errorId = `contact-${name}-error`;
    const shared = {
      id: `contact-${name}`,
      name,
      value: values[name],
      required: true,
      'aria-invalid': failed,
      'aria-describedby': failed ? errorId : undefined,
      className: `${control} ${failed ? 'border-danger' : 'border-control'}`,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        update(name, event.target.value),
    };

    return (
      <div>
        <label htmlFor={shared.id} className="mb-1.5 block text-sm font-medium">
          {labels.fields[name]}
        </label>

        {type === 'textarea' ? (
          <textarea {...shared} rows={6} />
        ) : (
          <input
            {...shared}
            type={type}
            autoComplete={name === 'email' ? 'email' : 'off'}
          />
        )}

        {failed && (
          <p id={errorId} className="mt-1.5 text-sm text-danger">
            {labels.errors[name]}
          </p>
        )}
      </div>
    );
  }

  const feedback =
    status.kind === 'sent'
      ? { text: labels.success, tone: 'text-success' }
      : status.kind === 'failed'
        ? { text: labels.failures[status.reason], tone: 'text-danger' }
        : null;

  return (
    <form
      ref={formRef}
      action={service.formAction}
      method="post"
      onSubmit={handleSubmit}
      className="grid gap-5"
    >
      {Object.entries(service.formFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'text')}
        {field('email', 'email')}
      </div>

      {field('subject', 'text')}
      {field('message', 'textarea')}

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-company">{labels.honeypot}</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? labels.sending : labels.send}
        </button>

        <p aria-live="polite" className={`text-sm ${feedback?.tone ?? ''}`}>
          {feedback?.text ?? ''}
        </p>
      </div>
    </form>
  );
}
