export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Step 1: Check if a new Worker should be created
    const regenerate = url.searchParams.get("regenerate");

    if (regenerate) {
      const workerName = `sentra-worker-${Date.now()}`;

      // Step 2: Create a new Worker dynamically
      const createWorker = await fetch("https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/workers/scripts/" + workerName, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer YOUR_CLOUDFLARE_API_KEY`,
          "Content-Type": "application/javascript"
        },
        body: `export default { async fetch(request) { return new Response("New Sentra Worker Running!", { status: 200 }); } }`
      });

      if (createWorker.ok) {
        return new Response(`New Worker ${workerName} Created!`, { status: 200 });
      } else {
        return new Response("Failed to create Worker.", { status: 500 });
      }
    }

    // Step 3: Run AI Tasks
    const task = await runSentraAITask();

    // Step 4: Regenerate Worker Before Hitting Limits
    const requestCount = await getWorkerRequestCount();
    if (requestCount > 95000) {
      await fetch(url.origin + "?regenerate=true");
    }

    return new Response(`Sentra AI Task Complete: ${task}`, { status: 200 });
  }
};

// Dummy AI Task Function
async function runSentraAITask() {
  return "Generating Passive Income...";
}

// Dummy Function to Simulate Request Counting
async function getWorkerRequestCount() {
  return Math.floor(Math.random() * 100000);
}