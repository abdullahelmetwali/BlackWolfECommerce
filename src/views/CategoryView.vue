<script>
import CategoryContent from '../../src/components/CategoryComp/CategoryContent.vue';
import FooterComp from '../../src/components/FooterComp.vue'
import Chevron from '../../src/components/IconsSVGs/ChevronRight.vue';
import ChevronUp from '@/components/IconsSVGs/ChevronUp.vue';
import ChevronDown from '@/components/IconsSVGs/ChevronDown.vue';
import XIcon from '../../src/components/IconsSVGs/XmarkIcon.vue'
import FilterIcon from '../../src/components/IconsSVGs/FilterIcon.vue';
import AllData from '../../src/json/AllData.json';
import { seeProduct } from '../../src/stores/counter';
export default {
  components: {
    CategoryContent,
    Chevron,
    XIcon,
    FilterIcon,
    ChevronUp,
    ChevronDown,
    FooterComp
  },
  data() {
    return {
      Colors: AllData.SideBarItems.Colors,
      Sizes: AllData.SideBarItems.Sizes,
      Products: AllData.AllProducts,
      Types: ['T-Shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'],
      Styles: ['Casual', 'Formal', 'Party', 'Gym'],
      selectedColor: '',
      selectedSize: '',
      colorsHidden: true,
      sizesHidden: true,
      stylesHidden: true,
      showFilters: false,
      currentItem: [],
      filteredContent: [],
      choosenItems: [],
      allItems: [],
      theType: [],
      theColor: [],
      theSize: [],
      theStyle: [],
    }
  },
  methods: {
    setOneElement(theArr) {
      return theArr[theArr.length - 1]
    },
    filterCategories() {
      this.allItems.push(this.theType[this.theType.length - 1], this.theColor[this.theColor.length - 1], this.theSize[this.theSize.length - 1], this.theStyle[this.theStyle.length - 1])
      return this.choosenItems = Array.from(this.allItems).slice(-4)
    },
    getCategories(fromWhere, toChoosedArray) {
      this.filteredContent = Array.from(fromWhere)
      this.filteredContent.forEach((e) => {
        if (
          e.theDetails.theType == toChoosedArray[0] ||
          e.theDetails.theStyle == toChoosedArray[3] ||
          Array.from(e.theDetails.theColors).includes(toChoosedArray[1]) ||
          Array.from(e.theDetails.theSizes).includes(toChoosedArray[2])
        ) {
          return e.isSeen = true
        }
        else {
          return e.isSeen = false
        }

      })
    },
    TheSeenProduct(obj) {
      return seeProduct(obj)
    },
    goToUp() {
      return window.scrollTo(0, 0)
    },
  },
}
</script>

<template>
  <section class="flex gap-8 px-12 my-10 tab:px-0 tab:flex-col-reverse tab:gap-0">
    <aside
      class="w-[30vw] bg-white relative z-10 border p-4 rounded-lg h-fit tab:w-full tab:border-0 tab:border-t tab:rounded-2xl tab:px-0 tab:hidden tab:absolute tab:h-screen tab:-bottom-72"
      :class="{ goUp: showFilters }">
      <div class="flex items-center justify-between my-2 mb-4 tab:mx-3">
        <h1 class="my-2 font-semibold text-2xl tracking-wide">Filters</h1>
        <XIcon class="hidden cursor-pointer tab:block" @click="showFilters = !showFilters" />
      </div>
      <hr>
      <div class="my-4 px-0 tab:px-3">
        <div
          class="flex items-center justify-between my-2 px-2 border-solid border-[1px] border-transparent rounded-2xl tracking-wide cursor-pointer type"
          :key="Type" v-for="Type in Types" @click="theType.push(Type)"
          :class="{ selectedBox: setOneElement(theType) === Type }">
          <h2> {{ Type }} </h2>
          <Chevron />
        </div>
      </div>
      <hr>
      <div class="my-4 px-0 tab:px-3">
        <div class="flex items-center justify-between my-2">
          <h1 class="my-2 font-semibold text-2xl tracking-wide">Colors</h1>
          <div class="hidden tab:block">
            <ChevronDown @click="colorsHidden = !colorsHidden" :class="{ hidden: !colorsHidden }" />
            <ChevronUp @click="colorsHidden = !colorsHidden" v-show="!colorsHidden" />
          </div>
        </div>
        <div class="grid grid-cols-10 tab:gap-1 tab:grid-cols-5 tab:flex-wrap tab:hidden"
          :class="{ blockEx: !colorsHidden }">
          <span class="flex items-center justify-center w-[2rem] h-[2rem] border rounded-full cursor-pointer"
            :key="Color" v-for="Color in Colors" :class="Color.colorName"
            @click="theColor.push(Color.colorName), selectedColor = Color.colorName">
            <p class="text-white" v-show="selectedColor === Color.colorName"
              :class="{ black: selectedColor === 'White' }">#</p>
          </span>
        </div>
      </div>
      <hr>
      <div class="my-4 px-0 tab:px-3">
        <div class="flex items-center justify-between my-2">
          <h1 class="my-2 font-semibold text-2xl tracking-wide">Size</h1>
          <div class="hidden tab:block">
            <ChevronDown @click="sizesHidden = !sizesHidden" :class="{ hidden: !sizesHidden }" />
            <ChevronUp @click="sizesHidden = !sizesHidden" v-show="!sizesHidden" />
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 tab:grid-cols-1 tab:flex-wrap tab:hidden" :class="{ blockEx: !sizesHidden }">
          <div class=" flex justify-center p-1 w-[5rem] bg-[#f2f0f1] rounded-3xl cursor-pointer size" :key="Size"
            v-for="  Size in Sizes  " @click="theSize.push(Size.Size), selectedSize = Size"
            :class="{ selectedBox: selectedSize === Size }">
            <p class="text-center"> {{ Size.Size }} </p>
          </div>
        </div>
      </div>
      <hr>
      <div class="my-4 px-0 tab:px-3">
        <div class="flex items-center justify-between my-2">
          <h1 class="my-2 font-semibold text-2xl tracking-wide">Dress Style</h1>
          <div class="hidden tab:block">
            <ChevronDown @click="stylesHidden = !stylesHidden" :class="{ hidden: !stylesHidden }" />
            <ChevronUp @click="stylesHidden = !stylesHidden" v-show="!stylesHidden" />
          </div>
        </div>
        <div class="tab:hidden" :class="{ block: !stylesHidden }">
          <div :key="Style" v-for="  Style in Styles  "
            class="flex items-center justify-between my-2 px-2 border-solid border-[1px] border-transparent rounded-2xl tracking-wide cursor-pointer dress tab:px-0"
            @click="theStyle.push(Style)" :class="{ selectedBox: setOneElement(theStyle) === Style }">
            <h2> {{ Style }} </h2>
            <Chevron />
          </div>
        </div>
      </div>
      <div class="px-3">
        <button class="bg-black text-white w-full my-4 p-2 rounded-3xl tab:w-full  tab:mx-0"
          @click="filterCategories(), getCategories(Products, choosenItems)">
          Apply Filter
        </button>
      </div>
    </aside>
    <main class="mob:p-0 tab:p-8">
      <div class="flex justify-between items-center my-6 tab:mx-3">
        <h1 class="font-bold text-3xl tracking-wide uppercase"> {{ choosenItems[choosenItems.length - 1] || 'Category'
          }}
        </h1>
        <FilterIcon class="hidden cursor-pointer tab:block" @click="showFilters = !showFilters" />
      </div>
      <main class="grid grid-cols-3 gap-4 tab:grid-cols-3 mob:grid-cols-3 tab:px-4">
        <CategoryContent v-for="Product in Products" :key="Product" :theMainImg="Product.theMainImg"
          :theTitle="Product.theTitle" :thePrice="Product.thePrice" :salePercentage="Product.salePercentage"
          :theStyle="Product.theDetails.theStyle" :isSeen="Product.isSeen">
          <p @click="TheSeenProduct(Product), goToUp()"> {{
            Product.theTitle }} </p>
        </CategoryContent>
      </main>
    </main>
  </section>
  <FooterComp />
</template>
<style>
.black {
  color: black;
}

.block {
  display: block !important;
}


.goUp {
  display: block !important;
  animation: goUp 1s;
}


@keyframes goUp {
  0% {
    transform: translateY(100%);
  }

  75% {
    transform: translateY(-3%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>