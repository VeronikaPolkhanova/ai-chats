import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
