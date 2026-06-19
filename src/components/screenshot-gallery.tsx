import type { Screenshot } from "@/lib/types";

// Renders a browser-chrome framed placeholder per planned screenshot. We don't ship
// fabricated screenshots, these are intentional placeholders captioned with what each
// capture will show, swapped for real <img> once the app is deployed and captured.
export function ScreenshotGallery({ shots }: { shots: Screenshot[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shots.map((s, i) => (
        <figure key={i} className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center gap-1.5 border-b border-line bg-elevated px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="bg-grid flex aspect-[16/10] items-center justify-center p-4">
            <span className="font-mono text-xs text-muted">screenshot pending</span>
          </div>
          <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
            {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
