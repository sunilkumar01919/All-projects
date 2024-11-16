const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  imgdata : Buffer,
  name: String,
  description: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  address: String,
  phone: String,
  email: String,
  logo: String,
  latestmoviename: String,
  paragraphs: [{ type: String }] 

});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
