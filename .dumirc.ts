import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'MCFPP Guide',
  },
  locales : [
    {id: 'zh-CN', name: '简体中文'},
    {id: 'en-US', name: 'English'},
  ],
  base:'/mcfppguide',
  publicPath:'/mcfppguide/',
  exportStatic:{}
});
