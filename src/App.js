import React, { useState } from 'react';
import { Edit, Download, BookOpen, PlusCircle, Trash2 } from 'lucide-react';

// Main application component
const CVCreator = () => {
  // State for different sections of the CV
  const [activeStep, setActiveStep] = useState(0);
  const [sections, setSections] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      portfolio: '',
    },
    professionalSummary: '',
    education: [{ 
      institution: '', 
      location: '', 
      degree: '', 
      classification: '', 
      startDate: '', 
      endDate: '', 
      relevantModules: '',
      dissertation: ''
    }],
    skills: {
      technical: '',
      soft: '',
      languages: ''
    },
    experience: [{ 
      organisation: '', 
      location: '', 
      title: '', 
      startDate: '', 
      endDate: '', 
      responsibilities: '' 
    }],
    projects: [{ 
      title: '', 
      description: '', 
      skills: '',
      results: '' 
    }],
    additional: {
      certifications: '',
      extracurricular: '',
      awards: ''
    }
  });
  
  // State for job description analysis
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [cvPreview, setCvPreview] = useState(false);
  
  // Extract keywords from job description
  const analyzeJobDescription = () => {
    if (!jobDescription) return;
    
    // Common keywords in UK job descriptions
    const commonKeywords = [
      'teamwork', 'communication', 'leadership', 'analytical', 'problem-solving',
      'project management', 'time management', 'data analysis', 'research',
      'python', 'excel', 'javascript', 'react', 'customer service', 'organisation',
      'planning', 'presentation', 'detail-oriented', 'collaboration', 'adaptability'
    ];
    
    // Simple keyword extraction - in a real app this would be more sophisticated
    const extractedKeywords = commonKeywords.filter(keyword => 
      jobDescription.toLowerCase().includes(keyword.toLowerCase())
    );
    
    setKeywords(extractedKeywords);
  };
  
  // Handle form changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setSections(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };
  
  const handleSummaryChange = (e) => {
    setSections(prev => ({
      ...prev,
      professionalSummary: e.target.value
    }));
  };
  
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setSections(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [name]: value
      };
      return {
        ...prev,
        education: newEducation
      };
    });
  };
  
  const addEducation = () => {
    setSections(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { 
          institution: '', 
          location: '', 
          degree: '', 
          classification: '', 
          startDate: '', 
          endDate: '', 
          relevantModules: '',
          dissertation: ''
        }
      ]
    }));
  };
  
  const removeEducation = (index) => {
    setSections(prev => {
      const newEducation = [...prev.education];
      newEducation.splice(index, 1);
      return {
        ...prev,
        education: newEducation.length ? newEducation : [{ 
          institution: '', 
          location: '', 
          degree: '', 
          classification: '', 
          startDate: '', 
          endDate: '', 
          relevantModules: '',
          dissertation: ''
        }]
      };
    });
  };
  
  const handleSkillsChange = (category, e) => {
    setSections(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: e.target.value
      }
    }));
  };
  
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setSections(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [name]: value
      };
      return {
        ...prev,
        experience: newExperience
      };
    });
  };
  
  const addExperience = () => {
    setSections(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { 
          organisation: '', 
          location: '', 
          title: '', 
          startDate: '', 
          endDate: '', 
          responsibilities: '' 
        }
      ]
    }));
  };
  
  const removeExperience = (index) => {
    setSections(prev => {
      const newExperience = [...prev.experience];
      newExperience.splice(index, 1);
      return {
        ...prev,
        experience: newExperience.length ? newExperience : [{ 
          organisation: '', 
          location: '', 
          title: '', 
          startDate: '', 
          endDate: '', 
          responsibilities: '' 
        }]
      };
    });
  };
  
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    setSections(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = {
        ...newProjects[index],
        [name]: value
      };
      return {
        ...prev,
        projects: newProjects
      };
    });
  };
  
  const addProject = () => {
    setSections(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { 
          title: '', 
          description: '', 
          skills: '',
          results: '' 
        }
      ]
    }));
  };
  
  const removeProject = (index) => {
    setSections(prev => {
      const newProjects = [...prev.projects];
      newProjects.splice(index, 1);
      return {
        ...prev,
        projects: newProjects.length ? newProjects : [{ 
          title: '', 
          description: '', 
          skills: '',
          results: '' 
        }]
      };
    });
  };
  
  const handleAdditionalChange = (category, e) => {
    setSections(prev => ({
      ...prev,
      additional: {
        ...prev.additional,
        [category]: e.target.value
      }
    }));
  };
  
  // Toggle CV preview
  const togglePreview = () => {
    setCvPreview(!cvPreview);
  };
  
  // Steps for the CV creation process
  const steps = [
    {
      title: 'Analyze Job Description',
      description: 'Paste the job description to identify important keywords',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Job Description
            </label>
            <textarea 
              rows="8"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
          <button 
            style={{ 
              marginTop: '16px',
              padding: '10px 20px', 
              backgroundColor: '#4F46E5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onClick={analyzeJobDescription}
          >
            Analyze
          </button>
          
          {keywords.length > 0 && (
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              backgroundColor: '#EFF6FF', 
              borderRadius: '8px',
              border: '1px solid #DBEAFE'
            }}>
              <h3 style={{ fontWeight: '600', color: '#1E40AF', marginBottom: '10px' }}>Identified Keywords:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {keywords.map((keyword, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      backgroundColor: '#DBEAFE', 
                      color: '#1E40AF', 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      fontSize: '14px' 
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '14px', color: '#3B82F6', marginTop: '12px' }}>
                Consider incorporating these keywords into your CV to increase relevance.
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Personal Information',
      description: 'Add your contact details and professional links',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Full Name
              </label>
              <input 
                type="text" 
                name="fullName"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Email
              </label>
              <input 
                type="email" 
                name="email"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., firstname.lastname@gmail.com"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Phone
              </label>
              <input 
                type="tel" 
                name="phone"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Location
              </label>
              <input 
                type="text" 
                name="location"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.location}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., London SW1A"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                LinkedIn URL
              </label>
              <input 
                type="text" 
                name="linkedIn"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.linkedIn}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., linkedin.com/in/yourname"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Portfolio/GitHub URL
              </label>
              <input 
                type="text" 
                name="portfolio"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  outline: 'none'
                }}
                value={sections.personalInfo.portfolio}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., github.com/username"
              />
            </div>
          </div>
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#4B5563'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tips:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '4px' }}>Use a professional email address.</li>
              <li style={{ marginBottom: '4px' }}>Ensure your LinkedIn profile is up-to-date before adding the URL.</li>
              <li>Only include relevant online profiles (GitHub for developers, Behance for designers, etc.).</li>
            </ul>
          </div>
        </div>
      )
    },
    // Continue with other steps (Professional Summary, etc.)
    // For brevity, I'm not including all steps here, but the pattern is the same
  ];
  
  // Navigation buttons
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // CV Preview component
  const CVPreview = ({ sections }) => {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', color: '#333' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            {sections.personalInfo.fullName || 'Your Name'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '14px' }}>
            {sections.personalInfo.email && (
              <span>{sections.personalInfo.email}</span>
            )}
            {sections.personalInfo.phone && (
              <span>{sections.personalInfo.phone}</span>
            )}
            {sections.personalInfo.location && (
              <span>{sections.personalInfo.location}</span>
            )}
          </div>
          {(sections.personalInfo.linkedIn || sections.personalInfo.portfolio) && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '14px', marginTop: '4px' }}>
              {sections.personalInfo.linkedIn && (
                <span>{sections.personalInfo.linkedIn}</span>
              )}
              {sections.personalInfo.portfolio && (
                <span>{sections.personalInfo.portfolio}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Other sections would go here... */}
      </div>
    );
  };
  
  return (
  <div style={{ 
    maxWidth: "1000px", 
    margin: "0 auto", 
    padding: "20px",
    backgroundColor: "white", 
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  }}>
    <h1 style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>UK CV Creator</h1>
    
   <div className="mb-8">
  <div className="flex justify-between mb-2">
    <span className="text-sm text-gray-500">
      Step {activeStep + 1} of {steps.length} ({Math.floor((activeStep + 1) / steps.length * 100)}%)
    </span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full" 
      style={{ width: `${Math.floor((activeStep + 1) / steps.length * 100)}%` }}
    ></div>
  </div>
</div>
        
        {/* Step header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333' }}>
            {steps[activeStep].title}
          </h2>
          <p style={{ color: '#666', marginTop: '4px' }}>
            {steps[activeStep].description}
          </p>
          <div style={{ 
            height: '3px', 
            width: '60px', 
            backgroundColor: '#4F46E5', 
            marginTop: '12px', 
            borderRadius: '2px' 
          }}></div>
        </div>
        
        {/* Step content */}
        <div style={{ marginBottom: '30px' }}>
          {steps[activeStep].content}
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
  <button
    style={{ 
      padding: "10px 20px", 
      backgroundColor: activeStep === 0 ? "#f3f4f6" : "white",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      cursor: activeStep === 0 ? "not-allowed" : "pointer" 
    }}
    onClick={handlePrevious}
    disabled={activeStep === 0}
  >
    Previous
  </button>
  <button
    style={{ 
      padding: "10px 20px", 
      backgroundColor: "#3b82f6", 
      color: "white", 
      border: "none",
      borderRadius: "6px",
      cursor: "pointer" 
    }}
    onClick={handleNext}
    disabled={activeStep === steps.length - 1}
  >
    Next
  </button>
</div>

export default CVCreator;