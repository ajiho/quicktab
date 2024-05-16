<script setup>
import DefaultTheme from 'vitepress/theme'
import {inBrowser, useData} from 'vitepress'

const {page} = useData()

const inIframe = inBrowser && window.self !== window.top
</script>

<template>
  <div v-if="page.isNotFound && inIframe">404</div>
  <DefaultTheme.Layout v-else/>
</template>
