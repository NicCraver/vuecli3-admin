import PageHeaderComponent from './index.vue'
// 添加install方法
const PageHeader = {
  install: function (Vue) {
    Vue.component("PageHeader", PageHeaderComponent);
  }
}
// 导出
export default PageHeader