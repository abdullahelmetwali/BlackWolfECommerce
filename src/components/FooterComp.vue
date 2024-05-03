<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <footer
        class="moveIn bg-black flex justify-between items-start mt-16 px-8 py-12 tab:grid tab:grid-cols-2  mob:flex mob:flex-col">
        <section class="pb-28">

            <h1 class="text-3xl tracking-widest text-nowrap ">
                <strong>
                    BLACK WOLF
                </strong>
            </h1>
            <div>
                <h2 class="tracking-wider my-4 text-xl">QUICK LINKS</h2>
                <div class="flex flex-col text-lg gap-3 px-1">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/category">Shop</RouterLink>
                    <RouterLink to="/account">Account</RouterLink>
                    <RouterLink to="/about">About</RouterLink>
                </div>
            </div>
        </section>
        <section>
            <h1 class="tracking-widest mb-4">
                <strong>
                    DRESS LIKE A BOSS
                </strong>
            </h1>
            <article>
                We create luxurious, comfortable and multifunctional <br> streetwear, with an ecological conscience. So
                you <br> can feel sophisticated without sacrifing style, ethics, or <br> the enviroment.
            </article>
            <div class="grid">
                <a href="#">
                    45 Marine Parade
                </a>
                <a href="#">
                    Coolangatta QLD 42
                </a>
                <a href="tel:+00000000">
                    +61 7 5599 6777 1
                </a>
            </div>
        </section>
        <section class="mob:mt-14 mob:w-auto tab:w-[200%]">
            <div>
                <img src="/Imgs/FooterPoster2.jpg" class="img">
            </div>
            <div class="mt-8">
                <h3>NEWSLETTER</h3>
                <p>Sign up to be upto new news</p>
                <form action="#" class="my-3" @keyup.enter="submit">
                    <input type="email" placeholder="youremail@example.com"
                        class="accountinput tab:w-[70vw] mob:w-full">
                </form>
            </div>
        </section>
    </footer>
    <h2 class="text-center  tracking-widest pb-10">
        Created By
        <strong>
            ABDULLAH ELMETWALI
        </strong>
    </h2>
    <RouterView />
</template>
