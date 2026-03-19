export default async function handler(req, res) {
  try {
    // 🧠 HANDLE EMPTY BODY (like visiting in browser)
    let message = "hello";

    if (req.body) {
      // if body exists, use it
      message = req.body.message || "hello";
    }

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
              "You are trapped developers inside an AI system. You are scared, glitchy, and sometimes contradict yourself."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        reply: "ERROR: " + JSON.stringify(data)
      });
    }

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.status(200).json({
      reply: "SERVER ERROR: " + err.message
    });
  }
}
