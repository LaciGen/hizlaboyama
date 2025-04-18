export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;
  const fullPrompt = `c0l0ringb00k coloring book page, ${prompt}, white background`;

  const response = await fetch("https://api-inference.huggingface.co/models/renderartist/coloringbookflux", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: fullPrompt })
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Model API response error" });
  }

  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  res.status(200).json({
    image: `data:image/png;base64,${base64Image}`
  });
}
