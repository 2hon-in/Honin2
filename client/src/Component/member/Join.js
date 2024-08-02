import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [profilemsg, setprofilemsg] = useState('');
    const [snsid, setSnsid] = useState('');
    const [userstate, setUsestate] =  useState("Y");
    const [provider, setProvider] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [zipnum, setZipnum] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});



    const navigate = useNavigate();

    async function onSubmit(){
        if(email==''){ return alert('이메일을 입력하세요');}
        if(password==''){ return alert('패스워드를 입력하세요');}
        if(password!==pwdChk){ return alert('패스워드 확인이 일치하지 않습니다');}
        if(nickname==''){ return alert('닉네임을 입력하세요');}

        try{
            let result = await axios.post('/api/member/emailcheck', null, {params:{email}} );
            if(result.data.msg == 'no' ){
                return alert('이메일이 중복됩니다');
            }

            result = await axios.post('/api/member/nicknamecheck', null, {params:{nickname}} );
            if(result.data.msg == 'no' ){
                return alert('닉네임이 중복됩니다');
            }

            result = await axios.post('/api/member/join', 
                {
                    username, email, password, nickname, phone, profilemsg, profileimg:imgSrc, address1, address2, address3, zipnum
                });
            if(result.data.msg=='ok'){
                alert('회원 가입이 완료되었습니다. 로그인하세요');
                navigate('/');
            }
        }catch(err){
            console.error(err);
        }
    }

    async function fileupload(e){
        const formData = new FormData();
        formData.append('image',  e.target.files[0]);
        const result = await axios.post('/api/member/fileupload', formData);
        setImgSrc(`http://localhost:8070/uploads/${result.data.filename}`);
        setImgStyle({display:"block", width:"200px"});
    }

    return (
        <div className='loginform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>Member Join</div>
            <div className='field'>
                <label>E-MAIL</label>
                <input type="text" value={email} onChange={
                    (e)=>{ setEmail( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>PASSWORD</label>
                <input type="password" value={password} onChange={
                    (e)=>{ setPassword( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>RETYPE PASS</label>
                <input type="password" value={pwdChk} onChange={
                    (e)=>{ setPwdChk( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>NICKNAME</label>
                <input type="text"  value={nickname} onChange={
                    (e)=>{ setNickname( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>PHONE</label>
                <input type="text" value={phone} onChange={
                    (e)=>{ setPhone( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>INTRO</label>
                <input type="text" value={profilemsg} onChange={
                    (e)=>{ setprofilemsg( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>PROFILE-IMG</label>
                <input type="file" onChange={(e)=>{ fileupload(e) }}/>
            </div>
            <div className='field'>
                <label>Profile img preview</label>
                <div><img src={imgSrc} style={imgStyle} /></div>
            </div>

            <div className='btns'>
                <button onClick={ ()=>{   onSubmit()    }  }>JOIN</button>
                <button onClick={ ()=>{ navigate('/')   }  }>BACK</button>
            </div>

        </div>
    )
}

export default Join
