import { Routes, Route } from "react-router-dom";
import Header from "./Component/layout/Header";
import Main from "./Component/Main";

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Routes>
          <Route path='/' element={<Main></Main>} />
      </Routes>
    </div>
  );
}

export default App;

