import React from 'react';
import CompanyForm from './components/CompanyForm';
import CompanyTable from './components/CompanyTable';
import CompanyDetail from './components/CompanyDetail';
import './App.css'

function App() {
  return (
    <div className="App">
      {/* <h1>Company Scraper</h1> */}
      <CompanyForm />
      <CompanyTable />
    </div>
  );
}

export default App;