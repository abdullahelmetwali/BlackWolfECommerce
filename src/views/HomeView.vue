<script>
import { RouterLink, RouterView } from 'vue-router'
import AllData from '../../src/json/AllData.json'
import TheLatest from '../../src/components/HomeComp/TheLatest.vue';
import ShowRoom from '../../src/components/HomeComp/ShowRoom.vue';
import TheFooter from '../../src/components/FooterComp.vue'
import { getSalePrice, seeProduct } from '@/stores/counter';
import SliderRow from '../../src/components/HomeComp/SliderRow.vue';
import ProductContent from '../../src/components/ProductContent.vue';
import ServicesItems from '../../src/components/ServicesItems.vue';
import OurPhilosophy from '../../src/components/HomeComp/OurPhilosophy.vue'
import TheMessage from '../../src/components/TheMessage.vue'
import CartBox from '../../src/components/CartComp/CartBox.vue'
import ErrorMessage from '../../src/components/ErrorMessage.vue'
export default {
  components: {
    CartBox,
    TheMessage,
    ErrorMessage,
    RouterLink,
    RouterView,
    TheLatest,
    ShowRoom,
    TheFooter,
    SliderRow,
    ProductContent,
    ServicesItems,
    OurPhilosophy
  },
  data() {
    return {
      Products: AllData.AllProducts,
      selectedColor: '',
      selectedSize: '',
      ItemAdded: '',
      CartShown: false,
      ShowMessage: false,
      ShowErrorMessage: false,
      Counter: 1,
    }
  },
  methods: {
    GetSalePrice(price, salePercentage) {
      return getSalePrice(price, salePercentage)
    },
    goToUp() {
      return window.scrollTo(0, 0)
    },
    SeenProduct(obj) {
      return seeProduct(obj)
    },
    AdderProduct(product) {
      const thereIsCart = localStorage.getItem('cart')
      let objContainter = []
      if (thereIsCart) {
        objContainter = JSON.parse(thereIsCart)
      }
      const isObjectHere = objContainter.some((obj) => obj.theTitle === product.theTitle)
      if (!isObjectHere) {
        objContainter.push(product)

        product.selectedColor = this.selectedColor
        product.selectedSize = this.selectedSize
        if (product.salePercentage !== 0) {
          product.saledPrice = this.GetSalePrice(product.thePrice, product.salePercentage)
        }
        setTimeout(() => {
          this.ShowMessage = !this.ShowMessage
        }, 5000)
        this.ShowMessage = !this.ShowMessage
        product.theCounter = this.Counter
        localStorage.setItem('cart', JSON.stringify(objContainter))
      } else {
        setTimeout(() => {
          this.ShowErrorMessage = !this.ShowErrorMessage
        }, 5000)
        this.ShowErrorMessage = !this.ShowErrorMessage
      }
    },
    toggleColor(product) {
      product.showColor = !product.showColor
      product.isSeen = !product.isSeen
      this.AdderProduct(product)
    },
    SetSizeColor(size, color) {
      this.selectedSize = size
      this.selectedColor = color
    },
    ShowCart() {
      this.CartShown = !this.CartShown
    }
  },
  computed: {
    UltimateDesigns: function () {
      return this.Products.filter((obj) => {
        return obj.theSection === 'UltimateDesigns'
      })
    },
  }
}
</script>
<template>
  <ErrorMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowErrorMessage }" />
  <TheMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowMessage }" />
  <CartBox :class="{ goLeft: CartShown }" @ShowCart="ShowCart()" />
  <main class="moveIn">
    <section class="grid grid-cols-2 tab:grid-cols-subgrid">
      <div class="relative">
        <div>
          <img src="/Imgs/PosterOne.jpg" class="w-full  brightness-[0.3]">
        </div>
        <div class="shop moveIn">
          <h1 class="text-xs tracking-wider"> ABOVE THE CLOUDS </h1>
          <h1 class="text-2xl tracking-wider mb-4 mt-2">WEAR LIKE A BOSS</h1>
          <button class="bg-white py-1 tracking-widest text-black w-full">
            <RouterLink to="/category">
              SHOP NOW
            </RouterLink>
          </button>
        </div>
      </div>
      <div>
        <img src="/Imgs/rectangleTwo.jpg" class="w-full h-auto brightness-[0.3]">
      </div>
    </section>
    <div>
      <SliderRow />
    </div>
    <section class="grid grid-cols-2 tab:flex tab:flex-col-reverse">
      <div class="px-6">
        <h1 class="text-center tracking-widest text-xl mt-8">Ultimate Designs</h1>
        <section class=" flex py-8 my-8 mr-4 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
          <div v-for="Product in UltimateDesigns" :key="Product" class="relative">
            <ProductContent :theMainImg="Product.theMainImg" :theDetails="Product.theDetails"
              :thePrice="Product.thePrice" :theSizes="Product.theDetails.theSizes"
              :theStyle="Product.theDetails.theStyle" :theTitle="Product.theTitle"
              :theColors="Product.theDetails.theColors" :isSeen="Product.isSeen"
              :salePercentage="Product.salePercentage" :showColor="Product.showColor"
              @toggleColor="toggleColor(Product)" @goToUp="goToUp()" @SeenProduct="SeenProduct(Product)"
              @setItems="SetSizeColor">
            </ProductContent>
          </div>
        </section>
      </div>
      <div>
        <video autoplay="true" muted class=" brightness-[0.4] tab:ml-6 mob:ml-0">
          <source src="/Videos/PosterVideo.mp4" type="video/mp4">
        </video>
      </div>
    </section>
  </main>
  <TheLatest class="moveIn" />
  <ShowRoom class="moveIn" />
  <OurPhilosophy class="moveIn" />
  <ServicesItems class="moveIn" />
  <TheFooter />
  <RouterView />
</template>
