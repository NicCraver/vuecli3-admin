<template>
  <div>
    <el-button type="primary" @click="go">跳转子页面</el-button>
    <el-button type="primary" @click="go1">跳转子页面1</el-button>
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    go() {
      this.$router.push("/menu1/doem4");
    },
    go1() {
      this.$router.push("/menu1/doem4?data='145124'");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
</style>