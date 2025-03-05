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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <textarea 
              rows="8"
              className="w-full p-2 border rounded"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
          <button 
            className="bg-blue-600 text-white rounded px-4 py-2"
            onClick={analyzeJobDescription}
          >
            Analyze
          </button>
          
          {keywords.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Identified Keywords:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
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
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                className="w-full p-2 border rounded"
                value={sections.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
                value={sections.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                type="text" 
                name="location"
                className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
                value={sections.personalInfo.portfolio}
                onChange={handlePersonalInfoChange}
                placeholder="e.g., github.com/username"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Professional Summary</label>
            <textarea 
              rows="6"
              className="w-full p-2 border rounded"
              value={sections.professionalSummary}
              onChange={handleSummaryChange}
              placeholder="Final-year BSc Psychology student with strong research skills, experienced in SPSS and qualitative analysis from a dissertation on workplace stress. Successfully coordinated a university event, boosting attendance by 30%. Eager to apply analytical abilities in HR analytics roles."
            />
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Tips for an effective summary:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep it concise (3-5 sentences).</li>
              <li>Mention your current academic status or recent graduation.</li>
              <li>Highlight key skills relevant to the role.</li>
              <li>Include a standout achievement.</li>
              <li>Express career goals aligned with the job.</li>
              {keywords.length > 0 && (
                <li className="text-blue-600">Consider including these keywords: {keywords.slice(0, 3).join(', ')}</li>
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
            <div key={index} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Education #{index + 1}</h3>
                {sections.education.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700" 
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
                    value={edu.dissertation}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="AI-Driven Marketing Strategies"
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            className="flex items-center text-blue-600 hover:text-blue-800" 
            onClick={addEducation}
          >
            <PlusCircle size={18} className="mr-1" /> Add Education
          </button>
          
          <div className="text-sm text-gray-600 mt-2">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Technical Skills</label>
            <textarea 
              rows="3"
              className="w-full p-2 border rounded"
              value={sections.skills.technical}
              onChange={(e) => handleSkillsChange('technical', e)}
              placeholder="Python (Intermediate), Excel (Advanced), Adobe Photoshop, SQL, HTML/CSS"
            />
            {keywords.length > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                Consider including these technical keywords: {keywords.filter(k => ['python', 'excel', 'javascript', 'data analysis'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Soft Skills</label>
            <textarea 
              rows="3"
              className="w-full p-2 border rounded"
              value={sections.skills.soft}
              onChange={(e) => handleSkillsChange('soft', e)}
              placeholder="Team Leadership (Chaired debate club), Problem-Solving, Time Management, Communication"
            />
            {keywords.length > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                Consider including these soft skills: {keywords.filter(k => ['teamwork', 'communication', 'leadership', 'problem-solving'].includes(k.toLowerCase())).join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Languages</label>
            <textarea 
              rows="2"
              className="w-full p-2 border rounded"
              value={sections.skills.languages}
              onChange={(e) => handleSkillsChange('languages', e)}
              placeholder="English (Native), Spanish (Fluent), French (Conversational)"
            />
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="font-medium">Tips for presenting skills:</p>
            <ul className="list-disc pl-5 space-y-1">
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
            <div key={index} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                {sections.experience.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700" 
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                      className="w-full p-2 border rounded"
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
                      className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
            className="flex items-center text-blue-600 hover:text-blue-800" 
            onClick={addExperience}
          >
            <PlusCircle size={18} className="mr-1" /> Add Experience
          </button>
          
          <div className="text-sm text-gray-600 mt-2">
            <p className="font-medium">Tips for presenting experience:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the STAR method (Situation-Task-Action-Result) for bullet points.</li>
              <li>Focus on achievements rather than just listing duties.</li>
              <li>Quantify results where possible (e.g., "increased," "reduced," "improved by X%").</li>
              <li>Include part-time jobs, internships, placements, or volunteering.</li>
              <li>Use active verbs to start each bullet point (e.g., "Developed," "Led," "Improved").</li>
              {keywords.length > 0 && (
                <li className="text-blue-600">Try to include these keywords in your descriptions: {keywords.slice(0, 3).join(', ')}</li>
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
            <div key={index} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Project #{index + 1}</h3>
                {sections.projects.length > 1 && (
                  <button 
                    className="text-red-500 hover:text-red-700" 
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
                    value={project.results}
                    onChange={(e) => handleProjectChange(index, e)}
                    placeholder="Developed a plan that reduced bin usage by 15% using survey data. Presented findings to the university sustainability committee."
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            className="flex items-center text-blue-600 hover:text-blue-800" 
            onClick={addProject}
          >
            <PlusCircle size={18} className="mr-1" /> Add Project
          </button>
          
          <div className="text-sm text-gray-600 mt-2">
            <p className="font-medium">Tips for showcasing projects:</p>
            <ul className="list-disc pl-5 space-y-1">
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Certifications & Courses</label>
            <textarea 
              rows="3"
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              value={sections.additional.extracurricular}
              onChange={(e) => handleAdditionalChange('extracurricular', e)}
              placeholder="• Treasurer, Drama Society – Managed £500 budget for productions
- Captain of University Tennis Team, 2022-2023
- Student Representative for Computer Science Department"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Awards & Honors