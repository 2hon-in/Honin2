import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css';

function UpdateSecondhand() {
    const navigate = useNavigate();
    const { num } = useParams();
    const loginUser = useSelector(state => state.user);

    const [secondhand, setSecondhand] = useState({});
    const [imgList, setImgList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");
    const [imgPreviews, setImgPreviews] = useState([]);
    
    useEffect(() => {
        jaxios.get(`/api/secondhand/getSecondHand/${num}`)
            .then(result => {
                const { title, content, price, savefilename } = result.data.secondhand;
                setSecondhand(result.data.secondhand);
                setTitle(title);
                setContent(content);
                setPrice(price);
                setImgPreviews([`http://localhost:8070/uploads/secondhand${savefilename}`]);
            })
            .catch(err => {
                console.error(err);
            });
    }, [num]);

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
                newImgPreviews.push(`http://localhost:8070/uploads/${filename}`);
            } catch (err) {
                console.error("파일 업로드 실패:", err);
            }
        }

        setImgList(newImgList);
        setImgPreviews(newImgPreviews);
    }

    async function onSubmit() {
        if (!title || !price || !content) {
            return window.alert("제목, 가격, 내용을 모두 입력하세요");
        }
        try {
            const result = await jaxios.post("/api/secondhand/updateSecondhand", {
                num: secondhand.snum,
                title,
                content,
                price,
                seller: loginUser.nickname
            });

            for (let filename of imgList) {
                await jaxios.post("/api/secondhand/insertSImages", {
                    postid: result.data.id,
                    savefilename: filename
                });
            }
            window.alert("수정 완료되었습니다.");
            navigate("/secondhand");
        } catch (err) {
            console.error("수정 실패:", err);
        }
    };

    return (
        <>
            <Header />
            <div className={s.section}>
                <div className={s.block}></div>
                <div className={s.UpdateSecondhand}>
                    <div className={s.field_title}>
                        <input 
                            type='text' 
                            value={title} 
                            onChange={(e) => setTitle(e.currentTarget.value)} 
                            placeholder="제목을 입력하세요"
                        />
                    </div>
                    <div className={s.mainfield}>
                        {imgPreviews.map((src, index) => (
                            <div key={index}>
                                <img src={src} alt={`preview-${index}`} style={{ width: "400px" }} />
                            </div>
                        ))}
                        <div>
                            <input type="file" multiple onChange={()=>{onFileUpload()}} />
                        </div>
                    </div>
                    <div className={s.field}>
                        <label>작성자</label>
                        <div>{secondhand.seller}</div>
                    </div>
                    <div className={s.field}>
                        <label>판매상태</label>
                        <div>{secondhand.state === 'Y' ? '판매중' : '거래완료'}</div>
                    </div>
                    <div className={s.field}>
                        <label>가격</label>
                        <input 
                            type='text' 
                            value={price} 
                            onChange={(e) => setPrice(e.currentTarget.value)} 
                            placeholder="가격을 입력하세요"
                        />
                    </div>
                    <div className={s.field}>
                        <label>조회수</label>
                        <div>{secondhand.readcount}</div>
                    </div>
                    <div className={s.field}>
                        <label>작성일자</label>
                        <div>{secondhand.writedate}</div>
                    </div>
                    <div className={s.field}>
                        <label>내용</label>
                        <textarea 
                            rows="20" 
                            value={content} 
                            onChange={(e) => setContent(e.currentTarget.value)} 
                            placeholder="내용을 입력하세요"
                        />
                    </div>

                    <div className={s.btns}>
                        <button onClick={()=>{onSubmit()}}>수정완료</button>
                        <button onClick={()=>{navigate('/secondhand')}}>돌아가기</button>
                    </div>
                </div>
                <div className={s.block}></div>
            </div>
            <Footer />
        </>
    );
}

export default UpdateSecondhand;
