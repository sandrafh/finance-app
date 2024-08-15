import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface WifiDetails {
  bssid?: string
  ipAddress?: string
  ssid?: string
  subnet?: string
}

export interface WifiStatus {
  details: WifiDetails
  isConnected: boolean
  isInternetReachable: boolean
  type: string
}

interface WifiState {
  status: WifiStatus | null
}

const initialState: WifiState = {
  status: null,
}

export const wifiSlice = createSlice({
  name: 'wifi',
  initialState,
  reducers: {
    /*
    setIsDeleteSpaceModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modals.isDeleteSpaceModalOpen = action.payload
    },
    */
  setNetworkStatus: (state, action:PayloadAction<any>) => {
    state.status = action.payload
   },
  },
})

export const {
  setNetworkStatus
} = wifiSlice.actions

//Start modals
//export const getIsDeleteSpaceModalOpen = (state: RootState): boolean => state.ui.modals.isDeleteSpaceModalOpen
export const getNetworkStatus = (state: RootState): any => state.wifi.status

export default wifiSlice.reducer
