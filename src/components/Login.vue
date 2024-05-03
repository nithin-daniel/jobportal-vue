<template>

    <!-- Breadcrumb Section Start -->
    <div class="breadcrumb-section section bg_color--5 pt-100 pt-sm-50 pt-xs-40 pb-60 pb-sm-50 pb-xs-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="page-breadcrumb-content">
                        <ul class="page-breadcrumb">
                            <!-- <li></li>
                            <li>Login & Register</li> -->
                        </ul>
                        <h1>Login</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Start -->

    <!-- Login Register Section Start -->
    <div class="login-register-section section bg_color--5 pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
        <div class="container">
            <div class="row g-0">

                <div class="col-lg-4">
                    <div class="login-register-form-area" id="login-register">
                        <div class="login-tab-menu">
                            <ul class="nav">
                                <li><a class="active show" data-bs-toggle="tab" href="/login">Login</a></li>
                                <!-- <li><a data-bs-toggle="tab" href="google.com">Register</a></li> -->
                            </ul>
                        </div>
                        <div class="tab-content">
                            <a v-if="errMsg" class="alert alert-danger">{{ errMsg }}</a>
                            <div id="login" class="tab-pane fade show active">
                                <div class="login-register-form">
                                    <form action="#" method="post" @submit.prevent="Register">
                                        <p>Login to WorkEase with your registered account</p>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="single-input">
                                                    <input type="text" placeholder="Email" name="email" id="email"
                                                        required v-model="email">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="single-input">
                                                    <input type="password" placeholder="Password" name="password"
                                                        required id="password" v-model="password">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="checkbox-input">
                                                    <input type="checkbox" name="login-form-remember"
                                                        id="login-form-remember">
                                                    <label for="login-form-remember">Remember me</label>
                                                </div>
                                            </div>
                                            <div class="col-12 mb-25"><button class="ht-btn" type="submit"
                                                    @click="signIn">Login</button></div>
                                        </div>
                                    </form>
                                </div>
                                <a href="/register">Don't have account?</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="login-instruction">
                        <div class="login-instruction-content">
                            <h3 class="title">Why Login To Us</h3>
                            <p>It’s important for you to have an account and login in order to have full access at
                                WorkEase. We need to know your account details in order to allow work together</p>
                            <ul class="list-reasons">
                                <li class="reason">Be alerted to the latest jobs</li>
                                <li class="reason">Apply for jobs with a single click</li>
                                <li class="reason">Keep a record of all your applications</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Login Register Section End -->
</template>

<script setup>
import { ref } from 'vue'
import db from '../../firebase/firebase.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE

const router = useRouter() // get a reference to our vue router

const signIn = () => { // we also renamed this method 
    signInWithEmailAndPassword(getAuth(), email.value, password.value) // THIS LINE CHANGED
        .then(async (data) => {
            console.log('Successfully logged in!');
            localStorage.setItem("user_email", data.user['email']);
            localStorage.setItem("user_status", true);
        })
        .then(async () => {
            router.push('/')

        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errMsg.value = 'No account with that email was found'
                    break
                case 'auth/wrong-password':
                    errMsg.value = 'Incorrect password'
                    break
                default:
                    errMsg.value = 'Email or password was incorrect'
                    router.push('/')
                    break
            }
        });
    const getprofile = async () => {
        const db = getFirestore();
        const q = query(collection(db, "users"), where("email", "==", email.value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data().full_name);
            // doc.data() is never undefined for query doc snapshots
            localStorage.setItem("designation", doc.data().designation);
            localStorage.setItem("profile_url", doc.data().profile_url);
            localStorage.setItem("user_id", doc.data().user);
            localStorage.setItem("user_email", email.value);
            localStorage.setItem("user_status", true);
            localStorage.setItem("name",doc.data().full_name);
        });

    }
    getprofile()
}
</script>
