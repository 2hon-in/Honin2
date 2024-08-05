import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

function Notice() {
  return (
    <>
      <Header></Header>
      <div style={{height:"50rem", lineHeight:"20rem"}}>
        소식지 메인화면
      </div>
      <Footer></Footer>
    </>
  )
}

export default Notice
