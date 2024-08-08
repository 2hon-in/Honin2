import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import s from "./style/main.module.css"
import "./style/reset.css"
function Main() {

  const leftList = [
        { category: '일반', text: '(힙X) 방시혁 근황..', comments: 2 },
        { category: '음악', text: '스티키마피아', comments: 1 },
        { category: '일반', text: '노래방에서 부를 노래 추천좀요', comments: 1 },
        { category: '음악', text: '빈지노 작업물 뜬거같은데요', comments: 3 },
        { category: '일반', text: '그냥벌언', comments: 4 },
        { category: '음악', text: '저만 화나랑 화지랑 헷갈리나요', comments: 8 },
        { category: '음악', text: '챗 지피티 이상네요', comments: 1 },
        { category: '인증/후기', text: 'bomm cd 샀는데', comments: 1 }
    ];

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

    return (
      <>
        <Header></Header>
          <div className={s.main_banner}>
            <img src = "/api/images/main.jpg" />
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
                            <ul className={s.list}>
                                {leftList.map((item, index) => (
                                    <li key={index} className={s.listItem}>
                                        <div>
                                            <span className={`${s.category}`}>{item.category}</span> &nbsp; &nbsp; &nbsp;
                                            {item.text} 
                                        </div>
                                        
                                        <span>[{item.comments}]</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={s.rightColumn}>
                            <div className={s.title}>인기글</div>
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
                <img src = "/api/images/banner.jpg" />  
                <br /><br />
            </div>
          </section>
        <Footer></Footer>
      </>
    )
}

export default Main
