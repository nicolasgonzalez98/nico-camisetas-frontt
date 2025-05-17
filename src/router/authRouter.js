import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import LogIn from "@/views/auth/LogIn.vue";
import Register from "@/views/auth/Register.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
//import LogIn from "../views/auth/LogIn.vue";



export default [
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: LogIn
    // },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { hideNavbar: true }
    },
    {
        path: "/login",
        name: "Login",
        component: LogIn,
        meta: { hideNavbar: true }
    },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { hideNavbar: true } },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword, meta: { hideNavbar: true } },
];
