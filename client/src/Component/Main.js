import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

//import './style/main.module.css'
import './style/main.css'

function Main() {
  return (
    <>
      <Header></Header>
      <div className="main-banner">
        <img src="" alt="" />
      </div>
      <section>
        <div className="container">
          {/* <div className="header">헤더 (로고, 메뉴 등)</div>
          <div className="content-wrapper">
            <div className="item large-item">상단 아이템</div>
            <div className="item">컨텐츠1</div>
            <div className="item">컨텐츠2</div>
            <div className="item">스와치</div>
            <div className="item">섹션1</div>
            <div className="item">섹션2</div>
          </div>
          <div className="footer">푸터 (연락처 정보)</div> */}
        </div>
      </section>
      <Footer></Footer>
    </>
  )
}

export default Main
