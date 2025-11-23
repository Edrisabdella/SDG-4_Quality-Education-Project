# OpenLearn - Inclusive Peer-to-Peer Digital Education Platform

![OpenLearn](https://i.ibb.co/YB7dwx68/OPENLEARN-LOGO.png)

## 🎯 Overview

OpenLearn is a comprehensive MERN stack application designed to bridge educational gaps through technology. It provides an inclusive platform for peer-to-peer learning, resource sharing, and collaborative education.

## 🌟 Overview

OpenLearn is a responsive, inclusive, and interactive **peer-to-peer digital education platform** designed to bridge educational gaps worldwide. Supporting **SDG 4: Quality Education**, it leverages modern web technologies to deliver accessible learning resources, peer tutoring, and collaborative study opportunities.

**Tagline:** Bridging educational gaps with technology, one learner at a time.

---

## 🚀 Live Demo

- **Live Platform:** [https://sdg-4-quality-education-project.onrender.com/](https://sdg-4-quality-education-project.onrender.com/)

- **GitHub Repository:**[\[OpenLearn GitHub\](https://github.com/EdrisAbdella/openlearn-sdg4)](https://github.com/Edrisabdella/SDG-4_Quality-Education-Project.git)

- **Pitch Deck:** [OpenLearn Presentation](https://docs.google.com/presentation/d/1fKFA2aMuMz1YQiKiyJGYVaj0bwEnT13L/edit?usp=sharing&ouid=117719309502651175197&rtpof=true&sd=true)

---

## 🎯 Problem Statement

Education inequality remains a global challenge:  

- 260+ million children and youth worldwide lack access to education  
- 50% of students in developing countries lack reliable internet  
- Limited personalized support for academic success  
- Digital divide worsened by COVID-19 pandemic  

---

## 💡 Solution

OpenLearn provides:

| Feature | Description | Impact |
|---------|-------------|--------|
| Peer-to-Peer Tutoring | Connect learners with student tutors across subjects | Personalized academic support |
| Digital Resource Hub | Curated free educational materials | Access to quality learning resources |
| Collaborative Study Groups | Virtual community learning circles | Enhanced engagement and retention |
| Mobile-First Design | Optimized for low-bandwidth environments | Increased accessibility |
| Gamification System | Badges, certificates, progress tracking | Improved motivation and engagement |

### Key Differentiators

- **Inclusive Design:** Accessible to all users  
- **Mobile-First:** Optimized for low-bandwidth devices  
- **Global Reach:** Multi-language support  
- **Zero-Cost:** Free for learners and educators  
- **Community-Driven:** Built by educators for educators  

---

## 🛠 Technology Stack

**Frontend:**  

- React.js, CSS3, Font Awesome, Framer Motion  

**Backend:**  

- Node.js, Express.js, MongoDB, JWT  

**Development & Deployment:**  

- Git & GitHub, Vercel, Render, Jest & Playwright  

---

## 📊 Impact Metrics

| Metric | Target | Status (Year 1) |
|--------|--------|----------------|
| Students Impacted | 10,000+ | 100+ |
| Learning Resources | 5,000+ | 500+ |
| Monthly Tutoring Sessions | 500+ | 40+ |
| Countries Reached | 50+ | 5+ |
| Partner Institutions | 100+ | In Progress |

---

## 🗺 Project Roadmap

**2025**  

- Phase 1: Foundation ✅  
- Phase 2: Expansion 🚧  

**2026**  

- Phase 3: Growth 📈  
- Phase 4: Scale 🌍  

---
openlearn-mern/                                                                                                                                                                 
│── server/ 

│   ├── config/                                                                                                                                                  
│   │   ├── database.js                                                                                                                                                                                                                                                                         
│   │   ├── cloudinary.js                                                                                                                                                         
│   │   └── email.js                                                                                                                                                                                                                 
│   ├── controllers/                                                                                                                                                                                                                                                                                                                                                                                                
│   │   ├── authController.js                                                                                                                                                        
│   │   ├── userController.js                                                                                                                                              
│   │   ├── courseController.js                                                                                                                                             
│   │   ├── resourceController.js                                                                                                                                      
│   │   ├── tutoringController.js                                                                                                                                                                                                                                                              
│   │   └── uploadController.js                                                                                                                                   
│   ├── models/                                                                                                                                                    
│   │   ├── User.js                                                                                                                                                  
│   │   ├── Course.js                                                                                                                                             
│   │   ├── Resource.js                                                                                                                                           
│   │   ├── TutoringSession.js                                                                                                                                                 
│   │   ├── Token.js                                                                                                                                               
│   │   └── Enrollment.js                                                                                                                                          
│   ├── routes/                                                                                                                                                     
│   │   ├── auth.js                                                                                                                                                   
│   │   ├── users.js                                                                                                                                                  
│   │   ├── courses.js                                                             
│   │   ├── resources.js                                                                                                                                                                                                                
│   │   ├── tutoring.js                                                                                                                                           
│   │   └── uploads.js                                                                                                                                             
│   ├── middleware/                             
│   │   ├── auth.js                                                                                                                                                            
│   │   ├── errorHandler.js                                                                                                                                   
│   │   ├── validation.js                                                                                                                                          
│   │   ├── rateLimiter.js                                                                                                                                         
│   │   ├── logger.js                                                                                                                                            
│   │   └── upload.js                                                                                                                                              
│   ├── utils/                                                                                                                                                                  
│   │   ├── generateToken.js                                                                                                                                 
│   │   ├── catchAsync.js                                            
│   │   ├── AppError.js                                                                                                                                           
│   │   ├── emailTemplates.js                                                                                                    
│   │   └── helpers.js 

│   ├── validations/                                                                                                                                                
│   │   ├── authValidation.js                                                                                                                                     
│   │   ├── userValidation.js                                                                                                                                                   
│   │   ├── courseValidation.js                                                                                                                                   
│   │   └── resourceValidation.js

│   ├── services/                                                                                                                                                 
│   │   ├── emailService.js                                                                                                                                          
│   │   ├── cloudinaryService.js                                                                                                                                  
│   │   └── paymentService.js

│   ├── tests/                                                                                                                                                    
│   │   ├── integration/                                                                                                                                          
│   │   └── unit/                                                                                                                                                                                                                                                                                                
│   ├── .env                                                                                                                                                      
│   ├── server.js                                                                                                                                                 
│   └── package.json                                                                                                                                                       

│

    
└── client/                                                                                                                                                       
    ├── public/                                                                                                                                                   
    │   ├── index.html                                                                                                                                            
    │   ├── favicon.ico                                                                                                                                            
    │   └── manifest.json 
    
    ├── src/                                                                       
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   ├── Toast.jsx
    │   │   │   └── ProtectedRoute.jsx
    
    │   │   ├── forms/
    │   │   │   ├── LoginForm.jsx
    │   │   │   ├── RegisterForm.jsx
    │   │   │   ├── CourseForm.jsx
    │   │   │   └── ResourceForm.jsx
    
    │   │   ├── ui/
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Input.jsx
    │   │   │   ├── Table.jsx
    │   │   │   └── Badge.jsx
    
    │   │   └── layout/
    │   │       ├── MainLayout.jsx
    │   │       └── DashboardLayout.jsx
    
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    
    │   │   ├── dashboard/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Profile.jsx
    │   │   │   └── Settings.jsx
    
    │   │   ├── courses/
    │   │   │   ├── CoursesList.jsx
    │   │   │   ├── CourseDetail.jsx
    │   │   │   └── CoursePlayer.jsx
    
    │   │   ├── resources/
    │   │   │   ├── ResourcesList.jsx
    │   │   │   └── UploadResource.jsx
    
    │   │   ├── tutoring/
    │   │   │   ├── TutorsList.jsx
    │   │   │   ├── TutoringSession.jsx
    │   │   │   └── BecomeTutor.jsx
    
    │   │   └── general/
    │   │       ├── Home.jsx
    │   │       ├── About.jsx
    │   │       ├── Contact.jsx
    │   │       └── Team.jsx
    
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   ├── useApi.js
    │   │   ├── useForm.js
    │   │   └── useLocalStorage.js
    
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   ├── ThemeContext.js
    │   │   └── LoadingContext.js
    
    │   ├── redux/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js
    │   │   │   ├── userSlice.js
    │   │   │   ├── courseSlice.js
    │   │   │   └── uiSlice.js
    
    │   │   ├── store.js
    │   │   └── api/
    │   │       ├── authApi.js
    │   │       ├── coursesApi.js
    │   │       └── resourcesApi.js
    
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── courseService.js
    │   │   └── uploadService.js
    
    │   ├── utils/
    │   │   ├── constants.js
    │   │   ├── formatters.js
    │   │   ├── validators.js
    │   │   └── helpers.js
    
    │   ├── assets/
    │   │   ├── images/
    │   │   ├── styles/
    │   │   │   ├── globals.css
    │   │   │   ├── components.css
    │   │   │   └── responsive.css
    │   │   └── icons/
    
    │   ├── routes/
    │   │   └── AppRouter.jsx
    
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    
    ├── package.json                                                                                                                                           .
    ├── vite.config.js                                                                                                                                          .
    ├── .env                                                                                                                                                    .
---

## ⚡ Quick Start

### Option 1: Single HTML File

```bash
wget https://raw.githubusercontent.com/EdrisAbdella/openlearn-sdg4/main/openlearn.html
open openlearn.html

or

```bash
git clone https://github.com/EdrisAbdella/openlearn-sdg4.git
cd openlearn-sdg4

npm run install-all

cp server/.env.example server/.env
# Edit server/.env

npm run dev
# Frontend: http://localhost:3000
# Backend: [[Render live link](https://sdg-4-quality-education-project-by-edris.onrender.com)](https://sdg-4-quality-education-project-by-edris.onrender.com)
```

**Prerequisites:** Node.js 16+, MongoDB 5.0+, modern browser  

---

## 🧪 Testing

```bash
npm test                 # Run all tests

```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm i -g vercel
vercel --prod
```

### Backend (Render)

```bash

git push render
```

**Full API docs:** [OpenLearn API Docs](../../../Downloads/OPENLEARN INDEX/OpenLearn_README/README.md#)  

---

## 🌐 Internationalization

- ✅ English (Primary)  
- 🚧 Spanish (Planned)  
- 🚧 French (Planned)  
- 🚧 Arabic (Planned)  

---

## 🔒 Security

- Data Encryption  
- JWT Authentication  
- Input Validation  
- Regular Security Audits  
- Privacy-first Policy  

---

## 📊 Analytics & Impact

- Educational outcomes  
- Engagement metrics  
- Completion rates  
- User growth & resource utilization  

---

## 🎓 Research & Publications

- 2025: Planned studies on gamification impact  
- 2026: Global adoption and peer learning impact  

---

## 💰 Funding & Sustainability

- Grant funding, university partnerships, donations  
- Sustainable model: grants → institutional partnerships → social enterprise  

---

## 👥 Team

| Role | Name | Contact |
|------|------|--------|
| Project Lead | Edris Abdella | <edrisabdella178@gmail.com> |
| Full Stack Developer | Edris Abdella | GitHub |
| UI/UX Designer | Volunteer | Open |
| Content Curator | Volunteer | Open |

**Contributors:** Open to global community  

---

## 🤝 How to Contribute

1. Fork repo  
2. Create feature branch  
3. Commit changes  
4. Push branch  
5. Open Pull Request  

**Help with:** Development, content creation, tutoring, testing, translation, promotion  

---

## 📞 Support

- Documentation: [OpenLearn Docs](../../../Downloads/OPENLEARN INDEX/OpenLearn_README/README.md#)  
- Community Forum: [OpenLearn Community](../../../Downloads/OPENLEARN INDEX/OpenLearn_README/README.md#)  
- Email: <support@openlearn.org>  

---

## 📄 License

MIT License – see [LICENSE.md](../../../Downloads/OPENLEARN INDEX/OpenLearn_README/LICENSE.md)  

---

## 📬 Contact

**Project Lead:** Edris Abdella  

- Email: <edrisabdella178@gmail.com>  
- LinkedIn: Edris Abdella Nuure  
- GitHub: [Edris Abdella](https://github.com/EdrisAbdella)  

**Repository:** [OpenLearn GitHub](https://github.com/EdrisAbdella/openlearn-sdg4)  

### 🌟 Join Our Mission

Together, we can bridge educational gaps for future generations.

Made with ❤️ for **SDG 4: Quality Education by Edris Abdella**
