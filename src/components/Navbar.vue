<template>
    <div class="template-color-1">
        <div id="main-wrapper">
            <!--Header section start-->
            <div class="header-absolute sb-border header-sticky d-none d-lg-block">
                <div class="main-header">
                    <div class="container-fluid pl-50 pl-lg-15 pl-md-15 pr-0">
                        <div class="row align-items-center g-0">

                            <!--Logo start-->
                            <div class="col-xl-2 col-lg-2 col-12">
                                <div class="logo">
                                    <a href="/">
                                        <h1
                                            style="font-size: 1.75rem; font-weight: bold; color: white; text-decoration: none;">
                                            WorkEase</h1>
                                    </a>
                                </div>
                            </div>
                            <!--Logo end-->

                            <!--Menu start-->
                            <div class="col-xl-7 col-lg-7 col-12">
                                <nav class="main-menu">
                                    <ul>
                                        <li><a href="/">Home <small class="icon-arrow"></small></a>

                                        </li>
                                        <li v-if="isCompany" class="jp-author item">
                                            <!-- <div class="jp-author item"> -->
                                                <a href="/my-jobs">
                                                    <i class="lnr lnr-job"></i>
                                                    <span>My Jobs</span>

                                                </a>
                                            <!-- </div> -->
                                                </li>
                                        <!-- <li><a href="/candidates"><span class="label-status new"></span>
                                                Candidates <small class="icon-arrow"></small></a>
                                        </li> -->
                                    </ul>
                                </nav>
                            </div>
                            <!--Menu end-->

                            <!-- Cart & Search Area Start -->

                            <div class="col-xl-3 col-lg-3 col-12">
                                <div class="header-btn-action d-flex justify-content-end">
                                    <div class="btn-action-wrap d-flex">
                                        <div v-if="isCompany">
                                            <div class="jp-author item">
                                                <a href="/add-work">
                                                    <i class="lnr lnr-user"></i>
                                                    <span>Add Work</span>

                                                </a>
                                            </div>
                                        </div>
                                        <div v-if="storedValue">
                                            <div class="jp-author item">
                                                <a href="/" v-on:click="logout">
                                                    <i class="lnr lnr-user"></i>
                                                    <span>Logout</span>

                                                </a>
                                            </div>
                                        </div>
                                        <div class="jp-author item" v-else>
                                            <a href="/login">
                                                <i class="lnr lnr-user"></i>
                                                <span>Login</span>
                                            </a>
                                            <a href="/register">
                                                <i class="lnr lnr-user"></i>
                                                <span>Register</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Cart & Search Area End -->
                        </div>

                    </div>
                </div>
            </div>
            <!--Header section end-->

            <!--Header Mobile section start-->
            <div class="header-mobile bg_color--2 d-block d-lg-none">
                <div class="header-bottom menu-right">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="header-mobile-navigation d-block d-lg-none">
                                    <div class="row align-items-center">
                                        <div class="col-3 col-md-3">
                                            <div class="mobile-navigation text-right">
                                                <div class="header-icon-wrapper">
                                                    <ul class="icon-list justify-content-start">
                                                        <li class="popup-mobile-click">
                                                            <a href="/"><i class="">WorkEase</i></a>
                                                        </li>
                                                        <!-- <li class="popup-mobile-click">
                                                            <a href="/" style=""><i class="">WorkEase</i></a>
                                                        </li> -->
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-md-6">
                                            <div class="header-logo text-center">
                                                <!-- <a href="index.html">
                                                    <img src="../assets/images/logo-mobile.png" class="img-fluid"
                                                        alt="">
                                                </a> -->
                                            </div>
                                        </div>
                                        <div class="col-3 col-md-3">
                                            <div class="mobile-navigation text-right">
                                                <div class="header-icon-wrapper">
                                                    <ul class="icon-list justify-content-end">
                                                        <li>
                                                            <div>
                                                                <a href="/jobs">
                                                                    <h6 style="color: #fff; margin-bottom: -5px;">Jobs
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div v-if="isCompany">
                                                                <a href="/add-work">
                                                                    <h6 style="color: #fff; margin-bottom: -5px;">Add
                                                                        Work
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <!-- <li>
                                                            <div>
                                                                <a href="/candidate">
                                                                    <h6 style="color: #fff; margin-bottom: -5px;">Candidates
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                        </li> -->


                                                        <li>
                                                            <div class="header-cart-icon">
                                                                <a href="#" class="header-search-toggle"><i
                                                                        class=""></i></a>
                                                            </div>
                                                            <div v-if="storedValue">
                                                                <a href="" v-on:click="logout">
                                                                    <h6 style="color: #fff; margin-bottom: 26px;">Logout
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                            <div v-else>
                                                                <a href="/login">
                                                                    <h6 style="color: #fff; margin-bottom: 26px;">Login
                                                                    </h6>
                                                                </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--Header Mobile section end-->
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'; // Assuming you're using Vue 3 (optional)
import { useRouter } from 'vue-router' // import router

const router = useRouter() // get a reference to our vue router

export default {
    setup() {
        const storedValue = ref(null); // Initialize a reactive variable for the value
        const addwork = ref('');

        // Access localStorage on component mount (or at a specific time)
        const fetchStoredValue = () => {
            const valueFromStorage = localStorage.getItem('user_id');
            const company = localStorage.getItem('designation')
            addwork.value = company
            storedValue.value = valueFromStorage;
        };

        fetchStoredValue();
        const isCompany = addwork.value === 'company';

        return {
            storedValue,
            isCompany
        };
    },
    methods: {
        logout(event) {
            localStorage.clear();
            router.push('/login');
        },
    },
};

</script>