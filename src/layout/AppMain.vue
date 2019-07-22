<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {
    key() {
      // console.log("this.$route", this.$route.fullPath);
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="scss">
</style>
