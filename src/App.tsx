import { AuthProvider } from "../src/Context/Auth";
import { Routes } from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
