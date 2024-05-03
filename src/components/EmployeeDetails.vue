<script setup>
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
</script>


<template>
    <Navbar />
    <div class="template-color-1">

        <div id="main-wrapper">
            <!-- Breadcrumb Section Start -->
            <div class="breadcrumb-section section pt-100 pt-sm-50 pt-xs-40">
                <div class="container sb-border-two pb-60 pb-sm-50 pb-xs-40">
                    <div class="row">
                        <div class="col-12">

                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-7">
                            <div class="employer-head-info">
                                <div class="employer-logo">
                                    <a href="#"><img src="../assets/images/companies_logo/logo-10.jpg" alt=""></a>
                                </div>
                                <div class="employer-content">
                                    <h1 class="employer-name">HasThemes <i class="fas fa-check-circle"></i></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Breadcrumb Section Start -->

            <!-- Employer Details Section Start -->
            <div
                class="employer-details-section section pt-120 pt-lg-100 pt-md-80 pt-sm-50 pt-xs-40 pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
                <div class="container">
                    <div class="row">



                        <div class="col-lg-8 order-lg-1 order-1 pr-55 pr-md-15 pr-sm-15 pr-xs-15">

                            <div class="employer-main-content">
                                <div class="field-description">
                                    <h6>"Experienced professional with a proven track record in delivering results
                                        across multiple industries. Skilled in fostering strong client relationships and
                                        driving strategic initiatives for business growth."</h6>

                                    <h3>Overview</h3>

                                   

                                    <h3>What You Will Get</h3>

                                    >

                                    <ul>
                                        <li>Extra Private health insurance coverage by the company to help you getting
                                            better focus on working</li>
                                        <li>Flexible working time schedule and leave policy as we know the importance of
                                            work-life balance</li>
                                        <li>CBe exposed to the latest technology and the most innovative ideas worldwide
                                        </li>
                                        <li>Company trip, team-building events</li>
                                        <li>13th salary and project bonus</li>
                                        <li>Work-from-home policy</li>
                                        <li>Support laptop</li>
                                        <li>Extra healthcare package</li>
                                    </ul>
                                </div>
                                <div class="field-skills">
                                    <h3>Skills</h3>
                                    <ul class="skill-tag">
                                        <li><a href="#">Account Manager</a></li>
                                        <li><a href="#">Administrative</a></li>
                                        <li><a href="#">Android</a></li>
                                        <li><a href="#">Angular</a></li>
                                    </ul>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6">
                        <!-- Footer Widget Start -->
                        <div class="footer-widget mb-30">
                            <h6 class="title">Book Now</h6>
                            <div class="newsletter">
                                <p>Click here for the payment
                                </p>
                                <div class="newsletter-form">
                                    <form id="mc-form" class="mc-form">
                                        <!-- <input type="email" placeholder="Enter Your email..." required="" name="EMAIL"> -->
                                        <button class="ht-btn small-btn" type="submit" value="submit">Book Now</button>
                                    </form>
                                </div>
                                <!-- mailchimp-alerts Start -->
                                <div class="mailchimp-alerts">
                                    <div class="mailchimp-submitting"></div><!-- mailchimp-submitting end -->
                                    <div class="mailchimp-success"></div><!-- mailchimp-success end -->
                                    <div class="mailchimp-error"></div><!-- mailchimp-error end -->
                                </div>
                                <!-- mailchimp-alerts end -->
                            </div>
                        </div>
                        <!-- Footer Widget End -->
                    </div>



                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <!-- Employer Details Section End -->

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
                                                            href="#login">Login</a></li>
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
                                                                        class="ht-btn">Login</button></div>
                                                            </div>
                                                        </form>
                                                        <div class="divider">
                                                            <span class="line"></span>
                                                            <span class="circle">or login with</span>
                                                        </div>
                                                        <div class="social-login">
                                                            <ul class="social-icon">
                                                                <li><a class="facebook" href="#"><i
                                                                            class="fab fa-facebook"></i></a></li>
                                                                <li><a class="twitter" href="#"><i
                                                                            class="fab fa-twitter"></i></a></li>
                                                                <li><a class="linkedin" href="#"><i
                                                                            class="fab fa-linkedin"></i></a></li>
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
                                                                            and agree to the <a href="#">Terms &amp;
                                                                                Conditions</a> and <a href="#">Privacy
                                                                                Policy</a></label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 mb-25"><button
                                                                        class="ht-btn">Register</button></div>
                                                            </div>
                                                        </form>
                                                        <div class="divider">
                                                            <span class="line"></span>
                                                            <span class="circle">or login with</span>
                                                        </div>
                                                        <div class="social-login">
                                                            <ul class="social-icon">
                                                                <li><a class="facebook" href="#"><i
                                                                            class="fab fa-facebook"></i></a></li>
                                                                <li><a class="twitter" href="#"><i
                                                                            class="fab fa-twitter"></i></a></li>
                                                                <li><a class="linkedin" href="#"><i
                                                                            class="fab fa-linkedin"></i></a></li>
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
                                                    full access at Jotopa. We need to know your account details in order
                                                    to allow work together</p>
                                                <ul class="list-reasons">
                                                    <li class="reason">Be alerted to the latest jobs</li>
                                                    <li class="reason">Apply for jobs with a single click</li>
                                                    <li class="reason">Showcase your CV to thousands of employers</li>
                                                    <li class="reason">Keep a record of all your applications</li>
                                                </ul>
                                                <span class="sale-text theme-color border-color">Login today &amp; Get
                                                    15% Off Coupon for the first planning purchase</span>
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
    <Footer/>
</template>