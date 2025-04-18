
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    console.log("Prompt gönderiliyor:", prompt);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        throw new Error("Sunucudan geçerli yanıt alınamadı.");
      }

      const data = await res.json();
      console.log("Yanıt geldi:", data);
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
    </div>
  );
}
