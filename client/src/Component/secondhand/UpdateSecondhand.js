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

    const [imgSrc, setImgSrc] = useState("")
    const[imgSrc1, setImgSrc1] = useState("");
    const[imgSrc2, setImgSrc2] = useState("");
    const[imgSrc3, setImgSrc3] = useState("");
    const[imgSrc4, setImgSrc4] = useState("");
    const [imgStyle, setImgStyle] = useState({ display: 'block' });

    const [divStyle2, setDivStyle2] = useState({display:"none"});
    const [divStyle3, setDivStyle3] = useState({display:"none"});
    const [divStyle4, setDivStyle4] = useState({display:"none"});


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
            num: secondhand.snum,
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

    async function onFileUpload(e, n) {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        const result = await jaxios.post("/api/secondhand/uploadImages", formData);

        if(n == 1){
            setImgSrc1(`http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if(n == 2){
            setImgSrc2(`http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if(n == 3){
            setImgSrc3(`http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if(n == 4){
            setImgSrc4(`http://localhost:8070/uploads/${result.data.savefilename}`);
        }

        let arr = [...imgList];
        arr.push(result.data.savefilename);
        setImgList([...arr]);
        console.log(imgList);

    }

    async function onSubmit(){

        // 리턴된 아이디와 이미지 이름들로 images 테이블에 레코드들을 추가
        for(let i=0; i<imgList.length; i++){
           const res = await jaxios.post("/api/secondhand/insertImages", null, {snum:num, savefilename:imgList[i]})
        }
        window.alert("작성이 정상적으로 완료되었습니다.");
        navigate("/secondhand");
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
                            <img src={`http://localhost:8070/uploads/${secondhand.savefilename}`} style={{width:"400px"}} />
                        </div>
                        <div>
                            <img src={imgSrc} style={{ width: "400px" }} alt="상품 이미지" />
                        </div>
                        <div className={s.field} id="img1">
                            <input type="file" onChange={(e)=>{
                                onFileUpload(e, 1) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄
                            }}></input>
                        </div>
                        <img src={imgSrc1} height="50"></img>

                        <div className={s.field} id="img2" style={divStyle2}>
                            <input type="file" onChange={(e)=>{
                                onFileUpload(e, 2) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄
                            }}></input>
                        </div>
                        <img src={imgSrc2} height="50"></img>

                        <div className={s.field} id="img3" style={divStyle3}>
                            <input type="file" onChange={(e)=>{
                                onFileUpload(e, 3) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄
                            }}></input>
                        </div>
                        <img src={imgSrc3} height="50"></img>

                        <div className={s.field} id="img4" style={divStyle4}>
                            <input type="file" onChange={(e)=>{
                                onFileUpload(e, 4) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄
                            }}></input>
                        </div>
                        <img src={imgSrc4} height="50"></img>
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
                        <button onClick={()=>{ onSubmit()}}>수정완료</button>
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
