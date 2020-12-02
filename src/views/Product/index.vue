<template>
  <div class="product-container">
      <ProductHead />
      <ProductList />
      <ProductPagination />
      <ProductAdd />
      <ProductEditor />
  </div>
</template>

<script>
import ProductList from "./ProductList"
import ProductPagination  from "./ProductPagination"
import ProductHead from "./ProductHead"
import ProductAdd from "./ProductAdd"
import ProductEditor from "./ProductEditor"

export default {
  components:{
    ProductList,
    ProductPagination,
    ProductHead,
    ProductAdd,
    ProductEditor
  }
}
</script>

<style>

</style>