const express = require('express');
const {
  fetchGivenApi,
  getQueryParameters,
  statistics,
  getStatisticsData,
} = require('../data/transactionCollection');
const {
  getChartData,
  barChartCollection,
} = require('../data/chartCollection');

const router = express.Router();

router.get('/', fetchGivenApi);
router.get('/para', getQueryParameters);
router.get('/month', statistics);
router.get('/monthdata', getStatisticsData);

//chart route
router.get('/chart', getChartData);
router.get('/chart/month', barChartCollection);
router.get('/piechart/month', barChartCollection);

module.exports = router;
