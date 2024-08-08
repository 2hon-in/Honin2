import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css';

function UpdateSecondhand() {
    const navigate = useNavigate();
    const { num } = useParams();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.user);

    const [secondhand, setSecondhand] = useState({});
    const [imgList, setImgList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");
    const [imgSrc, setImgSrc] = useState('http://via.placeholder.com/200x150');
    const [imgStyle, setImgStyle] = useState({ display: 'block' });

    useEffect(() => {
        jaxios.get(`/api/secondhand/getSecondHand/${num}`)
            .then(result => {
                const { title, content, price, savefilename } = result.data.secondhand;
                setSecondhand(result.data.secondhand);
                setTitle(title);
                setContent(content);
                setPrice(price);
                setImgSrc(`http://localhost:8070/uploads/${savefilename}`);
            })
            .catch(err => {
                console.log(err);
            });
    }, [num]);

    async function onSubmit() {
        if (!title) {
            return window.alert("제목을 입력하세요");
        }
        if (!price) {
            return window.alert("가격을 입력하세요");
        }
        if (!content) {
            return window.alert("내용을 입력하세요");
        }

        const result = await jaxios.post("/api/secondhand/updateSecondhand", {
            id: secondhand.id,
            title,
            content,
            price,
            seller: loginUser.nickname
        });

        for (let i = 0; i < imgList.length; i++) {
            await jaxios.post("/api/secondhand/insertSImages", {
                postid: result.data.id,
                savefilename: imgList[i]
            });
        }

        window.alert("수정 완료되었습니다.");
        navigate("/secondhand");
    }

    async function onFileUpload(e) {
        const files = Array.from(e.target.files);
        let formData = new FormData();
        files.forEach(file => {
            formData.append("images", file);
        });

        const result = await jaxios.post("/api/secondhand/uploadImage", formData);

        setImgSrc(`http://localhost:8070/uploads/${result.data.savefilenames[0]}`);
        setImgList([...imgList, ...result.data.savefilenames]);
    }

    return (
        <>
            <Header />
            <div className={s.section}>
                <div className={s.block}></div>
                <div className={s.UpdateSecondhand}>
                    <div className={s.field_title}>
                        <input type='text' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                    </div>
                    <div className={s.mainfield}>
                        <div>
                            <img src={imgSrc} style={{ width: "400px" }} alt="상품 이미지" />
                        </div>
                        <div>
                            <input type="file" multiple onChange={(e) => onFileUpload(e)} />
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
                        <input type='text' value={price} onChange={(e) => setPrice(e.currentTarget.value)} />
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
                        <textarea rows="20" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
                    </div>

                    <div className={s.btns}>
                        <button onClick={onSubmit}>수정완료</button>
                        <button onClick={() => navigate('/secondhand')}>돌아가기</button>
                    </div>
                </div>
                <div className={s.block}></div>
            </div>
            <Footer />
        </>
    );
}

export default UpdateSecondhand;
