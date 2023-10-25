import { useState, useEffect } from "react";
import TableItem from "../components/tableItem/TableItem.jsx";
import AddNewItem from "../components/addNewItem/AddNewItem.jsx";

function Table() {
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    birthday_date: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [searchResults, setSearchResults] = useState([]);


  const searchWithFilters = () => {
    const queryParams = new URLSearchParams(searchFilters);

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
      })
      .catch((error) => {
        console.error("Search Error:", error);
      });
  };


useEffect(() => {
    searchWithFilters();
  }, [searchFilters]);

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
              onChange={(e) => setSearchFilters({ ...searchFilters, name: e.target.value })}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Birthday Date"
              value={searchFilters.birthday_date}
              onChange={(e) => setSearchFilters({ ...searchFilters, birthday_date: e.target.value })}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Email"
              value={searchFilters.email}
              onChange={(e) => setSearchFilters({ ...searchFilters, email: e.target.value })}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Phone Number"
              value={searchFilters.phone_number}
              onChange={(e) => setSearchFilters({ ...searchFilters, phone_number: e.target.value })}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Address"
              value={searchFilters.address}
              onChange={(e) => setSearchFilters({ ...searchFilters, address: e.target.value })}
            />
          </p>
          {/*<button onClick={searchWithFilters}>Search</button>*/}
        </div>
        <div>
          <TableItem results={searchResults} />
        </div>
      </div>
      <AddNewItem />
    </div>
  );
}

export default Table;
