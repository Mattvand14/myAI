import { useEffect, useState } from "react";

export default function useBillboardData() {
  const [billboardData, setBillboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBillboard() {
      try {
        const res = await fetch("https://my-ai-xi-ten.vercel.app/"); // Update URL as needed
        const data = await res.json();
        setBillboardData(data);
      } catch (err) {
        console.error("Error fetching Billboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBillboard();
  }, []);

  return { billboardData, loading, error };
}
