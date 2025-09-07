import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrokerConnect from "./pages/BrokerConnect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrokerConnect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
