
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    alert("AI çizim tetiklenecek (demo)");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hızla Boyama Sayfası Oluştur</h1>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <br />
      <textarea
        placeholder="Hayalini yaz..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100, marginTop: 10 }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>Boyama Sayfası Oluştur</button>
    </div>
  );
}
