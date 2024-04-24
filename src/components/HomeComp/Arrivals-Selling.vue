<script>
import { RouterLink, RouterView } from 'vue-router';
import AllData from '../../../src/json/AllData.json';
import StarIcon from '../../../src/components/IconsSVGs/StarIcon.vue'
import { seeProduct, getSalePrice } from '@/stores/counter';
export default {
    components: {
        RouterLink,
        RouterView,
        StarIcon,
    },
    data() {
        return {
            Products: AllData.AllProducts
        }
    },
    methods: {
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
        goToUp() {
            return window.scrollTo(0, 0)
        },
        SeenProduct(obj) {
            return seeProduct(obj)
        }
    },
    computed: {
        NewArrivals: function () {
            return this.Products.filter((newarrivals) => {
                return newarrivals.theSection === 'New Arrivals'
            })
        },
        TopSelling: function () {
            return this.Products.filter((topselling) => {
                return topselling.theSection === 'Top Selling'
            })
        }
    }
}
</script>

<template>
    <main class="grid px-12 mob:px-2">

        <main class="grid my-10">
            <h1 class="font-black text-4xl text-center tracking-wide">NEW ARRIVALS</h1>
            <section
                class="flex justify-center my-8 gap-2 mr-4  mob:gap-4 mob:overflow-x-auto snap-x scroll-smooth mob:justify-start">
                <div :key="Item" v-for="Item in NewArrivals">
                    <div class="mob:w-[30vw]">
                        <img :src="Item.theMainImg">
                        <RouterLink class="font-bold text-xl cursor-pointer mob:text-base"
                            :to="`${Item.theDetails.theStyle}/${Item.theTitle.replaceAll(' ', '')}`"
                            @click="SeenProduct(Item), goToUp()">
                            {{ Item.theTitle }}
                        </RouterLink>
                        <div>
                            <StarIcon />
                        </div>

                        <h2 v-if="Item.salePercentage === 0" class="font-bold tracking-wide text-xl"> ${{ Item.thePrice
                            }}
                        </h2>
                        <div class="flex items-center gap-2">
                            <h2 v-if="Item.salePercentage !== 0"
                                v-html="`$${GetSalePrice(Item.thePrice, Item.salePercentage)}`"
                                class="font-bold tracking-wide text-xl">
                            </h2>
                            <span class="bg-red-200 rounded-3xl text-center text-red-700 px-3 text-sm h-fit"
                                v-if="Item.salePercentage !== 0">-{{
                                    Item.salePercentage
                                }}%</span>
                        </div>
                        <del v-if="Item.salePercentage !== 0" class="font-semibold tracking-wide">
                            ${{ Item.thePrice }}
                        </del>
                    </div>
                </div>
            </section>
            <RouterLink to="/category" class="place-self-center">
                <button class="button ">
                    View All
                </button>
            </RouterLink>
        </main>
        <hr>



        <main class="grid my-10">
            <h1 class="font-black text-4xl text-center tracking-wide">TOP SELLING</h1>
            <section
                class="flex justify-center my-8 gap-2 mr-4  mob:gap-5 mob:overflow-x-auto snap-x scroll-smooth mob:justify-start">
                <div :key="Item" v-for="Item in TopSelling">
                    <div class=" snap-start mob:w-[30vw]">
                        <img :src="Item.theMainImg">
                        <RouterLink class="font-bold text-xl cursor-pointer mob:text-base"
                            :to="`${Item.theDetails.theStyle}/${Item.theTitle.replaceAll(' ', '')}`"
                            @click="SeenProduct(Item), goToUp()">
                            {{ Item.theTitle }}
                        </RouterLink>
                        <div>
                            <StarIcon />
                        </div>

                        <h2 v-if="Item.salePercentage === 0" class="font-bold tracking-wide text-xl"> ${{ Item.thePrice
                            }}
                        </h2>
                        <div class="flex items-center gap-2">
                            <h2 v-if="Item.salePercentage !== 0"
                                v-html="`$${GetSalePrice(Item.thePrice, Item.salePercentage)}`"
                                class="font-bold tracking-wide text-xl">
                            </h2>
                            <span class="bg-red-200 rounded-3xl text-center text-red-700 px-3 text-sm h-fit"
                                v-if="Item.salePercentage !== 0">-{{
                                    Item.salePercentage
                                }}%</span>
                        </div>
                        <del v-if="Item.salePercentage !== 0" class="font-semibold tracking-wide">
                            ${{ Item.thePrice }}
                        </del>
                    </div>
                </div>
            </section>
            <RouterLink to="/category" class="place-self-center">
                <button class="button ">
                    View All
                </button>
            </RouterLink>
        </main>
    </main>
    <RouterView />
</template>