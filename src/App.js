import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Edit, Download, BookOpen, PlusCircle, Trash2, Save } from 'lucide-react';

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
    {
      title: 'Professional Summary',
      description: 'Write a concise overview of your background and goals',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Professional Summary
            </label>
            <textarea 
              rows="6"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.professionalSummary}
              onChange={handleSummaryChange}
              placeholder="Final-year BSc Psychology student with strong research skills, experienced in SPSS and qualitative analysis from a dissertation on workplace stress. Successfully coordinated a university event, boosting attendance by 30%. Eager to apply analytical abilities in HR analytics roles."
            />
          </div>
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#4B5563'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tips for an effective summary:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '4px' }}>Keep it concise (3-5 sentences).</li>
              <li style={{ marginBottom: '4px' }}>Mention your current academic status or recent graduation.</li>
              <li style={{ marginBottom: '4px' }}>Highlight key skills relevant to the role.</li>
              <li style={{ marginBottom: '4px' }}>Include a standout achievement.</li>
              <li style={{ marginBottom: '4px' }}>Express career goals aligned with the job.</li>
              {keywords.length > 0 && (
                <li style={{ color: '#2563EB' }}>Consider including these keywords: {keywords.slice(0, 3).join(', ')}</li>
              )}
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Education',
      description: 'Detail your academic qualifications',
      content: (
        <div style={{ marginTop: '20px' }}>
          {sections.education.map((edu, index) => (
            <div key={index} style={{ 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Education #{index + 1}</h3>
                {sections.education.length > 1 && (
                  <button 
                    style={{ 
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '16px'
              }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Institution
                  </label>
                  <input 
                    type="text" 
                    name="institution"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="University of Manchester"
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
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Manchester, UK"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Degree
                  </label>
                  <input 
                    type="text" 
                    name="degree"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="BSc Computer Science"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Classification
                  </label>
                  <input 
                    type="text" 
                    name="classification"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.classification}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="2:1 (expected)"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Start Date
                  </label>
                  <input 
                    type="text" 
                    name="startDate"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="09/2020"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    End Date
                  </label>
                  <input 
                    type="text" 
                    name="endDate"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="06/2024"
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Relevant Modules
                  </label>
                  <input 
                    type="text" 
                    name="relevantModules"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.relevantModules}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Data Structures, Machine Learning, Web Development"
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Dissertation/Thesis (if applicable)
                  </label>
                  <input 
                    type="text" 
                    name="dissertation"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={edu.dissertation}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="AI-Driven Marketing Strategies"
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            style={{ 
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0'
            }}
            onClick={addEducation}
          >
            <PlusCircle size={18} style={{ marginRight: '8px' }} /> Add Education
          </button>
          
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
              <li style={{ marginBottom: '4px' }}>List education in reverse chronological order (most recent first).</li>
              <li style={{ marginBottom: '4px' }}>For university education, include relevant modules and your dissertation if applicable.</li>
              <li style={{ marginBottom: '4px' }}>For A-Levels, list subjects and grades (e.g., "A-Level: Maths (A), Biology (B)").</li>
              <li>For GCSEs, a summary is sufficient (e.g., "9 GCSEs A*-C including Maths and English").</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Skills',
      description: 'Highlight your abilities and competencies',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Technical Skills
            </label>
            <textarea 
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.skills.technical}
              onChange={(e) => handleSkillsChange('technical', e)}
              placeholder="Python (Intermediate), Excel (Advanced), Adobe Photoshop, SQL, HTML/CSS"
            />
            {keywords.length > 0 && (
              <p style={{ fontSize: '14px', color: '#2563EB', marginTop: '8px' }}>
                Consider including these technical keywords: {keywords.filter(k => ['python', 'excel', 'javascript', 'data analysis'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Soft Skills
            </label>
            <textarea 
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.skills.soft}
              onChange={(e) => handleSkillsChange('soft', e)}
              placeholder="Team Leadership (Chaired debate club), Problem-Solving, Time Management, Communication"
            />
            {keywords.length > 0 && (
              <p style={{ fontSize: '14px', color: '#2563EB', marginTop: '8px' }}>
                Consider including these soft skills: {keywords.filter(k => ['teamwork', 'communication', 'leadership', 'problem-solving'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Languages
            </label>
            <textarea 
              rows="2"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.skills.languages}
              onChange={(e) => handleSkillsChange('languages', e)}
              placeholder="English (Native), Spanish (Fluent), French (Conversational)"
            />
          </div>
          
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#4B5563'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tips for presenting skills:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '4px' }}>Organize skills into categories for better scannability.</li>
              <li style={{ marginBottom: '4px' }}>Include proficiency levels where applicable.</li>
              <li style={{ marginBottom: '4px' }}>Match skills to job descriptions using industry terms.</li>
              <li style={{ marginBottom: '4px' }}>Be honest about your skill levels.</li>
              <li>Provide brief examples of how you've used key skills.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Experience',
      description: 'Add work experience, internships, and volunteering',
      content: (
        <div style={{ marginTop: '20px' }}>
          {sections.experience.map((exp, index) => (
            <div key={index} style={{ 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Experience #{index + 1}</h3>
                {sections.experience.length > 1 && (
                  <button 
                    style={{ 
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '16px'
              }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Organisation
                  </label>
                  <input 
                    type="text" 
                    name="organisation"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={exp.organisation}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="XYZ Company"
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
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="London, UK"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Job Title
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Marketing Intern"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                      Start Date
                    </label>
                    <input 
                      type="text" 
                      name="startDate"
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="06/2023"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                      End Date
                    </label>
                    <input 
                      type="text" 
                      name="endDate"
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="08/2023 (or Present)"
                    />
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Responsibilities & Achievements
                  </label>
                  <textarea 
                    rows="6"
                    name="responsibilities"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={exp.responsibilities}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="• Designed 5 social media posts weekly, growing engagement by 20%.
- Conducted research on competitor strategies, identifying 3 key market opportunities.
- Collaborated with a team of 4 to develop a new marketing campaign, resulting in a 15% increase in website traffic."
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            style={{ 
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0'
            }}
            onClick={addExperience}
          >
            <PlusCircle size={18} style={{ marginRight: '8px' }} /> Add Experience
          </button>
          
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#4B5563'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tips for presenting experience:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '4px' }}>Use the STAR method (Situation-Task-Action-Result) for bullet points.</li>
              <li style={{ marginBottom: '4px' }}>Focus on achievements rather than just listing duties.</li>
              <li style={{ marginBottom: '4px' }}>Quantify results where possible (e.g., "increased," "reduced," "improved by X%").</li>
              <li style={{ marginBottom: '4px' }}>Include part-time jobs, internships, placements, or volunteering.</li>
              <li>Use active verbs to start each bullet point (e.g., "Developed," "Led," "Improved").</li>
              {keywords.length > 0 && (
                <li style={{ color: '#2563EB' }}>Try to include these keywords in your descriptions: {keywords.slice(0, 3).join(', ')}</li>
              )}
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Projects',
      description: 'Showcase academic or personal projects',
      content: (
        <div style={{ marginTop: '20px' }}>
          {sections.projects.map((project, index) => (
            <div key={index} style={{ 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Project #{index + 1}</h3>
                {sections.projects.length > 1 && (
                  <button 
                    style={{ 
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Project Title
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Sustainable Campus Initiative"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Description
                  </label>
                  <textarea 
                    rows="3"
                    name="description"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Led a team of 4 peers to design and implement a waste reduction plan for the university campus."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Skills Utilized/Gained
                  </label>
                  <input 
                    type="text" 
                    name="skills"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={project.skills}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Project management, data analysis, collaboration, presentation skills"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Results/Outcomes
                  </label>
                  <textarea 
                    rows="2"
                    name="results"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    value={project.results}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Developed a plan that reduced bin usage by 15% using survey data. Presented findings to the university sustainability committee."
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            style={{ 
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0'
            }}
            onClick={addProject}
          >
            <PlusCircle size={18} style={{ marginRight: '8px' }} /> Add Project
          </button>
          
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#F9FAFB', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#4B5563'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tips for showcasing projects:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '4px' }}>Include academic projects, dissertation work, or personal initiatives.</li>
              <li style={{ marginBottom: '4px' }}>Highlight your specific role if it was a group project.</li>
              <li style={{ marginBottom: '4px' }}>Emphasize the skills you gained or demonstrated.</li>
              <li style={{ marginBottom: '4px' }}>Quantify results where possible.</li>
              <li>Link to GitHub repositories or live projects if applicable.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Additional Information',
      description: 'Add certifications, extracurriculars, and awards',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Certifications & Courses
            </label>
            <textarea 
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.additional.certifications}
              onChange={(e) => handleAdditionalChange('certifications', e)}
              placeholder="• Google Analytics Certified, 2024
- Microsoft Excel Expert Certification, 2023
- Introduction to Python Programming, Coursera, 2022"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Extracurricular Activities
            </label>
            <textarea 
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.additional.extracurricular}
              onChange={(e) => handleAdditionalChange('extracurricular', e)}
              placeholder="• Treasurer, Drama Society – Managed £500 budget for productions
- Captain of University Tennis Team, 2022-2023
- Student Representative for Computer Science Department"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Awards & Honors
            </label>
            <textarea 
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none'
              }}
              value={sections.additional.awards}
              onChange={(e) => handleAdditionalChange('awards', e)}
              placeholder="• Dean's List, 2023
- First Place, University Hackathon, 2022
- Department Scholarship for Academic Excellence"
            />
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
              <li style={{ marginBottom: '4px' }}>Include only relevant certifications and activities that showcase valuable skills.</li>
              <li style={{ marginBottom: '4px' }}>For extracurriculars, highlight leadership roles and responsibilities.</li>
              <li style={{ marginBottom: '4px' }}>Include dates for certifications and activities when possible.</li>
              <li>Be selective - focus on quality over quantity.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Review & Download',
      description: 'Preview your CV and download a formatted copy',
      content: (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px' 
          }}>
            <h3 style={{ fontWeight: '600', fontSize: '18px' }}>CV Preview</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={togglePreview}
              >
                {cvPreview ? <Edit size={18} /> : <BookOpen size={18} />}
                {cvPreview ? 'Edit' : 'Preview'}
              </button>
              <button 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>
          
          {cvPreview ? (
            <div style={{ 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px', 
              padding: '32px', 
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CVPreview sections={sections} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#F9FAFB'
              }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>CV Formatting Tips</h3>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '14px', color: '#4B5563' }}>
                  <li style={{ marginBottom: '4px' }}>Use a clean, professional font like Arial, Calibri, or Times New Roman.</li>
                  <li style={{ marginBottom: '4px' }}>Maintain consistent formatting (headings, bullet points, dates).</li>
                  <li style={{ marginBottom: '4px' }}>Keep your CV to 1-2 pages for entry-level positions.</li>
                  <li style={{ marginBottom: '4px' }}>Use subtle highlighting (bold, italics) for important information.</li>
                  <li>Ensure good spacing and margins for readability.</li>
                </ul>
              </div>
              
              <div style={{ 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#F9FAFB'
              }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>Final Checks</h3>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '14px', color: '#4B5563' }}>
                  <li style={{ marginBottom: '4px' }}>Proofread for spelling and grammar errors.</li>
                  <li style={{ marginBottom: '4px' }}>Verify that all dates and information are accurate.</li>
                  <li style={{ marginBottom: '4px' }}>Ensure contact information is up-to-date.</li>
                  <li style={{ marginBottom: '4px' }}>Check that all links (LinkedIn, portfolio) are working.</li>
                  <li>Tailor your CV to each job application.</li>
                  {keywords.length > 0 && (
                    <li style={{ color: '#2563EB' }}>Verify you've included key terms from the job description: {keywords.slice(0, 5).join(', ')}</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    }
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
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px', 
            fontSize: '14px' 
          }}>
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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '12px', 
              fontSize: '14px', 
              marginTop: '4px' 
            }}>
              {sections.personalInfo.linkedIn && (
                <span>{sections.personalInfo.linkedIn}</span>
              )}
              {sections.personalInfo.portfolio && (
                <span>{sections.personalInfo.portfolio}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Professional Summary */}
        {sections.professionalSummary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Professional Summary
            </h2>
            <p>{sections.professionalSummary}</p>
          </div>
        )}
        
        {/* Education */}
        {sections.education[0]?.institution && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Education
            </h2>
            {sections.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <span style={{ fontWeight: '600' }}>{edu.institution}</span>
                    {edu.location && <span>, {edu.location}</span>}
                  </div>
                  <div>
                    {edu.startDate && edu.endDate && (
                      <span>{edu.startDate} - {edu.endDate}</span>
                    )}
                  </div>
                </div>
                <div>
                  <span>{edu.degree}</span>
                  {edu.classification && <span>, {edu.classification}</span>}
                </div>
                {edu.relevantModules && (
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontStyle: 'italic' }}>Relevant Modules:</span> {edu.relevantModules}
                  </div>
                )}
                {edu.dissertation && (
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontStyle: 'italic' }}>Dissertation:</span> {edu.dissertation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {(sections.skills.technical || sections.skills.soft || sections.skills.languages) && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Skills
            </h2>
            {sections.skills.technical && (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>Technical Skills:</span> {sections.skills.technical}
              </div>
            )}
            {sections.skills.soft && (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>Soft Skills:</span> {sections.skills.soft}
              </div>
            )}
            {sections.skills.languages && (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>Languages:</span> {sections.skills.languages}
              </div>
            )}
          </div>
        )}
        
        {/* Experience */}
        {sections.experience[0]?.organisation && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Experience
            </h2>
            {sections.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <span style={{ fontWeight: '600' }}>{exp.organisation}</span>
                    {exp.location && <span>, {exp.location}</span>}
                  </div>
                  <div>
                    {exp.startDate && exp.endDate && (
                      <span>{exp.startDate} - {exp.endDate}</span>
                    )}
                  </div>
                </div>
                <div style={{ fontWeight: '600' }}>{exp.title}</div>
                <div style={{ 
                  fontSize: '14px',
                  whiteSpace: 'pre-line'
                }}>
                  {exp.responsibilities}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Projects */}
        {sections.projects[0]?.title && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Projects
            </h2>
            {sections.projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: '600' }}>{project.title}</div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>{project.description}</div>
                {project.skills && (
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontStyle: 'italic' }}>Skills:</span> {project.skills}
                  </div>
                )}
                {project.results && (
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontStyle: 'italic' }}>Results:</span> {project.results}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Additional */}
        {(sections.additional.certifications || sections.additional.extracurricular || sections.additional.awards) && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '4px', 
              marginBottom: '8px' 
            }}>
              Additional Information
            </h2>
            {sections.additional.certifications && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '600' }}>Certifications & Courses</div>
                <div style={{ 
                  fontSize: '14px',
                  whiteSpace: 'pre-line'
                }}>
                  {sections.additional.certifications}
                </div>
              </div>
            )}
            {sections.additional.extracurricular && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '600' }}>Extracurricular Activities</div>
                <div style={{ 
                  fontSize: '14px',
                  whiteSpace: 'pre-line'
                }}>
                  {sections.additional.extracurricular}
                </div>
              </div>
            )}
            {sections.additional.awards && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '600' }}>Awards & Honors</div>
                <div style={{ 
                  fontSize: '14px',
                  whiteSpace: 'pre-line'
                }}>
                  {sections.additional.awards}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa', 
      padding: '20px' 
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)', 
        padding: '30px' 
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#333' 
        }}>UK CV Creator</h1>
        
        {/* Progress tracking */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '8px' 
          }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>
              Step {activeStep + 1} of {steps.length}
            </span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>
              {Math.floor((activeStep + 1) / steps.length * 100)}% Complete
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#E5E7EB', 
            borderRadius: '4px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.floor((activeStep + 1) / steps.length * 100)}%`, 
              backgroundColor: '#2563EB', 
              borderRadius: '4px', 
              transition: 'width 0.3s ease' 
            }}></div>
          </div>
        </div>
        
        {/* Step header */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#1F2937' }}>
            {steps[activeStep].title}
          </h2>
          <p style={{ color: '#4B5563', marginTop: '4px' }}>
            {steps[activeStep].description}
          </p>
          <div style={{ 
            height: '3px', 
            width: '60px', 
            backgroundColor: '#2563EB', 
            marginTop: '12px', 
            borderRadius: '2px' 
          }}></div>
        </div>
        
        {/* Step content */}
        <div style={{ marginBottom: '30px' }}>
          {steps[activeStep].content}
        </div>
        
        {/* Navigation buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '30px' 
        }}>
          <button
            style={{ 
              padding: '12px 20px', 
              backgroundColor: activeStep === 0 ? '#F3F4F6' : 'white', 
              color: activeStep === 0 ? '#9CA3AF' : '#111827', 
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={handlePrevious}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
            style={{ 
              padding: '12px 20px', 
              backgroundColor: '#2563EB', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVCreator;