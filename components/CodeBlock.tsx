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
      ? 'border-renge-success bg-renge-success-subtle'
      : tone === 'guess'
        ? 'border-renge-warning bg-renge-warning-subtle'
        : 'border-renge-border-subtle bg-renge-bg-subtle';

  return (
    <figure className={`overflow-hidden rounded-renge-2 border ${toneClasses}`}>
      {label ? (
        <figcaption className="border-b border-inherit px-renge-3 py-renge-2 text-renge-xs font-medium text-renge-fg-subtle">
          {label}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto px-renge-3 py-renge-3 text-renge-xs leading-relaxed">
        <code className="mono text-renge-fg">{code}</code>
      </pre>
    </figure>
  );
}
