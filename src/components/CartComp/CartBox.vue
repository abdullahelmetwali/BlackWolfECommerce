<script>
import AllData from '../../../src/json/AllData.json'
import { getFromCart, seeProduct, getSalePrice } from '../../stores/counter'
import XmarkIcon from '../../../src/components/IconsSVGs/XmarkIcon.vue'
import Delete from '../../../src/components/IconsSVGs/DeleteIcon.vue'
import Plus from '../../../src/components/IconsSVGs/PlusIcon.vue'
import Minus from '../../../src/components/IconsSVGs/MinusIcon.vue'
import ChevronDown from '../../../src/components/IconsSVGs/ChevronDown.vue'
import ChevronUp from '../../../src/components/IconsSVGs/ChevronUp.vue'
export default {
    components: {
        XmarkIcon,
        Delete,
        Plus,
        Minus,
        ChevronDown,
        ChevronUp
    },
    data() {
        return {
            CartProducts: [],
            PromoCodes: AllData.PromoCodes,
            PromoCode: '',
            EmptyCart: true,
            ShowComment: false,
            ShowPromo: false,
            ShowErrorCode: false
        }
    },
    mounted() {
        this.CartProduct();
        this.updateTimer = setInterval(this.CartProduct, 1000);
    },
    beforeUnmount() {
        clearInterval(this.updateTimer);
    },
    watch: {
        GetFromCart: {
            handler: 'CartProduct',
            deep: true
        }
    },
    methods: {
        GetFromCart() {
            return getFromCart()
        },
        CartProduct() {
            const Cart = this.GetFromCart()
            this.CartProducts = Cart
        },
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
        DeleteItem(index) {
            if (localStorage.getItem('cart')) {
                let cartContainer = JSON.parse(localStorage.getItem('cart'))
                cartContainer.splice(index, 1)
                this.CartProduct = cartContainer
                return localStorage.setItem('cart', JSON.stringify(this.CartProduct))
            }
        },
        SubctractCounter(index) {
            if (localStorage.getItem('cart')) {
                let cartContainer = JSON.parse(localStorage.getItem('cart'))
                let newCounter = cartContainer[index].theCounter
                let newSaledPrice = cartContainer[index].saledPrice
                newCounter -= 1
                if (newCounter <= 1) {
                    newCounter = 1
                    newSaledPrice = (this.GetSalePrice(cartContainer[index].thePrice, cartContainer[index].salePercentage)) * newCounter
                } if (cartContainer[index].saledPrice === null || cartContainer[index].saledPrice === '') {
                    newSaledPrice = ''
                } else {
                    newSaledPrice = this.GetSalePrice(cartContainer[index].thePrice, cartContainer[index].salePercentage) * newCounter
                }
                cartContainer[index].saledPrice = parseInt(newSaledPrice)
                cartContainer[index].theCounter = parseInt(newCounter)
                this.CartProduct = cartContainer
                return localStorage.setItem('cart', JSON.stringify(this.CartProduct))
            }
        },
        AddCounter(index) {
            if (localStorage.getItem('cart')) {
                let cartContainer = JSON.parse(localStorage.getItem('cart'))
                let newCounter = cartContainer[index].theCounter
                newCounter += 1
                let newSaledPrice = cartContainer[index].saledPrice
                if (cartContainer[index].saledPrice === null || cartContainer[index].saledPrice === '') {
                    newSaledPrice = ''
                } else {
                    newSaledPrice = this.GetSalePrice(cartContainer[index].thePrice, cartContainer[index].salePercentage) * newCounter
                }
                cartContainer[index].saledPrice = parseInt(newSaledPrice)
                cartContainer[index].theCounter = parseInt(newCounter)
                this.CartProduct = cartContainer
                return localStorage.setItem('cart', JSON.stringify(this.CartProduct))
            }
        },
        goToUp() {
            return window.scrollTo(0, 0)
        },
        SeenProduct(obj) {
            return seeProduct(obj)
        },
        SubTotalPrice() {
            let cartContainer = localStorage.getItem('cart')
            let SubTotalPrice = []
            if (cartContainer) {
                SubTotalPrice = JSON.parse(cartContainer).map((obj) => {
                    if (obj.saledPrice) {
                        return obj.saledPrice
                    } else {
                        return (obj.thePrice * obj.theCounter)
                    }
                })
                if (SubTotalPrice != '') {
                    let FinalSubTotal = SubTotalPrice.reduce((AccPrice, NextPrice) => {
                        return AccPrice + NextPrice
                    })
                    return FinalSubTotal
                }
            }
        },
        DiscountPercentage() {
            if (this.CartProduct) {
                const thePromoCode = this.PromoCodes.find((e) => {
                    return e.code === this.PromoCode
                })
                if (thePromoCode) {
                    return thePromoCode.discount
                } else {
                    return 0
                }
            } else {
                return ''
            }
        },
        TotalPrice() {
            let theTotalPrice = ''
            if (this.DiscountPercentage()) {
                theTotalPrice = this.SubTotalPrice() - (this.SubTotalPrice() * this.DiscountPercentage() / 100)
            } else {
                theTotalPrice = this.SubTotalPrice()
            }
            return Math.round(theTotalPrice)
        },
        SeeImgPath(product) {
            if (this.$route.name === 'TheProduct' || this.$route.name === 'Register') {
                return product.theMainImg.replace('./', '../')
            } else {
                return product.theMainImg
            }
        }
    },
    emits: ['ShowCart'],
    computed: {

    }
}
</script>

<template>
    <main class="hidden py-10 fixed top-0 z-20 overflow-x-hidden overflow-y-auto h-full  w-full blured">
        <section class="absolute top-0 right-0 w-[50%] h-auto px-5 bg-black mob:w-[70%]">
            <div class="flex justify-between items-center w-full">
                <h1 class="tracking-wider">
                    <strong>
                        CART
                    </strong>
                </h1>
                <xmark-icon @click="this.$emit('ShowCart')" class="rotate" />
            </div>
            <hr>
            <section class="mt-8">
                <section v-if="CartProducts.length === 0" class="h-[100vh]">
                    <div class="text-center text-lg tracking-wide pt-4">
                        <h3 class="mb-12">Your cart is empty.</h3>
                        <RouterLink to="/category" class="tracking-widest opacity" @click="this.$emit('ShowCart')">
                            CONTINUE BROWSING
                        </RouterLink>
                    </div>
                </section>
                <section v-else>
                    <section v-for="(Product, index) in CartProducts" :key="Product"
                        class="relative overflow-x-hidden overflow-y-auto">
                        <div>
                            <img :src="SeeImgPath(Product)" class="img w-full h-[10rem]">
                        </div>
                        <RouterLink class="font-bold text-lg"
                            :to="`/${Product.theDetails.theStyle}/${Product.theTitle.replaceAll(' ', '')}`">
                            {{ Product.theTitle }}
                        </RouterLink>
                        <h2>
                            <strong>
                                {{ Product.selectedSize }}
                            </strong> -
                            <strong>
                                {{ Product.selectedColor }}
                            </strong>
                        </h2>
                        <div v-if="Product.saledPrice" class="flex gap-2">
                            <h2 class="text-[#0a244f] font-bold">
                                ${{ Product.saledPrice }}
                            </h2>
                            <del>
                                ${{ Product.thePrice * Product.theCounter }}
                            </del>
                        </div>
                        <h2 v-else>
                            ${{ Product.thePrice * Product.theCounter }}
                        </h2>
                        <div class="absolute top-3 right-5 bg-[#3d3d3dd2] p-2 cursor-pointer">
                            <div @click="DeleteItem(index)">
                                <Delete />
                            </div>
                        </div>
                        <div class=" my-4">
                            <div class="flex items-center gap-8 border cursor-pointer w-fit">
                                <div @click="SubctractCounter(index)" class="p-4">
                                    <Minus />
                                </div>
                                <p class="font-bold text-2xl counter"> {{ Product.theCounter }} </p>
                                <div @click="AddCounter(index)" class="p-4">
                                    <Plus />
                                </div>
                            </div>
                        </div>
                    </section>
                    <main class="w-full  mt-8">
                        <div class="w-full">
                            <div class="flex justify-between items-center w-full">
                                <h3 class="text-sm">
                                    SPECIAL MESSAGE FOR SELLER
                                </h3>
                                <div class="flex cursor-pointer">
                                    <ChevronDown @click="ShowComment = !ShowComment" v-if="ShowComment" />
                                    <ChevronUp v-else @click="ShowComment = !ShowComment" />
                                </div>
                            </div>
                            <form action="#" class="w-fit mt-2" v-show="!ShowComment">
                                <textarea cols="50" rows="3" class="bg-transparent border p-2 w-full"></textarea> <br>
                                <button type="button" class="bg-[#0a244f] px-2 py-1 w-full">
                                    SEND INSTRUCTIONS
                                </button>
                            </form>
                        </div>
                        <hr class="my-8">
                        <div class="w-full">
                            <div class="flex justify-between items-center w-full">
                                <h3 class="text-sm">
                                    GET A DISCOUNT
                                </h3>
                                <div class="flex cursor-pointer">
                                    <ChevronDown @click="ShowPromo = !ShowPromo" v-if="ShowPromo" />
                                    <ChevronUp v-else @click="ShowPromo = !ShowPromo" />
                                </div>
                            </div>
                            <form action="#" class="w-fit mt-2" v-show="!ShowPromo">
                                <input type="text" v-model="PromoCode" class="bg-transparent border p-2 outline-none"
                                    placeholder="What's Your Promocode ?">
                                <div v-if="PromoCode !== ''" class="text-xs text-nowrap mt-2">
                                    <div v-if="DiscountPercentage() !== 0">
                                        CONGRATULATIONS YOU GET <strong class="text-red-600">
                                            {{ DiscountPercentage() }}%
                                        </strong>
                                        Discount
                                    </div>
                                    <div v-else>
                                        SORRY <strong class="text-red-600">
                                            {{ PromoCode }}
                                        </strong> IS NOT A PROMOCODE
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="text-center bg-[#0a244f] p-2 mt-8">
                            <p>
                                <strong>
                                    CHECK OUT
                                </strong> - $ {{ TotalPrice() }}
                            </p>
                        </div>
                    </main>
                </section>
            </section>
        </section>
    </main>
</template>
