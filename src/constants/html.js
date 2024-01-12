import Classes from './classes'
import DataKeys from './datakeys'

export default {
  //工具栏容器
  toolbar: [`<ul class="${Classes.toolbar} %s">`, '</ul>'],

  // 工具栏的项目
  toolbarItem: `<li class="%s">%s</li>`,

  //选项卡body部分
  tabBody: `<ul class="${Classes.tabBody}"></ul>`,

  tabBodyItem: `<li ${DataKeys.tabUrl}=%s></li>`,

  //遮罩层包裹层
  maskWrapper: `<div class="${Classes.overlays}"><div class="mask-inner">%s</div></div>`,

  //加载器
  loading: `<div class="quicktab-loaders"><div></div><div></div><div></div></div>`,
  //默认超时界面
  timeout: `<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;background-color:#f8f9fa;"><span style="color: rgba(33, 37, 41, 0.75);">%s</span></div>`,

  //单个tab结构
  tab: `<button %s class="%s" ${DataKeys.tabUrl}=%s ><span>%s</span>%s</button>`,

  //列表组
  listGroup: [`<ul %s="%s" class="quicktab-list-group">`, '</ul>'],

  //列表关闭item
  listGroupItem: `<li class="%s"><span>%s</span></li>`,
  //分隔线
  listGroupSeparatorItem: '<li class="separator"></li>',
}
