import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
  userUid: string
  name: string
}

const initialState: UserState = {
  userUid: '',
  name: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state, action: PayloadAction<string>) => {
      state.userUid = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
  },
})

export const { setUserUid, setName } = userSlice.actions

export const getUserUid = (state: RootState): string => state.user.userUid
export const getName = (state: RootState): string => state.user.name

export default userSlice.reducer
