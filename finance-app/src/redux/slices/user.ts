import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
  userUid: string
}

const initialState: UserState = {
  userUid: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state, action: PayloadAction<string>) => {
      state.userUid = action.payload
    }    
  },
})

export const {
  setUserUid,
} = userSlice.actions

export const getUserUid = (state: RootState): string => state.user.userUid

export default userSlice.reducer
