<script>
import { RouterLink, RouterView } from 'vue-router';
import FooterComp from '../../../src/components/FooterComp.vue'
export default {
    components: {
        FooterComp,
        RouterLink,
        RouterView
    },
    data() {
        return {
            FisrtName: '',
            LastName: '',
            Email: '',
            Password: ''
        }
    },
    methods: {
        CreateNewAcc() {
            fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: this.FisrtName,
                    lastName: this.LastName,
                    email: this.Email,
                    password: this.Password
                })
            }).then(userResponse => userResponse.json())
                .then(userResponse => {
                    localStorage.setItem('user', JSON.stringify(userResponse)),
                        this.$router.push(`/user/${this.FisrtName}${this.LastName}`)
                })
        }
    }
}
</script>

<template>
    <section class="moveIn flex justify-center w-vw py-20  bg-[#2020206b] tab:px-4">
        <section class="w-fit px-2 py-7 bg-black">
            <h1 class="text-center tracking-widest text-2xl">
                <strong>
                    CREATE ACCOUNT
                </strong>
            </h1>
            <form action="#" class="p-6" @submit.prevent="CreateNewAcc()">
                <input type="text" placeholder="First Name" required aria-errormessage="First Name Must Be Written"
                    class="accountinput" v-model="FisrtName">
                <input type="text" placeholder="Last Name" required aria-errormessage="Last Name Must Be Written"
                    class="accountinput my-4" v-model="LastName">
                <input type="email" placeholder="Enter Your Email Address" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput" v-model="Email">
                <input type="password" placeholder="Enter Your Password" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput my-4" v-model="Password">
                <button type="submit" class="w-full button py-2">
                    <RouterLink to="/">
                        SIGN IN
                    </RouterLink>
                </button>
            </form>
        </section>
    </section>
    <FooterComp />
    <RouterView />
</template>