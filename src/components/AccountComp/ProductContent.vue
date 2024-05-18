<script>
export default {
    props: ['theMainImg', 'theTitle', 'saledPrice', 'thePrice', 'selectedSize', 'selectedColor', 'theDetails', 'theStyle', 'theCounter'],
    emits: ['SeenProduct', 'goToUp']
}
</script>
<template>
    <div class="flex gap-4 my-4">
        <div>
            <img :src="theMainImg" class="w-[30vw] h-[40vh] img tab:w-[50-vw] tab:h-[20vh]">
        </div>
        <div>
            <RouterLink class="text-nowrap" :to="`/${theDetails.theStyle}/${theTitle.replaceAll(' ', '')}`"
                @click="this.$emit('SeenProduct'), this.$emit('goToUp')">
                {{ theTitle }}
            </RouterLink>
            <p>
                Size :
                <strong>
                    {{ selectedSize }}
                </strong>
            </p>
            <p>
                Color :
                <strong>
                    {{ selectedColor }}
                </strong>
            </p>
            <p v-if="saledPrice">
                ${{ saledPrice }}
            </p>
            <p v-else>
                ${{ thePrice * theCounter }}
            </p>
        </div>
    </div>
</template>