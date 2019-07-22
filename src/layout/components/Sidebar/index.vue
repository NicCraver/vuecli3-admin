<template>
  <div>
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu 
      :default-active="activeMenu" 
      :collapse="isCollapse"
      :background-color="variables.menuBg" 
      :text-color="variables.menuText" 
      :unique-opened="true" 
      :active-text-color="variables.menuActiveText" 
      :collapse-transition="false" 
      mode="vertical"
      >
        <template v-for="(item,index) in routes" v-if="!item.hidden">
          <div v-if="item.path=='/'">
            <router-link  :to="item.path" :key="item.children[0].name">
              <el-menu-item class="submenu-title-noDropdown" :index="item.path+'/'+item.children[0].path">
                <i :class="item.children[0].meta.icon"></i>
                <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
              </el-menu-item>
            </router-link>
          </div>
          <div v-else-if="item.children.length===1 && !item.children[0].children">
            <router-link  :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
              <el-menu-item class="submenu-title-noDropdown" :index="item.path+'/'+item.children[0].path">
                <i :class="item.children[0].meta.icon"></i>
                <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
              </el-menu-item>
            </router-link>
          </div>
          
          <el-submenu v-else ref="subMenu" :index="item.name||item.path" :key="item.name" popper-append-to-body>
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <template v-for="child in item.children" v-if="!child.hidden">
              <!-- <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path">
              </sidebar-item> -->
              <router-link :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <i :class="child.meta.icon"></i>
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import variables from "@/styles/variables.scss";
export default {
  name: "Sidebar",
  components: { Logo },
  data() {
    return {
      showLogo: true
    };
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar;
    }
  }
};
</script>

<style lang="scss"></style>
