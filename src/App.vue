<script>
import { RouterLink, RouterView } from 'vue-router'
import XIcon from './components/IconsSVGs/XmarkIcon.vue';
import AllData from '../src/json/AllData.json'
import { getSalePrice, seeProduct } from './stores/counter';
import CartBox from '../src/components/CartComp/CartBox.vue';
import BarsIcon from '../src/components/IconsSVGs/BarsIcon.vue';
import Bag from '../src/components/IconsSVGs/UnfilledBag.vue'
import Search from '../src/components/IconsSVGs/SearchIcon.vue'
import User from '../src/components/IconsSVGs/UserIcon.vue'
export default {
  components: {
    User,
    Search,
    Bag,
    BarsIcon,
    XIcon,
    RouterLink,
    RouterView,
    CartBox
  },
  data() {
    return {
      Products: AllData.AllProducts,
      ShowMenu: false,
      forSearch: true,
      CartShown: false,
      ShowMessage: true,
      SearchContent: '',
      CartLength: 0
    }
  },
  mounted() {
    this.GetCartLength();
    this.updateTimer = setInterval(this.GetCartLength, 1000);
  },
  beforeUnmount() {
    clearInterval(this.updateTimer);
  },
  watch: {
    GetFromCart: {
      handler: 'GetCartLength',
      deep: true
    }
  },
  methods: {
    GetSalePrice(price, salePercentage) {
      return getSalePrice(price, salePercentage)
    },
    SeenProduct(obj) {
      return seeProduct(obj)
    },
    ShowCart() {
      this.CartShown = !this.CartShown
    },
    GetFromCart() {
      const addedObjects = localStorage.getItem('cart');
      if (addedObjects !== null) {
        return JSON.parse(addedObjects);
      } else {
        return [];
      }
    },
    GetCartLength() {
      const cartItems = this.GetFromCart();
      this.CartLength = cartItems.length
    },
    SeeIfUser() {
      let ExistUser = localStorage.getItem('user')
      if (ExistUser) {
        let User = JSON.parse(ExistUser)
        return this.$router.push(`/user/${User.firstName}${User.lastName}`);
      } else {
        return this.$router.push('/account')
      }
    }
  },
  computed: {
    SearchFor: function () {
      const ReturnedObjects = this.Products.filter((obj) => {
        return obj.theTitle.toUpperCase().includes(this.SearchContent.toUpperCase())
      })
      if (this.SearchContent !== '') {
        if (ReturnedObjects.length > 0) {
          return ReturnedObjects;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    UserName: function () {
      let userName = localStorage.getItem('user')
      if (userName) {
        return JSON.parse(userName)
      } else {
        return ''
      }
    }
  }
}
</script>

<template>
  <header class="relative moveIn">
    <nav class="flex justify-between items-center py-4 px-8 bg-transparent absolute z-10 w-full mob:hidden">
      <div class="flex gap-16 text-sm">
        <RouterLink to="/">
          HOME</RouterLink>
        <RouterLink to="/category">CATEGORY</RouterLink>
        <RouterLink to="/about">ABOUT</RouterLink>
      </div>
      <div class="flex gap-16 text-sm">
        <a @click="SeeIfUser()">ACCOUNT</a>
        <p class="cursor-pointer" @click="forSearch = !forSearch, SearchContent = ''">SEARCH</p>
        <div class="flex gap-1 ">
          <p class="cursor-pointer" @click="ShowCart()">CART</p>
          <span> ({{ CartLength }}) </span>
        </div>
      </div>
    </nav>
    <div class="hidden py-10 fixed top-0 z-20 overflow-x-hidden overflow-y-auto h-full  w-full blured"
      :class="{ goLeft: ShowMenu }">
      <div class="flex py-4 px-8 absolute top-0 bg-black w-[80dvw] z-30 h-[100dvh]">
        <div class="flex flex-col my-5 gap-2 sticky w-full cursor-pointer">
          <div class="flex gap-2 w-fit" @click="SeeIfUser()">
            <User />
            <a>
              {{ UserName.firstName }} {{ UserName.lastName }}
            </a>
          </div>
          <RouterLink to="/">
            HOME</RouterLink>
          <RouterLink to="/category">CATEGORY</RouterLink>
          <RouterLink to="/about">ABOUT</RouterLink>
        </div>
        <x-icon @click="ShowMenu = !ShowMenu" />
      </div>
    </div>
    <nav class="hidden w-full p-4 mob:flex justify-between bg-transparent">
      <div>
        <BarsIcon class="cursor-pointer" @click="ShowMenu = !ShowMenu" />
      </div>
      <div class="text-xl tracking-wider ml-4">
        <h1>
          <strong>
            BLACK WOLF
          </strong>
        </h1>
      </div>
      <div class="flex gap-4">
        <Search @click="forSearch = !forSearch, SearchContent = ''" class="cursor-pointer" />
        <Bag @click="ShowCart()" class="cursor-pointer" />
      </div>
    </nav>
    <main class="hidden py-10 px-8 absolute top-0 z-10 h-auto w-full bg-black" :class="{ getBlock: !forSearch }">
      <div class="flex my-4">
        <input type="text" placeholder="Search..." class=" bg-transparent w-full outline-none" v-model="SearchContent">
        <div class="flex items-center gap-4">
          <p @click="SearchContent = ''" class="cursor-pointer">CLEAR</p>
          <XIcon @click="forSearch = !forSearch" />
        </div>
      </div>
      <section v-if="SearchContent !== ''" class="flex flex-col overflow-y-auto snap-y scroll-smooth">
        <div v-for="Product in SearchFor" :key="Product" class="flex gap-8 my-6">
          <div>
            <img :src="Product.theMainImg" class="img w-[25vw] h-[10rem]">
          </div>
          <div>
            <RouterLink :to="`/${Product.theDetails.theStyle}/${Product.theTitle}`" @click="SeenProduct(Product)">
              <strong>
                {{ Product.theTitle }}
              </strong>
            </RouterLink>
            <div>
              <h3 v-if="Product.salePercentage === 0">
                ${{ Product.thePrice }}
              </h3>
              <div v-else>
                <h3>
                  ${{ GetSalePrice(Product.thePrice, Product.salePercentage) }}
                </h3>
                <del>
                  {{ Product.thePrice }}
                </del>
              </div>
            </div>
          </div>
          <hr>
        </div>
        <div v-show="SearchContent !== ''" class="border p-7 w-fit">
          <p v-if="SearchFor.length > 0">
            <strong>
              SEARCHED FOR <i>{{ SearchContent }}</i>
            </strong>
          </p>
          <p v-else>
            <strong>
              NO RESULTS FOR<i class="text-red-600 mx-2">{{ SearchContent }}</i>
            </strong>
          </p>
        </div>
      </section>
    </main>
    <main>
      <CartBox :class="{ goRight: CartShown }" @ShowCart="ShowCart()" />
    </main>
  </header>
  <RouterView />
</template>