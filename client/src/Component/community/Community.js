import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import s from "../style/community/community.module.css";
import axios from "axios";
import jaxios from "../util/jwtUtil";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Community() {
  const navigate = useNavigate();
  const [bannerImgSrc, setBannerImgSrc] = useState("/api/images/tree.jpg");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("자유게시판");
  const [postList, setPostList] = useState([]);
  const [seq, setSeq] = useState("cfnum");
  const [paging, setPaging] = useState({});
  const lUser = useSelector((state) => state.user);
  const currentTime = new Date().getTime();

  useEffect(() => {
    jaxios
      .get("/api/community/getPostList/1/" + "자유게시판")
      .then((res) => {
        setPostList(res.data.postList);
        setPaging(res.data.paging);
      })
      .catch((err) => console.error(err));

    jaxios
      .get("/api/community/getCommunityCategoryList")
      .then((res) => {
        setCategoryList(res.data.categoryList);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    jaxios
      .get(`/api/community/getPostList/1/${category}`)
      .then((res) => {
        setPostList(res.data.postList);
        setPaging(res.data.paging);
      })
      .catch((err) => console.error(err));

    switch (category) {
      case "자유게시판":
        setSeq("cfnum");
        break;
      case "팁과노하우":
        setSeq("ctnum");
        break;
      case "업체추천":
        setSeq("crnum");
        break;
      case "고민상담":
        setSeq("canum");
        break;
      default:
        break;
    }
  }, [category]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - 10; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop; // 현재 위치
    const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
    if (paging.page && scrollTop + clientHeight >= scrollHeight) {
      onPageMove(Number(paging.page) + 1);
    }
  };

  function onPageMove(page) {
    //무한 스크롤
    jaxios
      .get(`/api/community/getPostList/${page}/${category}`)
      .then((result) => {
        setPaging(result.data.paging);
        let npl = [];
        npl = [...postList]; // 현재 내용 복사
        npl = [...npl, ...result.data.postList]; // 새로 조회한 페이지의 목록과 Merge
        setPostList([...npl]); // Merge 한 리스트를  복사
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={s.wrap}>
      <Header></Header>
      <div className={s.main}>
        <div className={s.banner}>
          <img src={bannerImgSrc} alt="banner" />
        </div>
        <div className={s.category_btn}>
          {categoryList.map((cList, idx) => {
            return cList === category ? (
              <button
                className={s.selected_btn}
                onClick={() => setCategory(cList)}
                key={idx}
              >
                {cList}
              </button>
            ) : (
              <button onClick={() => setCategory(cList)} key={idx}>
                {cList}
              </button>
            );
          })}
        </div>
        <div
          style={{
            width: "60%",
            margin: "1rem auto",
            display: "flex",
            justifyContent: "end",
          }}
          className={s.category_btn}
        >
          <button
            onClick={() => {
              navigate("/communityWrite");
            }}
          >
            글쓰기
          </button>
        </div>
        <div className={s.posts}>
          {postList.map((list, idx) => {
            return list.readcount > 300 ? (
              <div
                className={s.post}
                key={idx}
                onClick={() => navigate(`/communityView/${seq}/${list[seq]}`)}
              >
                <div className={s.flag}>
                  <span className={s.hot}>HOT</span>
                </div>
                <div className={s.title}>{list.title}</div>
                <div className={s.content}>{list.content}</div>
                <div className={s.writer}>{list.writer}</div>
                <div className={s.readcount}>
                  <div>
                    <img src="/api/images/eye.png" alt="조회수" />
                    <span className={s.count}>{list.readcount}</span>
                  </div>
                  <span className={s.date}>{list.writedate}</span>
                </div>
              </div>
            ) : (
              <div
                className={s.post}
                key={idx}
                onClick={() => navigate(`/communityView/${seq}/${list[seq]}`)}
              >
                <div className={s.flag}></div>
                <div className={s.title}>{list.title}</div>
                <div className={s.content}>{list.content}</div>
                <div className={s.writer}>{list.writer}</div>
                <div className={s.readcount}>
                  <div>
                    <img src="/api/images/eye.png" alt="조회수" />
                    <span className={s.count}>{list.readcount}</span>
                  </div>
                  <span className={s.date}>{list.writedate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Community;
