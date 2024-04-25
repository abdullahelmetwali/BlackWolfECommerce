<script>
import { RouterLink, RouterView } from 'vue-router'
import Delete from '../IconsSVGs/DeleteIcon.vue'
import Plus from '../../../src/components/IconsSVGs/PlusIcon.vue'
import Minus from '../../../src/components/IconsSVGs/MinusIcon.vue'
import { seeProduct } from '../../stores/counter'
export default {
    data() {
        return {
            EmptyCart: true
        }
    },
    components: {
        RouterLink,
        RouterView,
        Delete,
        Plus,
        Minus
    },
    props: {
        CartProduct: Array
    },
    emits: ['DeleteItem', 'SubctractCounter', 'AddCounter'],
    methods: {
        TheSeenProduct(obj) {
            return seeProduct(obj)
        },
        DeleteItem(index) {
            return this.$emit('DeleteItem', index)
        },
        SubctractCounter(index) {
            return this.$emit('SubctractCounter', index)
        },
        AddCounter(index) {
            return this.$emit('AddCounter', index)
        },
        goToUp() {
            return window.scrollTo(0, 0)
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
                        <div class="flex w-auto items-center gap-8 bg-[#f2f0f1] rounded-3xl cursor-pointer flex-col ">
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
    <RouterView />
</template>
