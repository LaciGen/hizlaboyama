
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hızla Boyama Sayfası Oluştur</h1>
      <textarea
        placeholder="Hayalini yaz..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Boyama Sayfası Oluştur"}
      </button>
      <br />
      {image && (
        <div style={{ marginTop: 20 }}>
          <h3>Sonuç:</h3>
          <img src={image} alt="Boyama Çıktısı" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}
