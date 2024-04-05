import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhoneBook from "./pages/phoneBook";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AddContact from "./pages/addContact";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneBook />} />
          <Route path="/addContact" element={<AddContact />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
