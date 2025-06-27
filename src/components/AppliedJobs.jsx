// components/AppliedJobs.jsx
import React, { useEffect, useState } from 'react';
import './AppliedJobs.css'

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/application/applied', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setAppliedJobs(data || []);
      } catch (err) {
        console.error('Error fetching applied jobs:', err);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="applied-jobs">
      <h3>Applied Jobs</h3>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <ul>
          {appliedJobs.map(job => (
            <li key={job._id} style={{ marginBottom: '1rem' }}>
              <strong>{job.role}</strong> at <em>{job.company}</em><br />
              Status: <span style={{ color: job.status === 'Pending' ? 'orange' : 'green' }}>
                {job.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;
