<script setup>

import { ref, watch, onMounted } from "vue";
import { withBase } from 'vitepress'
import { lock, unlock } from 'tua-body-scroll-lock'
import sdk from '@stackblitz/sdk';
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  arrow
} from '@floating-ui/dom'


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



const timer = ref(null);
const isFullscreen = ref(false);
const iframeRef = ref(null);
const sourcewrapperRef = ref(null);
const sourceHtml = ref('');
// 默认是没展开
const isSourceOpen = ref(false);
const sourceRef = ref(null);



const tooltipRef = ref(null);
const copybtnRef = ref(null);
const arrowRef = ref(null);





// 请求源码
const fetchSource = async () => {

  if (sourceHtml.value === '') {
    const url = withBase(`/${props.src}`);
    const response = await fetch(url)
    sourceHtml.value = await response.text();
  }

  sourceRef.value.innerHTML = Prism.highlight(sourceHtml.value, Prism.languages.html, 'html')

  return sourceHtml.value;
}


const refresh = () => {
  iframeRef.value.contentWindow.location.reload();
}



function showTooltip(text) {
  tooltipRef.value.style.display = 'block';
  tooltipRef.value.querySelector('.content').innerHTML = text
  update();
}


function hideTooltip() {
  tooltipRef.value.style.display = '';
}





const update = () => {

  computePosition(copybtnRef.value, tooltipRef.value, {
    placement: 'top',
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef.value }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {

    Object.assign(tooltipRef.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;


    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    Object.assign(arrowRef.value.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    });

  });
}





const openProject = async () => {


  const html = await fetchSource();

  sdk.openProject(
    // Payload
    {
      files: {
        'index.html': html,
      },
      template: 'html',
      // title: `My First Docs!`,
      // description: `This is an example of my first doc!`,
    },
    // Options
    {
      openFile: 'index.html',
      newWindow: true,
    }
  );
}



const copy = async () => {



  const html = await fetchSource();




  navigator.clipboard.writeText(html).then(function () {

    showTooltip('已复制');

    // 清除可能存在的定时器
    if (timer.value) {
      clearTimeout(timer.value);
    }
    // 设置一个新的定时器
    timer.value = setTimeout(() => {
      hideTooltip()
    }, 1500);





  }).catch(function (err) {
    console.error('无法复制内容: ', err);
  });
}


const source = async () => {

  await fetchSource();

  hideTooltip()



  if (isSourceOpen.value === false) {
    //高度自动过渡
    //1.先设置为block
    sourcewrapperRef.value.style.height = 'auto'
    const { height } = sourcewrapperRef.value.getBoundingClientRect()
    sourcewrapperRef.value.style.height = 0

    //设置过渡
    sourcewrapperRef.value.style.transition = 'height 0.5s'
    sourcewrapperRef.value.offsetHeight;//reflow
    //再次设置高度
    sourcewrapperRef.value.style.height = height + 'px'

    isSourceOpen.value = true

  } else {

    sourcewrapperRef.value.style.height = 0

    isSourceOpen.value = false

  }


}


//watch监听单个数据,注意：使用watch的时候响应式数据不需要.value
watch(isFullscreen, (newVal, oldValue) => {
  if (newVal === true) {
    lock()
    // document.body.style.setProperty('overflow', 'hidden')
  } else {
    // document.body.style.setProperty('overflow', null)
    unlock()
  }
})

</script>


<template>

  <div ref="tooltipRef" role="tooltip" id="tooltip">
    <div class="content">My tooltip</div>
    <div ref="arrowRef" id="arrow"></div>
  </div>

  <div :class="{ 'fullscreen': isFullscreen }" class="demo-preview">

    <div class="header">
      <div class="left">{{ title }}</div>
      <div class="right">

        <div class="action-wrapper" @click="refresh">

          <svg viewBox="0 0 24 24">
            <title>刷新</title>
            <path fill="currentColor"
              d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
          </svg>

        </div>

        <div class="action-wrapper" ref="copybtnRef" @click="copy">
          <svg viewBox="0 0 24 24">
            <title>复制源码</title>
            <path fill="currentColor"
              d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
          </svg>
        </div>

        <div class="action-wrapper" @click="isFullscreen = !isFullscreen">

          <svg viewBox="0 0 24 24" v-if="isFullscreen">
            <title>退出全屏</title>
            <path fill="currentColor"
              d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
          </svg>

          <svg viewBox="0 0 24 24" v-else>
            <title>全屏显示</title>
            <path fill="currentColor"
              d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
          </svg>

        </div>

        <div class="action-wrapper" @click="openProject">
          <svg viewBox="0 0 24 24">
            <title>在stackblitz中打开</title>
            <path fill="currentColor" d="M11 15H6L13 1V9H18L11 23V15Z" />
          </svg>
        </div>

        <div class="action-wrapper" @click="source">


          <svg viewBox="0 0 24 24" v-if="isSourceOpen">
            <title>折叠</title>
            <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
          </svg>

          <svg viewBox="0 0 24 24" v-else>
            <title>源码</title>
            <path fill="currentColor"
              d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
          </svg>



        </div>

      </div>
    </div>

    <div class="content">
      <div class="source-wrapper" ref="sourcewrapperRef">
        <pre class="language-html"><code ref="sourceRef"></code></pre>
      </div>
      <iframe v-iframe-lazy="withBase(`/${src}`)" ref="iframeRef"></iframe>
    </div>
  </div>





</template>

<style scoped lang="scss">
#tooltip {
  display: none;
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  // 浮动
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;

  #arrow {
    position: absolute;
    background: #222;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }

}

.demo-preview {
  border: 1px solid #e7e7e7;
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


    .header {
      position: absolute;
      left: 0;
      right: 0;
    }

    .content {
      margin-top: 38px;
      height: 100%;
      overflow: auto;

      iframe {
        height: 100%;
      }
    }
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


  .content {

    .source-wrapper {

      height: 0;
      overflow: hidden;

      pre {
        margin: 0;
        border-radius: 0;
        height: 100%;
      }
    }

    iframe {
      display: block;
      border: none;
      width: 100%;
      height: 500px;
    }
  }
}
</style>
