<script>
import { RouterView } from 'vue-router'
import AllData from '../../src/json/AllData.json'
import FAQsComp from '../../src/components/FAQsComp.vue'
import CustomerTestimonial from '../../src/components/CustomerTestimonial.vue'
import ChevronUp from '../../src/components/IconsSVGs/ChevronUp.vue'
import ChevronDown from '../../src/components/IconsSVGs/ChevronDown.vue'
import Plus from '../../src/components/IconsSVGs/PlusIcon.vue'
import Minus from '../../src/components/IconsSVGs/MinusIcon.vue'
import FooterComp from '../../src/components/FooterComp.vue'
import { displayProduct, seeProduct, getSalePrice } from '../stores/counter'
import ProductContent from '../../src/components/ProductContent.vue'
import TheMessage from '../../src/components/TheMessage.vue'
import CartBox from '../../src/components/CartComp/CartBox.vue'
import ErrorMessage from '../../src/components/ErrorMessage.vue'
export default {
    components: {
        TheMessage,
        CartBox,
        ErrorMessage,
        FAQsComp,
        CustomerTestimonial,
        ProductContent,
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
            selectedColorLike: '',
            selectedSizeLike: '',
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
            this.selectedColorLike = ''
            this.selectedColorLike = ''
            return window.scrollTo(0, 0)
        },
        AdderProduct(product) {
            let cartData = JSON.parse(localStorage.getItem('cart')) || [];
            const isProductInCart = cartData.some(obj => obj.theTitle === product.theTitle);
            if (!isProductInCart) {
                if (product.salePercentage !== 0) {
                    product.saledPrice = this.GetSalePrice(product.thePrice, product.salePercentage);
                }
                setTimeout(() => {
                    this.ShowMessage = !this.ShowMessage
                }, 5000)
                this.ShowMessage = !this.ShowMessage
                product.theCounter = this.count;
                cartData.push(product);
                localStorage.setItem('cart', JSON.stringify(cartData));
            } else {
                setTimeout(() => {
                    this.ShowErrorMessage = !this.ShowErrorMessage
                }, 5000)
                this.ShowErrorMessage = !this.ShowErrorMessage
            }
        },
        AddToCart(product) {
            if (this.selectedColor === '' || this.selectedSize === '') {
                return this.NoItemsSelected == this.NoItemsSelected
            } else {
                product.selectedColor = this.selectedColor;
                product.selectedSize = this.selectedSize;
                return this.AdderProduct(product), this.NoItemsSelected == !this.NoItemsSelected
            }
        },
        toggleColor(product) {
            return product.showColor = !product.showColor,
                product.isSeen = !product.isSeen,
                product.selectedSize = this.selectedSizeLike,
                product.selectedColor = this.selectedColorLike,
                this.AdderProduct(product)
        },
        SetSizeColor(size, color) {
            this.selectedSizeLike = size;
            this.selectedColorLike = color;
        },
        WaitForAdding() {
            if (this.selectedColor === '' || this.selectedSize === '') {
                return this.NoItemsSelected == this.NoItemsSelected
            } else {
                return this.NoItemsSelected == !this.NoItemsSelected
            }
        },
        ShowCart() {
            this.CartShown = !this.CartShown
        }
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
    <ErrorMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowErrorMessage }" />
    <TheMessage class="hidden" @ShowCart="ShowCart()" :class="{ getTop: ShowMessage }" />
    <CartBox :class="{ goLeft: CartShown }" @ShowCart="ShowCart()" />
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
                        @click="AddToCart(TheDisplayedProduct())" :class="{ opacityNone: !WaitForAdding() }">
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
                <ProductContent :theMainImg="Product.theMainImg.replace('./', '../')" :theDetails="Product.theDetails"
                    :thePrice="Product.thePrice" :theSizes="Product.theDetails.theSizes"
                    :theStyle="Product.theDetails.theStyle" :theTitle="Product.theTitle"
                    :theColors="Product.theDetails.theColors" :isSeen="Product.isSeen"
                    :salePercentage="Product.salePercentage" :showColor="Product.showColor"
                    @toggleColor="toggleColor(Product)" @goToUp="goToUp()" @SeenProduct="TheSeenProduct(Product)"
                    @setItems="SetSizeColor">
                </ProductContent>
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
