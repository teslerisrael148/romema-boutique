import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";

export function Testimonials() {
  return (
    <section className="bg-blush-fade py-20 sm:py-28">
      <div className="container-lux">
        <SectionHeading
          overline="לקוחות מספרות"
          title="האהבה שלנו חוזרת אלינו"
          description="אלפי נשים בחרו ברוממה — וזה מה שיש להן לומר."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
