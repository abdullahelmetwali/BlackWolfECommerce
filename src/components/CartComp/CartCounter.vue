<script>
export default {
    props: {
        CartProduct: Array
    },
    computed: {
        totalProducts: function () {
            if (this.CartProduct) {
                return this.CartProduct.reduce((acc, now) => acc + now.theCounter, 0)
            } else {
                return 0
            }
        }
    }
}
</script>
<template>
    <span class="bg-red-500 block w-7 h-5 rounded-full ml-1 ">
        <p class="text-center text-sm text-white cursor-auto  outline-none">
            {{ totalProducts || 0 }}</p>
    </span>
</template>