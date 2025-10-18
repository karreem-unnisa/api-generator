import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const fetchEndpoints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/endpoints");
      setEndpoints(res.data);
    } catch (err) {
      console.error("Error fetching endpoints:", err);
    }
  };

  useEffect(() => {
    fetchEndpoints();

    const handler = () => fetchEndpoints();
    window.addEventListener("endpointUpdated", handler);
    return () => window.removeEventListener("endpointUpdated", handler);
  }, []);

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="dashboard">
      <h2>All APIs</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Method</th>
            <th>Response Preview</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep) => {
            const jsonText = JSON.stringify(ep.response_body, null, 2);
            const isExpanded = expandedRows[ep.id];
            const limitedText = jsonText.split("\n").slice(0, 4).join("\n");

            return (
              <tr key={ep.id}>
                <td>{ep.name}</td>
                <td>{ep.url}</td>
                <td>{ep.method}</td>
                <td className={`response-preview ${isExpanded ? "expanded" : ""}`}>
                  <pre>{isExpanded ? jsonText : limitedText + (jsonText.split("\n").length > 4 ? "\n..." : "")}</pre>
                  {jsonText.split("\n").length > 4 && (
                    <span className="expand-toggle" onClick={() => toggleExpand(ep.id)}>
                      {isExpanded ? "▲ Show less" : "▼ Show more"}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
