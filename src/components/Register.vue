<template>
    <div class="breadcrumb-section section bg_color--5 pt-60 pt-sm-50 pt-xs-40 pb-60 pb-sm-50 pb-xs-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="page-breadcrumb-content">
                        <!-- <ul class="page-breadcrumb"> -->
                        <!-- <li></li>
                                <li></li> -->
                        <!-- </ul> -->
                        <h1>Register</h1>
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
                    <div class="login-register-form-area">
                        <div class="login-tab-menu">
                            <ul class="nav">
                                <li><a class="active show" data-bs-toggle="tab" href="/register">Register</a></li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div id="login" class="tab-pane fade show active">
                                <div class="login-register-form">
                                    <!-- <form action="#" method="post"> -->
                                    <p>Create Your account</p>
                                    <div class="row row-5">
                                        <div class="col-12">

                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <input type="text" placeholder="Enter Your Full Name" name="email"
                                                    id="name" required v-model="full_name">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="single-input">
                                                <input type="email" placeholder="Your Email Address" name="email"
                                                    id="email" required v-model="email">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="single-input">
                                                <input type="password" placeholder="Password" name="password1"
                                                    id="password1" required v-model="password1">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="single-input">
                                                <input type="password" placeholder="Confirm Password" name="password2"
                                                    id="password2" required v-model="password2">
                                            </div>
                                        </div>
                                        <div class="col-11">
                                            <div class="checkbox-input">
                                                <input type="radio" name="login-form" id="login-form-candidate">
                                                <label for="login-form-candidate">I am a company</label>

                                                <input type="radio" name="login-form" id="login-form-employer"
                                                    v-model="designation">
                                                <label for="login-form-employer">I am a employer</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="checkbox-input">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="register-account">
                                                <label for="register-terms-conditions">Upload a Profile
                                                    Picture</label>
                                                <input id="register-terms-conditions" type="file" class="" checked=""
                                                    accept="image/*" ref="profilePic" @change="profilePic" required>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="register-account">
                                                <input id="register-terms-conditions" type="checkbox" class="checkbox"
                                                    checked="" required="">
                                                <label for="register-terms-conditions">I read and agree to the <a
                                                        href="#">Terms &amp; Conditions</a> and <a href="#">Privacy
                                                        Policy</a></label>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-25"><button class="ht-btn"@click="register">Register</button></div>
                                    </div>
                                    <!-- </form> -->
                                </div>
                                <a href="/login">Already have account?</a>

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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router
import { collection, addDoc } from "firebase/firestore";
import * as firebase from '../../firebase/firebase.js'
import { getDatabase, ref as reff, set } from "firebase/database";
import { getFirestore } from 'firebase/firestore'
// import { getStorage, ref as reff } from "firebase/storage";
import { getStorage, ref as storeref, uploadBytes } from 'firebase/storage' 

const email = ref('')
const password2 = ref('')
const designation = ref('')
// const designation = ref(false);
const profilePicref = ref(null);
const full_name = ref('')

const router = useRouter() // get a reference to our vue router
const profilePic = (event) => {
    const file = event.target.files[0]
    profilePicref.value = file
}
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password2.value)
        .then(async (data) => {
            const dbnew = getFirestore();
            console.log(designation);
            const storage = getStorage();

            const imageRef = storeref(storage, 'images/' + profilePicref.value.name);
            uploadBytes(imageRef, profilePicref.value).then((snapshot) => {
                console.log('Uploaded profile picture!');
                console.log(snapshot);
            })
            const docRef = await addDoc(collection(dbnew, "users"), {
                full_name:full_name.value,
                user: data.user.uid,
                email: email.value,
                designation: designation.value ? 'employer' : 'company',
                profile_url: `https://firebasestorage.googleapis.com/v0/b/jobportal-bd6bb.appspot.com/o/images%2F${profilePicref.value.name}?alt=media&token=ec38a020-f31b-4284-bd06-47bedb7f9097`
                // https://firebasestorage.googleapis.com/v0/b/jobportal-bd6bb.appspot.com/o/images%2F${profilePicref.value.name}?alt=media&token=ec38a020-f31b-4284-bd06-47bedb7f9097
            });
            console.log("Document written with ID: ", docRef.id);

        })
        .then(() => {
            console.log('Successfully registered!');
            router.push('/login')
        })
        .catch(error => {
            console.log(error.code)
            alert(error.message);
        });
}

</script>