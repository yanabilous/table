import  { useState, useEffect } from "react";
import "./tableItem.scss";
import PropTypes from "prop-types";

function TableItem({ results }) {
  const [data, setData] = useState({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${(currentPage - 1) * 10}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": "testuser",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          setTotalPages(Math.ceil(result.count / 10));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleInputChange = (event, id, key) => {
    const updatedData = data.results.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [key]: event.target.value,
        };
      }
      return item;
    });

    setData({
      ...data,
      results: updatedData,
    });

    const editedItem = updatedData.find((item) => item.id === id);
    saveEditedData(id, editedItem);
  };

  const saveEditedData = (id, editedData) => {
    fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": "testuser",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data updated successfully");
        } else {
          console.error("Failed to update data");
        }
      })
      .catch((error) => {
        console.error("Error while updating data:", error);
      });
  };

  const handleDelete = (id) => {
    deleteData(id);
  };

  const deleteData = (id) => {
    fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "testuser",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data deleted successfully");
          const updatedData = data.results.filter((item) => item.id !== id);
          setData({
            ...data,
            results: updatedData,
          });
        } else {
          console.error("Failed to delete data");
        }
      })
      .catch((error) => {
        console.error("Error while deleting data:", error);
      });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="item_container">
      {results.map((item) => (
        <div key={item.id}>
          <input
            className="id"
            type="text"
            value={item.id}
            onChange={(event) => handleInputChange(event, item.id, "id")}
          />
          <input
            type="text"
            value={item.name}
            onChange={(event) => handleInputChange(event, item.id, "name")}
          />
          <input
            type="text"
            value={item.email}
            onChange={(event) => handleInputChange(event, item.id, "email")}
          />
          <input
            type="text"
            value={item.birthday_date}
            onChange={(event) => handleInputChange(event, item.id, "birthday_date")}
          />
          <input
            type="text"
            value={item.phone_number}
            onChange={(event) => handleInputChange(event, item.id, "phone_number")}
          />
          <input
            type="text"
            value={item.address}
            onChange={(event) => handleInputChange(event, item.id, "address")}
          />
          <button className="delete" onClick={() => handleDelete(item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_7010_30456)">
                <path
                  d="M2.5 3.5H13.5V12C13.5 13.933 11.933 15.5 10 15.5H6C4.067 15.5 2.5 13.933 2.5 12V3.5Z"
                  stroke="#212121" strokeLinecap="round"
                />
                <path
                  d="M10 3.5V2.5C10 1.39543 9.10457 0.5 8 0.5V0.5C6.89543 0.5 6 1.39543 6 2.5V3.5"
                  stroke="#212121"
                />
                <mask id="path-3-inside-1_7010_30456" fill="white">
                  <path
                    d="M0 3.5C0 3.22386 0.223858 3 0.5 3H15.5C15.7761 3 16 3.22386 16 3.5C16 3.77614 15.7761 4 15.5 4H0.5C0.223858 4 0 3.77614 0 3.5Z"
                  />
                </mask>
                <path
                  d="M0.5 4H15.5V2H0.5V4ZM15.5 3H0.5V5H15.5V3ZM0.5 3C0.776142 3 1 3.22386 1 3.5H-1C-1 4.32843 -0.328427 5 0.5 5V3ZM15 3.5C15 3.22386 15.2239 3 15.5 3V5C16.3284 5 17 4.32843 17 3.5H15ZM15.5 4C15.2239 4 15 3.77614 15 3.5H17C17 2.67157 16.3284 2 15.5 2V4ZM0.5 2C-0.328427 2 -1 2.67157 -1 3.5H1C1 3.77614 0.776142 4 0.5 4V2Z"
                  fill="#212121" mask="url(#path-3-inside-1_7010_30456)"
                />
                <rect x="5.49829" y="6" width="1" height="6" rx="0.5" fill="#212121"/>
                <rect x="9.50024" y="6" width="1" height="6" rx="0.5" fill="#212121"/>
              </g>
              <defs>
                <clipPath id="clip0_7010_30456">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      ))}

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          ...
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          (index + 1 === currentPage || index + 1 === currentPage - 1 || index + 1 === currentPage + 1) ? (
            <button key={index} onClick={() => goToPage(index + 1)}>{index + 1}</button>
          ) : null
          )
        )}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          ...
        </button>
      </div>
    </div>
  );
}


TableItem.propTypes = {
  results: PropTypes.array.isRequired,
};


export default TableItem;
