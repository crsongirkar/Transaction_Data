import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Dropdown from './Month_Dropdown';
import PropTypes from 'prop-types';
import PieCharts from './chartPie';

const BarCharts = ({ setSelectedMonth, chartData, pieChartData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#4C28FFFF', '#5BFF42FF'];

  return (
    <div className="m-5 flex items-center flex-col">
      {/* Title & Dropdown */}
      <div className="flex gap-5 items-center mb-10">
        <span className="text-2xl font-semibold text-gray-800">Bar Chart & Pie Chart</span>
        <Dropdown setSelectedMonth={setSelectedMonth} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-5 w-full">

        {/* Bar Chart Section */}
        <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales by Range</h3>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="count" label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </section>

        <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Sales Distribution</h3>
          <PieCharts Data={pieChartData} />
        </section>
      </div>
    </div>
  );
};
BarCharts.propTypes = {
  setSelectedMonth: PropTypes.func.isRequired,
  chartData:PropTypes.func.isRequired,
  pieChartData:PropTypes.func.isRequired,

};

export default BarCharts;
