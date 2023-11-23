import {createSlice} from '@reduxjs/toolkit'
import { layoutTypes, layoutWidth, leftSideBarTheme, leftSideBarType, topbarTheme } from "constants/layout";



const initialState = {
    layoutType: layoutTypes.VERTICAL,
    layoutWidth: layoutWidth.FLUID,
    leftSideBarTheme: leftSideBarTheme.LIGHT,
    leftSideBarType: leftSideBarType.DEFAULT,
    topbarTheme: topbarTheme.LIGHT,
    isMobile: false,
    showSidebar: true,
    leftMenu: false,
}

const LayoutReducer =createSlice({
    name:'Layout',
    initialState,
    reducers:{
        changeLayout(state, action){
            state.layoutType = action.payload
        },
        changeLayoutWidth(state, action){
            state.layoutWidth = action.payload
        },
        changeSidebarTheme(state, action){
            state.leftSideBarTheme = action.payload
        },
        changeSidebarType(state, action){
            state.leftSideBarType = action.payload
        },
        changeTopbarTheme(state, action){
            state.topbarTheme = action.payload
        },
        showSidebar(state, action){
            state.showSidebar = action.payload
        },
        toggleLeftmenu(state, action){
            state.leftMenu = action.payload
        }
    }
})

export const {changeLayout, changeLayoutWidth, changeSidebarTheme, changeSidebarType, changeTopbarTheme, showSidebar, toggleLeftmenu} = LayoutReducer.actions

export default LayoutReducer