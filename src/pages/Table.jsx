import {useState, useEffect} from "react";

import AddNewItem from "../components/addNewItem/AddNewItem.jsx";
import TableList from "../components/tableList/TableList";

function Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    birthday_date: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [searchResults, setSearchResults] = useState([]);


 const updateFilters = (data) => {
   setSearchFilters(data)
   setCurrentPage(1)
 }

  const searchWithFilters = () => {
    const queryParams = new URLSearchParams({...searchFilters, ... {limit: 10, offset: (currentPage - 1) * 10}});

    fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/?${queryParams}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "testuser",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setTotalPages(data.count);
      })
      .catch((error) => {
        console.error("Search Error:", error);
      });
  };


  useEffect(() => {
    searchWithFilters();
  }, [searchFilters, currentPage]);

  return (
    <div className="table">
      <div className="table_left">
        <h1>Table</h1>
        <div className="table_header">

          <p>
            <input
              type="text"
              placeholder="Name"
              value={searchFilters.name}
              onChange={(e) => updateFilters({...searchFilters, name: e.target.value})}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Birthday Date"
              value={searchFilters.birthday_date}
              onChange={(e) => updateFilters({...searchFilters, birthday_date: e.target.value})}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Email"
              value={searchFilters.email}
              onChange={(e) => updateFilters({...searchFilters, email: e.target.value})}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Phone Number"
              value={searchFilters.phone_number}
              onChange={(e) => updateFilters({...searchFilters, phone_number: e.target.value})}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Address"
              value={searchFilters.address}
              onChange={(e) => updateFilters({...searchFilters, address: e.target.value})}
            />
          </p>

        </div>
        <div>
          <TableList results={searchResults} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
        </div>
      </div>
      <AddNewItem/>
    </div>
  );
}

export default Table;
