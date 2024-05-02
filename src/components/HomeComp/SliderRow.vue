<script>
export default {
    data() {
        return {
            logos: [
                'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF', 'BLACK', 'WOLF',
            ]
        }
    }
}
</script>
<template>
    <div class="overflow-hidden  py-2">
        <div class="flex gap-8 w-full animate-slide">
            <div class="flex gap-2 whitespace-nowrap" v-for="logo in logos" :key="logo">
                <h1 class="text-2xl tracking-wide -scale-x-100">{{ logo }}</h1>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes slider {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.slider {
    animation: slide 30s linear 0s infinite normal;
}
</style>