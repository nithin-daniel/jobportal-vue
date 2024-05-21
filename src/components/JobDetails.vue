<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, addDoc, query, where, limit, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from 'axios';
import { useRouter } from 'vue-router'

import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
// import { createCheckoutSession } from '@/api/stripe'; // Replace with your API call to create a Checkout session
import { ref, defineComponent, onBeforeMount } from 'vue';
import { v4 as uuidv4 } from 'uuid';
const router = useRouter()

export default {

    components: {
        StripeElements,
        StripeElement,
        Navbar,
        Footer
    },


    data() {
        return {
            publishableKey: "",
            dateandtime: null,
            validated: false,
            booking: false,
            job: {},
            loading: false,
            lineItems: [
                {
                    price: '', // The id of the one-time price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: '/success',
            cancelURL: '/failed',
            db: null,
            arr: []
        }
    },


    created() {
        const id = this.$route.params.id;
        this.getprofile(id)
    },


    methods: {
        async getprofile(id) {
            this.db = getFirestore();
            const q = query(collection(this.db, "works"));
            const querySnapshot = await getDocs(query(q));
            querySnapshot.forEach((doc) => {
                if (doc.data().id == id) {
                    this.job = doc.data();
                }
            });
            // console.log(this.job);
        },

        async sendEmail() {
            console.log("Sending Email...");

            emailjs.init({
                publicKey: 'SLi4gU7PS7DYBM_u1',
                blockHeadless: true,
                limitRate: {
                    id: 'app',
                    throttle: 10000,
                },
            });

            if (this.job.job_type == "household") {

                [this.job.email, localStorage.user_email].forEach(async (email) => {
                    emailjs.send("service_fnwr405", "template_u839qq8", {
                        to_name: email,
                        from_name: "WorkEase",
                        message: "You have a new booking request for " + this.job.job_name + " on " + this.dateandtime + ". Please check your dashboard for more details.",
                    })
                        .then((response) => {
                            console.log("SUCCESS!", response.status, response.text);
                        }).catch((error) => {
                            console.log("FAILED...", error);
                        });
                });

            } else {

                emailjs.send("service_fnwr405", "template_u839qq8", {
                    to_name: this.job.email,
                    from_name: "WorkEase",
                    message: "You have a new booking request for " + this.job.job_name + " on " + this.dateandtime + ". Please check your dashboard for more details.",
                })
                    .then((response) => {
                        console.log("SUCCESS!", response.status, response.text);
                    })
                    .then(() => {

                        this.router.push('/')
                    })
                    .catch((error) => {
                        console.log("FAILED...", error);
                    });

            }
        },
        // async validate() {
        //     const db = getFirestore();
        //     const worksQuery = query(collection(db, "booking"), where("id", "==", this.$route.params.id)); //, where("user", "!=", localStorage.user_id)
        //     console.log(worksQuery);
        //     const worksSnapshot = await getDocs(worksQuery);
        //     worksSnapshot.forEach((doc) => {
        //         console.log(doc.data());
        //         this.arr.push(doc.data().booked_time);
        //     });

        //     // console.log(this.arr);
        //     // if (this.arr.includes(this.dateandtime.substring(0, 10))) {
        //     //     this.validated = true
        //     // } else {
        //     //     this.book()
        //     // }

        // },
        async validate() {
            console.log("Route param ID:", this.$route.params.id);

            const db = getFirestore();
            const worksQuery = query(collection(db, "booking"), where("work_id", "==", this.$route.params.id));
            console.log("Firestore Query:", worksQuery);

            try {
                const worksSnapshot = await getDocs(query(worksQuery));
                console.log("Snapshot:", worksSnapshot);

                worksSnapshot.forEach((doc) => {
                    // console.log(doc.data().booked_time);
                    // this.arr.push(doc.data().booked_time);
                    const data = doc.data();
                    if (data.booked_time) {
                        this.arr.push(...data.booked_time); // Assuming booked_time is an array
                    }
                });

                // console.log("Array of booked times:", this.arr);
                const plainArr = Array.from(this.arr);
                console.log("Array of booked times:", plainArr);
                console.log(this.dateandtime.slice(0,10));
                if (this.arr.includes(this.dateandtime.slice(0,10))){
                    this.validated = true;
                    console.log(true);
                }else {
                    this.booking = true;
                    this.book(); // If the time is not booked, proceed with booking
                    console.log("Book Function");
                }

                // if (this.arr.includes(this.dateandtime.substring(0, 10))) {
                //     this.validated = true; // This should show the error message in your template
                //     console.log("done");
                // } else {
                //     // this.book(); // If the time is not booked, proceed with booking
                //     console.log("Book Function");
                // }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async book() {
            const router = useRouter();
            const db = getFirestore();
            const worksQuery = query(collection(db, "works"), where("id", "==", this.$route.params.id)); //, where("user", "!=", localStorage.user_id)
            const worksSnapshot = await getDocs(worksQuery);
            worksSnapshot.forEach((doc) => {
                // this.arr.push(doc.data().booked_users);
                // console.log(doc.data());
            });
            // console.log(this.dateandtime.substring(0, 10))
            const docRef = await addDoc(collection(this.db, "booking"), {
                id: uuidv4(),
                name: localStorage.name,
                user: localStorage.user_id,
                booked_user: [],
                email: localStorage.user_email,
                time: this.dateandtime,
                work: this.job.id,
                work_id: this.$route.params.id
            })
            // console.log(docRef.id);

            const updatedData = {
                booked_user: arrayUnion(localStorage.user_id),
                booked_time: arrayUnion(this.dateandtime.substring(0, 10))
            };
            // const updateUser = {
            //     booked_time : arrayUnion(this.dateandtime.substring(0, 10))
            // }
            await updateDoc(docRef, updatedData)

            // await updateDoc()

            await this.sendEmail();

            // window.location.href = '/';
            // router.push("/")

            setTimeout(() => {
                this.$router.push("/");
            }, 3000); // 3000 milliseconds = 3 seconds
        },

        async handleCheckout() {
            const stripePromise = loadStripe('');
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                payment_method_types: ['wechat_pay'],
                payment_method_options: {
                    wechat_pay: {
                        client: 'web',
                    },
                },
                lineItems: [{ price: '', quantity: 1 }],
                mode: 'payment',
                successUrl: '/success',
                cancelUrl: '/canceled',
            });
            if (error) {
                console.error(error);
            }
        },


    }

}


</script>


<template>
    <Navbar />

    <!-- <div v-for="job in jobs"> -->
    <div class="breadcrumb-section section bg_color--5 pt-100 pt-sm-50 pt-xs-40 pb-60 pb-sm-50 pb-xs-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="page-breadcrumb-content">

                        <h1>{{ job.job_name }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Start -->

    <!-- Job Meta Detail Box Section Start -->
    <div class="job-meta-detail-box section bg_color--5 pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
        <div class="container">
            <div class="row g-0">

                <div class="col-lg-4 col-md-6">
                    <!-- Single Meta Field Start -->
                    <div class="single-meta-field">
                        <div class="field-label">
                            <i class="lnr lnr-map-marker"></i>
                            <span>Company Name</span>
                        </div>
                        <div class="field-value">{{ job.name }}</div>
                    </div>
                    <!-- Single Meta Field Start -->
                </div>

                <div class="col-lg-4 col-md-6">
                    <!-- Single Meta Field Start -->
                    <div class="single-meta-field">
                        <div class="field-label">
                            <i class="lnr lnr-layers"></i>
                            <span>Skills </span>
                        </div>
                        <div class="field-value">
                            <div class="job-skill-tag">
                                <a href="#">{{ job.skills }}</a>
                            </div>
                        </div>
                    </div>
                    <!-- Single Meta Field Start -->
                </div>



                <div class="col-lg-4 col-md-6">
                    <!-- Single Meta Field Start -->
                    <div class="single-meta-field">
                        <div class="field-label">
                            <i class="lnr lnr-tag"></i>
                            <span>Job Type </span>
                        </div>
                        <div class="field-value"><a href="#">{{ job.job_type }}</a></div>
                    </div>
                    <!-- Single Meta Field Start -->
                </div>





            </div>
        </div>
    </div>
    <!-- Job Meta Detail Box Section End -->

    <!-- Job Details Section Start -->
    <div
        class="job-details-section section pt-120 pt-lg-100 pt-md-80 pt-sm-50 pt-xs-40 pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
        <div class="container">
            <div class="row">

                <div class="col-lg-4 order-lg-2 order-2 mt-sm-60 mt-xs-50">
                    <div class="sidebar-wrapper-three">
                        <div class="common-sidebar-widget sidebar-three">
                            <div class="sidebar-job-apply">
                                <div class="action-button">

                                    <StripeElements v-if="stripeLoaded" v-slot="{ elements, instance }" ref="elms"
                                        :stripe-key="stripeKey" :instance-options="instanceOptions"
                                        :elements-options="elementsOptions">
                                        <StripeElement ref="card" :elements="elements" :options="cardOptions" />
                                    </StripeElements>

                                    <!-- <button type="button" @click="pay">Pay</button> -->

                                    <label for="dateandtime">Date & Time</label>
                                    <br>
                                    <input type="datetime-local" v-model="dateandtime" required>
                                    <br>
                                    <br>
                                    <p v-if="validated" style="color: red;" >This date already booked</p>
                                    
                                    <p v-if="booking" style="color: green;" >Booking Please Wait</p>
                                    <br>
                                    <button class="ht-btn text-center" :disabled="!dateandtime"
                                        :class="{ 'ht-btn--disabled': !dateandtime }" @click="validate">Book Now
                                        <i class="ml-10 mr-0 fa fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="common-sidebar-widget sidebar-three">
                            <div class="sidbar-image">
                                <a href="#">
                                    <!-- <img src="assets/images/banner/ads-two.jpg" alt=""> -->
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8 order-lg-1 order-1 pr-55 pr-md-15 pr-sm-15 pr-xs-15">

                    <div class="job-detail-content">
                        <div class="field-descriptions mb-60 mb-sm-30 mb-xs-30">
                            <h3>Job Description</h3>

                            <p>{{ job.jobdescription }}</p>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!-- Job Details Section End -->
    <!-- </div> -->

    <Footer />

</template>


<style scoped>
.ht-btn--disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>