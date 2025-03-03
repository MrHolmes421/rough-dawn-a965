git add .
git commit -m "Initial dashboard deployment"
git push origin main
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Sentra AI Dashboard</h1>
      <p>Real-Time AI Operations</p>
      <button onClick={() => setCount(count + 1)}>Click Count: {count}</button>
      <p>More functionalities coming soon...</p>
    </div>
  );
}

export default App;
git clone https://github.com/MrHolmes421/rough-dawn-a965.git
cd rough-dawn-a965
npm install
npm run build
npm run deploy

