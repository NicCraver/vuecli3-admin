<template>
  <div>
    <div>

      
    </div>
    <div class="box_padding">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>PageHeader</span>
        </div>
        <div>
          <PageHeader title="Element组件" />
        </div>
        <div class="code">
          <div>
            //封装成了全局组件，组件地址：src/components/PageHeader
          </div>
          <div>使用方法：title中传入当前页面的title，返回功能封装在组件内，可直接调用</div>
          <div>{{PageHeader}} </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "elementDemo",
  components: {},
  data() {
    return {
      input: "",
      PageHeader: `<PageHeader title="element" />`,
      Input: `<el-input v-model="input" maxlength="10" show-word-limit clearable placeholder="请输入内容"></el-input>`,
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
.goButton {
  display: flex;
  flex-flow: wrap;
  .button {
    margin: 10px;
    .w1 {
      width: 100px;
      line-height: 36px;
    }
    .w2 {
      width: 200px;
    }
  }
}
.box_padding {
  margin: 30px 0 0 0;
}
.box_padding:nth-child(1) {
  margin: 0;
}
.code {
  margin: 20px;
  padding: 15px;
  background: rgb(240, 242, 245);
  div {
    margin: 20px;
  }
}
.width {
  margin: 20px;
  width: 500px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>