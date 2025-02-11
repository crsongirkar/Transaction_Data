const axios = require('axios');
const transactionModel = require('../models/transaction.model.js');
const fetchGivenApi = async (req, res) => {
  try {
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );
    await transactionModel.deleteMany({});
    const fetchData = await response.data;
    const saveData = await transactionModel.insertMany(
      fetchData.map((item, i) => ({
        id: i + 1,
        title: item.title,
        description: item.description,
        price: item.price,
        dateOfSale: new Date(item.dateOfSale),
        sold: item.sold,
        category: item.category,
        image: item.image,
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

const getQueryParameters = async (req, res) => {
  const { title, description, price } = req.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const query = {
    $or: [
      { title: { $regex: title, $options: 'i' } },
      { description: { $regex: description, $options: 'i' } },
    ],
  };

  const searchAsNumber = parseFloat(price);
  if (!isNaN(searchAsNumber)) {
    query.$or.push({ price: searchAsNumber });
  }

  try {
    const transactions = await transactionModel
      .find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    // console.log(transactions);
    //  res.json(JSON.stringify(transactions, getCircularReplacer()));
    res.status(201).json({
      message: 'get query parameters successfully!!',
      success: true,
      error: false,
      data: transactions,
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: 'error.message || error',
        error: true,
        success: false,
      });
    } else {
      console.error(
        'Failed to fetch transactions and headers already sent:',
        error
      );
    }
    console.log('error', error);
  }
};

const statistics = async (req, res) => {
  const month = req.query.month;
  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required' });
  }
  console.log(
    'month in number',
    new Date(Date.parse(month + '30,2024')).getMonth() + 1
  );
  const monthNumber = new Date(Date.parse(month + ' 10, 2024')).getMonth() + 1;

  try {
    const totalSales = await transactionModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber],
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
        },
      },
    ]);

    // console.log(totalSales[0].total);

    const totalSoldItems = await transactionModel.countDocuments({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthNumber],
      },
      sold: true,
    });
    // console.log(totalSoldItems);

    const totalNotSoldItems = await transactionModel.countDocuments({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthNumber],
      },
      sold: false,
    });
    // console.log(totalNotSoldItems);

    res.json({
      totalSales: totalSales[0] ? totalSales[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

const getStatisticsData = async (req, res) => {
  //   const month = req.query.month;
  //   console.log(month);
  //   if (!month) {
  //     return res.status(400).json({ error: 'Month parameter is required' });
  //   }
  //   //   console.log(new Date(Date.parse(month + '30,2024')).getMonth() + 1);
  //   const monthNumber = new Date(Date.parse(month + ' 10, 2024')).getMonth() + 1;
  //   try {
  //     const totalSoldItems = await transactionModel.find({
  //       month: { $regex: month, $options: 'i' },
  //     });
  //     console.log(totalSoldItems);
  //     res.status(200).json({
  //       totalSoldItems,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to fetch statistics' });
  //   }
};

module.exports = {
  fetchGivenApi,
  getQueryParameters,
  statistics,
  getStatisticsData,
};
