
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setImage(null);
    setRawData(null);
    console.log("Prompt gönderiliyor:", prompt);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      console.log("Yanıt geldi:", data);
      setRawData(JSON.stringify(data, null, 2));
      setImage(data.image);
    } catch (err) {
      console.error("Hata oluştu:", err);
      setError("Görsel oluşturulurken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hızla Boyama Sayfası Oluştur</h1>
      <textarea
        placeholder="Hayalini yaz..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Boyama Sayfası Oluştur"}
      </button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image && (
        <div style={{ marginTop: 20 }}>
          <h3>Sonuç:</h3>
          <img src={image} alt="Boyama Çıktısı" style={{ maxWidth: "100%" }} />
        </div>
      )}
      {rawData && (
        <div style={{ marginTop: 20 }}>
          <h4>API Yanıtı (ham veri):</h4>
          <pre>{rawData}</pre>
        </div>
      )}
    </div>
  );
}
