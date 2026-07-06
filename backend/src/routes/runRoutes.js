const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const validate = require('../middleware/validate');
const { createRunSchema } = require('../schemas/validationSchemas');

router.post('/', validate(createRunSchema), runController.createRun);
router.get('/:id/status', runController.getRunStatus);
router.get('/:id/report', runController.getRunReport);

module.exports = router;
