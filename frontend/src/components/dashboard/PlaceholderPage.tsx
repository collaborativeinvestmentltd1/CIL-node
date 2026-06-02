import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
};

export default function PlaceholderPage({
  title,
  description,
  eyebrow = "Coming soon",
  backHref,
  backLabel = "Back to dashboard",
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Panel padding="lg" className="space-y-4">
        <p className="text-sm text-slate-600">
          This workflow is part of the CIL Properties MVP roadmap. Core property search, listings, and
          landlord–tenant flows are live; this section will connect to the API next.
        </p>
        {backHref ? (
          <Link href={backHref}>
            <Button variant="outline">{backLabel}</Button>
          </Link>
        ) : null}
      </Panel>
    </div>
  );
}
