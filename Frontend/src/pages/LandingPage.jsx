import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SystemsGrid from '../components/SystemsGrid';
import StorySection from '../components/StorySection';
import InsightBanner from '../components/InsightBanner';
import FooterCTA from '../components/FooterCTA';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            <ParticleBackground />
            <Navbar />

            {/* Content Stack */}
            <div className="relative z-10 flex flex-col gap-0">
                <Hero />
                <SystemsGrid />
                <StorySection />
                <InsightBanner />
                <FooterCTA />
            </div>
        </div>
    );
};

export default LandingPage;
