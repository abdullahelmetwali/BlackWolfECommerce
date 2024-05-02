<script>
export default {
    data() {
        return {
            Stories: [
                {
                    img: './Imgs/AfricaShirt.jpg',
                    title: 'CITY BEAT THREADS',
                    caption: 'Sync your style with the pulsating heartbeat of the city, where fashion becomes a symphony of self-expression'
                },
                {
                    img: './Imgs/AfricaSpeakerT-Shirt.jpg',
                    title: 'BRICK & MORTAR COUTURE',
                    caption: 'In the architecture of fashion, every garment is a masterpiece, meticulously crafted from the building blocks of style.'
                },
                {
                    img: './Imgs/AfricaTwoT-Shirt.jpg',
                    title: 'ASPHALT AESTHETICS',
                    caption: 'Merge the sleek sophistication of high fashion with the gritty allure of the streets, as asphalt aesthetics.'
                },
                {
                    img: './Imgs/FUBU.jpg',
                    title: 'UPTOWN REAL FUNK',
                    caption: "Arm yourself with the savvy sophistication of urban style as you navigate the labyrinthine maze of fashion's concrete jungle."
                }
            ]
        }
    }
}
</script>
\
<template>
    <main class="flex my-8 px-8 gap-6 overflow-x-auto snap-x scroll-smooth justify-start">
        <div v-for="Story in Stories" :key="Story">
            <div>
                <img :src="Story.img" class="w-full h-[80vh] img">
            </div>
            <div>
                <h1 class="text-lg text-center text-nowrap my-3">
                    <strong>
                        {{ Story.title }}
                    </strong>
                </h1>
                <article class="text-center text-wrap text-sm">
                    {{ Story.caption }}
                </article>
            </div>
        </div>
    </main>
</template>