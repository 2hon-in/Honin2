import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Login from './Component/Login'
import Join from './Component/member/Join'
import Kakaosaveinfo from "./Component/member/Kakaosaveinfo";
import Secondhand from "./Component/board/Secondhand";
import Naversaveinfo from "./Component/member/Naversaveinfo";

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Routes>
          <Route path='/' element={<Main></Main>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/join' element={<Join></Join>} />
          <Route path="/kakaosaveinfo/:nickname" element={<Kakaosaveinfo />} />
          <Route path="/naversaveinfo/:nickname" element={<Naversaveinfo />} />
          <Route path="/Secondhand" element={<Secondhand />} />
      </Routes>
    </div>
  );
}

export default App;

