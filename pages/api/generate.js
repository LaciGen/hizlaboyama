
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;
  const fullPrompt = `${prompt}, coloring book style, black and white, line art, white background`;

  const response = await fetch("https://api-inference.huggingface.co/models/artificialguybr/ColoringBookRedmond-V2", {
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
