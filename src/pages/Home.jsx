import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import Features from '../components/Features/Features';
import './styles/Home.css';
import Footer from '../components/Footer/Footer';
import StatsCards from '../components/StatsCards/StatsCards';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import ResumeScoringSection from '../components/ResumeScoringSection/ResumeScoringSection';

const Home = () => {
    return (
        <div className='home-wrapper'>
            <Navbar />
            <HeroSection />
            <StatsCards />
            <HowItWorks />
            <Features />
            <ResumeScoringSection />
            <Footer />
        </div>
    );
}

export default Home;
