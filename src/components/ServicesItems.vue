<script setup>
import TelePhone from '../../src/components/IconsSVGs/TelePhone.vue'
import WorldWide from '../../src/components/IconsSVGs/WorldWide.vue'
import FreeReturns from '../../src/components/IconsSVGs/FreeReturnes.vue'
</script>

<template>
    <section
        class="moveIn bg-[#151515] mt-20 w-full py-8 px-12 flex items-center justify-evenly mob:px-2 mob:items-start">
        <div>
            <FreeReturns class=" fill-[#939393]" />
            <h1 class="mob:text-base">
                <strong>
                    FREE RETURNES
                </strong>
            </h1>
            <article>
                Retruns within 30 days recieve a full refund.
            </article>
        </div>
        <div>
            <WorldWide class=" fill-[#939393]" />
            <h1 class="mob:text-base">
                <strong>
                    WORLDWIDE SHIPPING
                </strong>
            </h1>
            <article>
                Ship anywhere, rates available at checkout.
            </article>
        </div>
        <div>
            <TelePhone class=" fill-[#939393]" />
            <h1 class="mob:text-base">
                <strong>
                    24/7 SUPPORT
                </strong>
            </h1>
            <article>
                Call us at 1(800) 555- 1234
            </article>
        </div>
    </section>
</template>
<style scoped>
h1 {
    text-align: center;
    margin-top: 0.5rem;
}

article {
    text-align: center;
    font-size: 0.8rem;
}
</style>