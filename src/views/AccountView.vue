<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Footer from '../../src/components/FooterComp.vue'
</script>

<template>
    <section class="moveIn flex justify-center w-dvw py-12 px-10 bg-[#2020206b]">
        <section class="w-fit p-5 bg-black">
            <h1 class="text-center tracking-widest text-2xl">
                <strong>
                    LOGIN
                </strong>
            </h1>
            <form action="#" class="bg-black p-6">
                <input type="email" placeholder="Enter Your Email Address" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput">
                <input type="password" placeholder="Enter Your Password" required aria-errormessage="Must Be Written"
                    autocomplete="true" class="accountinput my-4">
                <button type="button" class="w-full button">
                    SIGN IN
                </button>
            </form>
            <div class="text-center">
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
    <Footer />
    <RouterView />
</template>
