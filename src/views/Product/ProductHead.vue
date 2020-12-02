<template>
    <div class="head">
        <el-form ref="searchForm" :model="search" @submit.native.prevent>
            <el-form-item>
                <el-input
                    v-model="search.content"
                    @keyup.enter.native="onSubmitSearch"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitAdd">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from "../../api"
export default {
    data() {
        return {
            search: {
                content:""
            },
        };
    },
    methods: {
        onSubmitSearch() {
            api.getSearch({
                search:this.search.content
            }).then(res =>{
                this.$bus.$emit("searchData",res.data)
            })
        },
        onSubmitAdd() {
            this.$bus.$emit("productAddVisible",true)
        },
    },
};
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1230px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>