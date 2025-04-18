
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
      version: "db21e45e40cf07fd77c263b1c16846c38511ad52f27a3b0e71b50b3e4f6d1616",
      input: {
        prompt: `${prompt}, black and white, lineart, coloring book style`,
        num_inference_steps: 30,
        guidance_scale: 9
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
