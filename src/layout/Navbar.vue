<template>
  <div :class="isCollapse? 'Navbar_move' : 'Navbar'">
    <div class="navbar_top">
      <!-- 收缩组件 -->
      <hamburger :is-active="sidebar" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
      <el-dropdown>
        <div class="navbar_right">
          <img class="navbar_img" src="../assets/img/logo.png" alt="">
          <span style="margin: 0 20px">Nic_</span>
        </div>
        <el-dropdown-menu slot="dropdown" show-timeout='0'>
          <el-dropdown-item><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-s-tools"></i>账户设置</el-dropdown-item>
          <span @click="SignOut">
            <el-dropdown-item><i class="el-icon-user-solid"></i>退出登录</el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="navbar_tag">
      <span class="navbar_tags" v-for="(v,index) in pathArr" v-if="v.hidden != 'true'">
        <el-tag v-if="v.title==getTitle" @click="goToPage(v.path)" effect="dark" style="line-height: 25px;height: 25px;">
          {{v.title}}
        </el-tag>
        <el-tag v-else @click="goToPage(v.path)" @close="link_close(index)" closable type="info" effect="light" style="line-height: 25px;height: 25px;color:#000;background:#fff;border: 1px solid #909399;" color="#000">
          {{v.title}}
        </el-tag>
      </span>
    </div>
    <div class="navbar_operate">
      <el-dropdown @command="close_other" style="cursor: pointer;">
        <div class="navbar_operate_span">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu size='small' slot="dropdown" show-timeout='0'>
          <el-dropdown-item>关闭其它页签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-show="false">
      {{getTitle}}
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import Hamburger from "./components/Hamburger";
import Breadcrumb from "./components/Breadcrumb";
export default {
  name: "Navbar",
  components: { Hamburger, Breadcrumb },
  data() {
    return {
      pathArr: []
    };
  },
  created() {},
  mounted() {
    // console.log("this.getTitle", this.getTitle);
  },
  methods: {
    SignOut() {
      console.log("退出登录");
      Cookies.remove("Admin-Token"); //清除Cookies
      Cookies.remove("sidebarStatus"); //菜单栏展开按钮

      // resetRouter(); //清除路由
      location.reload(); //不能省，强制跳到登陆页
    },
    // 收缩方法
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 页签跳转方法
    goToPage(page) {
      this.$router.push(page);
    },
    // 关闭页签按钮
    link_close(index) {
      this.pathArr.splice(index, 1);
    },
    // 关闭其它页签
    close_other() {
      this.pathArr = this.pathArr.filter(item => item.title === this.getTitle);
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar;
    },
    // 获取当前页面标题,添加路由path到标签中
    getTitle() {
      let matched = this.$route.matched;
      // console.log("matched :", matched);
      //添加路由path到标签中
      this.pathArr.push({
        title: matched[1].meta.title,
        path: matched[1].path,
        hidden: matched[1].meta.hidden
      });
      // console.log("this.pathArr :", this.pathArr);
      var tempArr = [];
      var temp = {};
      this.pathArr.map((item, index) => {
        if (!temp[this.pathArr[index].title]) {
          tempArr.push(this.pathArr[index]);
          temp[this.pathArr[index].title] = true;
        }
      });
      this.pathArr = tempArr;
      if (this.pathArr.length >= 12) {
        this.pathArr.splice(0, 1);
      }
      // console.log("matched[1].meta.title :", matched[1].meta.title);
      //返回当前页面标题
      return matched[1].meta.title;
      // return 0;
    }
  }
};
</script>

<style lang="scss">
.breadcrumb-container {
  float: left;
}
.Navbar {
  min-width: 900px;
  transition: margin-left 0.28s;
  margin-left: 210px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.Navbar_move {
  min-width: 900px;
  transition: margin-left 0.28s;
  margin-left: 64px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.navbar_top {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.navbar_right:hover {
  height: 50px;
  padding-left: 15px;
  cursor: hand;
  cursor: pointer;
  background: #fafafa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.navbar_img {
  float: left;
  width: 35px;
  height: 35px;
  margin: 7px 0 0 0;
  border-radius: 30px;
  text-align: center;
  img {
    width: 20px;
    height: 20px;
  }
}
.navbar_tag {
  line-height: 15px;
  float: left;
  padding: 5px;
  display: flex;
  cursor: pointer;
  .navbar_tags {
    padding: 0 0 0 10px;
  }
}
.navbar_operate {
  line-height: 35px;
  padding-right: 10px;
  float: right;
  .navbar_operate_span {
    height: 35px;
    padding-left: 15px;
    cursor: hand;
    cursor: pointer;
    // background: #000;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
