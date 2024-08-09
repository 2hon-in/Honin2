import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, setFollowers, setFollowings } from "../store/userSlice";
import jaxios from "../util/jwtUtil";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { setCookie, getCookie } from "../util/cookieUtil";
import s from "../style/member/loginForm.module.css";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import axios from "axios";
import kakaoLogo from "../../assets/images/kakao_brown.png"
import naverLogo from "../../assets/images/naver_white.png"
// import "../style/member/login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 로그인 성공 후 로그인을 요청한 페이지로 돌아가기 위해 사용하는 기능입니다.
  const location = useLocation();
  // state에 로그인을 요청한 페이지의 주소를 갖는 객체를 설정합니다.
  // state값이 존재한다면 state 객체의 from에 담겨진 주소를 from 변수에 저장합니다.
  // state값이 없다면 "/" 메인으로 이동합니다.
  const from = location.state?.from|| '/';
  const {state} = useParams();
  
  // state변수의 값에 따라 어떤 화면을 표시할지 결정합니다.
  // 헤더의 로그인, 회원가입 버튼을 누를때마다 각각 sign_in, sign_up이 전달됩니다.
  useEffect(() => {
    console.log("전달받은 state : ", state);
    if(state === "sign_in"){
      const timer = setTimeout(() => {
        setToggleClass(`${s.container} ${s.sign_in}`);
      }, 200);
      return () => clearTimeout(timer);
    }else{
      const timer = setTimeout(() => {
        setToggleClass(`${s.container} ${s.sign_up}`);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state]);

  //회원가입용 state 변수
  const [email, setEmail] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [pwdChk, setPwdChk] = useState("");
  const [joinNickname, setJoinNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilemsg, setprofilemsg] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [zipnum, setZipnum] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgStyle, setImgStyle] = useState({
    display: "flex",
    alignItems: "center",
    justtifyConetent: "center",
  });
  const [userCode, setUsercode] = useState("");
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //로그인용 state 변수
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [toggleClass, setToggleClass] = useState("s.container");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 우편검색 모달창의 스타일을 설정하는 객체
  const customStyles = {
    overlay: {
      backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
    },
    content: {
      left: "-50%",
      margin: "auto",
      width: "500px",
      height: "50%",
      padding: "0",
      overflow: "hidden",
    },
  };

  const completeHandler = (data) => {
    setZipnum(data.zonecode);
    setAddress1(data.address);
    setIsOpen(false);
  };

  // 이메일 인증코드를 발신하는 함수
  const sendMail = async () => {
    if (!email) {
      return window.alert("이메일을 입력해주세요");
    }
    try {
      const result = await jaxios.post("/api/member/sendMail", null, {
        params: { email: email },
      });
      if (result.data.message == "OK") {
        setUsercode(result.data.number);
        window.alert(
          "이메일이 전송되었습니다. 해당 이메일의 수신내역을 확인하세요."
        );
        console.log(`result.data.number : ` + result.data.number);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 이메일 인증코드를 검증하는 함수
  const codeCheck = async () => {
    try {
      const result = await jaxios.post("/api/member/codeCheck", null, {
        params: { userCode: userCode },
      });
      setMsg(result.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // 로그인 검증 함수
  const onSubmit = async () => {
    if (nickname === "") {
      return alert("닉네임을 입력하세요");
    }
    if (email === "") {
      return alert("이메일을 입력하세요");
    }
    if (password === "") {
      return alert("패스워드를 입력하세요");
    }
    if (password !== pwdChk) {
      return alert("패스워드 확인이 일치하지 않습니다");
    }

    try {
      let result = await jaxios.post("/api/member/emailcheck", null, {
        params: { email },
      });
      if (result.data.msg === "no") {
        return alert("이메일이 중복됩니다");
      }

      result = await jaxios.post("/api/member/nicknamecheck", null, {
        params: { nickname },
      });
      if (result.data.msg === "no") {
        return alert("닉네임이 중복됩니다");
      }

      result = await jaxios.post("/api/member/join", {
        email,
        password,
        nickname,
        phone,
        profilemsg,
        profileimg: imgSrc,
        address1,
        address2,
        address3,
        zipnum,
      });
      if (result.data.msg === "ok") {
        alert("회원 가입이 완료되었습니다. 로그인하세요");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 회원가입시 프로필 이미지사진을 올리는 함수
  async function fileupload(e) {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const result = await jaxios.post("/api/member/fileupload", formData);
    console.log(result.data);
    setImgSrc(`/api/uploads/${result.data.savefilename}`);
    setImgStyle({ display: "block", width: "200px" });
  }

  // 로그인용

  const toggleClassName = () => {
    if (toggleClass === `${s.container} ${s.sign_in}`) {
      setToggleClass(`${s.container} ${s.sign_up}`);
    } else {
      setToggleClass(`${s.container} ${s.sign_in}`);
    }
  };

  const onLoginLocal = async () => {
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

        navigate(from);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header></Header>
      <div id="container" className={toggleClass}>
        {/* FORM SECTION */}
        <div className={s.row}>
          {/* SIGN UP */}
          <div
            className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_up}`}
          >
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_up}`}>
                <div className={s.flex_box_col}>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Id"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="password"
                      placeholder="Retype Pass"
                      value={pwdChk}
                      onChange={(e) => {
                        setPwdChk(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <div className={`${s.flex_box_row} ${s.email_box}`}>
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.currentTarget.value);
                        }}
                      />
                      <button onClick={() => {sendMail()}}>
                        이메일 인증
                      </button>
                    </div>
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <div className={`${s.flex_box_row} ${s.email_box}`}>
                      <input
                        type="text"
                        placeholder="User code"
                        value={userCode}
                        onChange={(e) => {
                          setUsercode(e.currentTarget.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          codeCheck();
                        }}
                      >
                        코드확인
                      </button>
                    </div>
                  </div>
                  <div style={{ flex: "1", color: "blue", fontSize: "1rem" }}>
                      &nbsp;&nbsp;{msg}
                  </div>
                </div>
                <div className="form_flex">
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Post number"
                      style={{ flex: "2" }}
                      value={zipnum}
                      onChange={(e) => {
                        setZipnum(e.currentTarget.value);
                      }}
                      readOnly
                    />
                    <button
                      style={{ flex: "1" }}
                      onClick={() => {
                        toggle();
                      }}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <div className={s.field}>
                    <div style={{ flex: "2" }}></div>
                  </div>
                  <div>
                    <Modal
                      isOpen={isOpen}
                      ariaHideApp={false}
                      style={customStyles}
                    >
                      <DaumPostcode onComplete={completeHandler}></DaumPostcode>
                      <br></br>
                      <button
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                      >
                        닫기
                      </button>
                    </Modal>
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Address"
                      value={address1}
                      onChange={(e) => {
                        setAddress1(e.currentTarget.value);
                      }}
                      readOnly
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Detail Address"
                      value={address2}
                      onChange={(e) => {
                        setAddress2(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Extra Address"
                      value={address3}
                      onChange={(e) => {
                        setAddress3(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="Profile Message"
                      value={profilemsg}
                      onChange={(e) => {
                        setprofilemsg(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={s.field}>
                    <label>Profile img</label>
                    <div className={s.field}>
                      <input
                        type="file"
                        onChange={(e) => {
                          fileupload(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={s.field} style={{ alignItems: "flex-start" }}>
                    <label>Profile img preview</label>
                    <div className={s.field}>
                      <div>
                        <img src={imgSrc} style={imgStyle} />
                      </div>
                    </div>
                  </div>
                  <button onClick={()=>onSubmit()}>회원가입</button>
                </div>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div
            className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_in}`}
          >
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_in}`}>
                  <div className={`${s.input_group} ${s.sign_in}`}>
                      <input
                        type="text"
                        placeholder="아이디"
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.currentTarget.value);
                        }}
                      />
                  </div>
                  <div className={`${s.input_group} ${s.sign_in}`}>
                      <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.currentTarget.value);
                        }}
                      />
                  </div>
                <button
                  className={s.login_btn}
                  onClick={() => {
                    onLoginLocal();
                  }}
                >
                  로그인
                </button>
                <div className={s.snslogin}>
                  <button
                    className={s.kakao}
                    onClick={() => {
                      window.location.href = "/api/member/kakaostart";
                    }}
                  >
                    <img src={kakaoLogo} alt="카카오 로그인" />
                  </button>
                  <button
                    className={s.naver}
                    onClick={() => {
                      window.location.href = "/api/member/naverstart";
                    }}
                  >
                    <img src={naverLogo} alt="네이버 로그인" />
                  </button>
                </div>
                <button
                  className={s.join_btn}
                  // onClick={() => toggleClassName()}
                  onClick={() =>navigate("/join/:sign_up")}
                >
                  회원가입
                </button>
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
