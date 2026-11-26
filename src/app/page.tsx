import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Temporary placeholder. The real homepage is built in the next stage,
 * from the approved homepage mockup.
 */
export default function HomePage() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Logo layout="stacked" showTagline href={null} />
        <p className="max-w-xl text-forest/70">
          Project setup and brand identity are ready. The homepage will be designed in the next stage.
        </p>
        <Button href="/style-guide" rightIcon={<ArrowRight />}>
          View brand components
        </Button>
      </Container>
      <FeatherWave className="mt-20 h-20 sm:h-28" />
    </section>
  );
}
