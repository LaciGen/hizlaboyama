
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);
    setImage(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (data.image) {
        setImage(data.image);
      } else {
        setError("Görsel oluşturulamadı. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Bir hata oluştu.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "boyama.png";
    a.click();
  };

  const handlePrint = () => {
    const win = window.open();
    win.document.write('<img src="' + image + '" onload="window.print();window.close()" />');
    win.document.close();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎨 Hızla Boyama Sayfası Oluştur</h1>
      <textarea
        placeholder="Örnek: a cute elephant with balloons"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100, fontSize: 16 }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Boyama Sayfası Oluştur"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="Boyama Çıktısı" style={{ maxWidth: "100%", border: "1px solid #ccc" }} />
          <br />
          <button onClick={handleDownload}>📥 İndir</button>
          <button onClick={handlePrint} style={{ marginLeft: 10 }}>🖨️ Yazdır</button>
        </div>
      )}
    </div>
  );
}
