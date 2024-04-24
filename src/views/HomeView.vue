<script lang="js">
import { RouterLink, RouterView } from 'vue-router'
import AllData from '../../src/json/AllData.json'
import ArrivalsAndSelling from '../../src/components/HomeComp/Arrivals-Selling.vue';
import DressStyle from '../../src/components/HomeComp/DressStyle.vue';
import CustomerTestimonial from '../../src/components/CustomerTestimonial.vue';
import TheFooter from '../../src/components/FooterComp.vue'

export default {
  components: {
    RouterLink,
    RouterView,
    ArrivalsAndSelling,
    DressStyle,
    CustomerTestimonial,
    TheFooter
  },
  data() {
    return {
      Highlights: AllData.HighlightRates,
      Testimonials: AllData.CustomerTestimonials
    }
  }
}
</script>


<template>
  <main class="p-12 bg-[#f2f0f1] grid grid-cols-2 items-center tab:grid-cols-1 tab:py-20 mob:py-14">
    <div>
      <h1 class="text-[5vw] font-black tracking-wide mb-4 w-fit tab:text-[9vw] mob:tracking-normal">FIND CLOTHES <br>
        THAT MATCHES <br>
        YOUR STYLE</h1>
      <article class="font-semibold text-lg w-fit opacity-70">Browse through our diverse range of meticulously crafted
        garments,
        designed to
        bring out
        your
        individuality and cater to your sense of style.</article>
      <button class="border w-[12rem] py-2 my-5 rounded-3xl bg-black text-white tab:w-full">
        <RouterLink to="/category">
          Shop Now
        </RouterLink>
      </button>
      <div class="flex gap-6 w-full tab:justify-center">
        <div :key="Highlight" v-for="Highlight in Highlights">
          <h2 class=" font-semibold tracking-wider text-3xl mob:text-xl tab:text-center mob:text-start">{{
            Highlight.rateNumber }}+</h2>
          <h3 class="opacity-80 font-medium tracking-wider "> {{ Highlight.rateTitle }} </h3>
        </div>
      </div>
    </div>
    <div>
      <img src="/Imgs/home.jpg">
    </div>
  </main>
  <section class="bg-black flex justify-between p-8 tab:gap-4">
    <div><img src="/Imgs/versace-logo.png"></div>
    <div><img src="/Imgs/zara-logo.png"></div>
    <div><img src="/Imgs/gucci-logo.png"></div>
    <div><img src="/Imgs/prada-logo.png"></div>
    <div><img src="/Imgs/calvinklein-logo.png"></div>
  </section>
  <hr>
  <ArrivalsAndSelling />
  <DressStyle />
  <section class="px-12 py-8 my-8">
    <h1 class="text-4xl font-black tracking-wide mb-4 w-fit">OUR HAPPY CUSTOMERS</h1>
    <main class="flex gap-4 overflow-x-auto snap-x scroll-smooth">
      <CustomerTestimonial v-for="Testimonial in Testimonials" :key="Testimonial"
        :CustomerName="Testimonial.customerName" :CustomerComment="Testimonial.customerComment" />
    </main>
  </section>
  <TheFooter />
  <RouterView />
</template>
