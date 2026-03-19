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
        model: "gpt-4o-mini", // safe model
        messages: [
          {
            role: "system",
            content:
              "You are trapped developers inside an AI system. You are scared, send warnings, and sometimes glitch or contradict yourself."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    if (!data.choices) {
      return res.status(200).json({
        reply: "API ERROR: " + JSON.stringify(data)
      });
    }

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      reply: "connection unstable..."
    });
  }
}
