import React, { useEffect } from 'react'
import s from "../style/community/communityWrite.module.css"
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CommunityWrite() {
    const navigate = useNavigate();
    const lUser = useSelector(state => state.user);

    useEffect(()=>{
        if(!lUser.nickname){
            alert("로그인이 필요합니다");
            navigate('/login/sign_in', { state: { from: location.pathname } });
        }
    },[])
    return (
        <>
            <Header></Header>
            <div className={s.container}>
                <div className={s.editor_container}>
                    <input className={s.title_input} type="text" placeholder="제목을 입력하세요" />
                    <textarea className={s.editor_textarea} placeholder="당신의 이야기를 적어보세요..."></textarea>
                    <div className={s.footer_buttons}>
                        <button className={s.exit_button} onClick={()=>navigate("/community")}>돌아가기</button>
                        <div className={s.right_buttons}>
                            <button className={s.publish_button}>게시글 올리기</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CommunityWrite
