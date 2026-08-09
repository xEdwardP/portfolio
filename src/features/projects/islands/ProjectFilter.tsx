import { useEffect, useState } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface Props {
  options: FilterOption[];
  allLabel: string;
  legend: string;
}

const ALL = 'all';

function readFromUrl(valid: string[]): string {
  const value = new URLSearchParams(window.location.search).get('ecosystem');
  return value && valid.includes(value) ? value : ALL;
}

export default function ProjectFilter({ options, allLabel, legend }: Props) {
  const [active, setActive] = useState(ALL);
  const ids = options.map((option) => option.id).join(',');

  useEffect(() => {
    const valid = ids.split(',');
    const sync = () => setActive(readFromUrl(valid));

    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [ids]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-project]');
    let visible = 0;

    cards.forEach((card) => {
      const matches = active === ALL || card.dataset.ecosystem === active;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    const empty = document.querySelector<HTMLElement>('[data-projects-empty]');
    if (empty) empty.hidden = visible > 0;
  }, [active]);

  function select(id: string) {
    setActive(id);

    const url = new URL(window.location.href);
    if (id === ALL) url.searchParams.delete('ecosystem');
    else url.searchParams.set('ecosystem', id);

    window.history.pushState({}, '', url);
  }

  const total = options.reduce((sum, option) => sum + option.count, 0);

  return (
    <div role="group" aria-label={legend} className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => select(ALL)}
        aria-pressed={active === ALL}
        className="cursor-pointer rounded-full border border-strong px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-raised aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
      >
        {allLabel} <span className="font-mono text-xs opacity-70">{total}</span>
      </button>

      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => select(option.id)}
          aria-pressed={active === option.id}
          className="cursor-pointer rounded-full border border-strong px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-raised aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
        >
          {option.label}{' '}
          <span className="font-mono text-xs opacity-70">{option.count}</span>
        </button>
      ))}

      <span className="sr-only" aria-live="polite">
        {active === ALL
          ? allLabel
          : options.find((option) => option.id === active)?.label}
      </span>
    </div>
  );
}
