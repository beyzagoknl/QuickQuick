<template>
<label class="block uppercase tracking-wide text-gray-900 text-xs font-bold">
</label>
      <button
            class="mt-2 inline-block bg-green-500 hover:bg-green-700 font-bold text-white no-underline px-4 py-3"
            :class="$emit('showModal', true)"
            
            >{{btnText}}
          </button>
</template>

<script setup>
import { defineProps,toRefs} from "vue";

const props = defineProps({btnText:String,label:String});

// eslint-disable-next-line no-unused-vars
const { btnText,label} = toRefs(props);



</script>
