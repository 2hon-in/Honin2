import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction, logoutAction } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeCookie } from '../util/cookieUtil';
import s from "../style/layout/header.module.css";
import logo from "../../assets/images/honin.PNG";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.user.accessToken);

    function onLogout() {
        dispatch(logoutAction());
        removeCookie("user");
        navigate('/');
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.menu_bar}>
                    <div className={s.logo} onClick={() => { navigate("/") }}>
                        <img src={logo} alt="logo"/>
                    </div>
                    <ul className={s.menu}>
                        <li><div className={s.menu_item} onClick={() => { navigate("/community") }}>커뮤니티</div></li>
                        <li><div className={s.menu_item} onClick={() => { navigate("/ncareer") }}>소식지</div></li>
                        <li><div className={s.menu_item} onClick={() => { navigate("/restaurant") }}>맛집추천</div></li>
                        <li><div className={s.menu_item} onClick={() => { navigate('/secondhand') }}>중고거래</div></li>
                    </ul>
                    <div className={s.buttons}>
                        {!loginUser ? (
                            <>
                                <button className={s.login} onClick={() => { navigate('/login/sign_in') }}>로그인</button>
                                <button className={s.signup} onClick={() => { navigate('/join/sign_up') }}>회원가입</button>
                            </>
                        ) : (
                            <>
                                <button className={s.login} onClick={() => { onLogout() }}>로그아웃</button>
                                <button className={s.signup} onClick={() => { navigate('') }}>마이페이지</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;