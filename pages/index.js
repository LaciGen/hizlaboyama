
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setImage(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setImage(data.image);
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
        placeholder="Hayalini yaz (örnek: a happy dinosaur)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Boyama Sayfası Oluştur"}
      </button>
      <br />
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
