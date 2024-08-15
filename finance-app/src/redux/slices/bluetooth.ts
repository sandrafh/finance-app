import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PPXOrchestratorAPIClient } from '@protopixel/ppxwsapi'
import type { RootState } from '../store'
import { bytesToASCII, bytesToNumber } from '@/utilities/utils'
import { PairDeviceTypes } from '@/constants/utils'

export interface WIFIInfo {
  oob: string
  network: string
}

export interface PairingSettings {
  installationName: string | null
  wifiSSID: string | null
  wifiPassword: string | null
  installationId: string | null
  BLEUUID: string | null
  BLEName: string | null
  keyPair: string | null
  OOB: string | null
  prefix: string | null
  gatewayURL: string | null
  inclusionToken: number | null
}

export interface BLEDevice {
  id: string
  name?: string
  rssi: number
  advertising?: {
    isConnectable: number
  }
  foundTimestamp: number
  serviceUUIDs?: string[]
  environment?: string
  version?: string
  manufacturer?: string
  deviceModel?: string
  serialNumber?: string
}

interface BluetoothState {
  status: any
  devices: BLEDevice[]
  pairingSettings: PairingSettings
  connectedDeviceUUID: string | null
  notificationStateForCharacteristic: SIMON_IO_BLE_CONFIG_NOTIFY_VALUES | null
  isOrchySetted: boolean
  currentDeviceMacAddress: string | null
  pairingDeviceType: PairDeviceTypes
  currentNumDevicesOnFollower: number
}

export enum SIMON_IO_BLE_CONFIG_NOTIFY_VALUES {
  OK,
  WIFI_ERR,
  IP_ERR,
  GATEWAY_ERR,
}

const initialPairingSettings = {
  installationName: null,
  wifiSSID: null,
  wifiPassword: null,
  installationId: null,
  BLEUUID: null,
  keyPair: null,
  OOB: null,
  prefix: null,
  gatewayURL: null,
  inclusionToken: null,
}

const initialState: BluetoothState = {
  status: null,
  devices: [],
  pairingSettings: initialPairingSettings,
  connectedDeviceUUID: null,
  notificationStateForCharacteristic: null,
  isOrchySetted: false,
  currentDeviceMacAddress: null,
  pairingDeviceType: PairDeviceTypes.Seria,
  currentNumDevicesOnFollower: 0,
}

export const startCommissioning = createAsyncThunk('bluetooth/startCommissioning', async (): Promise<boolean | null> => {
  return PPXOrchestratorAPIClient.Commissioning.startCommissioning()
    .then((response) => {
      return response
    })
    .catch((error: string) => {
      console.log('Error on start commissioning ', error)
      return null
    })
})

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<BLEDevice>) => {
      const deviceIndex = state.devices.findIndex((device) => device.id === action.payload.id)
      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = action.payload
        return
      }
      state.devices.push(action.payload)
    },
    cleanOfflineDevices: (state) => {
      const date = Date.now()
      state.devices = state.devices.filter((device) => {
        return date - device.foundTimestamp <= 5000
      })
    },
    setPairingSettings: (state, action: PayloadAction<PairingSettings>) => {
      state.pairingSettings = action.payload
    },
    resetPairingSettings: (state) => {
      state.pairingSettings = { ...initialPairingSettings }
    },
    setConnectedDeviceUUID: (state, action: PayloadAction<string | null>) => {
      state.connectedDeviceUUID = action.payload
    },
    setNotificationStateForCharacteristic: (state, action: PayloadAction<SIMON_IO_BLE_CONFIG_NOTIFY_VALUES>) => {
      state.notificationStateForCharacteristic = action.payload
    },
    resetDiscoveredDevices: (state) => {
      state.devices = []
    },
    setIsOrchySetted: (state, action: PayloadAction<boolean>) => {
      state.isOrchySetted = action.payload
    },
    setCurrentDeviceMacAddress: (state, action: PayloadAction<number[]>) => {
      if (action.payload) {
        const parsedMacAddress = bytesToASCII(action.payload)
        state.currentDeviceMacAddress = parsedMacAddress
      }
    },
    setPairingDeviceType: (state, action: PayloadAction<PairDeviceTypes>) => {
      state.pairingDeviceType = action.payload
    },
    setCurrentNumDevicesOnFollower: (state, action: PayloadAction<number[]>) => {
      if (action.payload) {
        const parsedNumDevices = bytesToNumber(action.payload)
        state.currentNumDevicesOnFollower = parsedNumDevices
      }
    },
  },
})

export const {
  setDevice,
  setPairingSettings,
  resetPairingSettings,
  setConnectedDeviceUUID,
  resetDiscoveredDevices,
  cleanOfflineDevices,
  setNotificationStateForCharacteristic,
  setIsOrchySetted,
  setCurrentDeviceMacAddress,
  setPairingDeviceType,
  setCurrentNumDevicesOnFollower,
} = bluetoothSlice.actions

//Start modals
//export const getIsDeleteSpaceModalOpen = (state: RootState): boolean => state.ui.modals.isDeleteSpaceModalOpen
export const getBLEDevices = (state: RootState): BLEDevice[] => state.bluetooth.devices
export const getPairingSettings = (state: RootState): PairingSettings => state.bluetooth.pairingSettings
export const getConnectedDeviceUUID = (state: RootState): string | null => state.bluetooth.connectedDeviceUUID
export const getNotificationStateForCharacteristic = (state: RootState): number | null => state.bluetooth.notificationStateForCharacteristic
export const getIsOrchySetted = (state: RootState): boolean => state.bluetooth.isOrchySetted
export const getCurrentDeviceMacAddress = (state: RootState): string | null => state.bluetooth.currentDeviceMacAddress
export const getPairingDeviceType = (state: RootState): PairDeviceTypes => state.bluetooth.pairingDeviceType
export const getCurrentNumDevicesOnFollower = (state: RootState): number => state.bluetooth.currentNumDevicesOnFollower

export default bluetoothSlice.reducer
