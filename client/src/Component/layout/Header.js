import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAction, logoutAction } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeCookie, getCookie, setCookie } from '../util/cookieUtil'
import s from "./style/header.module.css"
function Header() {

    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logoutAction());
        removeCookie("user")
        navigate('/');
    }


    return (

        <div>
            <div className={s.menu-bar}>
                <div className={s.logo} onClick={() => { navigate("/") }}>
                    <img src="http://localhost:8070/images/honin.png" style={{ width: "70px", height: "50px", lineHeight: "50px", cursor: "pointer" }} />
                </div>
                <div className={s.menu-item} style={{ marginLeft: "50px" }} onClick={() => { navigate("/community") }}>커뮤니티</div>
                <div className={s.menu-item}>소식지</div>
                <div className={s.menu-item}>우리동네맛집</div>
                <div className={s.menu-item} onClick={() => { navigate('/secondhand') }}>중고거래</div>
                <div className={s.buttons}>
                    {
                        (!loginUser) ? (<button className={s.login} onClick={() => { navigate('/login') }}>로그인</button>) :
                            (<button className={s.login} onClick={() => { onLogout() }}>로그아웃</button>)
                    }
                    <button className={s.signup} onClick={() => { navigate('/join') }}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Header
