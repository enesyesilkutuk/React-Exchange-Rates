import "./App.css";
import Convert from "./components/Convert";
import { AppContextProvider } from "./context/AppContext";
import Container from "@mui/material/Container";
import TableComp from "./components/TableComp";



function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Container maxWidth="md" sx={{padding:"3rem"}}>
          <Convert />
        </Container>
        <Container maxWidth="md">
          <TableComp />
        </Container>
      </AppContextProvider>
    </div>
  );
}

export default App;
