import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EndpointForm.css";

const EndpointForm = () => {
  const [form, setForm] = useState({ name: "", url: "", method: "GET", response_body: "" });
  const [endpoints, setEndpoints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchEndpoints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/endpoints");
      setEndpoints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEndpoints();
    const handler = () => fetchEndpoints();
    window.addEventListener("endpointUpdated", handler);
    return () => window.removeEventListener("endpointUpdated", handler);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        await axios.put(`http://localhost:5000/api/endpoints/${selectedId}`, {
          ...form,
          response_body: JSON.parse(form.response_body),
        });
        setMessage("✅ Endpoint updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/endpoints", {
          ...form,
          response_body: JSON.parse(form.response_body),
        });
        setMessage("✅ Endpoint created successfully");
      }
      setForm({ name: "", url: "", method: "GET", response_body: "" });
      setSelectedId(null);
      fetchEndpoints();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error occurred");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/endpoints/${id}`);
      setMessage("🗑️ Endpoint deleted");
      fetchEndpoints();
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("❌ Error deleting endpoint");
    }
  };

  const handleEdit = (ep) => {
    setForm({ ...ep, response_body: JSON.stringify(ep.response_body, null, 2) });
    setSelectedId(ep.id);
    setShowModal(false);
  };

  return (
    <div className="endpoint-form">
      <div className="form-card">
        <h2>{selectedId ? "✏️ Update Endpoint" : "➕ Create New Endpoint"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Endpoint Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="url" placeholder="/users" value={form.url} onChange={handleChange} required />
          <select name="method" value={form.method} onChange={handleChange}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <textarea name="response_body" placeholder='{"message": "Success"}' value={form.response_body} onChange={handleChange} required />
          <button type="submit" className="submit-btn">
            {selectedId ? "Update Endpoint" : "Create Endpoint"}
          </button>
        </form>

        <button className="view-btn" onClick={() => setShowModal(true)}>
          📋 View Existing Endpoints
        </button>

        {message && <p className="message">{message}</p>}
      </div>

      {/* 🌟 Modal for endpoints */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h3>Existing Endpoints</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep) => (
                  <tr key={ep.id}>
                    <td>{ep.name}</td>
                    <td>{ep.url}</td>
                    <td>
                      <span className={`method-tag ${ep.method.toLowerCase()}`}>{ep.method}</span>
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(ep)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(ep.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndpointForm;
