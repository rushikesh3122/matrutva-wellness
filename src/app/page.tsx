import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Temporary placeholder. The real homepage is built in Stage 3,
 * from the approved homepage mockup.
 */
export default function HomePage() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-28">
      <Container className="flex flex-col items-center gap-10 text-center">
        <h1 className="sr-only">Matrutva Wellness, premium Indian spirulina</h1>
        <BrandLogo variant="full" href={null} />
        <p className="max-w-xl text-forest/70">
          Brand identity and design system are ready. The homepage will be designed in Stage 3.
        </p>
        <PrimaryButton href="/style-guide" rightIcon={<ArrowRight />}>
          View design system
        </PrimaryButton>
      </Container>
      <FeatherWave className="mt-20 h-20 sm:h-28" />
    </section>
  );
}
