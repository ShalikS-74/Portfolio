const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

fetch("http://127.0.0.1:5000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Hey SHA-L1K" }),
})
  .then((res) => res.json())
  .then((data) => console.log("✅ Response from backend:", data))
  .catch((err) => console.error("❌ Fetch error:", err));
