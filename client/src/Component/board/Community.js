import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import s from "../style/community.module.css"
import axios from 'axios'

function Community() {
  const [bannerImgSrc, setBannerImgSrc] = useState("/api/images/honin.PNG")
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    axios.get("/api/")
  },[])
  
  return (
    <>
      <Header></Header>
      <div>
        <img src={bannerImgSrc} alt="banner"/>
      </div>
      <div className={s.category_btn}>
        <button>자유게시판</button>
        <button>팁과노하우</button>
        <button>업체추천</button>
        <button>고민상담</button>
      </div>
      <div>

      </div>
      <Footer></Footer>
    </>
  )
}

export default Community
