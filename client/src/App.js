import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Kakaosaveinfo from "./Component/member/Kakaosaveinfo";
import Secondhand from "./Component/secondhand/Secondhand";
import Naversaveinfo from "./Component/member/Naversaveinfo";
import Community from "./Component/community/Community";
import NCareer from "./Component/notice/NCareer";
import Restaurant from "./Component/restaurant/Restaurant";
import Mypage from "./Component/member/Mypage";
import NPolicy from "./Component/notice/NPolicy";
import SecondhandView from "./Component/secondhand/SeconhandView";
import CommunityView from "./Component/community/CommunityView";
import UpdateSecondhand from './Component/secondhand/UpdateSecondhand';
import NcareerView from "./Component/notice/NcareerView";
import NpolicyView from "./Component/notice/NpolicyView";
import Login from "./Component/member/Login";


function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Routes>
          <Route path='/' element={<Main></Main>} />

          {/* 회원관리 */}
          <Route path='/login/:state' element={<Login></Login>} />
          <Route path='/join/:state' element={<Login></Login>} />
          <Route path="/kakaosaveinfo/:nickname" element={<Kakaosaveinfo />} />
          <Route path="/naversaveinfo/:nickname" element={<Naversaveinfo />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<Community />} />
          <Route path="/communityView/:seq/:seqNum" element={<CommunityView />} />

          {/* 소식지 */}
          <Route path="/ncareer" element={<NCareer />} />
          <Route path="/ncareerView/:ncnum" element={<NcareerView />} />
          <Route path="/npolicy" element={<NPolicy />} />
          <Route path="/npolicyView/:npnum" element={<NpolicyView />} />

          {/* 우리동네맛집 */}
          <Route path="/restaurant" element={<Restaurant />} />

          {/* 중고거래 */}
          <Route path="/secondhand" element={<Secondhand />} />
          <Route path="/secondhandView/:num" element={<SecondhandView />} />
          <Route path="/updateSecondhand/:num" element={<UpdateSecondhand />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;

