<script>
import { RouterLink, RouterView } from 'vue-router';
import AllData from '../../../src/json/AllData.json';
import Bag from '../../../src/components/IconsSVGs/BagIcon.vue'
import { seeProduct, getSalePrice } from '@/stores/counter';
export default {
    components: {
        Bag,
        RouterLink,
        RouterView,
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
            window.scrollTo(0, 0)
            return seeProduct(obj)
        },
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
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
        <section class="flex my-8 mr-4 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
            <div v-for="Product in SeeWhatSection" :key="Product" class="relative">
                <div>
                    <div>
                        <img :src="Product.theMainImg" class="w-full h-[80vh] img cursor-pointer"
                            @click="this.$router.push(`/${Product.theDetails.theStyle}/${Product.theTitle}`), SeenProduct(Product)">
                        <div class="onLoad cursor-pointer absolute right-4 bottom-20 bg-[#080808e8] w-fit py-3 px-4 mob:bottom-[7rem]"
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
                                class="hidden cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]"
                                :class="{ getIn: Product.showColor }">
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
    </main>
    <RouterView />
</template>