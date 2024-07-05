import { createApp } from 'vue'
import {createRouter,createWebHistory} from 'vue-router'
import app from '../firebase/firebase.js'
import firebase from 'firebase/compat/app';
// import './style.css'
import '../src/assets/css/plugins/plugins.css'
import '../src/assets/css/vendor/bootstrap.min.css'
import '../src/assets/css/vendor/helper.css'
import '../src/assets/css/vendor/iconfont.min.css'
import '../src/assets/css/style.css'
import App from './App.vue'


import Home from './components/Home.vue'
import Sample from './components/EmployeeDetails.vue'
import JobListing from './components/JobListing.vue'
import JobDetails from './components/JobDetails.vue'
import CandidateListing from './components/CandidateListing.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AddWork from './components/AddWork.vue';
import MyJobs from './components/MyJobs.vue';

const routes = [
    {path:'/',component:Home},
    {path:'/sample/:id',component:Sample},
    {path:'/jobs/',component:JobListing},
    {path:'/candidates/',component:CandidateListing},
    {path:'/job-details/:id',component:JobDetails},
    {path:'/login/',component:Login},
    {path:'/register/',component:Register},
    {path:'/add-work/',component:AddWork},
    {path:'/my-jobs/',component:MyJobs},


]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})
createApp(App).use(router).mount('#app')
