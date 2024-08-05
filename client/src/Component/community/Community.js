import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import s from "../style/community.module.css";
import axios from "axios";
import jaxios from "../util/jwtUtil";

function Community() {
  const [bannerImgSrc, setBannerImgSrc] = useState("/api/images/tree.jpg");
  const [category, setCategory] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    jaxios.get("/api/community/getPostList/" + "cfree")
    .then(res => {
      setPostList(res.data.postList);
    })
    .catch(err => console.error(err));
    console.log("postList : ", postList);
  }, []);

  return (
    <>
      <Header></Header>
      <div className={s.main}>
        <div className={s.banner}>
          <img src={bannerImgSrc} alt="banner" />
        </div>
        <div className={s.category_btn}>
          <button>자유게시판</button>
          <button>팁과노하우</button>
          <button>업체추천</button>
          <button>고민상담</button>
        </div>
        <div className={s.posts}>
          {
            postList.map((list, idx) => {
              return(
                <div className={s.post} key={idx}>
                  <div className={s.category}>{list.cfnum}</div>
                  <div className={s.title}>{list.title}</div>
                  <div className={s.content}>{list.content}</div>
                  <div className={s.info}>{list.writer}</div>
                </div>
              )
            })
          }
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Community;
