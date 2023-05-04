import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import GrabSwiper from "./components/GrabSwiper";
import { messaging } from "./firebase";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const requestPermission = async () => {
    console.log("Requesting permission...");
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BG_x0cYRah_8ioTzYrz1DcFoOtuZyeSrKg11VDTLHHPE8d55b3avYobmLbLaTB0PvttMBQw-75U2X3KE0C790O8",
      });
      console.log(token, "the token");
    }
  };

  useEffect(() => {
    // requestPermission();
  }, []);

  return (
    <>
      <GrabSwiper />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
