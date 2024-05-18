<script>
import FooterComp from '../../src/components/FooterComp.vue'
import { seeProduct } from '../stores/counter'
import ProductContent from '../components/AccountComp/ProductContent.vue'
export default {
    components: {
        FooterComp,
        ProductContent
    },
    data() {
        return {
            HiddenCart: false
        }
    },
    methods: {
        LogOut() {
            this.$router.push('/')
            localStorage.removeItem('user')
        },
        SeenProduct(product) {
            return seeProduct(product)
        },
        goToUp() {
            return window.scrollTo(0, 0)
        },
    },
    computed: {
        User: function () {
            return JSON.parse(localStorage.getItem('user'))
        },
        CartProducts: function () {
            return localStorage.getItem('cart')
        }
    }
}
</script>
<template>
    <main class="py-16 px-8">
        <div class="flex items-center justify-between">
            <h1 class="tracking-wider">
                Hello
                <strong>
                    {{ User.firstName }} {{ User.lastName }}
                </strong>
            </h1>
            <button @click="LogOut()">
                LOG OUT
            </button>
        </div>
        <hr class="my-4">
        <section class="flex justify-between">
            <div>
                <div class="mb-6">
                    <h1>
                        ORDER HISTORY
                    </h1>
                </div>
                <section v-if="CartProducts">
                    <div v-for="Product in JSON.parse(CartProducts)" :key="Product">
                        <ProductContent :theMainImg="Product.theMainImg.replace('./', '../')"
                            :saledPrice="Product.saledPrice" :selectedColor="Product.selectedColor"
                            :selectedSize="Product.selectedSize" :theDetails="Product.theDetails"
                            :thePrice="Product.thePrice" :theStyle="Product.theStyle" :theTitle="Product.theTitle"
                            :theCounter="Product.theCounter" @SeenProduct="SeenProduct(Product)" @goToUp="goToUp()" />
                    </div>
                </section>
                <p v-else>
                    No Products Added
                </p>
            </div>
        </section>
    </main>
    <FooterComp />
</template>