import React from "react";
import { FiMail, FiPhone, FiAward, FiBookOpen, FiUsers, FiTrendingUp, FiStar, FiBriefcase, FiTarget, FiZap } from "react-icons/fi";
import SWK from '../../assets/Images/Honorary-Pioneers/SWK.jpg';
import "./HonoraryPioneers.css";

const HonoraryPioneers = () => {
  const profileData = {
    name: "Dr. Suhas Wamanrao Kulkarni",
    email: "Swk1959@rediffmail.com",
    contact: "9850055188",
    education: "M.Sc, Ph.D",
    designation: "Retired Prof in Microbiology",
    mainSubject: "Microbiology",
    areaOfInterest: "Microbiology, Biotechnology, Environmental Science, Industrial & Medical Microbiology",
    specialization: "Actinobacteria",
    founder: "S. W. Research Consultancy Services",
    ideaSeller: "To start or expand business in Life Sciences (Ideas in thousands and earning in multiple)",
    experience: {
      teaching: "38 Years",
      research: "35 Years",
      trainer: "5 Years",
      scientificWriter: "10 Years",
      managingEditor: "9 Years",
      ideaDeveloper: "2 Years",
      technicalAdvisor: "2 Years"
    },
    positions: [
      "Executive Council member and treasurer - Microbiologist Society, India",
      "Council member - Marathi Vidnyan Parishad, Vibhag Barshi, Solapur(M.S)",
      "Incharge Principal, NAAC Coordinator"
    ],
    awards: [
      "Vidnyan Ratna Award",
      "Best Scientific Writer Award",
      "Ideal Teacher Award"
    ],
    patents: "Two",
    phdGuidance: [
      "Punyashlok Ahilydevi Holkar University, Solapur",
      "Dr. Babasaheb Ambedkar Marathwada University, Aurangabad"
    ],
    guided: {
      mphil: "2",
      phd: "26"
    },
    researchProjects: "Three",
    books: {
      chapters: "13 books",
      edited: "01"
    },
    researchPapers: "50+",
    inventions: "16 (5 during COVID pandemic)",
    conferences: "25+ National, International Conferences, Workshops, Symposia"
  };

  return (
    <div className="honorary-pioneers">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Honorary Pioneers</h1>
          <p className="hero-subtitle">
            Celebrating the visionaries who paved the way for innovation and excellence
          </p>
        </div>
      </div>

      <div className="container">
        <div className="pioneer-profile">
          <div className="profile-header">
            <div className="profile-image">
              <div className="image-placeholder">
                <img src={SWK} alt="SWK" className="profile-image-SWK" />
                {/* <span>Photo</span> */}
              </div>
            </div>
            <div className="profile-info">
              <h2 className="pioneer-name">{profileData.name}</h2>
              <p className="pioneer-designation">{profileData.designation}</p>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <span>{profileData.email}</span>
                </div>
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <span>{profileData.contact}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-sections">
            <div className="section">
              <h3 className="section-title">
                <FiBookOpen className="section-icon" />
                Education & Background
              </h3>
              <div className="section-content">
                <p><strong>Education:</strong> {profileData.education}</p>
                <p><strong>Main Subject:</strong> {profileData.mainSubject}</p>
                <p><strong>Specialization:</strong> {profileData.specialization}</p>
                <p><strong>Area of Interest:</strong> {profileData.areaOfInterest}</p>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiBriefcase className="section-icon" />
                Professional Experience
              </h3>
              <div className="section-content">
                <div className="experience-grid">
                  <div className="experience-item">
                    <span className="experience-label">Teaching</span>
                    <span className="experience-years">{profileData.experience.teaching}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Research</span>
                    <span className="experience-years">{profileData.experience.research}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Trainer</span>
                    <span className="experience-years">{profileData.experience.trainer}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Scientific Writer</span>
                    <span className="experience-years">{profileData.experience.scientificWriter}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Managing Editor</span>
                    <span className="experience-years">{profileData.experience.managingEditor}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Idea Developer</span>
                    <span className="experience-years">{profileData.experience.ideaDeveloper}</span>
                  </div>
                  <div className="experience-item">
                    <span className="experience-label">Technical Advisor</span>
                    <span className="experience-years">{profileData.experience.technicalAdvisor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiTarget className="section-icon" />
                Leadership & Positions
              </h3>
              <div className="section-content">
                <p><strong>Founder:</strong> {profileData.founder}</p>
                <p><strong>Idea Seller:</strong> {profileData.ideaSeller}</p>
                <ul className="positions-list">
                  {profileData.positions.map((position, index) => (
                    <li key={index}>{position}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiAward className="section-icon" />
                Awards & Recognition
              </h3>
              <div className="section-content">
                <div className="awards-grid">
                  {profileData.awards.map((award, index) => (
                    <div key={index} className="award-item">
                      <FiStar className="award-icon" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
                <p><strong>Patents:</strong> {profileData.patents}</p>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiUsers className="section-icon" />
                Academic Leadership
              </h3>
              <div className="section-content">
                <p><strong>Ph.D. Guidance at:</strong></p>
                <ul className="guidance-list">
                  {profileData.phdGuidance.map((university, index) => (
                    <li key={index}>{university}</li>
                  ))}
                </ul>
                <div className="guided-stats">
                  <div className="stat-item">
                    <span className="stat-number">{profileData.guided.mphil}</span>
                    <span className="stat-label">M.Phil</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{profileData.guided.phd}</span>
                    <span className="stat-label">Ph.D</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">
                <FiTrendingUp className="section-icon" />
                Research & Publications
              </h3>
              <div className="section-content">
                <div className="research-stats">
                  <div className="stat-item">
                    <span className="stat-number">{profileData.researchProjects}</span>
                    <span className="stat-label">Research Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{profileData.researchPapers}</span>
                    <span className="stat-label">Research Papers</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{profileData.inventions}</span>
                    <span className="stat-label">Inventions</span>
                  </div>
                </div>
                <p><strong>Books:</strong> Chapters in {profileData.books.chapters}, Edited {profileData.books.edited}</p>
                <p><strong>Conferences:</strong> {profileData.conferences}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonoraryPioneers;
