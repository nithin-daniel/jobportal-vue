<script>
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, addDoc, query, where,limit } from "firebase/firestore";

import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

export default {
    components: {
        Footer,
        Navbar
    },
    data() {
        return {
            arr: []
        }
    },
    created() {
        this.getprofile();
    },
    methods: {
        async getprofile() {
            const db = getFirestore();
            // const q = query(collection(db, "users"));
            const q = query(collection(db, "users"), where("designation", "==", 'employer'));
            const querySnapshot = await getDocs(query(q));
            querySnapshot.forEach((doc) => {
                this.arr.push(doc.data());
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
                        <h1>Candidates Listing</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Start -->
    <!-- Candidates Listing Section Start -->
    <div class="candidates-listing-section section bg_color--5 pb-120 pb-lg-100 pb-md-75 pb-sm-60 pb-xs-50">
        <div class="container">
            <div class="row g-0">
                <div class="col-lg-12 order-lg-2 order-1">
                    <div class="filter-form">
                        <div class="result-sorting">
                            <div class="total-result">
                                <span class="total"></span>
                                Results Found
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div id="list" class="tab-pane fade show active">
                            <div class="row">

                                <div class="col-lg-12 mb-20" v-for="item in arr">
                                    <!-- Single Job Start  -->
                                    <div class="single-job style-two">
                                        <div class="info-top align-items-start">
                                            
                                            <div class="job-image candidates-image">
                                                <a href="">
                                                    <img :src= "item.profile_url" alt="profile picture">
                                                </a>
                                            </div>
                                            <div class="job-info">
                                                <div class="job-info-inner">
                                                    <div class="job-info-top" >
                                                        
                                                        <div class="title-name">
                                                            <h3 class="job-title">
                                                                <a href="">Aayush G</a>
                                                            </h3>
                                                            <div class="employer-name">
                                                                <span>Front End Developer</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="job-meta-three">
                                                        <!-- <div class="field-experience-time">
                                                            <i class="lnr lnr-graduation-hat"></i>
                                                            <span class="label">Experience</span>
                                                            <a href="#">3-5 years</a>
                                                        </div> -->
                                                        <!-- <div class="field-map"><i
                                                                class="lnr lnr-map-marker"></i>Chicago, Illinois</div>
                                                        <div class="field-hour-rate"><i class="lnr lnr-thumbs-up"></i>
                                                            <span class="label">Hour Rate</span> $30
                                                        </div> -->
                                                    </div>
                                                    <div class="job-skill-tag">
                                                        <a href="#">{{ item.skill }}</a>
                                                        <!-- <a href="#">app</a>
                                                        <a href="#">ReactJs</a>
                                                        <a href="#">Ruby</a> -->
                                                    </div>
                                                    <div class="candidates-portfolio">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Single Job End -->
                                </div>







                                


                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!-- Candidates Listing Section End -->
    <Footer />
</template>