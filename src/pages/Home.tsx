import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { WorkSection } from '../components/WorkSection';
import { EducationCertsSection } from '../components/EducationCertsSection';
import { ContactSection } from '../components/ContactSection';

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <EducationCertsSection />
      <ContactSection />
    </>
  );
}
