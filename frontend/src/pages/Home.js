// Home page
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { analyticsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    totalResources: 0,
    totalSessions: 0,
    countriesReached: 0
  });
  const { isAuthenticated } = useAuth();

  const [metricsRef, metricsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await analyticsAPI.getAnalytics();
        setAnalytics(res.data.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchAnalytics();
  }, []);

  // Animation for counting numbers
  const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 1000 / 60);

        return () => clearInterval(timer);
      }
    }, [end, duration, inView]);

    return <span ref={ref}>{count}+</span>;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Inclusive Peer-to-Peer Digital Education Platform</h1>
            <p>Bridging educational gaps with technology. Empowering learners and educators worldwide.</p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-large">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-large btn-primary">
                    Join Our Mission
                  </Link>
                  <Link to="/resources" className="btn btn-large btn-outline">
                    Explore Resources
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section id="impact" className="impact" ref={metricsRef}>
        <div className="container">
          <div className="section-title">
            <h2>Impact Metrics</h2>
            <p>Measuring our success through tangible educational outcomes</p>
          </div>
          <div className="metrics">
            {metricsInView && (
              <>
                <motion.div 
                  className="metric"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-user-graduate"></i>
                  <h3><CountUp end={analytics.totalStudents} /></h3>
                  <p>Students Impacted</p>
                </motion.div>
                <motion.div 
                  className="metric"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <i className="fas fa-book"></i>
                  <h3><CountUp end={analytics.totalResources} /></h3>
                  <p>Free Learning Resources</p>
                </motion.div>
                <motion.div 
                  className="metric"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <i className="fas fa-chalkboard"></i>
                  <h3><CountUp end={analytics.totalSessions} /></h3>
                  <p>Peer Tutoring Sessions</p>
                </motion.div>
                <motion.div 
                  className="metric"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <i className="fas fa-globe"></i>
                  <h3><CountUp end={analytics.countriesReached} /></h3>
                  <p>Countries Reached</p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="problem-statement">
        <div className="container">
          <div className="section-title">
            <h2>Problem Statement</h2>
            <p>Education inequality remains one of the most significant challenges to sustainable development worldwide</p>
          </div>
          <div className="problem-cards">
            <div className="problem-card">
              <i className="fas fa-globe-americas"></i>
              <h3>Limited Access</h3>
              <p>Over 260 million children and youth worldwide do not attend school, and many more lack access to quality education resources.</p>
            </div>
            <div className="problem-card">
              <i className="fas fa-laptop-code"></i>
              <h3>Digital Divide</h3>
              <p>The COVID-19 pandemic highlighted the digital divide, with nearly 50% of students in developing countries lacking internet access.</p>
            </div>
            <div className="problem-card">
              <i className="fas fa-hands-helping"></i>
              <h3>Lack of Support</h3>
              <p>Many students struggle academically without access to personalized support, tutoring, or mentorship opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="features">
        <div className="container">
          <div className="section-title">
            <h2>Our Solution</h2>
            <p>OpenLearn addresses educational inequality through a multi-faceted approach</p>
          </div>
          <div className="feature-cards">
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Peer-to-Peer Tutoring</h3>
              <p>Connecting learners with student tutors for personalized academic support across various subjects.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-book-open"></i>
              <h3>Digital Resource Hub</h3>
              <p>Curated collection of free educational materials including PDFs, eBooks, videos, and tutorials.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3>Study Groups</h3>
              <p>Virtual community learning circles for collaborative studying and knowledge sharing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features light-bg">
        <div className="container">
          <div className="section-title">
            <h2>Key Features</h2>
            <p>OpenLearn offers a comprehensive set of features designed to enhance learning experiences</p>
          </div>
          <div className="feature-cards">
            <div className="feature-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile-First Design</h3>
              <p>Optimized for accessibility on various devices, particularly in low-bandwidth environments.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-universal-access"></i>
              <h3>Inclusive Platform</h3>
              <p>Ensuring accessibility for learners regardless of technical background or ability.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-certificate"></i>
              <h3>Gamification</h3>
              <p>Badges, certificates, and progress tracking to motivate and engage learners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="tech-stack">
        <div className="container">
          <div className="section-title">
            <h2>Technology Stack</h2>
            <p>Built with modern, scalable technologies to ensure performance and reliability</p>
          </div>
          <div className="tech-items">
            <div className="tech-item">
              <i className="fab fa-react"></i>
              <h3>React.js</h3>
              <p>Frontend Framework</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-node-js"></i>
              <h3>Node.js</h3>
              <p>Backend Runtime</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-database"></i>
              <h3>MongoDB</h3>
              <p>Database</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-css3-alt"></i>
              <h3>CSS3</h3>
              <p>Styling</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Join Our Mission</h2>
          <p>We're looking for volunteers, partners, and supporters to help us bridge educational gaps worldwide. Together, we can make quality education accessible to all.</p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-large">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn btn-large">
              Get Involved
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;