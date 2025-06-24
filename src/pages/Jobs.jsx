// src/pages/Jobs.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = dummyJobs.filter(job =>
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
            <div key={job.id} className="job-card" onClick={() => setSelectedJob(job)}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
