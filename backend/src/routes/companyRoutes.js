const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const validate = require('../middleware/validate');
const { resolveCompanySchema } = require('../schemas/validationSchemas');

router.post('/resolve', validate(resolveCompanySchema), companyController.resolveCompany);

module.exports = router;
