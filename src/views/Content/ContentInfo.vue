<template>
    <div class="content-info">
        <el-button @click="contentInfoAdd" v-if="contentData.name"
            >添加{{ contentData.name }}</el-button
        >
        <element-table :tableData="tableData">
            <el-table-column label="ID" prop="id" width="100"></el-table-column>
            <el-table-column
                label="PID"
                prop="pid"
                width="100"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="名字"
                prop="name"
                width="300"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="URL"
                prop="url"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="Image"
                prop="image"
            ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </element-table>
        <el-dialog
            title="添加广告"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form :model="ruleForm" ref="ruleForm">
                <el-form-item label="name">
                    <el-input type="text" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input type="text" v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="image">
                    <el-input type="text" v-model="ruleForm.image"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHandle">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from "../../api";
export default {
    name: "ContentInfo",
    data() {
        return {
            tableData: [],
            contentData: {},
            dialogVisible: false,
            ruleForm: {
                name: "",
                url: "",
                image: "",
            },
        };
    },
    mounted() {
        this.$bus.$on("contentInfo", (data) => {
            // 按钮设置
            this.contentData = data;
            this.http(data);
        });
    },
    methods: {
        http(data) {
            api.selectTbContentAllByCategoryId({
                pid: data.pid,
            }).then((res) => {
                this.tableData = res.data.result;
            });
        },
        contentInfoAdd() {
            this.dialogVisible = true;
        },
        addHandle() {
            api.insertTbContent({
                pid: this.contentData.pid,
                name: this.ruleForm.name,
                url: this.ruleForm.url,
                image: this.ruleForm.image,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.dialogVisible = false;
                    this.http(this.contentData);
                }
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleDelete(index, row) {
            api.deleteContentByIds({
                id: row.id,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.http(this.contentData)
                }
            });
        },
    },
};
</script>

<style>
</style>