<script setup>

import {ref, watch, onMounted} from "vue";
import {withBase} from 'vitepress'


const props = defineProps({
  text: {
    type: String,
    default: '🚀运行示例'
  },
  refreshText: {
    type: String,
    default: '刷新'
  },
  closeText: {
    type: String,
    default: '关闭'
  },
  title: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  }
})


const show = ref(false);
const iframeRef = ref(null);
const iframeWrapRef = ref(null);


const refresh = () => {
  iframeRef.value.contentWindow.location.reload();
}


//watch监听单个数据,注意：使用watch的时候响应式数据不需要.value
watch(show, (newVal, oldValue) => {
  if (newVal === true) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.setProperty('overflow', null)
  }
})

</script>


<template>

  <button @click="show = !show" class="btn">{{ text }}</button>

  <div class="container" v-if="show">
    <div class="header">
      <div class="left">{{ title }}</div>
      <div class="right">
        <button @click="refresh" style="margin-right: 10px">刷新</button>
        <button @click="show = false">关闭</button>
      </div>
    </div>
    <div ref="iframeWrapRef" class="body">
      <iframe ref="iframeRef" :src="withBase(`/${src}`)"></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">

// 可自定义的变量
$button-color: #3c3c48;
$button-bg-color: #ebebef;
$button-hover-bg-color: #e4e4e9;
$button-border-radius: 4px;
$button-padding: 6px 12px;

// 主按钮样式
button {
  display: inline-block;
  padding: $button-padding;
  border-radius: $button-border-radius;
  background-color: $button-bg-color;
  color: $button-color;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $button-hover-bg-color;
  }
}


.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 9999999999999;
  display: flex;
  flex-direction: column;

  .header {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    padding: 0 1rem;

    .left {
      overflow: hidden;
      white-space: nowrap; /* 禁止换行 */
      text-overflow: ellipsis; /* 使用省略号代替多余文本 */
    }

    .right {
      flex-shrink: 0;
    }
  }

  .body {
    flex-grow: 1;

    iframe {
      border: none;
      display: block;
      width: 100%;
      height: 100%;
    }
  }

}


</style>
