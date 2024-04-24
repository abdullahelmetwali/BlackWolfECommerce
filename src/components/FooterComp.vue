<script>
import { RouterLink, RouterView } from 'vue-router'
import Envelope from '../../src/components/IconsSVGs/EnvelopeIcon.vue';
import Insta from '../../src/components/IconsSVGs/InstaSVG.vue';
import Facebook from '../../src/components/IconsSVGs/FacebookSVG.vue';
import Youtube from '../../src/components/IconsSVGs/YoutubeSVG.vue';
import AllData from '../../src/json/AllData.json'
export default {
    components: {
        RouterLink,
        RouterView,
        Envelope,
        Insta,
        Facebook,
        Youtube,
    },
    data() {
        return {
            AllLinks: AllData.FooterLinks
        }
    },
}
</script>

<template>
    <footer class="bg-[#f2f0f1] relative justify-center mt-28">
        <section class="px-10 py-4 absolute -top-24 left-16 mob:px-2 tab:left-0 tab:w-full mob:-top-28">
            <section
                class="flex items-center justify-between bg-black text-white py-4 px-5 rounded-2xl mob:flex-col mob:gap-4">
                <h1 class="text-[3.5vw] font-black tracking-wide mob:text-[5vw] mob:text-center mob:tracking-widest">
                    STAY
                    UPTO DATE ABOUT
                    <br> OUR LATEST
                    OFFERS
                </h1>
                <form class="relative ml-12 mob:ml-3 mob:w-full" action="#">
                    <div>
                        <input type="email"
                            class=" focus:border-none outline-none bg-white text-black h-fit pl-12 py-1 rounded-2xl w-[28vw] mob:w-full mob:text-sm mob:py-2"
                            placeholder="Enter Your Email Address">
                        <span class="absolute left-3 top-1 mob:top-2">
                            <Envelope />
                        </span>
                    </div>
                    <button type="submit"
                        class="bg-white text-black font-bold tracking-wide py-2 rounded-3xl my-4 w-[28vw] mob:w-full">
                        Subscribe to Newsletter
                    </button>
                </form>
            </section>
        </section>
        <section class=" pt-32 tab:pt-36 p-12 mob:px-6">
            <section class="flex gap-12 my-6 mob:grid mob:gap-6">
                <div>
                    <h1 class=" font-extrabold text-3xl tracking-wider mt-2">SHOP.CO</h1>
                    <article class="my-4 tracking-wide opacity-70 w-max">
                        We have clothes that suits your style and <br> which you're proud to wear. From <br>
                        <strong>WOMEN
                            to MEN</strong>.
                    </article>
                    <div class="flex gap-2">
                        <Insta class="bg-white border rounded-full border-black">
                            <a href="ourInstaLink"></a>
                        </Insta>
                        <Facebook class="bg-white border rounded-full border-black">
                            <a href="ourFacebookLink"></a>
                        </Facebook>
                        <Youtube class="bg-white border rounded-full border-black">
                            <a href="ourYoutubeLink"></a>
                        </Youtube>
                    </div>
                </div>
                <div class="flex justify-between w-full tab:grid tab:grid-cols-2 tab:gap-8">
                    <div :key="Link" v-for="Link in AllLinks " class="flex flex-col gap-4">
                        <h1 class="mb-4 tracking-wide"> <strong>{{ Link.linksTitle }}</strong> </h1>
                        <RouterLink :key="theLink" v-for="theLink in Link.links "
                            :to="`${theLink.replaceAll(' ', '')}Page`"
                            class="font-semibold tracking-wide opacity-80 hover:opacity-100">
                            {{ theLink }}
                        </RouterLink>
                    </div>
                </div>
            </section>
            <hr>
            <section
                class="flex justify-between my-6 tab:flex-col tab:gap-6 tab:absolute tab:top-[25rem] mob:relative mob:top-0">
                <div class=" opacity-80 font-medium mob:text-center">
                    <p>Shop.co 2000-2024.All Rights Reserved.</p>
                    <strong>By Abdullah ElMetwali.</strong>
                </div>
                <div class="flex gap-4 mob:justify-center tab:gap-0">
                    <div><img src="/Imgs/visa.png" class="cursor-pointer"></div>
                    <div><img src="/Imgs/mastercard.png" class="cursor-pointer"></div>
                    <div><img src="/Imgs/paypal.png" class="cursor-pointer"></div>
                    <div><img src="/Imgs/applepay.png" class="cursor-pointer"></div>
                    <div><img src="/Imgs/googlepay.png" class="cursor-pointer"></div>
                </div>
            </section>
        </section>
    </footer>
    <RouterView />
</template>