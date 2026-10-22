import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type VpnNoticeState = {
    isOpen: boolean;
    networkErrorCount: number;
};

const initialState: VpnNoticeState = {
    isOpen: false,
    networkErrorCount: 0,
};

export const vpnNoticeSlice = createSlice({
    name: 'vpnNotice',
    initialState,
    selectors: {
        selectVpnNoticeOpen: state => state.isOpen,
        selectVpnNetworkErrorCount: state => state.networkErrorCount,
    },
    reducers: {
        setVpnNoticeOpenAC(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        closeVpnNoticeAC(state) {
            state.isOpen = false;
            state.networkErrorCount = 0;
        },
        incrementVpnNetworkErrorAC(state) {
            state.networkErrorCount += 1;
        },
    },
});

export const { selectVpnNoticeOpen, selectVpnNetworkErrorCount } = vpnNoticeSlice.selectors;
export const { setVpnNoticeOpenAC, closeVpnNoticeAC, incrementVpnNetworkErrorAC } = vpnNoticeSlice.actions;
export const vpnNoticeReducer = vpnNoticeSlice.reducer;
