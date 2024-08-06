import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

import s from "../style/NCareer.module.css"

function NCareer() {
  return (
    <>
      <Header></Header>
          <div className={s.container}>
            <aside className={s.sidebar}>
                <h2>취업정보 및 청년정책</h2>
                <p>취업정보와 청년정책에 대한 내용을 확인 가능합니다.</p>
                <nav>
                    <ul>
                        <li className={s.active}>취업정보</li>
                        <li>청년정책</li>
                    </ul>
                </nav>
            </aside>
            <main className={s.content}>
                <article className={s.post}>
                    <div className={s.post_rank}>1</div>
                    <div className={s.post_details}>
                        <div className={s.post_author}>
                            <img src="author1.jpg" alt="author1" />
                            <span>작성자 이름</span>
                        </div>
                        <h3>Java Spring Boot에서 If-Else문 줄이기</h3>
                        <p>If-else 문은 흔하지만 남용되면 복잡하고 유지보수가 어려운 코드로 이어질 수...</p>
                        <div className={s.post_stats}>
                            <span>좋아요 185</span>
                            <span>저장 327</span>
                        </div>
                    </div>
                </article>
            </main>
        </div>
      <Footer></Footer>
    </>
  )
}

export default NCareer
