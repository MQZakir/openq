import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.ok ? "ok" : "error"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif", padding: 40 }}>
      <h1>OpenQ Frontend</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;