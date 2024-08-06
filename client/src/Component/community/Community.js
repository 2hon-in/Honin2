import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import s from "../style/community/community.module.css";
import axios from "axios";
import jaxios from "../util/jwtUtil";

function Community() {
  const [bannerImgSrc, setBannerImgSrc] = useState("/api/images/tree.jpg");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("자유게시판");
  const [postList, setPostList] = useState([]);
  const [seq, setSeq] = useState("cfnum");
  const currentTime = new Date().getTime();
  
  
  useEffect(() => {
    axios.get("/api/community/getPostList/" + "자유게시판")
      .then(res => {
        setPostList(res.data.postList);
      })
      .catch(err => console.error(err));

    axios.get("/api/community/getCommunityCategoryList")
      .then(res => {
        setCategoryList(res.data.categoryList);
      })
      .catch(err => console.error(err));

    console.log("postList : ", postList);
    console.log("currentTime : ", currentTime);
    console.log("postList[0].writedate : ", postList.writedate);
  },[]);

  useEffect(() => {
    axios.get(`/api/community/getPostList/${category}`)
      .then(res => {
        setPostList(res.data.postList);
      })
      .catch(err => console.error(err));

    switch (category) {
      case "자유게시판":
        setSeq("cfnum")
        break;
      case "팁과노하우":
        setSeq("ctnum")
        break;
      case "업체추천":
        setSeq("crnum")
        break;
      case "고민상담":
        setSeq("canum")
        break;
      default:
        break;
    }
  }, [category])

  const changeCategory = (categoryName) => {
    setCategory(categoryName);
  }

  return (
    <div className={s.wrap}>
      <Header></Header>
      <div className={s.main}>
        <div className={s.banner}>
          <img src={bannerImgSrc} alt="banner" />
        </div>
        <div className={s.category_btn}>
          {
            categoryList.map((cList, idx) => {
              return (
                (
                  cList === category
                ) ? (
                  <button className={s.selected_btn} onClick={() => changeCategory(cList)} key={idx}>{cList}</button>
                ) : (
                  <button onClick={() => changeCategory(cList)} key={idx}>{cList}</button>
                )
              )
            })
          }
        </div>
        <div className={s.posts}>
          {
            postList.map((list, idx) => {
              return (
                (
                  list.readcount > 400
                ) ? (
                  <div className={s.post} key={idx}>
                    <div className={s.flag}><span className={s.hot}>HOT</span></div>
                    <div className={s.title}>{list.title}</div>
                    <div className={s.content}>{list.content}</div>
                    <div className={s.writer}>{list.writer}</div>
                    <div className={s.readcount}>
                      <div>
                        <img src="/api/images/eye.png" alt="조회수"/>
                        <span className={s.count}>{list.readcount}</span>
                      </div>
                      <span className={s.date}>{list.writedate}</span>
                    </div>
                  </div>
                ) : (
                  <div className={s.post} key={idx}>
                    <div className={s.flag}></div>
                    <div className={s.title}>{list.title}</div>
                    <div className={s.content}>{list.content}</div>
                    <div className={s.writer}>{list.writer}</div>
                    <div className={s.readcount}>
                      <div>
                        <img src="/api/images/eye.png" alt="조회수"/>
                        <span className={s.count}>{list.readcount}</span>
                      </div>
                      <span className={s.date}>{list.writedate}</span>
                    </div>
                  </div>
                )
              )
            })
          }
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Community;
