<script>
import CategoryContent from '@/components/CategoryComp/CategoryContent.vue';
import { seeProduct } from '../../src/stores/counter'
import { RouterView } from 'vue-router';
export default {
    components: {
        CategoryContent,
        RouterView
    },
    methods: {
        TheSeenProduct(obj) {
            return seeProduct(obj)
        },
        goToUp() {
            return window.scrollTo(0, 0)
        },
    },
    computed: {
        getSearch: function () {
            return JSON.parse(sessionStorage.getItem('search'))
        },
        NoSearchResult: function () {
            if (this.getSearch.length === 0) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<template>
    <main class="grid grid-cols-5 gap-4 px-12 my-8 tab:py-20 tab:grid-cols-3 mob:grid-cols-2">
        <CategoryContent v-for="Product in getSearch" :key="Product" :theMainImg="Product.theMainImg"
            :theTitle="Product.theTitle" :thePrice="Product.thePrice" :salePercentage="Product.salePercentage"
            :theStyle="Product.theDetails.theStyle" :isSeen="Product.isSeen">
            <strong @click="TheSeenProduct(Product), goToUp()"> {{
                Product.theTitle }} </strong>
        </CategoryContent>
    </main>
    <div v-if="NoSearchResult" class="w-full">
        <img src="/Imgs/noSearch.jpg">
    </div>
    <RouterView />
</template>