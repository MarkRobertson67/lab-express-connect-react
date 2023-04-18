import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default function NewLog() {
  const navigate = useNavigate();

  const [newLog, setNewLog] = useState({
    id: null, // add id property to state object
    captainName: '',
    title: '',
    post: '',
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;

    setNewLog((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/logs`, newLog)
      .then((res) => {
        setNewLog((prev) => ({
          ...prev,
          id: res.data.id, // set id property after log is created
        }));
        navigate(`/logs/${res.data.id}`);
      })
      .catch((e) => console.error(e));
  }

  function handleDelete() {
    axios
      .delete(`${API_URL}/logs/${newLog.id}`)
      .then(() => {
        navigate('/logs');
      })
      .catch((e) => console.error(e));
  }


  return (
    <>
      <h1>New Log</h1>

      <form onSubmit={handleSubmit}>
        <label>
        Captain's Name:
          <input
            type="text"
            name="captainName"
            value={newLog.captainName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newLog.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Post:
          <textarea name="post" value={newLog.post} onChange={handleInputChange} />
        </label>

        <label>
          Mistakes Were Made Today:
          <input
            type="checkbox"
            name="mistakesWereMadeToday"
            checked={newLog.mistakesWereMadeToday}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Days Since Last Crisis:
          <input
            type="number"
            name="daysSinceLastCrisis"
            value={newLog.daysSinceLastCrisis}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/logs')}>
          Cancel
        </button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </>
  );
}
