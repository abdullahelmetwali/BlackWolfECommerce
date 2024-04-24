<script>
import { RouterLink, RouterView } from 'vue-router'
import Delete from '../../src/components/IconsSVGs/DeleteIcon.vue'
import Tag from '../../src/components/IconsSVGs/TagIcon.vue'
import Plus from '@/components/IconsSVGs/PlusIcon.vue'
import Minus from '@/components/IconsSVGs/MinusIcon.vue'
import { getFromCart, getSalePrice, seeProduct } from '../../src/stores/counter'
import FooterComp from '@/components/FooterComp.vue'
import AllData from '../../src/json/AllData.json'
export default {
    components: {
        RouterLink,
        RouterView,
        Plus,
        Minus,
        Tag,
        Delete,
        FooterComp
    },
    data() {
        return {
            PromoCodes: AllData.PromoCodes,
            CartProduct: getFromCart(),
            DeliveryFee: 50,
            PromoCode: '',
            EmptyCart: true
        }
    },
    methods: {
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
        TheSeenProduct(obj) {
            return seeProduct(obj)
        },
        goToUp() {
            return window.scrollTo(0, 0)
        },
        DeleteItem(index) {
            if (localStorage.getItem('cart')) {
                let cartContainer = JSON.parse(localStorage.getItem('cart'))
                cartContainer.splice(index, 1)
                this.CartProduct = cartContainer
                return localStorage.setItem('cart', JSON.stringify(this.CartProduct))
            }
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
        DiscountNum() {
            if (this.DiscountPercentage()) {
                let theDiscountedNum = this.SubTotalPrice() - (this.SubTotalPrice() - (this.SubTotalPrice() * this.DiscountPercentage() / 100))
                return Math.round(theDiscountedNum)
            }
        },
        TotalPrice() {
            let theTotalPrice = ''
            if (this.DiscountPercentage()) {
                theTotalPrice = this.SubTotalPrice() - (this.SubTotalPrice() * this.DiscountPercentage() / 100)
            } else {
                theTotalPrice = this.SubTotalPrice()
            }
            return Math.round(theTotalPrice + this.DeliveryFee)
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
    },
    computed: {
        EmptyCartFnc: function () {
            if (this.CartProduct) {
                if (this.CartProduct.length === 0) {
                    return this.EmptyCart
                } else {
                    return this.EmptyCart == !this.EmptyCart
                }
            } else {
                return this.EmptyCart
            }
        }
    }
}

</script>
<template>
    <main class="px-16 py-8 mob:px-3 mob:py-16 tab:py-20">
        <h1 class="font-black tracking-wide text-3xl">
            YOUR CART
        </h1>
        <section class="flex my-6 gap-5 mob:grid">
            <section class="border rounded-lg p-6 ">
                <section v-if="EmptyCartFnc">
                    <div class="h-full"><img src="/Imgs/emptyCart.png"></div>
                </section>
                <div v-for="(Product, index) in CartProduct" :key="Product">
                    <div class="flex  gap-4 ">
                        <div>
                            <div><img :src="Product.theMainImg" class="w-full mb-4"></div>
                            <div>
                                <RouterLink class="font-bold text-lg"
                                    :to="`/${Product.theDetails.theStyle}/${Product.theTitle.replaceAll(' ', '')}`"
                                    @click="TheSeenProduct(Product), goToUp()">
                                    {{ Product.theTitle }}
                                </RouterLink>
                                <p> <strong>Size : </strong> {{ Product.selectedSize || 'No Size Selected' }}</p>
                                <p> <strong>Color : </strong> {{ Product.selectedColor || 'No Color Selected' }}</p>
                                <div v-if="Product.saledPrice">
                                    <strong>Was : </strong>
                                    <del> ${{ Product.thePrice *
                                        Product.theCounter }} </del>
                                </div>
                                <p v-if="Product.saledPrice" class="text-red-600"><strong>Discount : </strong> {{
                                    Product.salePercentage }}%</p>
                                <div v-if="Product.saledPrice">
                                    <h2 class="font-semibold text-xl">
                                        <strong>Total :</strong>
                                        ${{ parseInt(Product.saledPrice) }}
                                    </h2>
                                </div>
                                <div v-if="!Product.saledPrice">
                                    <h2 class="font-semibold text-xl">
                                        <strong>Total :</strong>
                                        ${{ parseInt(Product.thePrice * Product.theCounter) }}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div @click="DeleteItem(index)" class=" mx-4 mt-2 cursor-pointer">
                                <Delete />
                            </div>
                            <div class=" my-4">
                                <div
                                    class="flex w-auto items-center gap-8 bg-[#f2f0f1] rounded-3xl cursor-pointer flex-col ">
                                    <div @click="SubctractCounter(index)" class="p-4">
                                        <Minus />
                                    </div>
                                    <p class="font-bold text-2xl counter"> {{ Product.theCounter }} </p>
                                    <div @click="AddCounter(index)" class="p-4">
                                        <Plus />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-6">
                </div>
            </section>
            <section class="border rounded-lg p-6 h-fit">
                <h1 class=" font-extrabold tracking-wider text-xl"> Order Summary </h1>
                <div class="my-6">
                    <div class="flex justify-between">
                        <p class="text-[#838383]">Subtotal</p>
                        <h2 class="font-bold text-lg">${{ SubTotalPrice() || 0 }}</h2>
                    </div>
                    <div class="flex justify-between my-2">
                        <p class="text-[#838383]">Discount ( -{{ DiscountPercentage() || 0 }}% )</p>
                        <h2 class="font-bold text-lg  text-red-600">-${{ DiscountNum() || 0 }}</h2>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-[#838383]">Delivery Fee</p>
                        <h2 class="font-bold text-lg" v-if="SubTotalPrice()">${{ DeliveryFee }}</h2>
                    </div>
                </div>
                <hr class="my-4">
                <div>
                    <div class="flex justify-between">
                        <p class="text-[#838383]">Total</p>
                        <h2 class="font-bold text-lg">${{ TotalPrice() || 0 }}</h2>
                    </div>
                    <form class="flex items-center gap-2 relative my-8" action="#">
                        <div>
                            <input type="text"
                                class=" focus:border-none outline-none bg-[#f2f0f1] text-black h-fit pl-12 py-2 rounded-3xl w-[28vw] mob:w-full"
                                placeholder="Add Promo Code" v-model="PromoCode">
                            <span class="absolute left-3 top-2">
                                <Tag />
                            </span>
                        </div>
                        <button type="button"
                            class="bg-black text-white tracking-wide py-2 rounded-3xl w-[12vw] mob:w-[7rem]">
                            Apply
                        </button>
                    </form>
                    <div>
                        <button class="bg-black text-white tracking-wide py-2 rounded-3xl w-full">
                            Go to Checkout
                        </button>
                    </div>
                </div>
            </section>
        </section>
    </main>
    <FooterComp />
    <RouterView />
</template>