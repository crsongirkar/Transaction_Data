import PropTypes from 'prop-types';
import Dropdown from "./Month_Dropdown";

const Statistics = ({ setSelectedMonth, data }) => {
  return (
   
    <div className="p-6 flex flex-col items-center bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl border border-gray-200 max-w-md mx-auto">
      {/* Title & Dropdown */}
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📊 Monthly Sale</h2>
        <Dropdown setSelectedMonth={setSelectedMonth} />
      </div>

     
      <section className="w-full bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md border border-gray-300">
        <div className="flex items-center justify-between text-lg font-medium text-gray-700 mb-4">
          <span>Total Sales</span>
          <span className="font-bold text-blue-600">₹{data.totalSales}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-medium text-gray-700 mb-4">
          <span>Sold Items</span>
          <span className="font-bold text-green-600">{data.totalSoldItems}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-medium text-gray-700">
          <span>Unsold Items</span>
          <span className="font-bold text-red-500">{data.totalNotSoldItems}</span>
        </div>
      </section>
    </div>
  );
};

Statistics.propTypes = {
  setSelectedMonth: PropTypes.func.isRequired,
  data: PropTypes.shape({
    totalSales: PropTypes.number.isRequired,
    totalSoldItems: PropTypes.number.isRequired,
    totalNotSoldItems: PropTypes.number.isRequired
  }).isRequired
};

export default Statistics;
