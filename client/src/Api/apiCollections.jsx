const baseUrl = 'http://localhost:8000';
const SummaryApi = {
  getProductData: {
    url: `${baseUrl}/api`,
    method: 'get',
  },
  getPara: {
    url: `${baseUrl}/api/para`,
    method: 'get',
  },
  getMonth: {
    url: `${baseUrl}/api/month`,
    method: 'get',
  },
  getChartData: {
    url: `${baseUrl}/api/chart`,
    method: 'get',
  },
  getChartMonthData: {
    url: `${baseUrl}/api/chart/month`,
    method: 'get',
  },
  getPieChartMonthData: {
    url: `${baseUrl}/api/piechart/month`,
    method: 'get',
  },
};
export default SummaryApi;
