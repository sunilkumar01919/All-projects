import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/companies/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchCompanyDetails();
  }, [id]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div className="company-details">
      <h2>{company.name}</h2>
      <div>
        <img src={company.logo} alt={company.name} width="100" height="100" />
        <p>{company.description}</p>
      </div>
      <div>
        <h4>Website Information:</h4>
        <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
        <p><strong>Category:</strong> {company.category}</p>
        <p><strong>Address:</strong> {company.address}</p>
        <p><strong>Phone:</strong> {company.phone}</p>
      </div>
      <div>
        <h4>Social Media:</h4>
        <p><strong>Facebook:</strong> <a href={company.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></p>
        <p><strong>Twitter:</strong> <a href={company.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></p>
        <p><strong>LinkedIn:</strong> <a href={company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </div>
    </div>
  );
};

export default CompanyDetails;
