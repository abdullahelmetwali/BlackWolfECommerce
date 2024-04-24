<script>
import StarIcon from '../../../src/components/IconsSVGs/StarIcon.vue';
import { RouterLink, RouterView } from 'vue-router';
import { getSalePrice } from '@/stores/counter';
export default {
    components: {
        RouterLink,
        RouterView,
        StarIcon,
    },
    methods: {
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        }
    },
    props: ['theMainImg', 'theTitle', 'thePrice', 'salePercentage', 'theStyle', 'isSeen']
}
</script>
<template>
    <div :class="{ hidden: !isSeen }">
        <div><img :src="theMainImg">
        </div>
        <div>
            <RouterLink class="font-bold text-xl" :to="`/${theStyle}/${theTitle}`">
                <slot />
            </RouterLink>
        </div>
        <StarIcon />
        <div>
            <h2 v-if="salePercentage === 0" class="font-bold text-xl"> ${{ thePrice }}
            </h2>
            <div class="flex items-center gap-2">
                <h2 v-if="salePercentage !== 0" v-text="`$${GetSalePrice(thePrice, salePercentage)}`"
                    class="font-bold tracking-wide text-xl">
                </h2>
                <span class="bg-red-200 rounded-3xl text-center text-red-700 px-3 text-sm h-fit"
                    v-if="salePercentage !== 0">-{{
                        salePercentage
                    }}%</span>
            </div>
            <del v-if="salePercentage !== 0" class="font-semibold tracking-wide">
                ${{ thePrice }}
            </del>
        </div>
    </div>
    <RouterView />
</template>
