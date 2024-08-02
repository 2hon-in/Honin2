import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode  from 'react-daum-postcode'
import Modal from "react-modal"
import jaxios from '../util/jwtUtil'

function Join() {

    const [userid, setUserid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [profilemsg, setprofilemsg] = useState('');
    const [snsid, setSnsid] = useState('');
    const [provider, setProvider] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [zipnum, setZipnum] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});

    const [userCode, setUsercode] = useState("");
    const [message, setMessage] = useState('');
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const completeHandler = (data) =>{
        setZipnum(data.zonecode);
        setAddress1(data.address);
        setIsOpen(false);
    }

    async function sendMail(){
        if(!email){
            return window.alert("이메일을 입력해주세요..");
        }
        try{
            const result = await jaxios.post("/api/member/sendMail", null, {params:{email:email}})
            if(result.data.message == "OK"){
                setUsercode(result.data.number);
                window.alert("이메일이 전송되었습니다. 해당 이메일의 수신내역을 확인하세요.");
                console.log(`result.data.number : ` + result.data.number);
            }
        }catch(err){
            console.error(err);
        }
    }

    async function codeCheck(){
        
        try{
            const result = await jaxios.post("/api/member/codeCheck", null, {params:{userCode:userCode}})
            setMsg(result.data.message);
        }catch(err){
            //setMsg(result.data.message);
            console.error(err);
        }
    }


    async function onSubmit(){
        if(userid==''){return alert('아이디를 입력하세요')}
        if(email==''){ return alert('이메일을 입력하세요');}
        if(password==''){ return alert('패스워드를 입력하세요');}
        if(password!==pwdChk){ return alert('패스워드 확인이 일치하지 않습니다');}
        if(nickname==''){ return alert('닉네임을 입력하세요');}

        try{
            let result = await jaxios.post('/api/member/emailcheck', null, {params:{email}} );
            if(result.data.msg == 'no' ){
                return alert('이메일이 중복됩니다');
            }

            result = await jaxios.post('/api/member/nicknamecheck', null, {params:{nickname}} );
            if(result.data.msg == 'no' ){
                return alert('닉네임이 중복됩니다');
            }

            result = await jaxios.post('/api/member/join', 
                {
                    username:userid, email, password, nickname, phone, profilemsg, profileimg:imgSrc, address1, address2, address3, zipnum
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
        const result = await jaxios.post('/api/member/fileupload', formData);
        setImgSrc(`http://localhost:8070/uploads/${result.data.filename}`);
        setImgStyle({display:"block", width:"200px"});
    }

    return (
        <div className='loginform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>Member Join</div>
            <div className='field'>
                <label>Userid</label>
                <input type="text" value={userid} onChange={
                    (e)=>{ setUserid( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>E-MAIL</label>
                <input type="text" value={email} onChange={
                    (e)=>{ setEmail( e.currentTarget.value ) }
                }/>
                <div style={{flex:"9", display:"flex"}}>
                        <input type="text" value={email}  style={{flex:"1"}} onChange={(e)=>{
                            setEmail( e.currentTarget.value );
                        }}/>
                        <button style={{flex:"1"}} onClick={()=>{
                            sendMail()
                        }}>SEND MAIL</button>
                        <label style={{textAlign:"right", marginRight:"10px"}}>Code</label>
                        <input style={{flex:"1"}} type="text" value={userCode} onChange={(e)=>{
                            setUsercode(e.currentTarget.value);
                        }}></input>
                        <button style={{flex:"1"}} onClick={()=>{codeCheck()}}>코드확인</button>
                        <div style={{flex:"1", color:"blue", lineHeight:"30px"}}>&nbsp;&nbsp;{msg}</div>
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
            <div className="field">
                <label>Zip num</label>
                <input type="text" style={{flex:"2"}} value={zipnum} onChange={(e)=>{
                    setZipnum( e.currentTarget.value );
                }} readOnly/>
                <button style={{flex:"1"}} onClick={()=>{toggle()}}>우편번호 찾기</button>
                <div style={{flex:"2"}}></div>
            </div>
                <div>
                   <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                       <DaumPostcode onComplete={completeHandler}></DaumPostcode><br></br>
                       <button onClick={()=>{setIsOpen(!isOpen)}}>닫기</button>
                   </Modal>
               </div>
                <div className="field" >
                   <label>Address</label>
                   <input type="text" value={address1} onChange={(e)=>{
                       setAddress1( e.currentTarget.value );
                   }} readOnly/>
               </div>
                   <div className="field">
                   <label>detail Address</label>
                   <input type="text" value={address2} onChange={(e)=>{
                       setAddress2( e.currentTarget.value );
                   }} placeholder='상세주소 입력'/>
                   </div>
               <div className="field">
                   <label>extra Address</label>
                   <input type="text" value={address3} onChange={(e)=>{
                        setAddress3( e.currentTarget.value );
                    }}/>
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
    </div>
    )

}


export default Join
