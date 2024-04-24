<script setup>
const getPage = function () {
    return window.location.pathname.replace('/', '').replace('Page', '').replace('/ShopCoStore/', '').replace('#', '')
}
</script>
<template>
    <h1 class="uppercase mx-4">you are now in {{ getPage() }} component</h1>
</template>