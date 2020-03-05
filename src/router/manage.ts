export default [
  {
    path: "/manage",
    redirect: "/manage/import",
    name: "Manage",
    component: () =>
      import(/* webpackChunkName: "manage" */ "@/views/manage/ManagePage.vue"),
    children: [
      {
        path: "/manage/import",
        name: "论文数据导入",
        component: () =>
          import(
            /* webpackChunkName: "manage" */ "@/components/manage/import/ManageImport.vue"
          ),
        meta: {
          title: "论文数据导入",
          icon: "el-icon-upload2"
        }
      },
      {
        path: "/manage/papers",
        name: "论文数据管理",
        component: () => import("@/components/manage/import/ManagePapers.vue"),
        meta: {
          title: "论文数据管理",
          icon: "el-icon-document",
          disabled: true
        }
      }
    ]
  }
];
