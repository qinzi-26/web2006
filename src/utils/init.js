import i18n from "../plugins/i18n.js"
import store from '../store'
import jwt from "jwt-decode"

export function initProject() {
    if (localStorage.getItem("lang")) {
        i18n.locale = localStorage.getItem("lang")
    }

    if (localStorage.getItem("ego")) {
        store.commit("loginModule/setUser", {
            username: jwt(localStorage.getItem("ego")).username,
            token: localStorage.getItem("ego")
        })
    }
}