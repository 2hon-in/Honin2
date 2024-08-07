import {createSlice} from '@reduxjs/toolkit'
//slice - 저장장소
//slice를 만들어 store에 담고 reducer(action)로 store(slice)의 상태를 업데이트 합니다
//하나의 슬라이스에 여러 자료를 개체형식으로 담고, reducer로 값을 관리합니다.
//reducer 안에는 여러가지 동작의 함수들이 담겨서 사용될 수 있습니다.

const initialState = {
    email : '',
    nickname : '',
    password : '',
    provider : '',
    phone : '',
    snsid : '',
    profileimg : '',
    profilemsg : '',
    zipnum : '',
    address1 : '',
    address2 : '',
    address3 : '',
    userstate : '',
    accessToken : '',
    refreshToken : ''
}

const userSlice = createSlice(
    {
    name : 'user', //userSlice 안에 저장되는 저장객체의 이름
    initialState,
    reducers:{
        //state(user 의 상태값) 값들을 변경할 수 있는 함수들
        loginAction : ( state, action ) => {
            //외부에서 전달되는 객체를 내부의 'user' 객체에 저장할껀데
            //외부에서 전달되는 객체를 이안에서는 action 이라고 부르고
            //'user'객체는 state라고 부릅니다.
            state.email = action.payload.email;
            state.nickname = action.payload.nickname;
            state.password = action.payload.password;
            state.provider = action.payload.provider;
            state.snsid = action.payload.snsid;
            state.profileimg = action.payload.profileimg;
            state.profilemsg = action.payload.profilemsg;
            state.phone = action.payload.phone;
            state.zipnum = action.payload.zipnum;
            state.address1 = action.payload.address1;
            state.address2 = action.payload.address2;
            state.address3 = action.payload.address3;
            state.userstate = action.payload.userstate;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logoutAction : ( state ) => {
            state.email = '';
            state.nickname = '';
            state.provider = '';
            state.snsid = '';
            state.profileimg = '';
            state.profilemsg = '';
            state.password = '';
            state.phone = '';
            state.zipnum = '';
            state.address1 = '';
            state.address2 = '';
            state.address3 = '';
            state.userstate = '';
            state.accessToken = '';
            state.refreshToken = '';
        }, 

        test : (state, action) =>{
            state.refreshToken = action.payload.refreshToken;
        },
        
        setFollowings : (state, action) =>{
            state.followings = action.payload.followings;
            //state.followings = [...action.payload];
        },
        setFollowers : (state, action) =>{
            state.followers = action.payload.followers;
            //state.followers = [...action.payload];
        }
    }
    }
);

export const {loginAction, logoutAction, setFollowings, setFollowers, test} = userSlice.actions;
export default userSlice;