import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "center" | "right";
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-right",
        className,
      )}
    >
      {overline ? <p className="label-overline mb-3">{overline}</p> : null}
      <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {align === "center" ? <div className="divider-gold mt-5" /> : null}
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-warmgray-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
