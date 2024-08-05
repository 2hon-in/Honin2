import React from 'react'
import s from "../style/footer.module.css"

function Footer() {
    return (
        <>
            <footer>
                <div className={s.footer_links}>
                    <a href="#">서비스 소개</a>
                    <span>|</span>
                    <a href="#">이용약관</a>
                    <span>|</span>
                    <a href="#">디렉토리</a>
                    <span>|</span>
                    <a href="#">개인정보 처리방침</a>
                    <span>|</span>
                    <a href="#">인재채용</a>
                    <span>|</span>
                    <a href="#">블라인드 기업서비스</a>
                    <span>|</span>
                    <a href="#">신고가이드</a>
                </div>
                <div className={s.footer_info}>
                    <p>직업정보제공사업 신고번호 : J12000202300022</p>
                    <p>&copy; 2023 Teamblind. Inc</p>
                </div>
                <div className={s.footer_buttons}>
                    <button onclick="window.location.href='https://apps.apple.com/app'">APP STORE</button>
                    <button onclick="window.location.href='https://play.google.com/store'">GOOGLE PLAY</button>
                </div>
            </footer>
        </>
    )
}

export default Footer
