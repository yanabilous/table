import { useState } from "react";
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

  const handleSearch = () => {
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

  const handleFilterChange = (event, filterKey) => {
    const updatedFilters = { ...searchFilters };
    updatedFilters[filterKey] = event.target.value;
    setSearchFilters(updatedFilters);
  };

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
              onChange={(e) => handleFilterChange(e, "name")}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Birthday Date"
              value={searchFilters.birthday_date}
              onChange={(e) => handleFilterChange(e, "birthday_date")}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Email"
              value={searchFilters.email}
              onChange={(e) => handleFilterChange(e, "email")}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Phone Number"
              value={searchFilters.phone_number}
              onChange={(e) => handleFilterChange(e, "phone_number")}
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Address"
              value={searchFilters.address}
              onChange={(e) => handleFilterChange(e, "address")}
            />
          </p>
          <button onClick={handleSearch}>Search</button>
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
