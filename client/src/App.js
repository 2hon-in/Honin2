import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      {/* {
        //로그인 유저가 있으면 메인메뉴가 보여지고 없으면 null
        (loginUser)?(<MainMenu />):(null)
      } */}
      
      <Routes>
          {/* <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/join' element={<Join />} />
          <Route path='/writePost' element={<WritePost />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/postone/:postid' element={<Postone />} />
          <Route path='/kakaosaveinfo/:nickname' element={<Kakaosaveinfo />} />
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/memberPage/:membernick' element={<MemberPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

