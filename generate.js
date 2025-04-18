
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const prompt = req.body.prompt;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "d9bae03fb50eff6fb5a5d8049b0a68ea7266edd39d4027ae47fbc39aa03fabb9",
      input: {
        prompt: `${prompt}, coloring page, white background`,
        width: 1024,
        height: 1024
      }
    })
  });

  const result = await response.json();

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json({
    image: result.output?.[0] || null,
    full: result
  });
}
