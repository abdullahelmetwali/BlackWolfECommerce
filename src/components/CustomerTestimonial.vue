<script>
import StarIcon from '../../src/components/IconsSVGs/StarIcon.vue';
import Verification from '../../src/components/IconsSVGs/VerificationIcon.vue';
export default {
    components: {
        StarIcon,
        Verification,
    },
    props: ['CustomerName', 'CustomerComment']
}
</script>

<template>
    <div class="border rounded py-4 px-8 w-auto">
        <StarIcon />
        <div class="flex gap-2 my-3 font-black tracking-wide">
            <h2> {{ CustomerName }} </h2>
            <Verification />
        </div>
        <article class="w-[25vw] opacity-70 mob:w-[60vw]"> "{{ CustomerComment }}" </article>
    </div>

</template>