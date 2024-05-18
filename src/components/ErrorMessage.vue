<script>
import XIcon from '../../src/components/IconsSVGs/XmarkIcon.vue';
export default {
    components: {
        XIcon
    },
    data() {
        return {
            Show: true,
        }
    },
    methods: {
        Hide() {
            setTimeout(() => {
                this.Show = !this.Show
            }, 5000)
            this.Show = !this.Show
        }
    },
    emits: ['ShowCart']
}
</script>

<template>
    <section class="flex justify-between items-center px-8 fixed top-0 w-full bg-black z-40" :class="{ hiddenEx: !Show }">
        <x-icon @click="Hide()" class="rotate" />
        <div class="text-center my-2 mob:text-sm">
            <div class="text-red-600">
                ALREADY ADDED TO CART
            </div>
        </div>
        <div @click=" this.$emit('ShowCart'), Hide()" class="cursor-pointer mob:text-sm">
            VIEW CART
        </div>
    </section>
</template>