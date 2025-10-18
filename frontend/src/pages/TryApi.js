import React, { useState } from "react";
import axios from "axios";
import "./TryApi.css";

const TryApi = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [result, setResult] = useState("");

  const handleTry = async () => {
    try {
      const res = await axios({ url: `http://localhost:5000/mock${url}`, method });
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResult(err.response?.data?.message || "❌ Error calling API");
    }
  };

  return (
    <div className="try-api">
      <h2>Try Your API</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="/users"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <button onClick={handleTry}>Send Request</button>
      </div>

      {result && (
        <div className="result-container">
          <h3>Response</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TryApi;
