import React from 'react';
import CompanyForm from './components/CompanyForm';
import CompanyTable from './components/CompanyTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyDetail from './components/CompanyDetail';
import './App.css'

function App() {
  return (
    // <div className="App">
    //   {/* <h1>Company Scraper</h1> */}
    //   <CompanyForm />
    //   <CompanyTable />
    // </div>
    <> <CompanyForm />
    <Router>
    <Routes>
      <Route path="/" element={<CompanyTable />} />
      <Route path="/company/:id" element={<CompanyDetail />} />
    </Routes>
  </Router>
  </>
  );
}

export default App;