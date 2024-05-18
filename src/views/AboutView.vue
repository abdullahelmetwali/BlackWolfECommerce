<script setup>
import FooterComp from '../../src/components/FooterComp.vue';
</script>

<template>
    <main class="moveIn py-20 px-10">
        <h1 class=" text-center tracking-widest text-3xl my-10 tab:my-2">
            <strong>
                Where Boldness Meets Elegance
            </strong>
        </h1>
        <section class=" moveIn grid grid-cols-2 gap-4 px-8 tab:grid-cols-1 tab:px-4">
            <div class="text-center">
                <h1 class="tracking-wide text-nowrap text-xl my-8 tab:text-wrap">
                    <strong>
                        Unleash Your Inner Strength with Black Wolf
                    </strong>
                </h1>
                <article class="w-auto text-wrap">
                    Step into the realm of timeless sophistication and unleash your wild side with Black Wolf. Discover
                    the power of understated elegance in every stitch, every detail, and every design. Embrace the
                    allure of the night and command attention with our collection that speaks volumes without saying a
                    word.
                </article>
            </div>
            <div>
                <img src="/Imgs/AboutOne.jpg" class="img w-full">
            </div>
        </section>
        <section class=" moveIn grid grid-cols-2 gap-4 mt-16 px-8 tab:flex tab:flex-col-reverse tab:px-4">
            <div>
                <img src="/Imgs/AboutTwo.jpg" class="img w-full">
            </div>
            <div class="text-center">
                <h1 class="tracking-wide text-nowrap text-xl my-8 tab:text-wrap">
                    <strong>
                        Dare to Dominate the Shadows
                    </strong>
                </h1>
                <article class="w-auto text-wrap">
                    Black Wolf - Where Confidence Reigns Supreme. Elevate your style with our collection that epitomizes
                    strength, passion, and unyielding resolve. Embrace the darkness and conquer the day with Black Wolf
                    by your side
                </article>
            </div>

        </section>
    </main>
    <FooterComp />
</template>