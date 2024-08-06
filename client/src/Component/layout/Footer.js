import React from 'react'
import s from "../style/layout/footer.module.css"

function Footer() {
    return (
        <div className={s.footerClass}>
            <p />
            <hr />
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
                    <a href="#">기업서비스</a>
                    <span>|</span>
                    <a href="#">신고가이드</a>
                </div>
                <div className={s.footer_info}>
                    <p>고객센터 번호 : 010-1234-5678</p>
                    <p>&copy; 2024 TeamHonin. Inc</p>
                </div>
                <div className={s.footer_buttons}>
                    <button onclick="window.location.href='/'">관리자</button>
                </div>
            </footer>
        </div>
    )
}

export default Footer
