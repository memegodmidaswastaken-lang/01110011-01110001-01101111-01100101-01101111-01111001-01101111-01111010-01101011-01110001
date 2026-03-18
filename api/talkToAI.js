async function talkToAI(message) {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const text = await res.text();
    console.log(text); // 👈 debug

    const data = JSON.parse(text);

    print(data.reply);

  } catch (e) {
    print("...connection unstable...");
    console.error(e);
  }
}
