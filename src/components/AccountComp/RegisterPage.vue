<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Footer from '../../../src/components/FooterComp.vue'
</script>

<template>
    <section class="moveIn flex justify-center w-dvw py-20 px-10 bg-[#2020206b]">
        <section class="w-fit p-5 bg-black">
            <h1 class="text-center tracking-widest text-2xl">
                <strong>
                    CREATE ACCOUNT
                </strong>
            </h1>
            <form action="#" class="p-6">
                <input type="text" placeholder="First Name" required aria-errormessage="First Name Must Be Written"
                    class="accountinput">
                <input type="text" placeholder="Last Name" required aria-errormessage="Last Name Must Be Written"
                    class="accountinput my-4">
                <input type="email" placeholder="Enter Your Email Address" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput">
                <input type="password" placeholder="Enter Your Password" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput my-4">
                <button type="button" class="w-full button">
                    <RouterLink to="/">
                        SIGN IN
                    </RouterLink>
                </button>
            </form>
        </section>
    </section>
    <Footer />
    <RouterView />
</template>