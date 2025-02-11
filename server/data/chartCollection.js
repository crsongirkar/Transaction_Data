const { barChartModel } = require('../models/chart.model');
const transactionModel = require('../models/transaction.model');

const getChartData = async (req, res) => {
  try {
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity },
    ];

    await barChartModel.deleteMany({});

    const saveData = await barChartModel.insertMany(
      priceRanges.map((item, i) => ({
        id: i + 1,
        range: item.range,
        min: item.min,
        max: item.max,
      }))
    );
    res.status(201).json({
      message: 'Database initialized with seed data',
      error: false,
      success: true,
      data: saveData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const barChartCollection = async (req, res) => {
  const month = req.query.month;
  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required' });
  }

  const monthNumber = new Date(Date.parse(month + ' 1, 2020')).getMonth() + 1;
  if (isNaN(monthNumber)) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity },
    ];

    const results = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await transactionModel.countDocuments({
          $expr: {
            $and: [
              { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
              { $gte: ['$price', range.min] },
              {
                $lt: [
                  '$price',
                  range.max === Infinity ? Number.MAX_VALUE : range.max,
                ],
              },
            ],
          },
        });
        return { range: range.range, count };
      })
    );
    console.log(results);
    res.status(201).json({
      message: 'chart data successfully get!!',
      error: false,
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  }
};

const getPieChartCollection = async (req, res) => {
  const month = req.query.month;
  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required' });
  }

  const monthNumber = new Date(Date.parse(month + ' 1, 2020')).getMonth() + 1;
  if (isNaN(monthNumber)) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const categories = await transactionModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber],
          },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const results = categories.map((category) => ({
      category: category._id,
      count: category.count,
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};

module.exports = { getChartData, barChartCollection, getPieChartCollection };
