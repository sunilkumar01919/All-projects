const express = require('express');
const scrapeWebsite = require('./scraper');
const Company = require('./models');
const router = express.Router();
const { parse } = require('json2csv');


router.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const data = await scrapeWebsite(url);
    const company = new Company(data);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error scraping website' });
  }
});


// Get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
});

// Delete companies by ids
router.delete('/companies', async (req, res) => {
  const { ids } = req.body;
  try {
    await Company.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Companies deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting companies' });
  }
});

router.get('/download-csv', async (req, res) => {
  try {
    const companies = await Company.find(); 
    const csv = parse(companies);
    res.header('Content-Type', 'text/csv'); 
    res.attachment('scraped-data.csv');     
    res.send(csv);                          
  } catch (error) {
    res.status(500).json({ error: 'Error generating CSV file' });
  }
});


module.exports = router;