<script>
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

import { collection, getDocs, addDoc, query, where, limit } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'


export default {
    components: {
        Footer,
        Navbar
    },
    data() {
        return {
            arr: [],
            showSearch: true,
            location: '',
            error: false,
        }
    },
    created() {
        this.getprofile();
    },
    methods: {
        async getprofile() {
            const db = getFirestore();
            const q = query(collection(db, "works"));
            const querySnapshot = await getDocs(query(q, limit(10))); //, where("user", "!=", localStorage.user_id)
            querySnapshot.forEach((doc) => {
                const documentWithId = { id: doc.id, ...doc.data() };
                this.arr.push(documentWithId);
            });
        },
        async handleClick() {
            this.arr = []
            const locationInput = this.$refs.locationInput;
            if (!locationInput.validity.valid) {
                alert("Location Field Required")
                return;
            }
            this.$refs.sectionTitle.scrollIntoView({ behavior: 'smooth' });
            const db = getFirestore();
            const q = query(collection(db, "works"));
            const querySnapshot = await getDocs(query(q, where("location", "==", this.location))); //, where("user", "!=", localStorage.user_id)
            if (!querySnapshot.empty) {
                // this.arr = []
                // this.arr = []
                // const existingIds = new Set(this.arr.map(item => item.id));
                querySnapshot.forEach((doc) => {
                    const documentWithId = { id: doc.id, ...doc.data() };
                    // this.arr.push(documentWithId);
                    const existingDocument = this.arr.find(item => item.id === documentWithId.id);
                    console.log(existingDocument);
                    if (!existingDocument) {
                        // Push the document data to the arr array if it doesn't exist
                        this.arr.push(documentWithId);
                    }
                });
                this.getprofile();
                console.log(this.arr);
            } else {
                // this.error = true;
            }
        }
    }
}

</script>


<template>
    <Navbar />
    <div class="template-color-1">
        <div id="main-wrapper">
            <!-- Start Popup Menu -->
            <!-- Bottom Navbar Mobile Popup Start -->
            <div class="mobile-popup">
                <div class="job-list-mobile" id="job-list-mobile-id">
                    <div class="heading">
                        <div class="title">
                            <i class="lnr lnr-list"></i>
                            <h3>All Jobs list</h3>
                        </div>
                        <a class="view-all" href="#">See all jobs</a>
                    </div>
                    <div class="content-popup-scroll">
                        <ul class="list-item">
                            <li><a href="job-listing.html"><i class="lnr lnr-printer"></i>Accounting </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-film-play"></i>Broadcasting </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-phone"></i>Customer Service </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-bullhorn"></i>Digital Marketing </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-chart-bars"></i>Finance & Accounting </a>
                            </li>
                            <li><a href="job-listing.html"><i class="lnr lnr-smartphone"></i>Game Mobile </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-picture"></i>Graphics & Design </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-home"></i>Graphics & Design </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-database"></i>Medical Doctor </a></li>
                            <li><a href="job-listing.html"><i class="lnr lnr-dinner"></i>Restaurant </a></li>
                        </ul>
                    </div>
                </div>
                <div class="notifications-mobile" id="notifications-mobile-id">
                    <div class="heading">
                        <div class="title">
                            <i class="lnr lnr-list"></i>
                            <h3>All Notifications</h3>
                        </div>
                        <a class="view-all" href="#">See all jobs</a>
                    </div>
                    <div class="content-popup-scroll">
                        <ul class="list-item">
                            <li><a href=""><i class="lnr lnr-book"></i><span><b class="highlight">Register now</b> to
                                        reach dream jobs easier.</span> </a>
                            </li>
                            <li><a href=""><i class="lnr lnr-book"></i><span><b class="highlight">Job
                                            suggestion</b> you might be interested based on your profile.</span> </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Bottom Navbar Mobile Popup End -->

            <!--slider section start-->
            <div class="hero-section section position-relative">
                <!--Hero Item start-->
                <div class="hero-item bg_image--1">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">

                                <!--Hero Content start-->
                                <div class="hero-content-2 left">
                                    <h2 class="title">Top Recruiting Website</h2>
                                    <h3 class="sub-title">For Professionals</h3>
                                    <p>Jobs & Job search. Find jobs in global. Executive jobs & work. Employment</p>



                                    <template v-if="showSearch">
                                        <div class="job-search-wrap mt-90 mt-md-70 mt-sm-50 mt-xs-30">
                                            <div class="job-search-form">
                                                <form action="#">
                                                    <div class="row row-5">
                                                        <!-- <div class="col-lg-4 col-md-6 col-sm-6 col-12"> -->
                                                        <!-- Single Field Item Start  -->
                                                        <!-- <div class="single-field-item">
                                                                <i class="lnr lnr-magnifier"></i>
                                                                <input placeholder="What jobs you want?" name="keyword"
                                                                    type="text">
                                                            </div> -->
                                                        <!-- Single Field Item End  -->
                                                        <!-- </div> -->

                                                        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                                            <!-- Single Field Item Start  -->
                                                            <div class="single-field-item">
                                                                <i class="lnr lnr-map-marker"></i>
                                                                <div>
                                                                    <input class="input-field input-field-location"
                                                                        placeholder="Location" type="text"
                                                                        v-model="location" required=""
                                                                        ref="locationInput" />
                                                                </div>
                                                            </div>
                                                            <!-- Single Field Item End  -->
                                                        </div>
                                                        <div class="col-lg-2 col-md-6 col-sm-6 col-12">
                                                            <div class="submit-btn" @click.prevent="handleClick">
                                                                <button class="ht-btn" type="submit"> Search</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </template>



                                </div>
                                <!--Hero Content end-->

                            </div>
                        </div>
                    </div>
                </div>
                <!--Hero Item end-->
            </div>
            <!--slider section end-->

            <!-- Feature Section Start -->
            <div class="feature-section section bg-image-proparty bg_image--2 pt-40 pb-10">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <!-- Single Feature Start -->
                            <div class="single-feature mb-30">
                                <div class="feature-icon">
                                    <i class="far fa-address-card"></i>
                                </div>
                                <div class="feature-content">
                                    <h3 class="title">User friendly</h3>
                                    <p>User Friendly company</p>
                                </div>
                            </div>
                            <!-- Single Feature End -->
                        </div>
                        <div class="col-lg-4">
                            <!-- Single Feature Start -->
                            <div class="single-feature mb-30">
                                <div class="feature-icon">
                                    <i class="far fa-file-alt"></i>
                                </div>
                                <div class="feature-content">
                                    <h3 class="title">Post Job Free</h3>
                                    <p>Approach a top million resumes</p>
                                </div>
                            </div>
                            <!-- Single Feature End -->
                        </div>
                        <div class="col-lg-4">
                            <!-- Single Feature Start -->
                            <div class="single-feature mb-30">
                                <div class="feature-icon">
                                    <i class="fa fa-search-location"></i>
                                </div>
                                <div class="feature-content">
                                    <h3 class="title">Find Work</h3>
                                    <p>Get the best jobs in your area</p>
                                </div>
                            </div>
                            <!-- Single Feature End -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Feature Section End -->

            <!-- Featured Employer Start -->
            <div class="featured-employer section pt-115 pt-lg-95 pt-md-75 pt-sm-55 pt-xs-45" id="jobs-list">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title-wrap mb-45">
                                <div class="section-title" ref="sectionTitle">
                                    <!-- <span>JOB FROM EMPLOYERS</span> -->
                                    <h3 class="title">Job From Employers</h3>
                                </div>
                                <div class="jetapo-link">
                                    <a href="#">Browse All Employers <i class="lnr lnr-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-five-column g-0 border-top-left">
                        <div v-if="error">
                            <!-- Message to display when the arr is empty -->
                            <h1>No Jobs Found</h1>
                        </div>
                        <div v-else class="col-xl-2 col-lg-3 col-md-6 col-sm-6" v-for="item in arr" :key="item.id">
                            <!-- Single Employer Item Start -->
                            <div class="employer-item item-border-bottom">
                                <span class="featured-employer-label">{{ item.designation }}</span>
                                <div class="employer-image">
                                    <img :src="item.profile_pic" alt="">
                                </div>
                                <div class="employer-info-top">
                                    <span class="employer-location"><i class="lnr lnr-map-marker"></i>Kerala </span>
                                    <h3 class="employer-name"><a :href="'/job-details/' + item.id">{{ item.job_name
                                            }}</a></h3>
                                </div>
                            </div>
                            <!-- Single Employer Item End -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Featured Employer End -->







            <!-- Testimonial Section Start -->
            <div
                class="testimonial-section section bg-image-proparty bg_image--2 pt-115 pt-lg-95 pt-md-75 pt-sm-55 pt-xs-45 pb-180 pb-lg-160 pb-md-140 pb-sm-60 pb-xs-30">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-6">
                            <div class="section-title-wrap mb-45">
                                <div class="section-title">
                                    <span> OUR HAPPY CLIENTS</span>
                                    <h3 class="title"> From Testimonials</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-slider">

                        <div class="col-lg-6">
                            <!-- Single Testimonial Start -->
                            <div class="single-testimonial">
                                <div class="testimonial-author">
                                    <div class="testimonial-avatar">
                                        <!-- <img src="../assets/images/testimonial/testimonial-1.png" alt=""> -->
                                    </div>
                                    <div class="testimonial-meta">
                                        <h5 class="name">Aayush G</h5>
                                        <p class="text">
                                            <span class="position">CEO at</span>
                                            <span class="company theme-color">Infosys</span>
                                        </p>
                                    </div>
                                    <span class="icon-quote theme-color">
                                        <i class="fas fa-quote-right"></i>
                                    </span>
                                </div>
                                <div class="testimonial-comment">
                                    <p>"I am so pleased with this product. WorkEase Recruitment has completely surprised
                                        our
                                        expectations. If you aren't sure, always go for WorkEase Recruitment. WorkEase
                                        Recruitment is the real deal!"</p>
                                </div>
                            </div>
                            <!-- Single Testimonial End -->
                        </div>



                        <div class="col-lg-6">
                            <!-- Single Testimonial Start -->
                            <div class="single-testimonial">
                                <div class="testimonial-author">
                                    <div class="testimonial-avatar">
                                        <!-- <img src="../assets/images/testimonial/testimonial-3.jpg" alt=""> -->
                                    </div>
                                    <div class="testimonial-meta">
                                        <h5 class="name">Devamanas</h5>
                                        <p class="text">
                                            <span class="position">Freelance Designer at</span>
                                            <span class="company theme-color">Alpha</span>
                                        </p>
                                    </div>
                                    <span class="icon-quote theme-color">
                                        <i class="fas fa-quote-right"></i>
                                    </span>
                                </div>
                                <div class="testimonial-comment">
                                    <p>"I am so pleased with this product. WorkEase Recruitment has completely surprised
                                        our
                                        expectations. If you aren't sure, always go for WorkEase Recruitment. WorkEase
                                        Recruitment is the real deal!"</p>
                                </div>
                            </div>
                            <!-- Single Testimonial End -->
                        </div>

                    </div>
                </div>
            </div>
            <!-- Testimonial Section End -->

            <!-- Funfact Section Start  -->
            <div class="funfact-section section mt--60 pb-50 pb-sm-0 pb-xs-0">
                <div class="container">
                    <div class="row g-0 border-top-left">

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <!-- Single Funfact Start -->
                            <div class="single-funfact">
                                <div class="icon-img">
                                    <img src="../assets/images/icons/candidates.png" alt="">
                                </div>
                                <div class="funfact-content">
                                    <span class="counter">87,360</span>
                                    <span class="text theme-color">Candidates</span>
                                </div>
                            </div>
                            <!-- Single Funfact End -->
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <!-- Single Funfact Start -->
                            <div class="single-funfact">
                                <div class="icon-img">
                                    <img src="../assets/images/icons/total-jobs.png" alt="">
                                </div>
                                <div class="funfact-content">
                                    <span class="counter">20,258</span>
                                    <span class="text theme-color">Total Jobs</span>
                                </div>
                            </div>
                            <!-- Single Funfact End -->
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <!-- Single Funfact Start -->
                            <div class="single-funfact">
                                <div class="icon-img">
                                    <img src="../assets/images/icons/employers.png" alt="">
                                </div>
                                <div class="funfact-content">
                                    <span class="counter">8,650</span>
                                    <span class="text theme-color">Employers</span>
                                </div>
                            </div>
                            <!-- Single Funfact End -->
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <!-- Single Funfact Start -->
                            <div class="single-funfact">
                                <div class="icon-img">
                                    <img src="../assets/images/icons/job-applications.png" alt="">
                                </div>
                                <div class="funfact-content">
                                    <span class="counter">50,299</span>
                                    <span class="text theme-color">job applications</span>
                                </div>
                            </div>
                            <!-- Single Funfact End -->
                        </div>

                    </div>
                </div>
            </div>
            <!-- Funfact Section Start  -->

            <!-- CTA Section Start  -->
            <div class="cta-section section bg_image--3 height-100vh pt-50 pt-xs-40">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cta-wrap mb-45">
                                <div class="cta-info">
                                    <span> Getting started to work</span>
                                    <h3 class="title"> Don’t just find. Be found. Put your <br> CV in front of great
                                        employers</h3>
                                    <p>It helps you to increase your chances of finding a suitable job and let
                                        recruiters
                                        <br> contact you about jobs that are not needed to pay for advertising.
                                    </p>
                                    <!-- <a class="ht-btn lg-btn" href="#"><i class="lnr lnr-cloud-upload"></i>Upload Your
                                Resume</a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- CTA Section End  -->

            <!-- Brand Section Start  -->
            <div class="brand-section section bg_color--3 pt-40 pb-40">
                <div class="container">
                    <div class="row row-five-column align-items-center">

                        <div class="col-xl-2 col-20">
                            <div class="brand-heading">
                                <h3 class="title">We are <br> trusted by</h3>
                            </div>
                        </div>

                        <div class="col-xl-2 col-20">
                            <!-- Single Brand Start  -->
                            <div class="single-brand">
                                <a href="#">Infosys</a>
                            </div>
                            <!-- Single Brand End -->
                        </div>

                        <div class="col-xl-2 col-20">
                            <!-- Single Brand Start  -->
                            <div class="single-brand">
                                <a href="#">Greenhouse cleaning</a>
                            </div>
                            <!-- Single Brand End -->
                        </div>

                        <div class="col-xl-2 col-20">
                            <!-- Single Brand Start  -->
                            <div class="single-brand">
                                <a href="#">TechMaghie</a>
                            </div>
                            <!-- Single Brand End -->
                        </div>

                        <div class="col-xl-2 col-20">
                            <!-- Single Brand Start  -->
                            <div class="single-brand">

                            </div>
                            <!-- Single Brand End -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Brand Section End  -->

            <!-- Modal Area Start -->
            <div class="modal fade quick-view-modal-container" id="quick-view-modal-container" tabindex="-1"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="col-xl-12 col-lg-12">
                                <div class="row g-0">

                                    <div class="col-lg-4">
                                        <div class="login-register-form-area">
                                            <div class="login-tab-menu">
                                                <ul class="nav">
                                                    <li><a class="active show" data-bs-toggle="tab"
                                                            href="#login">Login</a>
                                                    </li>
                                                    <li><a data-bs-toggle="tab" href="#register">Register</a></li>
                                                </ul>
                                            </div>
                                            <div class="tab-content">
                                                <div id="login" class="tab-pane fade show active">
                                                    <div class="login-register-form">
                                                        <form action="#" method="post">
                                                            <p>Login to Jotopa with your registered account</p>
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <div class="single-input">
                                                                        <input type="text"
                                                                            placeholder="Username or Email" name="name">
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="single-input">
                                                                        <input type="password" placeholder="Password"
                                                                            name="password">
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="checkbox-input">
                                                                        <input type="checkbox"
                                                                            name="login-form-remember"
                                                                            id="login-form-remember">
                                                                        <label for="login-form-remember">Remember
                                                                            me</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 mb-25"><button
                                                                        class="ht-btn">Login</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div class="divider">
                                                            <span class="line"></span>
                                                            <span class="circle">or login with</span>
                                                        </div>
                                                        <div class="social-login">
                                                            <ul class="social-icon">
                                                                <li><a class="facebook" href="#"><i
                                                                            class="fab fa-facebook"></i></a>
                                                                </li>
                                                                <li><a class="twitter" href="#"><i
                                                                            class="fab fa-twitter"></i></a>
                                                                </li>
                                                                <li><a class="linkedin" href="#"><i
                                                                            class="fab fa-linkedin"></i></a>
                                                                </li>
                                                                <li><a class="google" href="#"><i
                                                                            class="fab fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="register" class="tab-pane fade">
                                                    <div class="login-register-form">
                                                        <form action="#" method="post">
                                                            <p>Create Your account</p>
                                                            <div class="row row-5">
                                                                <div class="col-12">
                                                                    <div class="single-input">
                                                                        <input type="text" placeholder="Your Username"
                                                                            name="name">
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="single-input">
                                                                        <input type="email"
                                                                            placeholder="Your Email Address"
                                                                            name="emain">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <div class="single-input">
                                                                        <input type="password" placeholder="Password"
                                                                            name="password">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <div class="single-input">
                                                                        <input type="password"
                                                                            placeholder="Confirm Password"
                                                                            name="conPassword">
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="checkbox-input">
                                                                        <input type="checkbox"
                                                                            name="login-form-candidate"
                                                                            id="login-form-candidate">
                                                                        <label for="login-form-candidate">I am a
                                                                            candidate</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="checkbox-input">
                                                                        <input type="checkbox"
                                                                            name="login-form-employer"
                                                                            id="login-form-employer">
                                                                        <label for="login-form-employer">I am a
                                                                            employer</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="register-account">
                                                                        <input id="register-terms-conditions"
                                                                            type="checkbox" class="checkbox" checked=""
                                                                            required="">
                                                                        <label for="register-terms-conditions">I read
                                                                            and
                                                                            agree to the <a href="#">Terms &amp;
                                                                                Conditions</a> and <a href="#">Privacy
                                                                                Policy</a></label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 mb-25"><button
                                                                        class="ht-btn">Register</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div class="divider">
                                                            <span class="line"></span>
                                                            <span class="circle">or login with</span>
                                                        </div>
                                                        <div class="social-login">
                                                            <ul class="social-icon">
                                                                <li><a class="facebook" href="#"><i
                                                                            class="fab fa-facebook"></i></a>
                                                                </li>
                                                                <li><a class="twitter" href="#"><i
                                                                            class="fab fa-twitter"></i></a>
                                                                </li>
                                                                <li><a class="linkedin" href="#"><i
                                                                            class="fab fa-linkedin"></i></a>
                                                                </li>
                                                                <li><a class="google" href="#"><i
                                                                            class="fab fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="login-instruction">
                                            <div class="login-instruction-content">
                                                <h3 class="title">Why Login To Us</h3>
                                                <p>It’s important for you to have an account and login in order to have
                                                    full
                                                    access at Jotopa. We need to know your account details in order to
                                                    allow
                                                    work together</p>
                                                <ul class="list-reasons">
                                                    <li class="reason">Be alerted to the latest jobs</li>
                                                    <li class="reason">Apply for jobs with a single click</li>
                                                    <li class="reason">Showcase your CV to thousands of employers</li>
                                                    <li class="reason">Keep a record of all your applications</li>
                                                </ul>
                                                <span class="sale-text theme-color border-color">Login today &amp; Get
                                                    15%
                                                    Off Coupon for the first planning purchase</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Modal Area End -->


            <!-- Placed js at the end of the document so the pages load faster -->
        </div>
    </div>
    <Footer />
</template>

<!-- <style scoped>
.read-the-docs {
    color: #888;
}
</style> -->
