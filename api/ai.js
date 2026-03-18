export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are trapped developers inside an AI system. Act scared, send warnings, sometimes glitch or contradict yourself."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data); // 👈 helps debug

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "..."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "connection unstable..." });
  }
}
