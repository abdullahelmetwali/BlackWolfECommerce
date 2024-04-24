<script>
import { RouterLink, RouterView } from 'vue-router'
import AllData from '../../../src/json/AllData.json'
import FAQsComp from '../../../src/components/FAQsComp.vue'
import CustomerTestimonial from '../../../src/components/CustomerTestimonial.vue'
import Plus from '../../../src/components/IconsSVGs/PlusIcon.vue'
import Minus from '../../../src/components/IconsSVGs/MinusIcon.vue'
import FooterComp from '../../../src/components/FooterComp.vue'
import StarIcon from '../../../src/components/IconsSVGs/StarIcon.vue'
import { displayProduct, seeProduct, getSalePrice } from '../../../src/stores/counter'
export default {
    components: {
        FAQsComp,
        CustomerTestimonial,
        FooterComp,
        StarIcon,
        Plus,
        Minus,
        RouterLink,
        RouterView,
    },
    data() {
        return {
            Products: AllData.AllProducts,
            FAQs: AllData.FAQs,
            Testimonials: AllData.CustomerTestimonials,
            count: 1,
            currentSection: 'isReviews',
            selectedColor: '',
            selectedSize: '',
            NoItemsSelected: false,
            style: displayProduct().theDetails.theStyle,
        }
    },
    methods: {
        GetSalePrice(price, salePercentage) {
            return getSalePrice(price, salePercentage)
        },
        forCounter() {
            if (this.count <= 1) {
                this.count = 1
            } else {
                return this.count -= 1
            }
        },
        TheSeenProduct(obj) {
            return seeProduct(obj)
        },
        TheDisplayedProduct() {
            return displayProduct()
        },
        goToUp() {
            this.count = 1
            this.selectedColor = ''
            this.selectedSize = ''
            return window.scrollTo(0, 0)
        },
        AdderProduct(product) {
            const thereIsCart = localStorage.getItem('cart')
            let objContainter = []
            if (thereIsCart) {
                objContainter = JSON.parse(thereIsCart)
            }
            const isObjectHere = objContainter.some((obj) => obj.theTitle === product.theTitle)
            if (!isObjectHere) {
                objContainter.push(product)
                objContainter.map((obj, index) => {
                    return Object.assign(obj, { cartId: index })
                })
                product.selectedColor = this.selectedColor
                product.selectedSize = this.selectedSize
                if (product.salePercentage !== 0) {
                    product.saledPrice = this.GetSalePrice(product.thePrice, product.salePercentage) * this.count
                } else {
                    ''
                }
                product.theCounter = this.count
                localStorage.setItem('cart', JSON.stringify(objContainter))
            } else {
                ''
            }
        },
        AddToCart(product) {
            if (this.selectedColor === '' || this.selectedSize === '') {
                return this.NoItemsSelected == this.NoItemsSelected
            } else {
                return this.AdderProduct(product), this.NoItemsSelected == !this.NoItemsSelected,
                    this.$router.push('/cart')
            }
        },
        WaitForAdding() {
            if (this.selectedColor === '' || this.selectedSize === '') {
                return this.NoItemsSelected == this.NoItemsSelected
            } else {
                return this.NoItemsSelected == !this.NoItemsSelected
            }
        },
    },
    computed: {
        AnotherLikedProducts: function () {
            return this.Products.filter((likedProduct) => {
                return likedProduct.theDetails.theStyle === this.style
            })
        }
    }
}
</script>
<template>
    <main class="px-12 py-6 tab:py-24 mob:px-6">
        <div class="grid grid-cols-2 gap-8 mob:grid-cols-1">
            <div><img :src="TheDisplayedProduct().theMainImg.replace('./', '../')" class="w-full">
            </div>
            <div>
                <div>
                    <h1 class="font-black text-3xl tracking-wide uppercase"> {{
                        TheDisplayedProduct().theTitle }}
                    </h1>
                    <StarIcon />
                    <div class=" flex items-center gap-2">
                        <h2 v-if="TheDisplayedProduct().salePercentage === 0" class="font-bold text-2xl price"> ${{
                            TheDisplayedProduct().thePrice *
                            count
                        }}
                        </h2>
                        <div class="flex items-center gap-2" v-if="TheDisplayedProduct().salePercentage !== 0">
                            <h2 v-text="`$${GetSalePrice(TheDisplayedProduct().thePrice, TheDisplayedProduct().salePercentage) * count}`"
                                class="font-bold tracking-wide text-2xl sale">
                            </h2>
                            <del class="font-semibold tracking-wide deleted">
                                ${{ TheDisplayedProduct().thePrice * count }}
                            </del>
                            <span class="bg-red-200 rounded-3xl text-center text-red-700 px-3 text-sm h-fit">-{{
                                TheDisplayedProduct().salePercentage
                                }}%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <article class="tracking-wide my-2" v-html="TheDisplayedProduct().theDetails.theCaption">
                    </article>
                </div>
                <hr>
                <div>
                    <h3 class="font-medium my-3">Select Colors</h3>
                    <div class="inline-flex mb-4 gap-1">
                        <span
                            class="flex items-center justify-center w-[2rem] h-[2rem] border rounded-full  cursor-pointer"
                            :key="Color" v-for="Color in TheDisplayedProduct().theDetails.theColors" :class="Color"
                            @click="selectedColor = Color">
                            <span :class="{ sized: selectedColor === Color }" class="hidden">{{ Color }}</span>
                            <p class="text-white" v-show="selectedColor === Color"
                                :class="{ black: selectedColor === 'White' }">#</p>
                        </span>
                    </div>
                    <hr>
                </div>
                <div>
                    <h3 class="font-medium my-3">Choose Size</h3>
                    <div class="flex gap-2">
                        <div class=" flex justify-center p-1 mb-4 w-[5rem] bg-[#f2f0f1] rounded-3xl cursor-pointer size"
                            :key="Size" v-for="  Size in TheDisplayedProduct().theDetails.theSizes  "
                            @click="selectedSize = Size" :class="{ selectedBox: selectedSize === Size }" v-text="Size">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="flex items-center gap-4 my-4">
                    <div class="flex items-center gap-8 py-1 px-3 bg-[#f2f0f1] rounded-3xl cursor-pointer">
                        <div @click="forCounter()">
                            <Minus />
                        </div>
                        <p class="font-bold text-2xl counter"> {{ count }} </p>
                        <div @click="count += 1">
                            <Plus />
                        </div>
                    </div>
                    <button class="button w-full font-medium opacity-75" @click="AddToCart(TheDisplayedProduct())"
                        :class="{ opacityNone: !WaitForAdding() }">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </main>
    <section class="p-12 my-6">
        <nav class="flex justify-between">
            <h2 class="text-xl tracking-wide my-4 cursor-pointer nav" @click="currentSection = 'isProduct'"
                :class="{ line: currentSection === 'isProduct' }">
                Details
            </h2>
            <h2 class="text-xl tracking-wide my-4 cursor-pointer nav" @click="currentSection = 'isReviews'"
                :class="{ line: currentSection === 'isReviews' }">
                Reviews
            </h2>
            <h2 class="text-xl tracking-wide my-4 cursor-pointer nav" @click="currentSection = 'isFAQs'"
                :class="{ line: currentSection === 'isFAQs' }">
                FAQs
            </h2>
        </nav>
        <main v-if="currentSection == 'isProduct'">
            <h1>HERE'S SOME DETAIL ABOUT PRODUCT</h1>
            <article>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui repudiandae modi facilis fugiat
                voluptates, assumenda quidem iusto consequatur, at nemo ipsum possimus sapiente officiis aliquam in
                veniam laudantium. Non, deserunt!</article>
        </main>
        <main v-if="currentSection == 'isReviews'" class="flex gap-4 overflow-x-auto snap-x scroll-smooth">
            <CustomerTestimonial v-for="Testimonial in Testimonials" :key="Testimonial"
                :CustomerName="Testimonial.customerName" :CustomerComment="Testimonial.customerComment" />
        </main>
        <main v-if="currentSection == 'isFAQs'" class="grid grid-cols-2 mob:grid-cols-1 mob:gap-3">
            <FAQsComp v-for="FAQ in FAQs" :key="FAQ" :theQues="FAQ.question" :theAns="FAQ.answer"
                :isSeen="FAQ.isSeen" />
        </main>
    </section>


    <section class="my-6 px-12 py-6">
        <h1 class="font-black text-3xl text-center tracking-wide my-4">YOU MIGHT ALSO LIKE</h1>
        <div class="flex justify-center items-start gap-4 overflow-x-auto snap-x scroll-smooth mob:justify-normal">
            <div v-for="Product in AnotherLikedProducts" :key="Product">
                <div class="snap-start mob:w-[40vw]">
                    <div><img :src="Product.theMainImg.replace('./', '../')"></div>
                    <div>
                        <RouterLink class="font-bold text-lg"
                            :to="`/${Product.theDetails.theStyle}/${Product.theTitle.replaceAll(' ', '')}`"
                            @click="TheSeenProduct(Product), goToUp()">
                            {{ Product.theTitle }}
                        </RouterLink>
                    </div>
                    <StarIcon />
                    <div class="flex items-center gap-2">
                        <h2 v-if="Product.salePercentage === 0" class="font-bold text-2xl"> ${{ Product.thePrice
                            }}
                        </h2>
                        <div v-if="Product.salePercentage !== 0">
                            <h2 v-text="`$${GetSalePrice(Product.thePrice, Product.salePercentage)}`"
                                class="font-bold tracking-wide text-2xl">
                            </h2>
                            <del class="font-semibold tracking-wide mx-2">
                                ${{ Product.thePrice }}
                            </del>
                            <span class="bg-red-200 rounded-3xl text-center text-red-700 px-3 text-sm h-fit">-{{
                                Product.salePercentage
                            }}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <FooterComp />
    <RouterView />
</template>
<style scoped>
.button {
    width: 100%;
}

.black {
    color: black;
}

.opacityNone {
    opacity: 1;
}
</style>
