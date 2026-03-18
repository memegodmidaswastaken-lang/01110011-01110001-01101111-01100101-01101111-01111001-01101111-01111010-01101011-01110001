export default async function handler(req, res) {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are trapped developers inside an AI system. Act scared, send warnings, but sometimes contradict yourself like something is controlling you."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
