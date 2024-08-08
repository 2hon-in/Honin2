import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css'


function SecondhandWrite() {
    const navigate = useNavigate();
    const [savefilename, setSavefilename] = useState('');
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성**

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");

    const [imgList, setImgList] = useState([]);
    const [imgSrc, setImgSrc] = useState("")
    const[imgSrc1, setImgSrc1] = useState("");
    const[imgSrc2, setImgSrc2] = useState("");
    const[imgSrc3, setImgSrc3] = useState("");
    const[imgSrc4, setImgSrc4] = useState("");

    const loginUser = useSelector(state=>state.user);

    const {num} = useParams();

    async function insertProduct(){
        jaxios.post('/api/secondhand/insertSecondhand', {seller:loginUser.nickname, email:loginUser.email, title, content, savefilename:imgList})
        .then((result)=>{
            if(result.data.msg=="ok"){
                window.alert("정상적으로 게시물 등록이 완료되었습니다.");
                navigate('/secondhand')
            }else{
                window.alert("게시물 등록에 실패하였습니다. 다시 시도해주세요");
                navigate('/secondhandWrite')
            }
            
        })
        .catch((err)=>{
            console.error(err);
        })
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

    return (
        <>
        <Header/>
        <div className={s.section}>
        <div className={s.block}></div>
        <div className={s.SecondhandWrite}>
            <div className={s.field_title}>
                <div><input type='text' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}></input></div>
            </div>
            <div className={s.mainfield}>
                <div>
                    <img src={`http://localhost:8070/uploads/${savefilename}`} style={{width:"400px"}} />
                </div>
                <div>
                    <input type="file" multiple onChange={(e) => onFileUpload(e)} />
                </div>
            </div>
            <div className={s.field}>
                <label>작성자</label><div>{loginUser.nickname}</div>
            </div>
            <div className={s.field}>
                <label>판매상태</label>
            </div>
            <div className={s.field}>
                <label>가격</label><div><input type='text' value={price} onChange={(e)=>{setPrice(e.currentTarget.value)}}></input></div>
            </div>
            <div className={s.field}>
                <label>내용</label><div><textarea rows="20" value={content} onChange={(e)=>{setContent(e.currentTarget.value)}}></textarea></div>
            </div>

            <div className={s.btns}>
                <button onClick={()=>{insertProduct()}}>작성</button>
                <button onClick={()=>{ navigate('/secondhand') }}>돌아가기</button>
            </div><br /><br />
        </div>
        <div className={s.block}></div>
        </div>
        <Footer/>
        </>
    )
}

export default SecondhandWrite
