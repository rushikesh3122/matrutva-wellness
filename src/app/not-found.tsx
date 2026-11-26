import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-8 py-28 text-center">
      <SectionHeading
        eyebrow="Coming soon"
        title="This page is still growing"
        marathi="लवकरच येत आहे"
        description="We are crafting this part of the Matrutva experience. Please check back soon."
      />
      <Button href="/" variant="outline" leftIcon={<ArrowLeft />}>
        Back to home
      </Button>
    </Container>
  );
}
