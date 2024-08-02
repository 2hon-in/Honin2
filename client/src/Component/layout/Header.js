import React from 'react'

function Header() {
    return (
        <div>
            <body>
                <div class="menu-bar">
                    <div class="logo">
                        <img src="http://localhost:8070/images/honin.png" style={{width:"70px", height:"50px", lineHeight:"50px", cursor:"pointer"}}/>
                    </div>
                    <div class="menu-item" style={{marginLeft:"50px"}}>커뮤니티</div>
                    <div class="menu-item">소식지</div>
                    <div class="menu-item">우리동네맛집</div>
                    <div class="menu-item">중고거래</div>
                    <div class="buttons">
                        <button class="login">로그인</button>
                        <button class="signup">회원가입</button>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Header
