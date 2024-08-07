import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, setFollowers, setFollowings } from "../store/userSlice";
import jaxios from "../util/jwtUtil";
import { setCookie, getCookie } from "../util/cookieUtil";
import s from "../style/member/loginForm.module.css";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
// import "../style/member/login.css";

function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleClass, setToggleClass] = useState(`{s.container}`);

  useEffect(() => {
    const timer = setTimeout(()=>{
        setToggleClass(`${s.container} ${s.sign_in}`)
    }, 200);
    return ()=>clearTimeout(timer);
  }, []);

  const toggle = () => {
    if (toggleClass === `${s.container} ${s.sign_in}`) {
      setToggleClass(`${s.container} ${s.sign_up}`);
    } else {
      setToggleClass(`${s.container} ${s.sign_in}`);
    }
  };

  async function onLoginLocal() {
    if (!nickname) {
      return alert("이메일을 입력하세요");
    }
    if (!password) {
      return alert("패스워드를 입력하세요");
    }
    try {
      const result = await jaxios.post("/api/member/loginlocal", null, {
        params: { username: nickname, password },
      });
      if (result.data.error == "ERROR_LOGIN") {
        return alert("이메일 또는 패스워드 오류입니다");
      } else {
        console.log("result.data", result.data);
        dispatch(loginAction(result.data));
        setCookie("user", JSON.stringify(result.data), 1);

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  
    /* <>
    <div className={s.section}>
    <Header/>
    <div className={s.form}>
        <div className={s.fontlogo}>Login</div>
        <div className={s.block}></div>
        <div className={s.inputform}>
            <div className={s.field}>
                <label >Nickname</label>
                <input type="text" value={nickname} onChange={(e)=>{ setNickname(e.currentTarget.value) }}/>
            </div>
            <div className={s.field}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>{ setPassword(e.currentTarget.value) }}/>
            </div>
        </div>
        <div className={s.block}></div>
        <div className={s.btns}>
            <button onClick={ ()=>{ onLoginLocal() } }>LOGIN</button>
            <button onClick={ ()=>{ navigate('/join') } }>JOIN</button>
        </div>
        <div className={s.snslogin}>
            <button onClick={()=>{
                window.location.href='http://localhost:8070/member/kakaostart';
            }} style={{backgroundColor:"#fae100", color:"black"}}>KAKAO</button>
            <button onClick={()=>{
                window.location.href='http://localhost:8070/member/naverstart'
            }}style={{backgroundColor:"#06cc80", color:"white"}}>NAVER</button>
        </div>
    </div>
    </div>
    <Footer/>
    </> */
  
  return (
    <>
    <Header></Header>
      <div id="container" className={toggleClass}>
        {/* FORM SECTION */}
        <div className={s.row}>
          {/* SIGN UP */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_up}`}>
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_up}`}>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bxs_user}`}></i>
                  <input type="text" placeholder="Username" />
                </div>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bx_mail_send}`}></i>
                  <input type="email" placeholder="Email" />
                </div>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bxs_lock_alt}`}></i>
                  <input type="password" placeholder="Password" />
                </div>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bxs_lock_alt}`}></i>
                  <input type="password" placeholder="Confirm password" />
                </div>
                <button>Sign up</button>
                <p>
                  <span> Already have an account? </span>
                  <b onClick={() => toggle()} className={s.pointer}>
                    {" "}
                    Sign in here{" "}
                  </b>
                </p>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_in}`}>
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_in}`}>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bxs_user}`}></i>
                  <input type="text" placeholder="Username" value={nickname} onChange={(e)=>{ setNickname(e.currentTarget.value) }}/>
                </div>
                <div className={s.input_group}>
                  <i className={`${s.bx} ${s.bxs_lock_alt}`}></i>
                  <input type="password" placeholder="Password" value={password} onChange={(e)=>{ setPassword(e.currentTarget.value) }}/>
                </div>
                <button onClick={ ()=>{ onLoginLocal() } }>LOGIN</button>
                <div className={s.snslogin}>
                    <button onClick={()=>{
                        window.location.href='/api/member/kakaostart';
                    }}>KAKAO</button>
                    <button onClick={()=>{
                        window.location.href='/api/member/naverstart'
                    }}>NAVER</button>
                </div>
                <p>
                  <b> Forgot password? </b>
                </p>
                <p>
                  <span> Don't have an account? </span>
                  <b onClick={() => toggle()} className={s.pointer}>
                    {" "}
                    Sign up here{" "}
                  </b>
                </p>
              </div>
            </div>
            <div className={s.form_wrapper}></div>
          </div>
          {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className={`${s.row} ${s.content_row}`}>
          {/* SIGN IN CONTENT */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col}`}>
            <div className={`${s.text} ${s.sign_in}`}>
              <h2>Welcome</h2>
            </div>
            <div className={`${s.img} ${s.sign_in}`}></div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col}`}>
            <div className={`${s.img} ${s.sign_up}`}></div>
            <div className={`${s.text} ${s.sign_up}`}>
              <h2>Join with us</h2>
            </div>
          </div>
          {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
      </div>
    </>
  );
}

export default Login;
