<script>
import { RouterLink, RouterView } from 'vue-router';
import FooterComp from '../../src/components/FooterComp.vue'
import axios from 'axios'
export default {
    components: {
        RouterLink,
        RouterView,
        FooterComp
    },
    data() {
        return {
            formData: {
                password: '',
                email: ''
            },
            ShowCreateAcc: false
        }
    },
    methods: {
        async submitForm() {
            axios.get('https://dummyjson.com/users')
                .then(response => {
                    let user = response.data.users.find(user => user.email === this.formData.email && user.password === this.formData.password);
                    if (!user) {
                        return this.ShowCreateAcc = !this.ShowCreateAcc;
                    } else {
                        localStorage.setItem('user', JSON.stringify(user))
                        this.$router.push(`/user/${user.firstName}${user.lastName}`);
                    }
                })
                .catch(() => this.ShowCreateAcc = !this.ShowCreateAcc);
        }
    }
}
</script>

<template>
    <section class=" hidden p-6 text-center items-center  fixed bg-black w-full top-0 z-40 "
        :class="{ getTopMss: ShowCreateAcc }">
        Undefined Account
        <div>
            <RouterLink to="/account/register" class="underline">
                Create An Account From HERE
            </RouterLink>
        </div>
    </section>
    <section class="flex justify-center w-vw py-20 bg-[#2020206b] tab:px-4">
        <section class="w-[60vw] px-3 py-7 bg-black tab:w-fit">
            <h1 class="text-center tracking-widest text-2xl">
                <strong>
                    LOGIN
                </strong>
            </h1>
            <form class="bg-black p-6" @submit.prevent="submitForm()">
                <input type="email" placeholder="Enter Your Email Address" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput" v-model="formData.email">
                <input type="password" placeholder="Enter Your Password" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput my-4" v-model="formData.password">
                <button type="submit" class="w-full button py-2">
                    SIGN IN
                </button>
            </form>
            <div class="text-center tab:grid">
                <RouterLink to="/account/register">
                    CREATE ACCOUNT
                </RouterLink>
                <strong class="mx-4">
                    -
                </strong>
                <a href="#">
                    FORGOT PASSWORD
                </a>
            </div>
        </section>
    </section>
    <FooterComp />
    <RouterView />
</template>
