export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/run-tasks") {
      return new Response(JSON.stringify({
        message: "AI successfully activated!",
        status: "success"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sentra AI Dashboard</title>
          <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              h1 { color: #333; }
              button { background-color: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; }
              #output { margin-top: 20px; font-size: 18px; color: green; }
          </style>
      </head>
      <body>
          <h1>Sentra AI Dashboard</h1>
          <p>Monitor and control your AI operations in real-time.</p>
          <button onclick="activateAI()">Activate Sentra AI</button>
          <p id="output">Waiting for AI...</p>

          <script>
              async function activateAI() {
                  document.getElementById('output').innerText = "Activating AI...";
                  try {
                      let response = await fetch('/api/run-tasks');
                      let data = await response.json();
                      document.getElementById('output').innerText = data.message;
                  } catch (error) {
                      document.getElementById('output').innerText = "Error activating AI. Check console.";
                      console.error("Error:", error);
                  }
              }
          </script>
      </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }
};