<script>
import XIcon from '../../src/components/IconsSVGs/XmarkIcon.vue';
export default {
    data() {
        return {
            ProductTitle: '',
            ProductColor: '',
            ProductSize: '',
            ProductPrice: 0,
            Show: true,
        }
    },
    components: {
        XIcon
    }, mounted() {
        this.GetAddedProduct();
        this.updateTimer = setInterval(this.GetAddedProduct, 1000);
    },
    beforeUnmount() {
        clearInterval(this.updateTimer);
    },
    watch: {
        GetFromCart: {
            handler: 'GetAddedProduct',
            deep: true
        }
    },
    methods: {
        GetFromCart() {
            const addedObjects = localStorage.getItem('cart');
            if (addedObjects !== null) {
                return JSON.parse(addedObjects);
            } else {
                return [];
            }
        },
        GetAddedProduct() {
            const cartItems = this.GetFromCart();
            if (cartItems.length > 0) {
                const LastItem = cartItems[cartItems.length - 1]
                this.ProductTitle = LastItem.theTitle;
                this.ProductColor = LastItem.selectedColor;
                this.ProductSize = LastItem.selectedSize;
                if (LastItem.saledPrice !== '') {
                    return this.ProductPrice = LastItem.saledPrice
                } else {
                    return this.ProductPrice = LastItem.thePrice * LastItem.theCounter
                }
            } else {
                this.ProductTitle = ''
                this.ProductColor = ''
                this.ProductSize = ''
                this.ProductPrice = 0
            }
        },
        ShowCart() {
            this.$emit('ShowCart')
        },
        DisplayMessage() {
            this.$emit('DisplayMessage')
        },
        Hide() {
            setTimeout(() => {
                this.Show = !this.Show
            }, 5000)
            this.Show = !this.Show
        }
    },
    emits: ['ShowCart', 'DisplayMessage']
}
</script>
<template>
    <section class="flex justify-between items-center px-8 relative w-full bg-black z-40 mob:px-3"
        :class="{ hiddenEx: !Show }">
        <x-icon @click="Hide()" class="rotate" />
        <div class="text-center my-2 mob:text-sm">
            <div>
                {{ ProductTitle }}
                -
                ${{ ProductPrice }}
            </div>

            <div>
                {{ ProductColor }}
                -
                {{ ProductSize }}

            </div>
            <div class="text-[#0a244f]">
                ADDED TO CART
            </div>
        </div>
        <div @click=" this.$emit('ShowCart'), Hide()" class="cursor-pointer mob:text-sm">
            VIEW CART
        </div>
    </section>

</template>
<style>
.hiddenEx {
    display: none !important;
}
</style>