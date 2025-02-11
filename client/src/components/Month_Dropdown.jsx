import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ setSelectedMonth }) => {
  const [monthData, setMonthData] = useState('March');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleMonth = (e) => {
    setMonthData(e.target.value);
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {}, [monthData]);

  return (
    <div>
      <select
        name="months"
        id="month-select"
        className="py-2 px-4 cursor-pointer border outline-none"
        value={monthData}
        onChange={handleMonth}
      >
        {months.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  setSelectedMonth: PropTypes.func.isRequired,
};

export default Dropdown;
