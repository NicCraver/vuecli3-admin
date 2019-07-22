<template>
  <div class="layout">
    <el-container style="height: 100%;">
      <el-aside width="auto">
        <!-- 左侧菜单栏 -->
        <Sidebar :class="isCollapse? 'sidebar-container1' : 'sidebar-container'" />
      </el-aside>
      <el-container>
        <el-header height="50">
          <!-- 导航栏 -->
          <Navbar />
        </el-header>
        <el-main :class="isCollapse? 'app_container1' : 'app_container'" class="container_Navbar">
          <!-- 主要内容 -->
          <AppMain :class="isCollapse? 'app_main_move' : 'app_main'" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./components/Sidebar/index";
import Navbar from "./Navbar";
import AppMain from "./AppMain";
export default {
  name: "layout",
  components: { Sidebar, Navbar, AppMain },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      screenHeight: document.documentElement.clientHeight, //屏幕高度
      isTrue: false
    };
  },
  created() {},
  mounted() {
    this.DetectionScreenWidth();
    this.ClientWidthChange();
  },
  methods: {
    // 初始化时改变
    DetectionScreenWidth() {
      if (this.screenWidth < 1400) {
        this.isTrue = true;
      } else {
        this.isTrue = false;
      }
      if (this.isTrue == true) {
        if (this.sidebar == true) {
          this.$store.dispatch("app/toggleSideBarFalse");
        }
      }
    },
    // 宽度变化时改变
    ClientWidthChange() {
      var that = this;
      window.onresize = function() {
        // 窗口大小变更时触发
        that.screenWidth = document.documentElement.clientWidth; //窗口宽度
        // console.log("that.screenWidth", that.screenWidth);
        if (that.screenWidth < 1400) {
          that.isTrue = true;
        } else {
          that.isTrue = false;
        }
        if (that.isTrue == true) {
          if (that.sidebar == true) {
            that.$store.dispatch("app/toggleSideBarFalse");
          }
        }
      };
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar;
    }
  }
};
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  position: absolute;
  .el-header {
    text-align: right;
    font-size: 12px;
    padding: 0;
  }
}
.app_container {
  transition: margin-left 0.28s;
  margin-left: 210px;
}

.app_container1 {
  transition: margin-left 0.28s;
  margin-left: 64px;
}
</style>
