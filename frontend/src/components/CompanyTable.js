import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get('http://localhost:5000/api/companies');
      setCompanies(response.data);
    };
    fetchCompanies();
  }, []);
  console.log(companies, 'companiescompanies')
  const handleDelete = async () => {
    if (selectedIds.length > 0) {
      await axios.delete('http://localhost:5000/api/companies', {
        data: { ids: selectedIds },
      });
      setCompanies(companies.filter((company) => !selectedIds.includes(company._id)));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((id) => id !== id) : [...prevIds, id]
    );
    setSelectedIds([...selectedIds, id]);


  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/download-csv', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'scraped-data.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };


  return (
    <div>
      <table>
        <thead className="m-3">
          <tr>
            <th>{selectedIds.length} Select</th>
            <th> <Button variant="outlined" size="small" onClick={handleDelete}>
              Delete
            </Button></th>
            <th> <Button variant="outlined" size="small" onClick={handleDownloadCSV}>CSV
            </Button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th></th>
            <th className="my-4">Company</th>
            <th> Socail profiles</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(company._id)}
                  onChange={() => handleCheckboxChange(company._id)}
                />
              </td>


              <td>
                <img src={company.logo} alt="" width="50" height="50" />
                {company.name.split(' ')[0]}
              </td>
              <td>
                <a href={company.facebook}target='_blank'>
                  <svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22,3V21a1,1,0,0,1-1,1H15.8V14.255h2.6l.39-3.018H15.8V9.309c0-.874.242-1.469,1.5-1.469h1.6V5.14a21.311,21.311,0,0,0-2.329-.119A3.636,3.636,0,0,0,12.683,9.01v2.227H10.076v3.018h2.607V22H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H21A1,1,0,0,1,22,3Z" />
                  </svg>
                </a>
                <a href={company.twitter} target='_blank'>
                  <img width="30px" height="30px" src="data:image/svg+xml,%3Csvg%20fill%3D%22%23000000%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20id%3D%22twitter%22%20data-name%3D%22Line%20Color%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22icon%20line-color%22%3E%3Cpath%20id%3D%22primary%22%20d%3D%22M18.94%2C7.91A3.49%2C3.49%2C0%2C0%2C0%2C12%2C8.17C8.46%2C9.63%2C5%2C6%2C5%2C6c-1%2C6%2C2%2C8.75%2C2%2C8.75C5.64%2C16%2C3%2C16%2C3%2C16s1.58%2C3%2C8.58%2C3S19%2C11%2C19%2C11a3.08%2C3.08%2C0%2C0%2C0%2C2%2D3.3A7.9%2C7.9%2C0%2C0%2C1%2C18.94%2C7.91Z%22%20style%3D%22fill%3A%20none%3B%20stroke%3A%20rgb%280%2C%200%2C%200%29%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%20stroke-width%3A%202%3B%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="Twitter Icon" />

                </a>
                <a href={company.linkedin}target='_blank'>
                  <img width="30px" height="30px" src="data:image/svg+xml,%3Csvg%20fill%3D%22%23000000%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%22-2%20-2%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%22%20class%3D%22jam%20jam-linkedin-square%22%3E%3Cpath%20d%3D%27M15%2011.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592%200-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842%200-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066%201.932-1.066%201.41%200%202.468.922%202.468%202.902zM6.213%205.271C5.48%205.271%205%205.753%205%206.385c0%20.62.466%201.115%201.185%201.115h.014c.748%200%201.213-.496%201.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086%209.556h2.144V8.38H5.127v6.447z%27%2F%3E%3Cpath%20d%3D%27M4%202a2%202%200%200%200-2%202v12a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2H4zm0-2h12a4%204%200%200%201%204%204v12a4%204%200%200%201-4%204H4a4%204%200%200%201-4-4V4a4%204%200%200%201%204-4z%27%2F%3E%3C%2Fsvg%3E" alt="LinkedIn Icon" />

                </a>


              </td>

              <td>{company.description}</td>
              <td>{company.address}</td>
              <td>{company.phone}</td>
              <td>
                <Link to={`/company/${company._id}`}>
                  <Button variant="outlined" size="small">View Details</Button>
                </Link>
              </td>


              {/* <td>
                <button onClick={() => {}}>View Details</button>
                <button onClick={() => handleDelete()}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CompanyTable;
