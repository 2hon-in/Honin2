import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Login from './Component/Login'
import Join from './Component/member/Join'

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Routes>
          <Route path='/' element={<Main></Main>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/join' element={<Join></Join>} />
      </Routes>
    </div>
  );
}

export default App;

