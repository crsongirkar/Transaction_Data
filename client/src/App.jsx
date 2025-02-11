import "./App.css";
import Header from "./components/Heading";
import Charts from "./pages/Diag";
import Transactions from "./pages/table_data";

function App() {
  return (
    <div className="bg-pink-100 pb-10 min-h-screen flex flex-col">
      <Header />
      <Transactions />
      <Charts />
      <footer className="mt-auto text-center py-4 bg-pink-100 text-gray-700">
        &copy; {new Date().getFullYear()} Thank you for visiting!
        <br />
        Made by <b/>
        <a
          href="https://steady-parfait-58ebee.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
           Chinmay Songirkar
        </a>
        !
      </footer>
    </div>
  );
}

export default App;
