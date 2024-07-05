<script>
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, addDoc, query, where, limit } from "firebase/firestore";

import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

export default {
    components: {
        Footer,
        Navbar
    },
    data() {
        return {
            worksArr: [],
            bookingArr: []
        }
    },
    mounted() {
        this.getprofile();
    },
    methods: {
        checkStatus(item) {
            let status = true;
            this.bookingArr.forEach((booking) => {
                if (booking.work === item.id) {
                    status = false;
                }
            });
            return status;
        },
        async getprofile() {
            const db = getFirestore();

            const worksQuery = query(collection(db, "works", where("user", "!=", localStorage.user_id))); //, where("user", "!=", localStorage.user_id)
            const worksSnapshot = await getDocs(worksQuery);
            worksSnapshot.forEach((doc) => {
                this.worksArr.push(doc.data());
            });

            const bookingQuery = query(collection(db, "booking"));
            const bookingSnapshot = await getDocs(query(bookingQuery));
            bookingSnapshot.forEach((doc) => {
                // this.bookingArr.push(doc.data());

                if (doc.data().user === localStorage.getItem('user_id')) {
                    this.bookingArr.push(doc.data());
                }
            });

            console.log({
                works: this.worksArr,
                booking: this.bookingArr
            });
        }
    }
}
</script>

<template>
    <Navbar />
    <!-- Breadcrumb Section Start -->
    <div class="breadcrumb-section section bg_color--5 pt-60 pt-sm-50 pt-xs-40 pb-60 pb-sm-50 pb-xs-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="page-breadcrumb-content">
                        <ul class="page-breadcrumb">
                            <li></li>
                            <li></li>
                        </ul>
                        <h1>Jobs Listing</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Start -->

    <!-- Job Listing Section Start -->
    <div class="job-listing-section section bg_color--5 pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
        <div class="container">
            <div class="row g-0">
                <div class="col-lg-12 order-lg-2 order-1">
                    <div class="filter-form">
                        <div class="result-sorting">
                            <div class="total-result">
                                <!-- <span class="total">(22)</span> -->
                                Jobs &amp; Vacancies
                            </div>
                            <div class="job-alert-form">
                                <!-- <span class="btn-open-form">
                                    <i class="lnr lnr-envelope"></i>
                                    Email me jobs like these 
                                </span> -->
                                <div class="job-alert-form-box">
                                    <h3 class="title"> Email me jobs like these</h3>
                                    <div class="btn-close-form"><i class="lnr lnr-cross-circle"></i></div>
                                    <form action="#">
                                        <div class="newsletter">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <input type="text" name="alert-name" placeholder="Job alert name..."
                                                        class="alert-name">
                                                </div>
                                                <div class="col-md-5">
                                                    <input type="email" class="alert-email"
                                                        placeholder="example@email.com" name="alert-email">
                                                </div>
                                                <div class="col-md-2">
                                                    <button class="ht-btn">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div id="list" class="tab-pane fade show active">
                            <div class="row">



                                <div class="col-lg-12 mb-20" v-for="item in worksArr">
                                    <!-- Single Job Start  -->
                                    <div class="single-job style-two" :style="{ 'pointer-events': checkStatus(item) ? 'auto' : 'none', 'opacity': checkStatus(item) ? '1' : '0.5', 'cursor': checkStatus(item) ? 'pointer' : 'not-allowed' }">
                                        <a :href="'/job-details/' + item.id" style="width: 100%;">
                                            <div class="info-top">
                                                <!-- <div class="job-image">
                                                    <a href="job-details.html">
                                                        <img src="../assets/images/companies_logo/logo-100/logo1.jpg"
                                                            alt="logo">
                                                    </a>
                                                </div> -->
                                                <div class="job-info">
                                                    <div class="job-info-inner">
                                                        <div class="job-info-top">
                                                            <div class="saveJob for-listing">
                                                                <!-- <span class="featured-label">featured</span> -->
                                                                <!-- <a class="job-type-label ml-20 mr-20">Full Time</a> -->
                                                                <div v-if="item.job_type === 'household'">
                                                                    <a class="job-type-label partTime ml-20 mr-20">House
                                                                        Hold</a>
                                                                </div>
                                                                <div v-else>
                                                                    <a class="job-type-label partTime ml-20 mr-20">Part
                                                                        Time</a>
                                                                </div>
                                                                <a class="save-job" href="#quick-view-modal-container"
                                                                    data-toggle="modal">
                                                                    <!-- <i class="far fa-heart"></i> -->
                                                                </a>
                                                            </div>
                                                            <div class="title-name">
                                                                <h3 class="job-title">
                                                                    <!-- <a href="/jobs-details">{{ item.job_name }}</a> -->
                                                                    <a :href="'/job-details/' + item.id">{{ item.job_name
                                                                        }}</a>
                                                                </h3>
                                                                <div class="employer-name">
                                                                    <a href="job-details.html">{{ item.name }}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="job-skill-tag">
    
                                                            <div style="display: flex; justify-content: space-between;">
                                                                <p>{{ item.skills }}</p>
    
                                                                <div>
                                                                    <template v-if="checkStatus(item)">
                                                                        <p
                                                                            style="font-size: large; background-color: green; color: white; padding: 4px 12px;">
                                                                            AVAILABLE</p>
                                                                    </template>
                                                                    <template v-if="!checkStatus(item)">
                                                                        <p
                                                                            style="font-size: large; background-color: red; color: white; padding: 4px 12px;">
                                                                            BOOKED</p>
                                                                    </template>
                                                                </div>
                                                            </div>
    
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <!-- Single Job End -->
                                </div>




                            </div>
                            <!-- <div class="row">
                                    <div class="col-12">
                                        <ul class="page-pagination">
                                            <li><a href="#"><i class="fa fa-angle-left"></i></a></li>
                                            <li class="active"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
                                        </ul>
                                    </div>
                                </div> -->
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!-- Job Listing Section End -->
    <Footer />
</template>