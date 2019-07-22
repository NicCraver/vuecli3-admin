import Cookies from "js-cookie";
const state = {
    sidebar:  Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
};
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar = !state.sidebar
        if (state.sidebar) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    TOGGLE_SIDEBAR_FALSE:state => {
        state.sidebar = false
        if (state.sidebar) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
};
const actions = {
    toggleSideBar({
        commit
    }) {
        commit('TOGGLE_SIDEBAR')
    },
    toggleSideBarFalse({
        commit
    }) {
        commit('TOGGLE_SIDEBAR_FALSE')
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};