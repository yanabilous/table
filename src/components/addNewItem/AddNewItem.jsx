import { useState } from "react";
import "./addNewItem.scss";
import StatusOk from "../statusOk/StatusOk.jsx";

function AddNewItem() {
  const initialFormData = {
    name: "",
    email: "",
    birthday_date: "",
    phone_number: "",
    address: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://technical-task-api.icapgroupgmbh.com/api/table/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'testuser',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);

        // Очищаємо поля форми
        setFormData(initialFormData);

        // Приховуємо повідомлення про успіх через 2 секунди
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      } else {
        console.error('Failed to add a new item');
      }
    } catch (error) {
      console.error('Error while adding a new item:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="birthday_date"
        placeholder="Birthday Date (YYYY-MM-DD)"
        value={formData.birthday_date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <button className="btn" onClick={handleSubmit}>Add Item</button>
      {isSuccess && <div><StatusOk /></div>}

    </div>
  );
}

export default AddNewItem;
