<script>
import { RouterLink, RouterView } from 'vue-router'
import CartIcon from '../src/components/IconsSVGs/CartIcon.vue';
import AllData from '../src/json/AllData.json'
import Bars from '../src/components/IconsSVGs/BarsIcon.vue'
import BarsStargged from '../src/components/IconsSVGs/BarsStargged.vue';
import { getFromCart } from './stores/counter';
export default {
  components: {
    Bars,
    BarsStargged,
    CartIcon,
    RouterLink,
    RouterView
  },
  data() {
    return {
      Bars,
      BarsStargged,
      Products: AllData.AllProducts,
      CartProduct: getFromCart(),
      isHidden: false,
      forMenu: true,
    }
  },
  methods: {
    searchFnc() {
      let inputResult = document.querySelector('.search').value
      const searchContainer = this.Products.filter((obj) => {
        return obj.theTitle.toUpperCase().trim().replaceAll(' ', '').includes(inputResult.toUpperCase().trim().replaceAll(' ', ''), 0)
      })
      if (inputResult !== '') {
        sessionStorage.setItem('search', JSON.stringify(searchContainer))
        this.$router.replace('/search')
        if (window.location.pathname == '/search') {
          setInterval((window.location.reload()), 0)
        } else {
          ''
        }
      }
    },
    CartCounter() {
      if (this.CartProduct) {
        let cartCount = this.CartProduct.map((obj) => {
          return obj.theCounter
        }).reduce((acc, now) => {
          return acc + now
        }, 0)
        return cartCount
      } else {
        return ''
      }
    }
  },
}
</script>

<template>
  <nav
    class="flex relative py-4 px-16 items-center mob: justify-normal mob:flex-col mob:pb-1 mob:px-0 mob:w-full tab:px-10 tab:justify-between tab:py-3">
    <div class="flex items-baseline gap-2 mb-1 self-start tab:mx-3 z-[9]">
      <div class="hidden z-[6] cursor-pointer mob:block tab:mr-3">
        <Bars @click="forMenu = !forMenu" :class="{ hidden: !forMenu }" />
        <BarsStargged class="hidden" :class="{ block: !forMenu }" @click="forMenu = !forMenu" />
      </div>
      <RouterLink to="/" class=" font-extrabold text-3xl tracking-wider mt-1">SHOP.CO</RouterLink>
    </div>
    <div class="hidden flex-col gap-4 absolute pt-16 pl-4 bg-white z-[5] w-full h-[100vh]"
      :class="{ blockEx: !forMenu }">
      <RouterLink to="/category">Category</RouterLink>
      <RouterLink to="/">On Sale</RouterLink>
      <RouterLink to="/">New Arrivals</RouterLink>
      <RouterLink to="/">Brands</RouterLink>
      <RouterLink to="/cart">Cart</RouterLink>
    </div>
    <div class="flex items-center mx-4 mob:mx-1 tab:w-full tab:justify-around">
      <div class="flex items-center gap-8 font-semibold mob:hidden">
        <RouterLink to="/category">Category</RouterLink>
        <RouterLink to="/">On Sale</RouterLink>
        <RouterLink to="/">New Arrivals</RouterLink>
        <RouterLink to="/">Brands</RouterLink>
      </div>
      <div
        class="mx-8 mob:my-4 mob:mt-6 tab:mx-0 tab:absolute tab:left-2 tab:top-20 tab:w-[94vw] tab:my-3 z-[1] mob:top-10">
        <div
          class="flex flex-row-reverse gap-3 bg-[#f2f0f1] px-6 py-3 rounded-3xl border-[1px solid transparent] w-[35vw] mob:w-[94vw] mob:justify-end tab:w-full tab:justify-end tab:text-xl tab:bg-[#e5e7eb] mob:bg-inherit mob:pt-5 mob:pl-[0.2rem]"
          @keyup.enter="searchFnc()">
          <input type="text" class=" focus:border-none outline-none bg-transparent w-[30rem] search mob:w-full"
            placeholder="Search For Products">
          <button type="button" @click="searchFnc()">
            <img src="/Icons/search.svg" class="opacity-30 w-7 mob:w-6">
          </button>
        </div>
      </div>
      <div class="relative mb-1 mob:absolute mob:top-3 mob:right-3 mob:mb-0">
        <span class="bg-red-500 block w-7 h-5 rounded-full ml-1 ">
          <p class="text-center text-sm text-white cursor-auto  outline-none">
            {{ CartCounter() || 0 }}</p>
        </span>
        <RouterLink to="/cart">
          <CartIcon class="cursor-pointer" />
        </RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
<style>
.blockEx {
  display: flex !important;
  animation: goRight 0.5s;
}

@keyframes goRight {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(-0%);
  }
}
</style>