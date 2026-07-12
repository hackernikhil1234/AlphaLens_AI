const express = require('express');
const router = express.Router();
const runRoutes = require('./runRoutes');
const companyRoutes = require('./companyRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/runs', runRoutes);
router.use('/companies', companyRoutes);

module.exports = router;
