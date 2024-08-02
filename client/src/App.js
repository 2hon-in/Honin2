import { Routes, Route } from "react-router-dom";
import Footer from "./Component/layout/Footer";

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      {/* {
        //로그인 유저가 있으면 메인메뉴가 보여지고 없으면 null
        (loginUser)?(<MainMenu />):(null)
      } */}
      
      <Routes>
          <Route path='/' element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;

