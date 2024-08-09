import React, { useEffect, useState } from 'react'
import s from "../style/community/communityWrite.module.css"
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jaxios from '../util/jwtUtil'

function CommunityWrite() {
    const navigate = useNavigate();
    const lUser = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (!lUser.nickname) {
            alert("로그인이 필요합니다");
            navigate('/login/sign_in', { state: { from: location.pathname } });
        }
    }, [])

    const writePost = () => {
        jaxios.post(`/api/community/writePost`, {title, content, writer: lUser.nickname, seqname:selectedCategory})
            .then(res => {
                if (res.data.msg === "success") {
                    alert("게시글이 등록되었습니다");
                    navigate(`/communityView/cfnum/${res.data.num}`)
                } else {
                    alert("실패");
                }
            })
    }


    // 드롭다운에서 선택 시 호출되는 함수
    const handleSelectChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    return (
        <>
            <Header></Header>
            <div className={s.container}>
                <div className={s.editor_container}>
                    <div>
                        <select id="category" value={selectedCategory} onChange={handleSelectChange}>
                            <option value="">카테고리를 선택하세요</option>
                            <option value="cfnum">자유게시판</option>
                            <option value="ctnum">팁과노하우</option>
                            <option value="crnum">업체추천</option>
                            <option value="canum">고민상담</option>
                        </select>

                        {selectedCategory && (
                            <div>
                                <h3>You selected: {selectedCategory}</h3>
                            </div>
                        )}
                    </div>
                    <input className={s.title_input} type="text" value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} placeholder="제목을 입력하세요" />
                    <textarea className={s.editor_textarea} value={content} onChange={(e) => { setContent(e.currentTarget.value) }} placeholder="당신의 이야기를 들려주세요..."></textarea>
                    <div className={s.btns}>
                        <button className={s.back_btn} onClick={() => navigate("/community")}>돌아가기</button>
                        <div className={s.right_buttons}>
                            <button className={s.publish_btn} onClick={writePost}>게시글 올리기</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CommunityWrite
