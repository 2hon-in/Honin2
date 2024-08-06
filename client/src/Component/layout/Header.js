import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction, logoutAction } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeCookie } from '../util/cookieUtil';
import s from "../style/layout/header.module.css";

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
        <div>
            <div className={s.menu_bar}>
                <div className={s.logo} onClick={() => { navigate("/") }}>
                    <img src="/api/images/honin.png" alt="logo"/>
                </div>
                <div className={s.menu_item} onClick={() => { navigate("/community") }}>커뮤니티</div>
                <div className={s.menu_item} onClick={() => { navigate("/ncareer") }}>소식지</div>
                <div className={s.menu_item} onClick={() => { navigate("/restaurant") }}>우리동네맛집</div>
                <div className={s.menu_item} onClick={() => { navigate('/secondhand') }}>중고거래</div>
                <div className={s.menu_item} onClick={() => { navigate('/mypage') }}>마이페이지</div>
                <div className={s.buttons}>
                    {!loginUser ? (
                        <button className={s.login} onClick={() => { navigate('/login') }}>로그인</button>
                    ) : (
                        <button className={s.login} onClick={() => { onLogout() }}>로그아웃</button>
                    )}
                    <button className={s.signup} onClick={() => { navigate('/join') }}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default Header;