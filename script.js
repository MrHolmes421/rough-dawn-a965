 document.getElementById("fetchData").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        document.getElementById("aiData").innerText = `AI Revenue: $${data.revenue} | Users: ${data.users}`;
    } catch (error) {
        document.getElementById("aiData").innerText = "Error fetching data.";
    }
});