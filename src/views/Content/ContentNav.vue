<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      :render-content="renderContent"
    >
    </el-tree>
    <!-- 添加子导航对话框 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogAddNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名称" prop="pass">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddNavHandle">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改子导航对话框 -->
    <el-dialog
      title="修改子导航"
      :visible.sync="dialogUpdateNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名称" prop="pass">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdataNavHandle"
          >确认修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ContentNav",
  inject: ["reload", "demo"],
  data() {
    return {
      props: {
        children: "children",
        label: "name",
      },
      dialogAddNavVisible: false,
      dialogUpdateNavVisible: false,
      navForm: {
        name: "",
      },
      navContent: {},
    };
  },
  mounted() {},
  methods: {
    http(level, resolve) {
      api.selectContentCategoryByParentId(level).then((res) => {
        if (res.data.status === 200) {
          return resolve(res.data.result);
        } else {
          return resolve([]);
        }
      });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.http({ id: 1 }, resolve);
      }
      if (node.level >= 1) {
        console.log(node);
        this.http({ id: node.data.pid }, resolve);
      }
    },
    handleNodeClick(node) {
            this.$bus.$emit("contentInfo",node)
    },
    /**
     * 导航栏的添加删除编辑按钮
     */
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data)}
            >
              增加子导航
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.updata(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },
    /**
     * 点击添加子导航
     */
    append(node, data) {
      this.dialogAddNavVisible = true;
      this.navContent = data;
    },
    remove(node, data) {
      api
        .deleteContentCategoryById({
          pid: data.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: `删除子导航${this.navForm.name}成功`,
              type: "success",
            });
            this.reload();
          }
        });
    },
    updata(node, data) {
      this.dialogUpdateNavVisible = true;
      this.navContent = data;
    },
    /**
     * 关闭子导航
     */
    handleClose() {
      this.dialogAddNavVisible = false;
    },
    sureAddNavHandle() {
      api.insertContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogAddNavVisible = false;
            this.reload();
            this.$message({
              showClose: true,
              message: `添加子导航${this.navForm.name}成功`,
              type: "success",
            });
          } else {
            this.$message.error(
              `添加子导航${this.navForm.name}失败，请重新添加`
            );
          }
        });
    },
    // 修改
    sureUpdataNavHandle() {
      api
        .updateContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.reload();
            this.$message(`修改子导航${this.navForm.name}成功`);
          } else {
            this.$message.error(
              `修改子导航${this.navForm.name}失败，请重新修改`
            );
          }
        });
    },
  },
};
</script>

<style>
</style>