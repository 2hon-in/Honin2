import React from 'react'
import {useNavigate } from 'react-router-dom'
import { loginAction, logoutAction } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {removeCookie, getCookie, setCookie} from '../util/cookieUtil'

function Header() {

    const navigate = useNavigate();
    const loginUser = useSelector(state=>state.user);
    const dispatch = useDispatch();

    function onLogout(){
        dispatch( logoutAction() );
        removeCookie("user")
        navigate('/'); 
    }


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
                        {
                            (!loginUser)?(<button class="login" onClick={()=>{navigate('/login')}}>로그인</button>):
                            (<button class="login" onClick={()=>{onLogout()}}>로그아웃</button>)
                        }
                        <button class="signup" onClick={()=>{navigate('/join')}}>회원가입</button>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Header
