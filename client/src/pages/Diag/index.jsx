import { useEffect, useState } from 'react';
import BarCharts from '../../components/BrCharts';
import SummaryApi from "../../Api/apiCollections";

const Charts = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  console.log(selectedMonth);
  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  console.log(chartData);

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `${SummaryApi.getChartMonthData.url}?month=${selectedMonth}`,
        {
          method: SummaryApi.getChartMonthData.method,
        }
      );
      const { data } = await res.json();
      setChartData(data);
      const resPieData = await fetch(
        `${SummaryApi.getChartMonthData.url}?month=${selectedMonth}`,
        {
          method: SummaryApi.getChartMonthData.method,
        }
      );
      const pieData = await resPieData.json();
      setPieChartData(pieData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);
  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);
  return (
    <div className="border m-10 shadow-md bg-white rounded-md">
      <BarCharts
        setSelectedMonth={setSelectedMonth}
        chartData={chartData}
        pieChartData={pieChartData}
      />
    </div>
  );
};

export default Charts;