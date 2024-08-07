import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css'

function UpdateSecondhand() {
    const navigate = useNavigate();
    const [secondhand, setSecondhand] = useState({});
    const [imgList, setImgList] = useState([]);
    const loginUser = useSelector(state=>state.user.accessToken);
    const {num} = useParams();

    // useEffect(()=>{

    //     if(loginUser.accessToken==null){
    //         alert("로그인이 필요한 서비스입니다");
    //         navigate('/login')
    //     }

    // }, [])

    async function onsubmit(){
        if(!title){
            return window.alert("내용을 입력하세요");
        }

        if(!price){
            return window.alert("내용을 입력하세요");
        }

        if(!content){
            return window.alert("내용을 입력하세요");
        }

        if(!imgList){
            return window.alert("");
        }
        const result = await jaxios.post("/api/posts/insertPost", {content:content, writer:lUser.nickname})
        let postid = result.data.id;
        console.log(`result.data.postid : ${postid}`);

        for(let i=0; i<imgList.length; i++){
           const res = await jaxios.post("/api/posts/insertImages", null, {postid:postid, savefilename:imgList[i]})
        }
        window.alert("");
        navigate("/main");
    }


    return (

        <>
        <Header/>
        <div className={s.section}>
        <div className={s.block}></div>
        <div className={s.UpdateSecondhand}>
            <div className={s.field_title}>
                <div>{secondhand.title}</div>
            </div>
            <div className={s.mainfield}>
                <div>
                    <img src={`http://localhost:8070/uploads/${secondhand.savefilename}`} style={{width:"400px"}} />
                </div>
            </div>
            <div className={s.field}>
                <label>작성자</label><div>{secondhand.seller}</div>
            </div>
            <div className={s.field}>
                <label>판매상태</label>
                {
                    (secondhand.state=='Y')?(<div>판매중</div>):(<div>거래완료</div>)
                }
            </div>
            <div className={s.field}>
                <label>가격</label><div>{secondhand.price}</div>
            </div>
            <div className={s.field}>
                <label>조회수</label><div>{secondhand.readcount}</div>
            </div>
            <div className={s.field}>
                <label>작성일자</label><div>{secondhand.writedate}</div>
            </div>
            <div className={s.field}>
                <label>내용</label><div><pre>{secondhand.content}</pre></div>
            </div>

            <div className={s.btns}>
                <button onClick={()=>{onsubmit(num)}}>수정완료</button>
                <button onClick={()=>{navigate('/')}}>돌아가기</button>
            </div><br /><br />
        </div>
        <div className={s.block}></div>
        </div>
        <Footer/>
        </>
    )
}

export default UpdateSecondhand
