import { useEffect, useState } from "react";
import SummaryApi from "../../Api/apiCollections";
import Statistics from "../../components/Sales";
import Dropdown from "../../components/Month_Dropdown";
import { FiSearch } from "react-icons/fi";

const Transactions = () => {
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [data, setData] = useState({
    totalSales: "",
    totalSoldItems: "",
    totalNotSoldItems: "",
  });
  const [loading, setLoading] = useState(true);

  const len = productData.length / 10;

  // Fetch product data from API
  const fetchData = async () => {
    try {
      const res = await fetch(SummaryApi.getProductData.url, {
        method: SummaryApi.getProductData.method,
      });

      const { data } = await res.json();
      setProductData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQueryData = async () => {
    try {
      const res = await fetch(
        `${SummaryApi.getPara.url}?title=${searchData}&description=${searchData}&price=${searchData}`,
        {
          method: SummaryApi.getPara.method,
        }
      );
      const { data } = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthData = async () => {
    try {
      const res = await fetch(
        `${SummaryApi.getMonth.url}?month=${selectedMonth}`,
        {
          method: SummaryApi.getMonth.method,
        }
      );
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (len > page) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    fetchData();
    fetchMonthData();
  }, []);

  useEffect(() => {
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchQueryData();
    fetchMonthData();
  }, [searchData, selectedMonth]);

  return (
    <div>
      <div className="p-5">
        {/* Search and Dropdown */}
        <section className="flex justify-between items-center px-4 py-3 bg-white shadow-md rounded-lg">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchData}
              onChange={handleChange}
              className="py-2 pl-10 pr-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="relative ml-4">
            <Dropdown className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md" />
          </div>
        </section>

        <section className="mt-5">
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            {loading ? (
              // Loader Section
              <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              // Table Section
              <table className="min-w-full border-collapse w-full">
                <thead className="bg-blue-600 text-white uppercase text-sm">
                  <tr>
                    <th className="py-3 px-4 text-left border-b-2">ID</th>
                    <th className="py-3 px-4 text-left border-b-2">Title</th>
                    <th className="py-3 px-4 text-left border-b-2">
                      Description
                    </th>
                    <th className="py-3 px-4 text-left border-b-2">Price</th>
                    <th className="py-3 px-4 text-left border-b-2">Category</th>
                    <th className="py-3 px-4 text-left border-b-2">Sold</th>
                    <th className="py-3 px-4 text-left border-b-2">Image</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {productData
                    .filter(
                      (item) =>
                        item.title
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        item.category
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        item.price.toString().includes(searchData.toLowerCase())
                    )
                    .slice(page * 10 - 10, page * 10)
                    .map((item, i) => (
                      <tr
                        key={i}
                        className="border-b hover:bg-blue-100 transition duration-200"
                      >
                        <td className="py-3 px-4">{item.id}</td>
                        <td className="py-3 px-4 font-semibold w-[20%]">
                          {item.title}
                        </td>
                        <td className="py-3 px-4 w-[55%] text-justify">
                          {item.description}
                        </td>
                        <td className="py-3 px-4 font-medium text-blue-600">
                          ₹{item.price}
                        </td>
                        <td className="py-3 px-4 w-[12%]">{item.category}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${
                        item.sold
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                          >
                            {item.sold ? "Sold" : "Available"}
                          </span>
                        </td>
                        <td className="py-3 px-4 w-[20%]">
                          <img
                            src={item.image}
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-md shadow-md mx-auto"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* pagination */}
        <section className="bottom flex justify-center items-center gap-4 mt-6">
          {!searchData && (
            <p className="text-gray-600 font-medium">
              Page {page} of {Math.ceil(len)}
            </p>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${
          page > 1
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
            >
              Prev
            </button>

            {[...Array(Math.ceil(len))].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium 
          ${
            page === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={page >= len}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${
          len > page
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
            >
              Next
            </button>
          </div>

          {!searchData && (
            <p className="text-gray-600 font-medium">Items per page 10</p>
          )}
        </section>
      </div>
      <br></br>

      <div className="max-w-screen-x w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          
        </h3>
        <Statistics setSelectedMonth={setSelectedMonth} data={data} />
      </div>
    </div>
  );
};

export default Transactions;
