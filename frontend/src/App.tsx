import { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const GreetRequest = async () => {
    setError("");
    setResult("");
    try {
      const response = await fetch("http://localhost:8000/greet", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ name, age: Number(age), city }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResult(data.message);
    } catch (err) {
      setError("Failed to fetch greeting. Please try again.");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h1>OpenQ</h1>
      <p>Backend status: {status}</p>
      <p>Try sending input to backend</p>
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={GreetRequest}>Send</button>
      </div>
      {result && <p>Result: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;