import { useEffect, useState } from "react";

type Queue = {
  id: number;
  name: string;
  avg_service_minutes: number;
  status: string;
  public_slug: string; 
}

function App() {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [name, setName] = useState("");
  const [avgTime, setAvgTime] = useState("15");

  const loadQueues = async () => {
    const res = await fetch("http://localhost:8000/queues");
    const data = await res.json();
    setQueues(data);
  }

  useEffect(() => {
    loadQueues();
  }, []);

  const createQueue = async () => {
    if (!name.trim()) return;
    await fetch("http://localhost:8000/queues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        avg_service_minutes: Number(avgTime),
      }),
    });
    setName("");
    setAvgTime("15");
    loadQueues();
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", maxWidth: 600 }}>
      <h1>OpenQ</h1>

      <h2>Create a queue</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Queue name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Avg minutes"
          value={avgTime}
          onChange={(e) => setAvgTime(e.target.value)}
          style={{ width: 100 }}
        />
        <button onClick={createQueue}>Create</button>
      </div>

      <h2>Your queues</h2>
      {queues.length === 0 && <p>No queues yet.</p>}
      <ul>
        {queues.map((q) => (
          <li key={q.id}>
            <strong>{q.name}</strong> — {q.avg_service_minutes} min —{" "}
            <code>{q.public_slug}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;