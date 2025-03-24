import {defineStore} from "pinia";
import axiosAuth from "../axiosAuth.js";
import axios from "axios";
//import {show_alerta} from "../functions.js";

export const userAuthStore = defineStore('auth',{
    state: () => ({
        _authUser: JSON.parse(localStorage.getItem("authUser")) || null,
        _authToken: localStorage.getItem("authToken") || null,
        _authErrors: null
    }),
    getters: {
        authUser: (state) => state._authUser,
        authToken: (state) => state._authToken,
        errors: (state) => state._authErrors,
        isAdmin: (state) => state._authUser?.role === 'admin'
    },
    actions: {
        async register(formData) {
            this._authErrors = null; // Limpiar errores previos

            try {
                const response = await axiosAuth.post('http://127.0.0.1:8000/api/register', formData);
                this._authUser = response.data.user;
            } catch (error) {
                if (error.response) {
                    this._authErrors = error.response.data.errors || error.response.data.message;
                } else {
                    console.error('Error desconocido:', error);
                }
            }
        },
        async logIn(formData){
            this._authErrors = null;
            console.log("entre")

            try {
                const response = await axiosAuth.post('http://127.0.0.1:8000/api/login', formData);

                this._authUser = response.data.user;
                this._authToken = response.data.token;

                localStorage.setItem("authUser", JSON.stringify(this._authUser));
                localStorage.setItem("auth_token", this._authToken);
                console.log("Usuario loggeado")
                axios.defaults.headers.common["Authorization"] = `Bearer ${this._authToken}`;
            } catch (error) {
                if (error.response) {
                    this._authErrors = error.response.data.errors || error.response.data.message;
                } else {
                    console.error('Error desconocido:', error);
                }
            }
        },
        async logOut() {
            
            try {
                await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${this._authToken}`
                    },
                    withCredentials:true
                });
        
                this._authUser = null;
                this._authToken = null;
        
                localStorage.removeItem("authUser");
                localStorage.removeItem("auth_token"); // Elimina el token almacenado
                delete axios.defaults.headers.common["Authorization"];
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            } finally{
                this._authUser = null;
                this._authToken = null;
        
                localStorage.removeItem("authUser");
                localStorage.removeItem("auth_token"); // Elimina el token almacenado
                delete axios.defaults.headers.common["Authorization"];
            }
        },
        async fetchUser() {
            try {
                const response = await axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${this._authToken}` }
                });

                if (typeof response.data === "object") {
                    this._authUser = response.data;
                    localStorage.setItem("authUser", JSON.stringify(this._authUser));
                } else {
                    console.error("Respuesta inesperada del servidor:", response);
                    this._authUser = null;
                    localStorage.removeItem("authUser");
                }

            } catch (error) {
                console.error('Error al obtener usuario:', error);
            }
        }     
    }  

})

