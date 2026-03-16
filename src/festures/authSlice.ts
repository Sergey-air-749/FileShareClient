import { createSlice } from "@reduxjs/toolkit";
import { AxiosHeaders } from "axios";

interface FileItem {
  filename: string;
  text: string;
  data: string;
  sentToUser: string;
  userWillReceive: string;
  sentFromDevice: string;
  id: string;
  status: string;
}


interface AuthState {
    isAuth: boolean,
    token: string | null,
    userData: {
        _id: string,
        avatar: {
            "400": string,
            "1000": string
        },
        username: string,
        email: string,
        shareId: string,
        emailNew: string,
        filseStorySend: FileItem[],
        filseStoryGet: FileItem[],
        isGuest: boolean
    } | null,
}

const authReducer = createSlice({

    name: 'counter',

    initialState: {
        isAuth: false,
        userData: null
    } as AuthState,

    reducers: {
        setAuth: (state) => {
            state.isAuth = true
        },
        setUserData: (state, action) => {
            //console.log(action.payload);
            state.userData = action.payload
            state.isAuth = true
        }
    }
})

export const {setAuth, setUserData} = authReducer.actions
export default authReducer.reducer;