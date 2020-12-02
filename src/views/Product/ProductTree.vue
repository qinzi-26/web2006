<template>
    <el-tree
        highlight-current
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
    ></el-tree>
</template>

<script>
import api from "../../api";

export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "name",
            },
        };
    },
    methods: {
        /** 异步处理 */
        loadNode(node, resolve) {
            // 默认获取第一层级数据
            if (node.level === 0) {
                api.selectItemCategoryByParentId().then((res) => {
                    if (res.data.status === 200) {
                        return resolve(res.data.result);
                    } else {
                        return resolve([]);
                    }
                });
            }
            if (node.level >= 1) {
                api.selectItemCategoryByParentId({
                    id: node.data.cid,
                })
                    .then((res) => {
                        if (res.data.status === 200) {
                            return resolve(res.data.result);
                        } else {
                            return resolve([]);
                        }
                    })
                    .catch((error) => {
                        resolve([]);
                    });
            }
        },
        handleNodeClick(data) {
            this.$emit('treeData',data)
        },
    },
};
</script>

<style>
</style>