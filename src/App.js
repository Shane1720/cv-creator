import './CVCreator.css';
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
  
  // Function to parse CSV data
  const parseCSV = (csvText) => {
    try {
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      
      const result = [];
      for(let i = 1; i < lines.length; i++) {
        if(!lines[i].trim()) continue; // Skip empty lines
        
        const values = lines[i].split(',');
        const entry = {};
        
        headers.forEach((header, index) => {
          entry[header.trim()] = values[index]?.trim() || '';
        });
        
        result.push(entry);
      }
      
      return result;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      return [];
    }
  };
  
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <textarea 
              rows="8"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
          <button 
            className="px-5 py-2.5 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-colors"
            onClick={analyzeJobDescription}
          >
            Analyze
          </button>
          
          {keywords.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800">Identified Keywords:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-sm text-blue-700 mt-2">
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., firstname.lastname@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input 
                type="tel" 
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                type="text" 
                name="location"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.location}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., London SW1A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input 
                type="text" 
                name="linkedIn"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.linkedIn}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., linkedin.com/in/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Portfolio/GitHub URL</label>
              <input 
                type="text" 
                name="portfolio"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={sections.personalInfo.portfolio}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., github.com/username"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Use a professional email address.</li>
              <li>Ensure your LinkedIn profile is up-to-date before adding the URL.</li>
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
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Professional Summary</label>
            <textarea 
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.professionalSummary}
              onChange={handleSummaryChange}
              placeholder="Final-year BSc Psychology student with strong research skills, experienced in SPSS and qualitative analysis from a dissertation on workplace stress. Successfully coordinated a university event, boosting attendance by 30%. Eager to apply analytical abilities in HR analytics roles."
            />
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Tips for an effective summary:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Keep it concise (3-5 sentences).</li>
              <li>Mention your current academic status or recent graduation.</li>
              <li>Highlight key skills relevant to the role.</li>
              <li>Include a standout achievement.</li>
              <li>Express career goals aligned with the job.</li>
              {keywords.length > 0 && (
                <li className="text-blue-700">Consider including these keywords: {keywords.slice(0, 3).join(', ')}</li>
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
        <div className="space-y-6">
          {sections.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg text-gray-800">Education #{index + 1}</h3>
                {sections.education.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors" 
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Institution</label>
                  <input 
                    type="text" 
                    name="institution"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="University of Manchester"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Manchester, UK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <input 
                    type="text" 
                    name="degree"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="BSc Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Classification</label>
                  <input 
                    type="text" 
                    name="classification"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.classification}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="2:1 (expected)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input 
                    type="text" 
                    name="startDate"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="09/2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input 
                    type="text" 
                    name="endDate"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="06/2024"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Relevant Modules</label>
                  <input 
                    type="text" 
                    name="relevantModules"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.relevantModules}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Data Structures, Machine Learning, Web Development"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Dissertation/Thesis (if applicable)</label>
                  <input 
                    type="text" 
                    name="dissertation"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={edu.dissertation}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="AI-Driven Marketing Strategies"
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium mt-2" 
            onClick={addEducation}
          >
            <PlusCircle size={18} className="mr-1" /> Add Education
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>List education in reverse chronological order (most recent first).</li>
              <li>For university education, include relevant modules and your dissertation if applicable.</li>
              <li>For A-Levels, list subjects and grades (e.g., "A-Level: Maths (A), Biology (B)").</li>
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
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Technical Skills</label>
            <textarea 
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.skills.technical}
              onChange={(e) => handleSkillsChange('technical', e)}
              placeholder="Python (Intermediate), Excel (Advanced), Adobe Photoshop, SQL, HTML/CSS"
            />
            {keywords.length > 0 && (
              <p className="text-sm text-blue-700 mt-1">
                Consider including these technical keywords: {keywords.filter(k => ['python', 'excel', 'javascript', 'data analysis'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Soft Skills</label>
            <textarea 
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.skills.soft}
              onChange={(e) => handleSkillsChange('soft', e)}
              placeholder="Team Leadership (Chaired debate club), Problem-Solving, Time Management, Communication"
            />
            {keywords.length > 0 && (
              <p className="text-sm text-blue-700 mt-1">
                Consider including these soft skills: {keywords.filter(k => ['teamwork', 'communication', 'leadership', 'problem-solving'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Languages</label>
            <textarea 
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.skills.languages}
              onChange={(e) => handleSkillsChange('languages', e)}
              placeholder="English (Native), Spanish (Fluent), French (Conversational)"
            />
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Tips for presenting skills:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Organize skills into categories for better scannability.</li>
              <li>Include proficiency levels where applicable.</li>
              <li>Match skills to job descriptions using industry terms.</li>
              <li>Be honest about your skill levels.</li>
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
        <div className="space-y-6">
          {sections.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg text-gray-800">Experience #{index + 1}</h3>
                {sections.experience.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors" 
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Organisation</label>
                  <input 
                    type="text" 
                    name="organisation"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={exp.organisation}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="XYZ Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="London, UK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input 
                    type="text" 
                    name="title"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Marketing Intern"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input 
                      type="text" 
                      name="startDate"
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="06/2023"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input 
                      type="text" 
                      name="endDate"
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="08/2023 (or Present)"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Responsibilities & Achievements</label>
                  <textarea 
                    rows="6"
                    name="responsibilities"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium mt-2" 
            onClick={addExperience}
          >
            <PlusCircle size={18} className="mr-1" /> Add Experience
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <p className="font-medium">Tips for presenting experience:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Use the STAR method (Situation-Task-Action-Result) for bullet points.</li>
              <li>Focus on achievements rather than just listing duties.</li>
              <li>Quantify results where possible (e.g., "increased," "reduced," "improved by X%").</li>
              <li>Include part-time jobs, internships, placements, or volunteering.</li>
              <li>Use active verbs to start each bullet point (e.g., "Developed," "Led," "Improved").</li>
              {keywords.length > 0 && (
                <li className="text-blue-700">Try to include these keywords in your descriptions: {keywords.slice(0, 3).join(', ')}</li>
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
        <div className="space-y-6">
          {sections.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg text-gray-800">Project #{index + 1}</h3>
                {sections.projects.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors" 
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Title</label>
                  <input 
                    type="text" 
                    name="title"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Sustainable Campus Initiative"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    rows="3"
                    name="description"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Led a team of 4 peers to design and implement a waste reduction plan for the university campus."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills Utilized/Gained</label>
                  <input 
                    type="text" 
                    name="skills"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={project.skills}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Project management, data analysis, collaboration, presentation skills"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Results/Outcomes</label>
                  <textarea 
                    rows="2"
                    name="results"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={project.results}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Developed a plan that reduced bin usage by 15% using survey data. Presented findings to the university sustainability committee."
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium mt-2" 
            onClick={addProject}
          >
            <PlusCircle size={18} className="mr-1" /> Add Project
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <p className="font-medium">Tips for showcasing projects:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Include academic projects, dissertation work, or personal initiatives.</li>
              <li>Highlight your specific role if it was a group project.</li>
              <li>Emphasize the skills you gained or demonstrated.</li>
              <li>Quantify results where possible.</li>
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
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Certifications & Courses</label>
            <textarea 
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.additional.certifications}
              onChange={(e) => handleAdditionalChange('certifications', e)}
              placeholder="• Google Analytics Certified, 2024
- Microsoft Excel Expert Certification, 2023
- Introduction to Python Programming, Coursera, 2022"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Extracurricular Activities</label>
            <textarea 
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.additional.extracurricular}
              onChange={(e) => handleAdditionalChange('extracurricular', e)}
              placeholder="• Treasurer, Drama Society – Managed £500 budget for productions
- Captain of University Tennis Team, 2022-2023
- Student Representative for Computer Science Department"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Awards & Honors</label>
            <textarea 
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={sections.additional.awards}
              onChange={(e) => handleAdditionalChange('awards', e)}
              placeholder="• Dean's List, 2023
- First Place, University Hackathon, 2022
- Department Scholarship for Academic Excellence"
            />
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Include only relevant certifications and activities that showcase valuable skills.</li>
              <li>For extracurriculars, highlight leadership roles and responsibilities.</li>
              <li>Include dates for certifications and activities when possible.</li>
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg text-gray-800">CV Preview</h3>
            <div className="flex space-x-3">
              <button 
                className="flex items-center px-4 py-2 border border-blue-600 text-blue-700 rounded-md font-medium hover:bg-blue-50 transition-colors"
                onClick={togglePreview}
              >
                {cvPreview ? <Edit size={18} className="mr-2"/> : <BookOpen size={18} className="mr-2"/>}
                {cvPreview ? 'Edit CV' : 'Preview CV'}
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
                <Download size={18} className="mr-2"/>
                Download PDF
              </button>
            </div>
          </div>
          
          {cvPreview ? (
            <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-md">
              <CVPreview sections={sections} />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <h3 className="font-medium text-gray-800 mb-3">CV Formatting Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Use a clean, professional font like Arial, Calibri, or Times New Roman.</li>
                  <li>Maintain consistent formatting (headings, bullet points, dates).</li>
                  <li>Keep your CV to 1-2 pages for entry-level positions.</li>
                  <li>Use subtle highlighting (bold, italics) for important information.</li>
                  <li>Ensure good spacing and margins for readability.</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <h3 className="font-medium text-gray-800 mb-3">Final Checks</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Proofread for spelling and grammar errors.</li>
                  <li>Verify that all dates and information are accurate.</li>
                  <li>Ensure contact information is up-to-date.</li>
                  <li>Check that all links (LinkedIn, portfolio) are working.</li>
                  <li>Tailor your CV to each job application.</li>
                  {keywords.length > 0 && (
                    <li className="text-blue-700">Verify you've included key terms from the job description: {keywords.slice(0, 5).join(', ')}</li>
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
      <div className="font-sans max-w-3xl mx-auto text-gray-800">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{sections.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap justify-center gap-x-3 text-sm">
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
            <div className="flex flex-wrap justify-center gap-x-3 text-sm mt-1">
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
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
            <p>{sections.professionalSummary}</p>
          </div>
        )}
        
        {/* Education */}
        {sections.education[0]?.institution && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
            {sections.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{edu.institution}</span>
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
                  <div className="text-sm">
                    <span className="italic">Relevant Modules:</span> {edu.relevantModules}
                  </div>
                )}
                {edu.dissertation && (
                  <div className="text-sm">
                    <span className="italic">Dissertation:</span> {edu.dissertation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {(sections.skills.technical || sections.skills.soft || sections.skills.languages) && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
            {sections.skills.technical && (
              <div className="mb-2">
                <span className="font-medium">Technical Skills:</span> {sections.skills.technical}
              </div>
            )}
            {sections.skills.soft && (
              <div className="mb-2">
                <span className="font-medium">Soft Skills:</span> {sections.skills.soft}
              </div>
            )}
            {sections.skills.languages && (
              <div className="mb-2">
                <span className="font-medium">Languages:</span> {sections.skills.languages}
              </div>
            )}
          </div>
        )}
        
        {/* Experience */}
        {sections.experience[0]?.organisation && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h2>
            {sections.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{exp.organisation}</span>
                    {exp.location && <span>, {exp.location}</span>}
                  </div>
                  <div>
                    {exp.startDate && exp.endDate && (
                      <span>{exp.startDate} - {exp.endDate}</span>
                    )}
                  </div>
                </div>
                <div className="font-medium">{exp.title}</div>
                <div className="whitespace-pre-line text-sm">
                  {exp.responsibilities}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Projects */}
        {sections.projects[0]?.title && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h2>
            {sections.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <div className="font-medium">{project.title}</div>
                <div className="text-sm mb-1">{project.description}</div>
                {project.skills && (
                  <div className="text-sm">
                    <span className="italic">Skills:</span> {project.skills}
                  </div>
                )}
                {project.results && (
                  <div className="text-sm">
                    <span className="italic">Results:</span> {project.results}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Additional */}
        {(sections.additional.certifications || sections.additional.extracurricular || sections.additional.awards) && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Additional Information</h2>
            {sections.additional.certifications && (
              <div className="mb-2">
                <div className="font-medium">Certifications & Courses</div>
                <div className="whitespace-pre-line text-sm">{sections.additional.certifications}</div>
              </div>
            )}
            {sections.additional.extracurricular && (
              <div className="mb-2">
                <div className="font-medium">Extracurricular Activities</div>
                <div className="whitespace-pre-line text-sm">{sections.additional.extracurricular}</div>
              </div>
            )}
            {sections.additional.awards && (
              <div className="mb-2">
                <div className="font-medium">Awards & Honors</div>
                <div className="whitespace-pre-line text-sm">{sections.additional.awards}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">UK CV Creator</h1>
        
        {/* Progress tracking */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {activeStep + 1} of {steps.length}</span>
            <span>Step {activeStep + 1} of {steps.length} ({parseInt(((activeStep + 1) / steps.length) * 100)}% Complete)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-700 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">{steps[activeStep].title}</h2>
          <p className="text-gray-600 mt-1">{steps[activeStep].description}</p>
          <div className="h-1 w-20 bg-blue-700 mt-2 rounded-full"></div>
        </div>
        
        {/* Step content */}
        <div className="mb-8">
          {steps[activeStep].content}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <button
            className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            onClick={handlePrevious}
            disabled={activeStep === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
          <button
            className="px-5 py-2.5 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-colors flex items-center"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVCreator;