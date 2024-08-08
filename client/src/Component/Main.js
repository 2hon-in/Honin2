import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import "./style/main.css"
import "./style/reset.css"
function Main() {
  return (
    <>
      <Header></Header>
      <div className="main-banner">
        <img src = "/api/images/main.jpg" />
      </div>
      <section>
          <div className="container">
          </div>
      </section>
      <Footer></Footer>
    </>
  )
}

export default Main
