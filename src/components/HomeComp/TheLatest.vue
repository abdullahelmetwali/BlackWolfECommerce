<script>
import { RouterView } from 'vue-router';
import AllData from '../../../src/json/AllData.json';
import ProductContent from '../../../src/components/ProductContent.vue';
import { seeProduct, getSalePrice } from '@/stores/counter';
export default {
    components: {
        RouterView,
        ProductContent
    },
    data() {
        return {
            Products: AllData.AllProducts,
            LatestHeader: ['NEW ARRIVALS', 'TOP SELLING', 'LIMITED EDITION', 'MOST POPULAR'],
            selectedColor: '',
            selectedSize: '',
            count: 1,
            SeenSection: 'NEW ARRIVALS',
        }
    },
    methods: {
        SeenProduct(obj) {
            return seeProduct(obj)
        },
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
        goToUp() {
            return window.scrollTo(0, 0)
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
                    this.$emit('ShowMess')
                }, 5000)
                this.$emit('ShowMess')
                product.theCounter = this.count
                localStorage.setItem('cart', JSON.stringify(objContainter))
            } else {
                setTimeout(() => {
                    this.$emit('ShowErrMessage')
                }, 5000)
                this.$emit('ShowErrMessage')
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
    },
    computed: {
        SeeWhatSection: function () {
            return this.Products.filter((obj) => {
                return obj.theSection.toLowerCase() === this.SeenSection.replaceAll(' ', '').toLowerCase()
            })
        }
    },
    emits: ['ShowCart', 'ShowErrMessage', 'ShowMess']
}
</script>

<template>
    <main class="moveIn px-8 mob:px-2">
        <h1 class="text-2xl tracking-widest text-center my-6">THE LATEST</h1>
        <div
            class="flex text-nowrap text-center px-4 overflow-x-auto snap-x scroll-smooth justify-center gap-4 mob:justify-start">
            <h2 v-for="Header in LatestHeader" :key="Header"
                class="tracking-wider w-full cursor-pointer rounded-3xl px-4 py-2 hover:bg-[#3636366b]"
                :class="{ SeenList: SeenSection === Header }" @click="SeenSection = Header">{{ Header
                }}</h2>
        </div>
        <section class="flex px-4 my-8 mr-4 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
            <div v-for="Product in SeeWhatSection" :key="Product" class="relative">
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
    </main>
    <RouterView />
</template>