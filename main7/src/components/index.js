import component_extend_dialog from "./component_extend_dialog.vue";

export default {
  install(Vue) {
    //注册全局组件
    Vue.component("component_extend_dialog", component_extend_dialog);
  },
};
