<script>
import Up from '../../src/components/IconsSVGs/ChevronUp.vue'
import Down from '../../src/components/IconsSVGs/ChevronDown.vue'
export default {
    components: {
        Up,
        Down
    },
    props: ['theQues', 'theAns', 'isSeen']
}
</script>

<template>
    <section class="p-3">
        <div class="flex justify-between">
            <h1 class="font-semibold text-lg tracking-wide"> {{ theQues }}? </h1>
            <div>
                <Up @click="isSeen = !isSeen" :class="{ hidden: !isSeen }" class="cursor-pointer" />
                <Down @click="isSeen = !isSeen" :class="{ hidden: isSeen }" class="cursor-pointer" />
            </div>
        </div>
        <div>
            <article v-show="isSeen">
                {{ theAns }}.
            </article>
        </div>
    </section>
</template>