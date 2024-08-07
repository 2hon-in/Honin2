import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setFollowers, setFollowings } from '../store/userSlice';
import jaxios from '../util/jwtUtil';
import axios from 'axios';
import { setCookie, getCookie } from "../util/cookieUtil"
import s from '../style/member/login.module.css'
// import '../style/member/login.css'
import Footer from '../layout/Footer';
import Header from '../layout/Header';




function Login() {

    /* let container = document.getElementById('container')

    toggle = () => {
        container.classList.toggle('sign-in')
        container.classList.toggle('sign-up')
    }

    setTimeout(() => {
        container.classList.add('sign-in')
    }, 200) */
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onLoginLocal() {
        if (!nickname) { return alert("이메일을 입력하세요"); }
        if (!password) { return alert("패스워드를 입력하세요"); }
        try {
            const result = await axios.post('/api/member/loginlocal', null, { params: { username: nickname, password } })
            if (result.data.error == 'ERROR_LOGIN') {
                return alert("이메일 또는 패스워드 오류입니다");
            } else {
                console.log('result.data', result.data);
                dispatch(loginAction(result.data));
                setCookie("user", JSON.stringify(result.data), 1);

                navigate('/')
            }

        } catch (err) { console.error(err) }
    }

    return (
        <>
            <Header />


            {/* <div id="container" className="container">
                <div className="row">
                    <div className="col align-items-center flex-col sign-up">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-up">
                                <div className="input-group">
                                    <i class='bx bxs-user'></i>
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="input-group">
                                    <i class='bx bx-mail-send'></i>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="input-group">
                                    <i class='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div className="input-group">
                                    <i class='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="Confirm password" />
                                </div>
                                <button>
                                    Sign up
                                </button>
                                <p>
                                    <span>
                                        Already have an account?
                                    </span>
                                    <b onclick="toggle()" className="pointer">
                                        Sign in here
                                    </b>
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="col align-items-center flex-col sign-in">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-in">
                                <div className="input-group">
                                    <i class='bx bxs-user'></i>
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="input-group">
                                    <i class='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="Password" />
                                </div>
                                <button>
                                    Sign in
                                </button>
                                <p>
                                    <b>
                                        Forgot password?
                                    </b>
                                </p>
                                <p>
                                    <span>
                                        Don't have an account?
                                    </span>
                                    <b onclick="toggle()" className="pointer">
                                        Sign up here
                                    </b>
                                </p>
                            </div>
                        </div>
                        <div className="form-wrapper">

                        </div>
                    </div>
                </div>
                <div className="row content-row">
                    <div className="col align-items-center flex-col">
                        <div className="text sign-in">
                            <h2>
                                Welcome
                            </h2>

                        </div>
                        <div className="img sign-in">

                        </div>
                    </div>
                    <div className="col align-items-center flex-col">
                        <div className="img sign-up">

                        </div>
                        <div className="text sign-up">
                            <h2>
                                Join with us
                            </h2>

                        </div>
                    </div>
                </div>
            </div> */}

            <div className={s.section}>
                <div className={s.form}>
                    <div className={s.fontlogo}>Login</div>
                    <div className={s.block}></div>
                    <div className={s.inputform}>
                        <div className={s.field}>
                            <label >Nickname</label>
                            <input type="text" value={nickname} onChange={(e) => { setNickname(e.currentTarget.value) }} />
                        </div>
                        <div className={s.field}>
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} />
                        </div>
                    </div>
                    <div className={s.block}></div>
                    <div className={s.btns}>
                        <button onClick={() => { onLoginLocal() }}>LOGIN</button>
                        <button onClick={() => { navigate('/join') }}>JOIN</button>
                    </div>
                    <div className={s.snslogin}>
                        <button onClick={() => {
                            window.location.href = 'http://localhost:8070/member/kakaostart';
                        }} style={{ backgroundColor: "#fae100", color: "black" }}>KAKAO</button>
                        <button onClick={() => {
                            window.location.href = 'http://localhost:8070/member/naverstart'
                        }} style={{ backgroundColor: "#06cc80", color: "white" }}>NAVER</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
