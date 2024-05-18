<script>
import FooterComp from '../../src/components/FooterComp.vue'
import AllData from '../../src/json/AllData.json';
import { seeProduct, getSalePrice } from '../stores/counter';
export default {
  components: {
    FooterComp
  },
  data() {
    return {
      Products: AllData.AllProducts,
      CategoryHeaders: ['ALL PRODUCTS', 'WINTER EDITION', 'SUMMER EDITION', 'FALL EDITION', 'STREETWEAR EDITION'],
      SeenSection: 'ALL PRODUCTS',
    }
  },
  methods: {
    GetSalePrice(price, salePercentage) {
      return getSalePrice(price, salePercentage)
    },
    SeenProduct(obj) {
      return seeProduct(obj)
    },
    goToUp() {
      return window.scrollTo(0, 0)
    },
  },
  computed: {
    WhatProducts: function () {
      if (this.SeenSection === 'ALL PRODUCTS') {
        return this.Products
      } else {
        return this.Products.filter((product) => {
          return product.theDetails.theType.toLowerCase() === this.SeenSection.replaceAll(' EDITION', '').toLowerCase()
        })
      }
    }
  },
}
</script>

<template>
  <section class="moveIn pt-14 px-8 mob:px-4">
    <div
      class="flex px-4 overflow-x-auto text-nowrap snap-x scroll-smooth justify-center gap-4 tab:justify-start my-8 w-full mob:px-0">
      <div v-for="Header in CategoryHeaders" :key="Header">
        <h1 class="text-center tracking-wider cursor-pointer w-full rounded-3xl px-4 py-2 hover:bg-[#3636366b]"
          :class="{ SeenList: SeenSection === Header }" @click="SeenSection = Header">
          {{ Header }}
        </h1>
      </div>
    </div>
    <main class="grid grid-cols-3 gap-5 mob:grid-cols-2">
      <div v-for="Product in WhatProducts" :key="Product">
        <div>
          <img :src="Product.theMainImg" class="img h-[50vh] w-full cursor-pointer"
            @click="this.$router.push(`/${Product.theDetails.theStyle}/${Product.theTitle}`), SeenProduct(Product)">
        </div>
        <div class="text-center mt-3">
          <RouterLink :to="`/${Product.theDetails.theStyle}/${Product.theTitle}`" @click="SeenProduct(Product)">
            {{ Product.theTitle }}
          </RouterLink>
          <div>
            <h3 v-if="Product.salePercentage === 0">
              ${{ Product.thePrice }}
            </h3>
            <div v-else class="flex gap-2 justify-center">
              <h3>
                ${{ GetSalePrice(Product.thePrice, Product.salePercentage) }}
              </h3>
              <del>
                {{ Product.thePrice }}
              </del>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
  <FooterComp />
</template>
<style>
.black {
  color: black;
}
</style>