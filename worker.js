export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Redirect root requests to your frontend app
    if (url.pathname === "/") {
      return fetch("https://dashboard.synx-ai.com");
    }

    // Serve static assets (JS, CSS, etc.)
    return fetch(`https://dashboard.synx-ai.com${url.pathname}`);
  }
};
