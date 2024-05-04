<script>
import { RouterLink, RouterView } from 'vue-router';
import Bag from './IconsSVGs/BagIcon.vue'
import { getSalePrice } from '@/stores/counter';
export default {
    components: {
        RouterLink,
        RouterView,
        Bag
    },
    data() {
        return {
            selectedColor: '',
            selectedSize: '',
        }
    },
    methods: {
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
    },
    props: ['theMainImg', 'theStyle', 'theTitle', 'isSeen', 'theDetails', 'showColor', 'theColors', 'theSizes', 'thePrice', 'salePercentage'],
    emits: ['toggleColor', 'SeenProduct', 'setItems', 'goToUp'],
}
</script>


<template>
    <div>
        <div>
            <img :src="theMainImg" class="w-full h-[80vh] img">
            <div class="onLoad cursor-pointer absolute right-4 bottom-20 bg-[#080808e8] w-fit py-3 px-4 mob:bottom-[7rem]"
                :class="{ getOut: !isSeen }">
                <Bag @click="isSeen = !isSeen" />
            </div>
        </div>
        <div>
            <div class="flex w-full justify-between px-14 bg-[#080808e8] absolute bottom-16 mob:bottom-[7rem]"
                :class="{ getIn: !isSeen }">
                <div v-for="Size in theDetails.theSizes" :key="Size"
                    class="size cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]" v-show="!isSeen"
                    :class="{ hidden: showColor }" @click="selectedSize = Size, showColor = !showColor">
                    <p>
                        {{ Size }}
                    </p>
                </div>
                <div v-for="Color in theDetails.theColors" :key="Color"
                    class="hidden cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]" :class="{ getIn: showColor }">
                    <p
                        @click="selectedColor = Color, this.$emit('setItems', this.selectedSize, this.selectedColor), this.$emit('toggleColor')">
                        {{ Color }} </p>
                </div>
            </div>
        </div>
    </div>
    <div class=" w-[17rem] text-center text-nowrap">
        <RouterLink class="text-nowrap" :to="`/${theDetails.theStyle}/${theTitle.replaceAll(' ', '')}`"
            @click="this.$emit('SeenProduct', Product), this.$emit('goToUp')">
            {{ theTitle }}
        </RouterLink>
        <div class="text-center">
            <h3 v-if="salePercentage === 0">
                ${{ thePrice }}
            </h3>
            <div v-else class="flex gap-2 justify-center">
                <h3>
                    ${{ GetSalePrice(thePrice, salePercentage) }}
                </h3>
                <del>
                    {{ thePrice }}
                </del>
            </div>
        </div>
    </div>
    <RouterView />
</template>
