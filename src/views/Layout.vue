<template>
    <div class="container">
        <HeadNav />
        <div class="container-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
export default {
    components: {
        HeadNav
    },
};
</script>

<style scoped>
.container-view{
  width: 1400px;
  margin: 0 auto;
}
</style>