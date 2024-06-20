<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore();
const router = useRouter();

const overview = ref('');
const skills = ref('');
const job_type = ref('');
const job_name = ref('');
const jobdescription = ref('');
const location = ref('');

const addWork = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (overview.value && skills.value && job_type.value && job_name.value && jobdescription.value && location.value) {
        try {
            await addDoc(collection(db, "works"), {
                id: uuidv4(),
                name: localStorage.name,
                user: localStorage.user_id,
                email: localStorage.user_email,
                overview: overview.value,
                skills: skills.value,
                job_type: job_type.value,
                job_name: job_name.value,
                jobdescription: jobdescription.value,
                profile_pic: localStorage.profile_url,
                location: location.value
            });
            router.push('/');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        alert("All fields are required!");
    }
}
</script>

<template>
    <div>
        <Navbar />
    </div>
    <div class="container pt-10">
        <h1 style="padding-top: 100px;">Add Work</h1>
        <hr>
        <form @submit="addWork">
            <div class="col-12">
                <div class="single-input">
                    <input type="text" placeholder="Job Name" name="job_name" id="job_name" required v-model="job_name">
                </div>
                <div class="single-input">
                    <input type="text" placeholder="Overview" name="Overview" id="Overview" required v-model="overview">
                </div>
                <div class="single-input">
                    <input type="text" placeholder="Job Description" name="jobdescription" id="jobdescription" required v-model="jobdescription">
                </div>
                <div class="single-input">
                    <input type="text" placeholder="Skills" name="skills" id="skills" required v-model="skills">
                </div>
                <div class="single-input">
                    <input type="text" placeholder="Location" name="location" id="location" required v-model="location">
                </div>
                <div class="single-input pb-2">
                    <label for="job_type">Job Type</label>
                    <select name="job_type" id="job_type" required v-model="job_type">
                        <!-- <option value="">Select Job Type</option> -->
                        <!-- <option value="parttime">Part Time</option> -->
                        <option value="household">Household</option>
                    </select>
                </div>
                <div class="col-12 mb-25">
                    <button class="ht-btn" type="submit">Add Work</button>
                </div>
            </div>
        </form>
    </div>
    <div>
        <Footer />
    </div>
</template>
