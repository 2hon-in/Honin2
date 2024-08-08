import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css';

function SecondhandWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");
    const [imgList, setImgList] = useState([]);
    const [imgPreviews, setImgPreviews] = useState([]);
    const loginUser = useSelector(state => state.user);

    // 게시물 등록 함수
    async function insertSecondhand() {
        try {
            const result = await jaxios.post('/api/secondhand/insertSecondhand', {
                seller: loginUser.nickname,
                title,
                content,
                price,
                savefilename: imgList // 이미지 파일명 리스트 전송
            });
            console.log("insertSecondhand", result.data); // 서버 응답 확인

            if (result.data.msg === "ok") {
                alert("정상적으로 게시물 등록이 완료되었습니다.");
                navigate('/secondhand');
                
            } else {
                alert("게시물 등록에 실패하였습니다. 다시 시도해주세요.");
                navigate('/secondhandWrite');
            }
        } catch (err) {
            console.error(err);
        }
    }

    // 파일 업로드 및 이미지 미리보기 처리
    async function onFileUpload(e) {
        const files = Array.from(e.target.files);
        const newImgList = [...imgList];
        const newImgPreviews = [...imgPreviews];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("image", files[i]);
            
            try {
                const result = await jaxios.post("/api/secondhand/uploadImages", formData);
                const filename = result.data.savefilename;
                
                newImgList.push(filename);
                newImgPreviews.push(`http://localhost:8070/uploads/secondhand/${filename}`);
            } catch (err) {
                console.error("파일 업로드 실패:", err);
            }
        }

        setImgList(newImgList);
        setImgPreviews(newImgPreviews);
    }

    return (
        <>
            <Header />
            <div className={s.section}>
                <div className={s.block}></div>
                <div className={s.SecondhandWrite}>
                    <div className={s.field_title}>
                        <div><input type='text' value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="제목을 입력하세요" /></div>
                    </div>
                    <div className={s.mainfield}>
                        {imgPreviews.map((src, index) => (
                            <div key={index}>
                                <img src={src} alt={`uploaded-${index}`} style={{ width: "400px" }} />
                            </div>
                        ))}
                        <div>
                        <input type="file" multiple onChange={(e) => {onFileUpload(e)}} />
                        </div>
                    </div>
                    <div className={s.field}>
                        <label>작성자</label><div>{loginUser.nickname}</div>
                    </div>
                    <div className={s.field}>
                        <label>판매상태</label><div>판매중</div>
                    </div>
                    <div className={s.field}>
                        <label>가격</label><div><input type='text' value={price} onChange={(e) => setPrice(e.currentTarget.value)} placeholder="가격을 입력하세요" /></div>
                    </div>
                    <div className={s.field}>
                        <label>내용</label><div><textarea rows="20" value={content} onChange={(e) => setContent(e.currentTarget.value)} placeholder="내용을 입력하세요"></textarea></div>
                    </div>
                    <div className={s.btns}>
                        <button onClick={()=>{insertSecondhand()}}>작성</button>
                        <button onClick={()=>{navigate('/secondhand')}}>돌아가기</button>
                    </div><br /><br />
                </div>
                <div className={s.block}></div>
            </div>
            <Footer />
        </>
    );
}

export default SecondhandWrite;
