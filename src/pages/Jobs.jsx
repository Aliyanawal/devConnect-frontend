import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [cv, setCv] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs/getAll')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cv) {
      alert("Please upload your CV before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to apply for a job.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cv", cv); // 👈 Should match backend field name

      const res = await fetch(`http://localhost:5000/api/application/apply/${selectedJob._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type manually here
        },
        body: formData,
      });

      let data;
      try {
        data = await res.json(); // Safely parse JSON
      } catch (jsonErr) {
        console.error("Invalid JSON response:", jsonErr);
        throw new Error("Server returned invalid response.");
      }

      if (res.ok) {
        setFormSubmitted(true);
        setFeedback("Application sent successfully!");
      } else {
        console.error("Backend responded with:", data);
        setFeedback(data.message || "Failed to apply.");
      }

    } catch (error) {
      console.error("Catch block error:", error);
      setFeedback("Something went wrong. Try again later.");
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='jobs-main'>
      
      <div className="jobs-container">
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="jobs-layout">
          {/* Left Column: Job Cards */}
          <div className="job-list">
            {filteredJobs.map(job => (
              <div
                key={job._id}
                className="job-card"
                onClick={() => {
                  setSelectedJob(job);
                  setShowApplyForm(false);
                  setFormSubmitted(false);
                  setCv(null);
                  setFeedback('');
                }}
              >
                <h3>{job.role}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <button>Apply</button>
              </div>
            ))}
          </div>

          {/* Right Column: Selected Job Details */}
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
                <p className="success-message">{feedback}</p>
              )}

              {!formSubmitted && feedback && (
                <p className="error-message" style={{ color: 'red' }}>{feedback}</p>
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
