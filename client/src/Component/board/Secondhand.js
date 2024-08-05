import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jaxios from '../util/jwtUtil';

function Secondhand() {

    const [sboardList, setSboardList] = useState([]);
    const [ paging, setPaging ] = useState({});
    const [ beginend, setBeginend ] = useState([]);

    const navigate = useNavigate();

    useEffect(
        ()=>{
            jaxios.get('/api/sboard/getBoardList/1')
            .then((result)=>{
                setSboardList( [...result.data.boardList ] );
                setPaging( result.data.paging );

                const pageArr = [];
                for(let i=result.data.paging.beginPage; i<=result.data.paging.endPage; i++){
                     pageArr.push(i);
                }
                setBeginend( [...pageArr] );
            })
            .catch((err)=>{console.error(err)})
        },[]
    )

    async function onBoardView(num){

    }

    return (

        <div className='sboardList'>
            <div className='titlerow'>
                <div className='titlecol'>번호</div>
                <div className='titlecol'>제목</div>
                <div className='titlecol'>글쓴이</div>
                <div className='titlecol'>작성일</div>
                <div className='titlecol'>조회수</div>
            </div>
            {
                boardList.map((board, idx)=>{
                    return (
                        <div className='row' key={idx}>
                            <div className='col'>{board.num}</div>
                            <div className='col' onClick={()=>{
                                onBoardView( board.num );
                            }}>{board.title}</div>
                            <div className='col'>{board.userid}</div>
                            <div className='col'>{board.writedate}</div>
                            <div className='col'>{board.readcount}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Secondhand