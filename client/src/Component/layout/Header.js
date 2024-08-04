import React from 'react'
import {useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();

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
                    <div class="menu-item" onClick={()=>{navigate('/secondhand')}}>중고거래</div>
                    <div class="buttons">
                        <button class="login" onClick={()=>{navigate('/login')}}>로그인</button>
                        <button class="signup" onClick={()=>{navigate('/join')}}>회원가입</button>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Header
