import Classes from './classes'
import DataKeys from './datakeys'

export default {
  // 容器
  container: [`<div ${DataKeys.container}="%s" class="quicktab">`, '</div>'],

  //工具栏容器
  toolbar: [`<ul class="${Classes.toolbar} %s">`, '</ul>'],

  // 工具栏的项目
  toolbarItem: `<li class="%s">%s</li>`,

  //选项卡body部分
  tabBody: `<ul class="${Classes.tabBody}"></ul>`,

  tabBodyItem: `<li ${DataKeys.tabUrl}=%s></li>`,

  //遮罩层包裹层
  maskWrapper: `<div ${DataKeys.tabUrl}=%s  class="${Classes.overlays}">%s</div>`,

  //加载器
  loading: `<div class="mask-inner"><div class="quicktab-loaders"><div></div><div></div><div></div></div></div>`,
  //默认超时界面
  timeout: `<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;background-color:#f8f9fa;"><span style="color: rgba(33, 37, 41, 0.75);">%s</span></div>`,

  //单个tab结构
  tab: `<button %s class="%s" ${DataKeys.tabUrl}=%s ><span>%s</span>%s</button>`,

  //列表组
  listGroup: [
    `<ul ${DataKeys.contextmenu}="%s" class="quicktab-list-group">`,
    '</ul>',
  ],

  //列表关闭item
  listGroupItem: `<li class="%s"><span>%s</span></li>`,
  //分隔线
  listGroupSeparatorItem: '<li class="separator"></li>',

  //下拉菜单
  dropdown: [
    `<div ${DataKeys.dropdown}="%s" class="quicktab-dropdown">`,
    '</div>',
  ],
  //头部
  dropdownHeader: `<div class="header">%s<input type="text" autocomplete="off" placeholder="%s"></div>`,
  dropdownBody: ['<div class="body">', '</div>'],

  //粘性布局(第一个占位符表示是否是有图标的项目，最后一个是图标容器)
  dropdownBodySticky: `<div class="sticky %s"><div class="subheader"><div class="subheader-text">%s</div>%s</div></div>`,

  //列表容器单元
  dropdownBodySection: `<ul class="section"></ul>`,

  //图标容器(第一个占位是表示是否需要聚焦状态)
  iconWrapper: `<div class="icon-wrapper" %s>%s</div>`,

  dropdownEmpty: `<div class="empty">%s</div>`,

  //每个tab的条目(最后一个占位表示图标容器部分)
  sectionItem: `<li class="%s">
                    <div class="details">
                        <p class="title">%s</p>
                        <p><span class="url">%s</span><span class="dot">·</span>%s </p>
                    </div>
                    %s
                </li>`,
}
