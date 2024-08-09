import React, { useEffect, useState } from "react";
import Header from './layout/Header'
import Footer from './layout/Footer'
import s from "./style/main.module.css"
import "./style/reset.css"
import jaxios from "./util/jwtUtil";
import { useNavigate } from "react-router-dom";
import main from "../assets/images/main.jpg";
import banner from "../assets/images/banner.jpg";

function Main() {
    const rightList = [
        { rank: 1, text: '솔직히 giggles는 트랩맨 보면 꽤 오글거림', comments: 6 },
        { rank: 2, text: '"unreviewable 2"', comments: 3 },
        { rank: 3, text: '근데 파란눈은 왜케 반캠을 사랑하나요', comments: 6 },
        { rank: 4, text: '나스 덥 유명함? 앨범들 질문', comments: 12 },
        { rank: 5, text: 'Joey Valence & Brae - PUNK TACTICS', comments: 3 },
        { rank: 6, text: '자살률이 높다는 건 죽을 일이 자살밖에 없다는 거지', comments: 7 },
        { rank: 7, text: '벽서2 디지털 앨범 구매했는데', comments: 1 },
        { rank: 8, text: 'Vultures 2 국내 나왔나요?', comments: 4 },
        { rank: 9, text: '포터 로빈슨의 2번째 단독 내한', comments: 12 },
        { rank: 10, text: '인스타 밴먹은 clayboi party', comments: 3 }
    ];

    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [topPostList, setTopPostList] = useState([]);
    const [category, setCategory] = useState("자유게시판");
    const [postList, setPostList] = useState([]);
    const [seq, setSeq] = useState("cfnum");
    const maxLength = 30; // 최대 길이 설정

    // useEffect(() => {
    //     jaxios.get(`/api/notice/getLikesTopList`)
    //         .then((result) => {
    //             console.log(result.data.topPostList);
    //             setTopPostList(result.data.topPostList);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, []);

    useEffect(() => {
        jaxios.get("/api/community/getPostList/" + "자유게시판")
          .then(res => {
            setPostList(res.data.postList);
          })
          .catch(err => console.error(err));
    
        jaxios.get("/api/community/getCommunityCategoryList")
          .then(res => {
            setCategoryList(res.data.categoryList);
          })
          .catch(err => console.error(err));
    },[]);

    useEffect(() => {
    jaxios.get(`/api/community/getPostList/${category}`)
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

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
      <>
        <Header></Header>
          <div className={s.main_banner}>
            {/* <img className={s.imageMain} src = "/api/images/main.jpg" /> */}
            <img src={main} alt="main"/>

            <div className={s.textOverlay}>
                <h1><span className={s.spanColor}>혼</span>자사는<br /> <span className={s.spanColor}>인</span>싸들</h1>
                <p>혼자 사는 사람들을 위한 커뮤니티 사이트</p>
                <div className={s.buttonContainer}>
                    <button className={s.button}>맛집 추천 바로가기</button>
                    <button className={s.button}>중고 거래 바로가기</button>
                </div>
            </div>
          </div>

          <section>
              <div className={s.container}>
                <br /><br />

                <div className={s.communityTitle}><span>COMMUNITY</span></div>
                <br /><br />
                <p/>

                <div className={s.section}>
                    <div className={s.columns}>
                        <div className={s.leftColumn}>
                            <div className={s.title}>신규 게시글</div>

                            <div className={s.category_btn}>
                                {
                                    categoryList.map((cList, idx) => {
                                    return (
                                        (
                                        cList === category
                                        ) ? (
                                        <button className={s.selected_btn} onClick={() => changeCategory(cList)} key={idx}>
                                            {cList} &nbsp; &nbsp; &nbsp;
                                        </button>
                                        ) : (
                                        <button onClick={() => changeCategory(cList)} key={idx}>
                                            {cList} &nbsp; &nbsp; &nbsp;
                                        </button>
                                        )
                                    )
                                    })
                                }
                            </div>

                            {/* 추가 */}
                            <div className={s.posts}>
                                {
                                    postList.map((list, idx) => {
                                    return (
                                        (
                                        list.readcount > 300
                                        ) ? (
                                        <div className={s.post} key={idx}>
                                            <div className={s.flag}><span className={s.hot}>HOT</span></div>
                                            <div className={s.contentTitle} onClick={()=>navigate(`/communityView/${seq}/${list[seq]}`)}>
                                                {truncateText(list.title, maxLength)}
                                            </div>
                                            <div className={s.replyCount}><span>[{list.readcount}]</span></div>
                                        </div>
                                        ) : (
                                        <div className={s.post} key={idx} >
                                            <div className={s.flag}><span className={s.normal}>일반</span></div>
                                            <div className={s.contentTitle} onClick={()=>navigate(`/communityView/${seq}/${list[seq]}`)}>
                                                 {truncateText(list.title, maxLength)}
                                            </div>
                                            <div className={s.replyCount}><span>[{list.readcount}]</span></div>
                                        </div>
                                        )
                                    )
                                    })
                                }
                            </div>
                        </div>

                        <div className={s.rightColumn}>
                            <div className={s.title}><span className={s.spanHot}>HOT</span> 게시글</div>
                            {/* 라이크 4개 테이블 조회 [뷰로 만들어서] 전체 순위 매기기 (1~10등) */}
                            <ul className={s.list}>
                                {rightList.map((item, index) => (
                                    <li key={index} className={s.listItem}>
                                        <div>
                                            {item.rank}. {item.text}
                                        </div>
                                        <span>[{item.comments}]</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.imageDiv}>
                {/* <img src = "/api/images/banner.jpg" />   */}
                <img src={banner} alt="banner"/>
                <br /><br />
            </div>
          </section>
        <Footer></Footer>
      </>
    )
}

export default Main
