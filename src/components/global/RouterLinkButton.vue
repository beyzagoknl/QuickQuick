<template>
  <router-link
    :class="[
      'float-right',
      'bg-transparent',
      'text-gray-900',
      'font-semibold',
      'hover:text-white',
      'py-2',
      'px-4',
      'border',
      'hover:border-transparent',
      'rounded',
      color ? `hover:bg-${color}-500 border-${color}-500` : '',
      disabled ? 'cursor-not-allowed opacity-50' : '', 
    ]"
    :to="url"
  >
    {{ btnText }}
  </router-link>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  btnText: String,
  url: { type: String, default: '' },
  color: String,
 disabled: Boolean,
})
const { btnText, url, color,disabled  } = toRefs(props)
</script>
