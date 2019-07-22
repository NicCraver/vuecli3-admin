<template>
  <div>
    <el-page-header @back="goBack" :content="title"></el-page-header>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log("go back");
    }
  }
};
</script>