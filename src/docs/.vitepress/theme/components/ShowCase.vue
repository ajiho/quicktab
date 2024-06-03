<script setup>

import { ref, watch, onMounted } from "vue";
import { withBase } from 'vitepress'


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
const isFullscreen = ref(false);
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


  <div :class="{ 'fullscreen': isFullscreen }" class="container">


    <div class="header">
      <div class="left">{{ title }}</div>
      <div class="right">

        <div class="action-wrapper" @click="refresh">

          <svg viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
          </svg>

        </div>

        <div class="action-wrapper" @click="isFullscreen = !isFullscreen">

          

          <svg viewBox="0 0 24 24" v-if="isFullscreen">
            <path fill="currentColor"
              d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
          </svg>

          <svg viewBox="0 0 24 24" v-else>
            <path fill="currentColor"
              d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
          </svg>

        </div>

        <div class="action-wrapper">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
          </svg>
        </div>

      </div>
    </div>
    <div ref="iframeWrapRef" class="body">
      <iframe ref="iframeRef" :src="withBase(`/${src}`)"></iframe>
    </div>
  </div>

</template>

<style scoped lang="scss">
.container {
  border: 1px solid #e7e7e7;
  height: 500px;
  display: flex;
  flex-direction: column;

  &.fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 9999999999999;
    height: 100%;
  }

  .header {
    border-bottom: 1px solid #e7e7e7;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;

    .right {
      display: flex;
      gap: 6px;

      .action-wrapper {
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        transition: all .2s linear;
        cursor: pointer;
        border-radius: 3px;
        color: rgba(60, 60, 67, 0.78);
      }


    }


  }

  .body{
    flex-grow: 1;
    iframe {
    display: block;
    border: none;
    width: 100%;
    height: 100%;
  }
  }


}
</style>
