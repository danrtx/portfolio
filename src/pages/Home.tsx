import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { StackSection } from '../components/StackSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { WorkSection } from '../components/WorkSection';
import { EducationCertsSection } from '../components/EducationCertsSection';
import { ContactSection } from '../components/ContactSection';

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <WorkSection />
      <EducationCertsSection />
      <ContactSection />
    </>
  );
}
