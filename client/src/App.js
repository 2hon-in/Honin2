import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Login from './Component/Login'
import Join from './Component/member/Join'
import Kakaosaveinfo from "./Component/member/Kakaosaveinfo";
import Secondhand from "./Component/secondhand/Secondhand";
import Naversaveinfo from "./Component/member/Naversaveinfo";
import Community from "./Component/community/Community";
import NCareer from "./Component/notice/NCareer";
import Restaurant from "./Component/restaurant/Restaurant";
import Mypage from "./Component/member/Mypage";
import SecondhandView from "./Component/secondhand/SecondhandView";
import NPolicy from "./Component/notice/NPolicy";


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
          <Route path="/ncareer" element={<NCareer />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/secondhandView/:num" element={<SecondhandView />} />
          <Route path="/npolicy" element={<NPolicy />} />
      </Routes>
    </div>
  );
}

export default App;

