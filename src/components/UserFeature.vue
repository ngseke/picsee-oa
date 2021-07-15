<template lang='pug'>
div
  Title 登入身份
  div.text-blue-700(v-if='feature') {{ feature }}
  div.text-gray-400(v-else) -

  span.text-sm
    span(v-if='isAdmin') 👑
    span(v-else-if='isUnderLimit') 😊
    span.font-bold.text-red-700(v-else) 😡 已達上限
    span.mx-4 -
    span.font-mono quota: ({{ histories.length }} / {{ limit }})
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Title from '@/components/Title.vue'

import useGenerateHistory from '@/composables/use-generate-history'

export default defineComponent({
  components: {
    Title
  },
  setup () {
    return {
      ...useGenerateHistory()
    }
  }
})
</script>
