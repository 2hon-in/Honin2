import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Login from './Component/Login'
import Join from './Component/member/Join'
import Kakaosaveinfo from "./Component/member/Kakaosaveinfo";
import Secondhand from "./Component/community/Secondhand";
import Naversaveinfo from "./Component/member/Naversaveinfo";
import Community from "./Component/community/Community";
import Notice from "./Component/notice/Notice";
import Restaurant from "./Component/restaurant/Restaurant";
import Mypage from "./Component/member/Mypage";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Routes>
          <Route path='/' element={<Main></Main>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/join' element={<Join></Join>} />
          <Route path="/kakaosaveinfo/:nickname" element={<Kakaosaveinfo />} />
          <Route path="/naversaveinfo/:nickname" element={<Naversaveinfo />} />
          <Route path="/secondhand" element={<Secondhand />} />
          <Route path="/community" element={<Community />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;

