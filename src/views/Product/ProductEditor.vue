<template>
    <el-dialog
        title="编辑商品"
        :visible.sync="dialogEditorVisible"
        width="80%"
        :before-close="handleClose"
    >
        <el-form
            label-width="70px"
            :label-position="labelPosition"
            :model="addForm"
            ref="ruleForm"
        >
            <el-form-item label="商品类目">
                <el-button
                    class="category"
                    type="primary"
                    @click="dialogCategoryVisible = true"
                    >类目选择</el-button
                >
                <span class="category">{{ treeData.name }}</span>
                <el-dialog
                    width="50%"
                    title="类目选择"
                    :visible.sync="dialogCategoryVisible"
                    append-to-body
                >
                    <ProductTree @treeData="getTreeData" />
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="getCategoryDataHandle"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-button
                    class="category"
                    type="primary"
                    @click="dialogUploadVisible = true"
                    >图片上传</el-button
                >
                <span class="category">{{ uploadData.url }}</span>
                <el-dialog
                    width="50%"
                    title="上传图片"
                    :visible.sync="dialogUploadVisible"
                    append-to-body
                >
                    <ProductUpload @upload="getUpload" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <ProductWangEditor
                    @onEditor="getEditor"
                    :editorData="editorContent"
                />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditorVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
import { mapMutations, mapState } from "vuex";

export default {
    data() {
        return {
            dialogEditorVisible: false,
            dialogUploadVisible: false,
            dialogCategoryVisible: false,
            labelPosition: "left",
            addForm: {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            },
            treeData: {},
            uploadData: {},
            editorData: "",
            currentId: 0,
        };
    },
    components: {
        ProductWangEditor,
        ProductUpload,
        ProductTree,
    },
    computed: {
        ...mapState("editorModule", {
            editorContent: (state) => state.editorContent,
        }),
    },
    mounted() {
        // 编辑显示
        this.$bus.$on("onEdito", (row) => {
            this.dialogEditorVisible = true;
            this.currentId = row.id;
            api.preUpdateItem({
                id: row.id,
            }).then((res) => {
                console.log(res.data);
                this.preCategoryUpdate(res.data.result[0].cid);
                this.addForm = {
                    name: res.data.result[0].title,
                    sellPoint: res.data.result[0].sellPoint,
                    price: res.data.result[0].price,
                    num: res.data.result[0].num,
                };
                this.uploadData = {
                    url: res.data.result[0].image,
                };
                this.editorData = res.data.result[0].descs;
                this.setEditorContent(this.editorData);
            });
        });
    },
    methods: {
        ...mapMutations("editorModule", ["setEditorContent"]),
        handleClose() {
            this.dialogEditorVisible = false;
        },
        /**
         * 修改产品事件
         */
        sureSubmit() {
            // 编辑
            api.updateTbItem({
                id: this.currentId,
                title: this.addForm.name,
                sellPoint: this.addForm.sellPoint,
                price: this.addForm.price,
                num: this.addForm.num,
                cid: this.treeData.cid,
                desc: this.editorData,
                image: this.uploadData.url,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.dialogEditorVisible = false;
                    this.$bus.$emit("onRef", true);
                } else {
                    this.$message.error("修改失败");
                }
            });
        },
        getUpload(data) {
            this.uploadData = data;
            this.dialogUploadVisible = false;
        },
        getCategoryDataHandle() {
            this.dialogCategoryVisible = false;
        },
        /**
         * 获取类目选择数据
         */
        getTreeData(data) {
            this.treeData = data;
        },
        getEditor(data) {
            this.editorData = data;
        },
        initForm() {
            (this.addForm = {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            }),
                (this.treeData = {}),
                (this.uploadData = {}),
                (this.editorData = "");
        },
        preCategoryUpdate(cid) {
            console.log(cid);
            api.preCategory({
                cid,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.treeData = {
                        name: res.data.result[0].name,
                        cid: res.data.result[0].cid,
                    };
                } else {
                    this.treeData = {
                        name: res.data.msg,
                    };
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
.category {
    float: left;
    margin-right: 20px;
}
.upload-img {
    width: 400px;
    float: left;
}
</style>