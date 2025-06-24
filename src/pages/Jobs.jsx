import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import './Jobs.css';

const dummyJobs = [
  {
    id: 1,
    company: 'TechNova Inc.',
    role: 'Frontend Developer',
    type: 'Full-time',
    description: 'Join our UI team to build stunning web apps using React and Tailwind.'
  },
  {
    id: 2,
    company: 'CloudBase Co.',
    role: 'Backend Developer',
    type: 'Remote',
    description: 'Work on our scalable cloud platform using Node.js and MongoDB.'
  },
  {
    id: 3,
    company: 'CyberEdge',
    role: 'DevOps Engineer',
    type: 'Internship',
    description: 'Assist in automation, CI/CD pipelines and cloud deployment.'
  }
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [cv, setCv] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cv) {
      setFormSubmitted(true);
    } else {
      alert("Please upload your CV before submitting.");
    }
  };

  const filteredJobs = dummyJobs.filter(job =>
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='jobs-main'>
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-container">
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="job-cards">
          {filteredJobs.map(job => (
            <div key={job.id} className="job-card" onClick={() => {
              setSelectedJob(job);
              setShowApplyForm(false);
              setFormSubmitted(false);
              setCv(null);
            }}>
              <h3>{job.role}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <button>Apply</button>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="job-detail">
            <h2>{selectedJob.role}</h2>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p>{selectedJob.description}</p>

            {!showApplyForm && !formSubmitted && (
              <button onClick={() => setShowApplyForm(true)}>Apply</button>
            )}

            {showApplyForm && !formSubmitted && (
              <form onSubmit={handleSubmit} className="apply-form">
                <label>Upload your CV (PDF only):</label>
                <input type="file" accept=".pdf" onChange={handleFileChange} required />
                <button type="submit">Submit</button>
              </form>
            )}

            {formSubmitted && (
              <p className="success-message">Application sent successfully!</p>
            )}
          </div>
        )}
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default Jobs;
