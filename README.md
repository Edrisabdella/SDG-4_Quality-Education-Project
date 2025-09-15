<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenLearn - Inclusive Peer-to-Peer Digital Education Platform</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #0A97D9;
            --secondary: #1A4B8C;
            --accent: #FF6B6B;
            --light: #F8F9FA;
            --dark: #212529;
            --success: #28a745;
            --warning: #ffc107;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: var(--dark);
            line-height: 1.6;
        }
        
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
        }
        
        .logo i {
            margin-right: 10px;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
        }
        
        .nav-links li {
            margin-left: 1.5rem;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .nav-links a:hover {
            color: var(--accent);
        }
        
        .btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background-color: var(--accent);
            color: white;
            border: none;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: #ff5252;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(rgba(10, 151, 217, 0.8), rgba(26, 75, 140, 0.9)), url('https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 6rem 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.5rem;
            max-width: 800px;
            margin: 0 auto 2rem;
        }
        
        /* Section Styles */
        section {
            padding: 5rem 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title h2 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .section-title p {
            color: #666;
            max-width: 700px;
            margin: 0 auto;
        }
        
        /* Problem Statement */
        .problem-statement {
            background-color: white;
        }
        
        .problem-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .problem-card {
            background: var(--light);
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;
        }
        
        .problem-card:hover {
            transform: translateY(-10px);
        }
        
        .problem-card i {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        /* Features */
        .features {
            background-color: var(--light);
        }
        
        .feature-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            text-align: center;
        }
        
        .feature-card i {
            font-size: 3rem;
            color: var(--secondary);
            margin-bottom: 1rem;
        }
        
        /* Technology Stack */
        .tech-stack {
            background: white;
        }
        
        .tech-items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        .tech-item {
            text-align: center;
            padding: 2rem;
            background: var(--light);
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .tech-item:hover {
            background: var(--primary);
            color: white;
        }
        
        .tech-item i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        /* Impact Metrics */
        .impact {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
        }
        
        .metric {
            padding: 2rem;
        }
        
        .metric i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: var(--accent);
        }
        
        .metric h3 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        /* Roadmap */
        .roadmap {
            background-color: var(--light);
        }
        
        .timeline {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .timeline::after {
            content: '';
            position: absolute;
            width: 6px;
            background-color: var(--primary);
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -3px;
        }
        
        .timeline-item {
            padding: 10px 40px;
            position: relative;
            width: 50%;
            box-sizing: border-box;
        }
        
        .timeline-item::after {
            content: '';
            position: absolute;
            width: 25px;
            height: 25px;
            background-color: white;
            border: 4px solid var(--primary);
            top: 15px;
            border-radius: 50%;
            z-index: 1;
        }
        
        .left {
            left: 0;
            text-align: right;
        }
        
        .right {
            left: 50%;
        }
        
        .left::after {
            right: -13px;
        }
        
        .right::after {
            left: -13px;
        }
        
        .timeline-content {
            padding: 20px;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Team */
        .team {
            background-color: white;
        }
        
        .team-members {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .team-member {
            text-align: center;
            padding: 2rem;
            background: var(--light);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .team-member img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            border: 5px solid var(--primary);
        }
        
        /* CTA Section */
        .cta {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-align: center;
            padding: 5rem 0;
        }
        
        .cta h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }
        
        .cta p {
            max-width: 700px;
            margin: 0 auto 2rem;
            font-size: 1.2rem;
        }
        
        /* Footer */
        footer {
            background-color: var(--dark);
            color: white;
            padding: 3rem 0 1rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-section h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--accent);
        }
        
        .footer-section p, .footer-section li {
            margin-bottom: 0.5rem;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section a {
            color: #ddd;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
            color: var(--accent);
        }
        
        .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .social-icons a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .social-icons a:hover {
            background-color: var(--accent);
            transform: translateY(-3px);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.2rem;
            }
            
            .timeline::after {
                left: 31px;
            }
            
            .timeline-item {
                width: 100%;
                padding-left: 70px;
                padding-right: 25px;
            }
            
            .timeline-item::after {
                left: 18px;
            }
            
            .left, .right {
                left: 0;
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav>
                <div class="logo">
                    <i class="fas fa-graduation-cap"></i>
                    <span>OpenLearn</span>
                </div>
                <ul class="nav-links">
                    <li><a href="#problem">Problem</a></li>
                    <li><a href="#solution">Solution</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#technology">Technology</a></li>
                    <li><a href="#impact">Impact</a></li>
                    <li><a href="#roadmap">Roadmap</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="#contact" class="btn">Get Involved</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Inclusive Peer-to-Peer Digital Education Platform</h1>
            <p>Bridging educational gaps with technology. Empowering learners and educators worldwide.</p>
            <a href="#contact" class="btn">Join Our Mission</a>
        </div>
    </section>

    <!-- Problem Statement -->
    <section id="problem" class="problem-statement">
        <div class="container">
            <div class="section-title">
                <h2>Problem Statement</h2>
                <p>Education inequality remains one of the most significant challenges to sustainable development worldwide</p>
            </div>
            <div class="problem-cards">
                <div class="problem-card">
                    <i class="fas fa-globe-americas"></i>
                    <h3>Limited Access</h3>
                    <p>Over 260 million children and youth worldwide do not attend school, and many more lack access to quality education resources.</p>
                </div>
                <div class="problem-card">
                    <i class="fas fa-laptop-code"></i>
                    <h3>Digital Divide</h3>
                    <p>The COVID-19 pandemic highlighted the digital divide, with nearly 50% of students in developing countries lacking internet access.</p>
                </div>
                <div class="problem-card">
                    <i class="fas fa-hands-helping"></i>
                    <h3>Lack of Support</h3>
                    <p>Many students struggle academically without access to personalized support, tutoring, or mentorship opportunities.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Solution -->
    <section id="solution" class="features" style="background-color: #fff;">
        <div class="container">
            <div class="section-title">
                <h2>Our Solution</h2>
                <p>OpenLearn addresses educational inequality through a multi-faceted approach</p>
            </div>
            <div class="feature-cards">
                <div class="feature-card">
                    <i class="fas fa-users"></i>
                    <h3>Peer-to-Peer Tutoring</h3>
                    <p>Connecting learners with student tutors for personalized academic support across various subjects.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-book-open"></i>
                    <h3>Digital Resource Hub</h3>
                    <p>Curated collection of free educational materials including PDFs, eBooks, videos, and tutorials.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <h3>Study Groups</h3>
                    <p>Virtual community learning circles for collaborative studying and knowledge sharing.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="features">
        <div class="container">
            <div class="section-title">
                <h2>Key Features</h2>
                <p>OpenLearn offers a comprehensive set of features designed to enhance learning experiences</p>
            </div>
            <div class="feature-cards">
                <div class="feature-card">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>Mobile-First Design</h3>
                    <p>Optimized for accessibility on various devices, particularly in low-bandwidth environments.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-universal-access"></i>
                    <h3>Inclusive Platform</h3>
                    <p>Ensuring accessibility for learners regardless of technical background or ability.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-certificate"></i>
                    <h3>Gamification</h3>
                    <p>Badges, certificates, and progress tracking to motivate and engage learners.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Technology Stack -->
    <section id="technology" class="tech-stack">
        <div class="container">
            <div class="section-title">
                <h2>Technology Stack</h2>
                <p>Built with modern, scalable technologies to ensure performance and reliability</p>
            </div>
            <div class="tech-items">
                <div class="tech-item">
                    <i class="fab fa-react"></i>
                    <h3>React.js</h3>
                    <p>Frontend Framework</p>
                </div>
                <div class="tech-item">
                    <i class="fab fa-node-js"></i>
                    <h3>Node.js</h3>
                    <p>Backend Runtime</p>
                </div>
                <div class="tech-item">
                    <i class="fas fa-database"></i>
                    <h3>MongoDB</h3>
                    <p>Database</p>
                </div>
                <div class="tech-item">
                    <i class="fab fa-css3-alt"></i>
                    <h3>CSS3</h3>
                    <p>Styling</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Impact Metrics -->
    <section id="impact" class="impact">
        <div class="container">
            <div class="section-title">
                <h2>Impact Metrics</h2>
                <p>Measuring our success through tangible educational outcomes</p>
            </div>
            <div class="metrics">
                <div class="metric">
                    <i class="fas fa-user-graduate"></i>
                    <h3>100+</h3>
                    <p>Students Impacted in Year 1</p>
                </div>
                <div class="metric">
                    <i class="fas fa-book"></i>
                    <h3>500+</h3>
                    <p>Free Learning Resources</p>
                </div>
                <div class="metric">
                    <i class="fas fa-chalkboard"></i>
                    <h3>40+</h3>
                    <p>Peer Tutoring Sessions Monthly</p>
                </div>
                <div class="metric">
                    <i class="fas fa-globe"></i>
                    <h3>5+</h3>
                    <p>Countries Reached</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Roadmap -->
    <section id="roadmap" class="roadmap">
        <div class="container">
            <div class="section-title">
                <h2>Project Roadmap</h2>
                <p>Our strategic plan for developing and scaling OpenLearn</p>
            </div>
            <div class="timeline">
                <div class="timeline-item left">
                    <div class="timeline-content">
                        <h3>Phase 1: Foundation (Months 1-3)</h3>
                        <p>Build core Digital Resource Hub functionality and initial repository of educational resources.</p>
                    </div>
                </div>
                <div class="timeline-item right">
                    <div class="timeline-content">
                        <h3>Phase 2: Expansion (Months 4-6)</h3>
                        <p>Implement peer-to-peer tutoring features and launch awareness campaigns for lifelong learning.</p>
                    </div>
                </div>
                <div class="timeline-item left">
                    <div class="timeline-content">
                        <h3>Phase 3: Growth (Months 6-12)</h3>
                        <p>Expand resource library, establish partnerships with schools and NGOs, and implement advanced features.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Team -->
    <section id="team" class="team">
        <div class="container">
            <div class="section-title">
                <h2>Our Team</h2>
                <p>Dedicated professionals and volunteers committed to educational equality</p>
            </div>
            <div class="team-members">
                <div class="team-member">
                    <img src="https://drive.google.com/file/d/1A0hc-5R9qS97rBB1jIHqUKQ1xl-ycfd1/view" alt="Edris Abdella">
                    <h3>Edris Abdella</h3>
                    <p>Project Lead</p>
                    <p>Education Technology Specialist</p>
                </div>
                <div class="team-member">
                    <img src="https://images" alt="Second Team Member">
                    <h3>Second team</h3>
                    <p>Lead Developer</p>
                    <p>Full Stack Engineer</p>
                </div>
                <div class="team-member">
                    <img src="https://images" alt="Third Team Member">
                    <h3>third team</h3>
                    <p>Education Specialist</p>
                    <p>Curriculum Design</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="cta">
        <div class="container">
            <h2>Join Our Mission</h2>
            <p>We're looking for volunteers, partners, and supporters to help us bridge educational gaps worldwide. Together, we can make quality education accessible to all.</p>
            <a href="#" class="btn">Get Involved</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>OpenLearn</h3>
                    <p>Bridging educational gaps with technology. Empowering learners and educators worldwide through our inclusive peer-to-peer digital education platform.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#problem">Problem Statement</a></li>
                        <li><a href="#solution">Our Solution</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#technology">Technology</a></li>
                        <li><a href="#impact">Impact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <p><i class="fas fa-envelope"></i> info@openlearn.org</p>
                    <p><i class="fas fa-map-marker-alt"></i> Global Initiative</p>
                    <p><i class="fas fa-link"></i> <a href="https://github.com/EdrisAbdella/openlearn-sdg4" target="_blank">GitHub Repository</a></p>
                    <p><i class="fas fa-external-link-alt"></i> <a href="https://openlearn-sdg4.vercel.app" target="_blank">Live Demo</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 OpenLearn. All rights reserved. | Designed for SDG 4: Quality Education</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add a slight animation to metric numbers
        const metricsSection = document.getElementById('impact');
        const metrics = document.querySelectorAll('.metric h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    metrics.forEach(metric => {
                        const target = parseInt(metric.textContent);
                        let current = 0;
                        const increment = Math.ceil(target / 50);
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                metric.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                metric.textContent = current + '+';
                            }
                        }, 30);
                    });
                    
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(metricsSection);
    </script>
</body>
</html>
