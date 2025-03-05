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
    // Add other steps here...
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
          <h1 className="text-2xl font-bold mb-1">{sections.personalInfo.fullName || 'Your Name'}</h1>
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
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8">UK CV Creator</h1>
        
        {/* Progress tracking */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Step {activeStep + 1} of {steps.length} ({Math.floor((activeStep + 1) / steps.length * 100)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.floor((activeStep + 1) / steps.length * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{steps[activeStep].title}</h2>
          <p className="text-gray-600">{steps[activeStep].description}</p>
        </div>
        
        {/* Step content */}
        <div className="mb-8">
          {steps[activeStep].content}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            onClick={handlePrevious}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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