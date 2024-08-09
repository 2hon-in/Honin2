import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userSlice';
import jaxios from '../util/jwtUtil';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import s from '../style/secondhand/secondhandview.module.css'

function SecondhandView() {
    const navigate = useNavigate();
    const [secondhand, setSecondhand] = useState({});
    const [sreplyList, setSreplyList] = useState([]);
    const [curDateTime, setCurDataTime]=useState("");
    const [rContent, setRContent] = useState("");
    const dispatch = useDispatch(); 
    const loginUser = useSelector(state=>state.user);

    const [currentSlide, setCurrentSlide] = useState(0); 
    const {num} = useParams();

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? secondhand.images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === secondhand.images.length - 1 ? 0 : prev + 1));
    };

    useEffect(
        ()=>{

            // 게시물 조회
            jaxios.get(`/api/secondhand/getSecondHand/${num}`)
            .then((result)=>{
                setSecondhand(result.data.secondhand);
            })
            .catch((err)=>{console.log(err)})

            // 댓글 조회
            // jaxios.get(`/api/secondhand/getReplyList/${num}`)
            // .then((result)=>{
            //     setSreplyList( [... result.data.sreply ] );
            //     console.log(result.data);
            // })
            // .catch((err)=>{console.log(err)})

            // // 댓글 작성에 표시될 데이터(날짜) 생성
            // const date = new Date();
            // const months = String( date.getMonth()+1 ).padStart(2, '0');
            // const days = String( date.getDate()+1 ).padStart(2, '0');
            // const hours = String(date.getHours()).padStart(2, "0");
            // const minutes = String(date.getMinutes()).padStart(2, "0");
            // setCurDataTime(`${months}/${days} ${hours}:${minutes}`);


        },[num]
    );

    async function addReply(){
        try{
            // 댓글을 추가하고
            await jaxios.post('/api/secondhand/addReply', {nickname:loginUser.nickname, content:rContent, snum:num} )
            // 댓글을 다시 조회해서  댓글리스트를 갱신하세요(replyList 변수에 새 리스트가 들어가면 자동 갱신)

            const result = await jaxios.get(`/api/secondhand/getReplyList/${num}`);
            setSreplyList( [... result.data.sreply ] ); // 스테이트 변수가 변경되면 관련내용이 재 렌더링됩니다
        }catch(err){
            console.error(err);
        }
        setRContent('');
    }

    async function deleteSReply(srnum){
        if( window.confirm( '해당 댓글을 삭제할까요?') ){
            try{
                await jaxios.get(`/api/secondhand/deletereply/${srnum}`);
                const result = await jaxios.get(`/api/secondhand/getReplyList/${num}`);
                setSreplyList( [... result.data.sreply ] ); 
            }catch(err){
                console.error(err);
            }
        }else{
            return
        }

    }

    function deleteSecondHand( num ){
        const pass = window.prompt('삭제할 패스워드를 입력하세요');
        if(secondhand.pass != pass){return alert('패스워드가 일치하지 않습니다')}
        jaxios.get(`/api/secondhand/deleteSecondHand/${secondhand.snum}`)
        .then(()=>{ 
            window.alert("삭제가 정상적으로 완료되었습니다.");
            navigate('/main'); 
        })
        .catch((err)=>{console.error(err)})
    }

    return (
        <>
        <Header/>
        <div className={s.section}>
        <div className={s.block}></div>
        <div className={s.SecondhandView}>
            <div className={s.field_title}>
                <div>{secondhand.title}</div>
            </div>
            <div className={s.mainfield}>
                <div>
                {
                    secondhand.savefilename && Array.isArray(secondhand.images) ? (
                    <div className={s.slideshow}>
                        <img 
                        src={`http://localhost:8070/uploads/secondhand/${secondhand.images[currentSlide]}`} 
                        style={{ width: "400px" }} 
                        />
                        <div className={s.prev} onClick={prevSlide}>&#10094;</div>
                        <div className={s.next} onClick={nextSlide}>&#10095;</div>
                    </div>
                    ) : (
                    <img 
                        src={`http://localhost:8070/uploads/secondhand/${secondhand.images}`} 
                        style={{ width: "400px" }} 
                    />
                    )
                }
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
                {
                    (loginUser.nickname==secondhand.seller)?(<button onClick={()=>{ navigate(`/secondhandUpdate/${secondhand.snum}`)}}>수정</button>):
                    (null)
                }
                {
                    (loginUser.nickname==secondhand.seller)?(<button onClick={()=>{ deleteSecondHand(secondhand.snum)}}>삭제</button>):
                    (null)
                }
                <button onClick={()=>{ navigate('/secondhand') }}>돌아가기</button>
            </div><br /><br />
            <div className={s.head_row}>
                <div className={s.head_col}>작성일시</div><div className={s.head_col}>작성자</div><div className={s.head_col}>내용</div><div className={s.head_col}>&nbsp;</div>
            </div>

            <div className={s.new_reply_row}>
                <div className={s.new_reply_col}>{curDateTime}</div>
                <div className={s.new_reply_col}>{loginUser.userid}</div>
                <div className={s.new_reply_col}>
                    <input type="text" value={rContent} onChange={
                        (e)=>{ setRContent( e.currentTarget.value ) }
                    }/>
                </div>
                <div className={s.new_reply_col}>
                    <button onClick={ ()=>{  addReply(); } }>댓글작성</button>
                </div>
            </div>

            {
                (sreplyList)?(
                    sreplyList.map((sreply, idx)=>{
                        return (
                            <div key={idx} className={s.new_reply_row}>
                                <div className={s.new_reply_col}>{sreply.writedate.substring(5,10)}</div>
                                <div className={s.new_reply_col}>{sreply.nickname}</div>
                                <div className={s.new_reply_col}>{sreply.content}</div>
                                <div className={s.new_reply_col}>
                                    {
                                        (loginUser.nickname == sreply.nickname)?
                                        (<button onClick={()=>{deleteSReply(sreply.srnum)}}>삭제</button>):(null)
                                    }
                                </div>
                            </div>
                        )
                    })
                ):(null)
            }

        </div>
        <div className={s.block}></div>
        </div>
        <Footer/>
        </>
    )
}

export default SecondhandView
