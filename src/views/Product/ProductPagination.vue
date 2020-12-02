<template>
    <div class="pagination-container">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import api from "../../api";
export default {
    name: "ProductPagination",
    data() {
        return {
            currentPage: 1,
            total: 0,
        };
    },
    methods: {
        handleSizeChange() {},
        handleCurrentChange(val) {
            this.$bus.$emit("page", val);
        },
    },
    mounted() {
        api.getTotal().then((res) => {
            this.total = res.data.result[0]["count(*)"];
        });
    },
};
</script>

<style scoped>

.pagination-container{
    margin-top: 40px;
}

</style>