<script>
import { RouterLink, RouterView } from 'vue-router'
import AllData from '../../src/json/AllData.json'
import TheLatest from '../../src/components/HomeComp/TheLatest.vue';
import ShowRoom from '../../src/components/HomeComp/ShowRoom.vue';
import TheFooter from '../../src/components/FooterComp.vue'
import { getSalePrice, seeProduct } from '@/stores/counter';
import SliderRow from '../../src/components/HomeComp/SliderRow.vue';
import Bag from '../../src/components/IconsSVGs/BagIcon.vue'
import ServicesItems from '../../src/components/ServicesItems.vue';
import OurPhilosophy from '../../src/components/HomeComp/OurPhilosophy.vue'
import TheMessage from '../../src/components/TheMessage.vue'
import ErrorMessage from '../../src/components/ErrorMessage.vue'
export default {
  components: {
    Bag,
    TheMessage,
    ErrorMessage,
    RouterLink,
    RouterView,
    TheLatest,
    ShowRoom,
    TheFooter,
    SliderRow,
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
    SeenProduct(obj) {
      window.scrollTo(0, 0)
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
    },
    ShowErrMessage() {
      this.ShowErrorMessage = !this.ShowErrorMessage
    },
    ShowMess() {
      this.ShowMessage = !this.ShowMessage
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
  <main class="moveIn">
    <section class="grid grid-cols-2 tab:flex tab:flex-col">
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
        <section class="flex my-8 mr-4 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
          <div v-for="Product in UltimateDesigns" :key="Product" class="relative">
            <div>
              <div>
                <img :src="Product.theMainImg" class="w-full h-[80vh] img cursor-pointer"
                  @click="this.$router.push(`/${Product.theDetails.theStyle}/${Product.theTitle}`), SeenProduct(Product)">
                <div
                  class="onLoad cursor-pointer absolute right-4 bottom-20 bg-[#080808e8] w-fit py-3 px-4 mob:bottom-[7rem]"
                  :class="{ getOut: !Product.isSeen }">
                  <Bag @click="Product.isSeen = !Product.isSeen" />
                </div>
              </div>
              <div>
                <div class="flex w-full justify-center gap-4 px-14 bg-[#080808e8] absolute bottom-16 mob:bottom-[7rem]"
                  :class="{ getIn: !Product.isSeen }">
                  <div v-for="Size in Product.theDetails.theSizes" :key="Size"
                    class="size cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]" v-show="!Product.isSeen"
                    :class="{ hidden: Product.showColor }"
                    @click="selectedSize = Size, Product.showColor = !Product.showColor">
                    <p>
                      {{ Size }}
                    </p>
                  </div>
                  <div v-for="Color in Product.theDetails.theColors" :key="Color"
                    class="hidden cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]" :class="{ getIn: Product.showColor }">
                    <div @click="selectedColor = Color, toggleColor(Product)">
                      {{ Color }} </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" w-[17rem] text-center text-nowrap">
              <RouterLink class="text-nowrap" :to="`/${Product.theDetails.theStyle}/${Product.theTitle}`"
                @click="SeenProduct(Product)">
                {{ Product.theTitle }}
              </RouterLink>
              <div class="text-center">
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
        </section>
      </div>
      <div>
        <video autoplay="true" muted class=" brightness-[0.4] tab:ml-6 mob:ml-0">
          <source src="/Videos/PosterVideo.mp4" type="video/mp4">
        </video>
      </div>
    </section>
  </main>
  <TheLatest @ShowCart="ShowCart()" @ShowErrMessage="ShowErrMessage()" @ShowMess="ShowMess()" />
  <ShowRoom class="moveIn" />
  <OurPhilosophy class="moveIn" />
  <ServicesItems class="moveIn" />
  <TheFooter />
  <RouterView />
</template>
