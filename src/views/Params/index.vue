<template>
    <div class="params-container">
        <SearchHead @onSubmitAdd="getSubmitAdd" />
        <element-table :tableData="tableData" :cell-style="cellStyle">
            <el-table-column
                show-overflow-tooltip
                prop="id"
                label="规格参数ID"
                width="100"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="itemCatId"
                label="CID"
                width="100"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="paramData"
                label="规格参数"
            ></el-table-column>
            <el-table-column label="操作" width="80">
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
        <Pagination :total="total" @page="getPages" />
        <el-dialog title="规格参数" :visible.sync="dialogParamsVisible">
            <ParamsTree @treeData="getTreeData" />
            <el-dialog
                width="50%"
                title="规格参数添加"
                :visible.sync="dialogParamsInnerVisible"
                append-to-body
            >
                <el-button @click="addDomain">添加分组</el-button>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                    <el-form-item
                        label="规格参数"
                        v-for="(item, index) in dynamicValidateForm.domains"
                        :key="index"
                    >
                        <el-input
                            v-model="item.value"
                            style="width: 80%"
                        ></el-input>
                        <el-button @click="addParams(index)"
                            >添加参数</el-button
                        >
                        <el-button @click="removeDomain(item)"
                            >删除分组</el-button
                        >
                        <div
                            v-for="(innerItem, innerIndex) in item.children"
                            :key="innerIndex"
                        >
                            <el-input
                                v-model="innerItem.childValue"
                                style="width: 60%; margin-left: 80px"
                            ></el-input>
                            <el-button @click="removeParams(index, innerIndex)"
                                >删除参数</el-button
                            >
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogParamsInnerVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="paramsSubimt"
                        >提 交</el-button
                    >
                </span>
            </el-dialog>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogParamsVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="paramsContentHandle"
                    >确定并添加分组内容</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from "../../api";
import SearchHead from "../../components/SearchHead";
import Pagination from "../../components/Pagination";
import ParamsTree from "../Product/ProductTree";

export default {
    name: "Params",
    data() {
        return {
            treeData: {},
            tableData: [],
            total: 11,
            dialogParamsVisible: false,
            dialogParamsInnerVisible: false,
            disabled: false,
            dynamicValidateForm: {
                domains: [
                    {
                        value: "",
                        children: [
                            {
                                childValue: "",
                                value: "",
                            },
                            {
                                childValue: "",
                                value: "",
                            },
                        ],
                    },
                ],
            },
        };
    },
    components: {
        SearchHead,
        Pagination,
        ParamsTree,
    },
    mounted() {
        this.http(1);
        api.paramsTotal().then((res) => {
            this.total = res.data.result[0]["count(*)"];
        });
    },
    methods: {
        http(page) {
            api.selectItemParamAll({ page }).then((res) => {
                this.tableData = res.data.result;
            });
        },
        cellStyle() {},
        /**
         * 搜索
         */
        searchDataHandle(search) {
            api.paramsSearch({
                search,
            }).then((res) => {
                this.tableData = res.data.result;
            });
        },
        /**
         * 删除
         */
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api.paramsDelete({
                        id: row.id,
                    }).then((res) => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.http(1);
                        } else {
                            this.$message({
                                type: "error",
                                message: "删除失败!",
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        getPages(page) {
            this.http(page);
        },
        getSubmitAdd(flag) {
            this.dialogParamsVisible = flag;
        },
        paramsContentHandle() {
            this.dialogParamsInnerVisible = true;
        },
        /**
         * 添加外层分组
         */
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                children: [
                    {
                        childValue: "",
                        value: "",
                    },
                    {
                        childValue: "",
                        value: "",
                    },
                ],
            });
        },
        /**
         * 添加内层分组
         */
        addParams(index) {
            this.dynamicValidateForm.domains[index].children.push({
                childValue: "",
                value: "",
            });
        },
        /**
         * 删除外层分组
         */
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            this.dynamicValidateForm.domains.splice(index, 1);
        },
        /**
         * 删除内层分组
         */
        removeParams(index, innerIndex) {
            this.dynamicValidateForm.domains[index].children.splice(
                innerIndex,
                1
            );
        },
        /**
         * 提交规格参数
         */
        paramsSubimt() {
            console.log(this.dynamicValidateForm.domains)
            api.insertItemParam({
                itemCatId: this.treeData.cid,
                content: JSON.stringify(this.dynamicValidateForm.domains),
            }).then((res) => {
                if (res.data.status === 200) {
                    this.dialogParamsVisible = false;
                    this.dialogParamsInnerVisible = false;
                    this.http(1);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        getTreeData(data) {
            this.treeData = data;
        },
    },
};
</script>

<style>
</style>