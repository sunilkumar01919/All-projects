import React, { useState } from 'react';
import axios from 'axios';
import { Table, Checkbox, Button } from '@mui/material';


const CompanyForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      alert('Data scraped and saved');
    } catch (error) {
      alert('Error scraping data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='scrapingmydata'>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Domain Name"
          required
           className = 'datamybutton-input '
        />
        <Button className = 'datamybutton 'variant="contained" color="primary" type="submit"size='small' disabled={loading} >
        {loading ? 'Scraping...' : 'Fetch & Save Details'}
        </Button>
      </form>
    </div>
  );
};

export default CompanyForm;
