import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setFollowers, setFollowings } from './store/userSlice';
import jaxios from './util/jwtUtil';
import { setCookie, getCookie } from "./util/cookieUtil"
import './style/form.css'


function Login() {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();  
    const navigate = useNavigate();

    async function onLoginLocal(){
        if(!nickname){return alert("이메일을 입력하세요");}
        if(!password){return alert("패스워드를 입력하세요");}
        try{
            const result = await jaxios.post('/api/member/loginlocal', null, {params:{username:nickname, password}} )
            if( result.data.error == 'ERROR_LOGIN' ){
                return alert("이메일 또는 패스워드 오류입니다");
            }else{
                console.log('result.data', result.data );
                dispatch( loginAction( result.data ) );
                setCookie("user", JSON.stringify(result.data), 1);
                
                navigate('/')
            }
            
        }catch(err){ console.error(err)}
    }

    return (
        <div className="form">
            <div className="fontlogo">Login</div>
            <div className='block'></div>
            <div className='inputform'>
                <div className='field'>
                    <label >Nickname</label>
                    <input type="text" value={nickname} onChange={(e)=>{ setNickname(e.currentTarget.value) }}/>
                </div>
                <div className='field'>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=>{ setPassword(e.currentTarget.value) }}/>
                </div>
            </div>
            <div className='block'></div>
            <div className='btns'>
                <button onClick={ ()=>{ onLoginLocal() } }>LOGIN</button>
                <button onClick={ ()=>{ navigate('/join') } }>JOIN</button>
            </div>
            <div className='snslogin'>
                <button onClick={()=>{
                    window.location.href='http://localhost:8070/member/kakaostart';
                }} style={{backgroundColor:"#fae100", color:"black"}}>KAKAO</button>
                <button onClick={()=>{
                    window.location.href='http://localhost:8070/member/naverstart'
                }}style={{backgroundColor:"#06cc80", color:"white"}}>NAVER</button>
            </div>
        </div>
    )
}

export default Login
