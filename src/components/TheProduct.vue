<script>
import { RouterView } from 'vue-router'
import AllData from '../../src/json/AllData.json'
import FAQsComp from '../../src/components/FAQsComp.vue'
import CustomerTestimonial from '../../src/components/CustomerTestimonial.vue'
import ChevronUp from '../../src/components/IconsSVGs/ChevronUp.vue'
import ChevronDown from '../../src/components/IconsSVGs/ChevronDown.vue'
import Bag from '../../src/components/IconsSVGs/BagIcon.vue'
import Plus from '../../src/components/IconsSVGs/PlusIcon.vue'
import Minus from '../../src/components/IconsSVGs/MinusIcon.vue'
import FooterComp from '../../src/components/FooterComp.vue'
import { displayProduct, seeProduct, getSalePrice } from '../stores/counter'
import TheMessage from '../../src/components/TheMessage.vue'
import ErrorMessage from '../../src/components/ErrorMessage.vue'
export default {
    components: {
        Bag,
        TheMessage,
        ErrorMessage,
        FAQsComp,
        CustomerTestimonial,
        FooterComp,
        Plus,
        Minus,
        ChevronUp,
        ChevronDown,
        RouterView,
    },
    data() {
        return {
            Products: AllData.AllProducts,
            FAQs: AllData.FAQs,
            Testimonials: AllData.CustomerTestimonials,
            count: 1,
            currentSection: 'isReviews',
            CartShown: false,
            ShowMessage: false,
            ShowErrorMessage: false,
            HiddenDesc: false,
            selectedColor: '',
            selectedSize: '',
            NoItemsSelected: false,
            style: displayProduct().theDetails.theStyle,
            titile: displayProduct().theTitle
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
            this.selectedColorLike = ''
            this.selectedColorLike = ''
            return window.scrollTo(0, 0)
        },
        SeeCart(product) {
            let cartData = JSON.parse(localStorage.getItem('cart')) || []
            const isProductInCart = cartData.some((obj) => obj.theTitle === product.theTitle)
            if (!isProductInCart) {
                if (product.salePercentage !== 0) {
                    product.saledPrice = getSalePrice(product.thePrice, product.salePercentage) * productCounter
                }
                product.theCounter = this.count
                cartData.push(product)
                setTimeout(() => {
                    this.ShowMessage = !this.ShowMessage
                }, 4000)
                this.ShowMessage = !this.ShowMessage
                localStorage.setItem('cart', JSON.stringify(cartData))
            } else {
                setTimeout(() => {
                    this.ShowErrorMessage = !this.ShowErrorMessage
                }, 4000)
                this.ShowErrorMessage = !this.ShowErrorMessage
            }
        },
        AddToCart(product) {
            if (this.selectedColor === '' || this.selectedSize === '') {
                return this.NoItemsSelected == this.NoItemsSelected
            } else {
                product.selectedColor = this.selectedColor;
                product.selectedSize = this.selectedSize;
                return this.SeeCart(product), this.NoItemsSelected == !this.NoItemsSelected
            }
        },
        toggleColor(product) {
            product.showColor = !product.showColor;
            product.isSeen = !product.isSeen;
            product.selectedSize = this.selectedSize;
            product.selectedColor = this.selectedColor;
            this.count = 1;
            addToCartWithCount(product, this.count, this.ShowMessage, this.ShowErrorMessage)
        },
        ShowCart() {
            this.CartShown = !this.CartShown
        }
    },
    computed: {
        AnotherLikedProducts: function () {
            return this.Products.filter((likedProduct) => {
                return likedProduct.theDetails.theStyle === this.style && likedProduct.theTitle !== this.titile
            })
        }
    }
}
</script>
<template>
    <ErrorMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowErrorMessage }" />
    <TheMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowMessage }" />
    <main class="moveIn px-12 pt-20 tab:py-24 mob:px-6">
        <div class="grid grid-cols-2 gap-8 mob:grid-cols-1">
            <div><img :src="TheDisplayedProduct().theMainImg.replace('./', '../')"
                    class="w-full h-[80%] img mob:h-full">
            </div>
            <div>
                <div>
                    <h1 class="text-3xl tracking-wide uppercase">
                        <strong>
                            {{
                                TheDisplayedProduct().theTitle }}
                        </strong>
                    </h1>
                    <div class=" flex items-center gap-2 my-2 text-xl">
                        <div v-if="TheDisplayedProduct().salePercentage !== 0" class="flex gap-2">
                            <h2 class="text-[#0a244f] font-bold">
                                ${{ GetSalePrice(TheDisplayedProduct().thePrice, TheDisplayedProduct().salePercentage) *
                                    count }}
                            </h2>
                            <del>
                                ${{ TheDisplayedProduct().thePrice * count }}
                            </del>
                        </div>
                        <h2 v-else>
                            ${{ TheDisplayedProduct().thePrice * count }}
                        </h2>
                    </div>
                    <div>
                        <div class="my-3">
                            <strong class="text-white mr-1">
                                SIZE
                            </strong>
                            <strong>
                                {{ selectedSize }}
                            </strong>
                        </div>
                        <div class="flex gap-2">
                            <div class=" flex justify-center p-1 mb-4 w-[5rem] border cursor-pointer size" :key="Size"
                                v-for="  Size in TheDisplayedProduct().theDetails.theSizes  "
                                @click="selectedSize = Size" :class="{ choosed: selectedSize === Size }" v-text="Size">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="my-3">
                            <strong class="text-white mr-1">
                                COLOR
                            </strong>
                            <strong>
                                {{ selectedColor }}
                            </strong>
                        </div>
                        <div class="inline-flex mb-4 gap-1">
                            <span class="flex items-center justify-center w-[4rem] h-[2.1rem] border  cursor-pointer"
                                :key="Color" v-for="Color in TheDisplayedProduct().theDetails.theColors" :class="Color"
                                @click="selectedColor = Color">
                                <span :class="{ sized: selectedColor === Color }" class="hidden">{{ Color }}</span>
                                <p class="text-white" v-show="selectedColor === Color"
                                    :class="{ black: selectedColor === 'White' }">#</p>
                            </span>
                        </div>
                        <hr>
                    </div>
                </div>
                <div class="my-3 w-full">
                    <div class="flex items-center justify-between">
                        <h1>
                            <strong>
                                DESCRIPTION
                            </strong>
                        </h1>
                        <div class="cursor-pointer">
                            <ChevronDown @click="HiddenDesc = !HiddenDesc" v-show="!HiddenDesc" />
                            <ChevronUp v-show="HiddenDesc" @click="HiddenDesc = !HiddenDesc" />
                        </div>
                    </div>
                    <article class="tracking-wide my-2" v-html="TheDisplayedProduct().theDetails.theCaption"
                        v-show="HiddenDesc">
                    </article>
                </div>
                <hr>
                <div class="flex items-center gap-4 my-4">
                    <div class=" my-4">
                        <div class="flex items-center gap-8 border cursor-pointer w-fit">
                            <div @click="forCounter()" class="p-4">
                                <Minus />
                            </div>
                            <p class="font-bold text-2xl counter"> {{ count }} </p>
                            <div @click="count += 1" class="p-4">
                                <Plus />
                            </div>
                        </div>
                    </div>
                    <button class="border py-3 bg-[#0a244f] w-full font-medium opacity-30 cursor-not-allowed"
                        @click="AddToCart(TheDisplayedProduct())"
                        :class="{ opacityNone: selectedColor !== '' && selectedSize !== '' }">
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
            <h1 class="mb-2">HERE'S SOME DETAIL ABOUT PRODUCT</h1>
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
    <main class="px-8 mob:px-2">
        <h1 class="text-2xl tracking-widest text-center my-6">
            YOU MIGHT LIKE
        </h1>
        <section class="flex my-8 mr-4 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
            <div v-for="Product in AnotherLikedProducts" :key="Product" class="relative">
                <div>
                    <div>
                        <img :src="Product.theMainImg.replace('./', '../')" class="w-full h-[80vh] img">
                        <div class="onLoad cursor-pointer absolute right-4 bottom-20 bg-[#080808e8] w-fit py-3 px-4 mob:bottom-[7rem]"
                            :class="{ getOut: !Product.isSeen }">
                            <Bag @click="Product.isSeen = !Product.isSeen" />
                        </div>
                    </div>
                    <div>
                        <div class="flex w-full justify-center gap-4 px-14 bg-[#080808e8] absolute bottom-16 mob:bottom-[7rem]"
                            :class="{ getIn: !Product.isSeen }">
                            <div v-for="Size in Product.theDetails.theSizes" :key="Size"
                                class="size cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]" v-show="!Product.isSeen"
                                :class="{ hidden: Product.showColor }"
                                @click="selectedSize = Size, Product.showColor = !Product.showColor">
                                <p>
                                    {{ Size }}
                                </p>
                            </div>
                            <div v-for="Color in Product.theDetails.theColors" :key="Color"
                                class="hidden cursor-pointer py-1 px-2  hover:bg-[#302f2fe8]"
                                :class="{ getIn: Product.showColor }">
                                <div @click="selectedColor = Color, toggleColor(Product)">
                                    {{ Color }} </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" w-[17rem] text-center text-nowrap">
                    <RouterLink class="text-nowrap"
                        :to="`/${Product.theDetails.theStyle}/${Product.theTitle.replaceAll(' ', '')}`"
                        @click="TheSeenProduct(Product), goToUp()">
                        {{ Product.theTitle }}
                    </RouterLink>
                    <div class="text-center">
                        <h3 v-if="Product.salePercentage === 0">
                            ${{ Product.thePrice }}
                        </h3>
                        <div v-else class="flex gap-2 justify-center">
                            <h3>
                                ${{ GetSalePrice(Product.thePrice, Product.salePercentage) }}
                            </h3>
                            <del>
                                {{ Product.thePrice }}
                            </del>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
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
    opacity: 1 !important;
    cursor: pointer;
}

.choosed {
    background-color: #0a244f;
}
</style>
