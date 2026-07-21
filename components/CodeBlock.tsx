export function CodeBlock({
  code,
  label,
  tone = 'plain',
}: {
  code: string;
  label?: string;
  tone?: 'plain' | 'known' | 'guess';
}) {
  const toneClasses =
    tone === 'known'
      ? 'border-[var(--color-known-line)] bg-[var(--color-known-soft)]/50'
      : tone === 'guess'
        ? 'border-[var(--color-guess-line)] bg-[var(--color-guess-soft)]/50'
        : 'border-[var(--color-line)] bg-white/70';

  return (
    <figure className={`overflow-hidden rounded-lg border ${toneClasses}`}>
      {label ? (
        <figcaption className="border-b border-inherit px-4 py-2 text-xs font-medium text-[var(--color-muted)]">
          {label}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed">
        <code className="mono text-[var(--color-ink)]">{code}</code>
      </pre>
    </figure>
  );
}
