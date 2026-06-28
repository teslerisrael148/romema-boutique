import { featuredCategories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/CategoryCard";

export function FeaturedCollections() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-lux">
        <SectionHeading
          overline="הקולקציות שלנו"
          title="תמצאי את הסגנון שלך"
        />

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5">
          {featuredCategories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
