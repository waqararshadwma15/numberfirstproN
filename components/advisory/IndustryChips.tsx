/* The sectors the advisory team knows best, shown under the advisory journey. */
export function IndustryChips({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <p data-reveal className="eyebrow eyebrow-teal">
        {label}
      </p>
      <ul aria-label={label} className="mt-5 flex flex-wrap gap-2.5">
        {items.map((s) => (
          <li key={s} data-reveal className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-teal/60">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
