<template lang='pug'>
.container.mx-auto.py-4
  .space-y-4
    router-link(:to='{ name: "Home", query: { feature: $route.query.feature } }') &lt; Home

    UserFeature

    div
      Title 轉換結果
      a(:href='picseeUrl' target='_blank') {{ picseeUrl }}

    div
      Title 歷史記錄
      ul.divide-y
        li.flex.-mx-2(v-for='{ url, picseeUrl, timestamp } in histories')
          div.truncate(class='px-2 w-1/4') {{ url }}
          div(class='px-2 ') →
          div.truncate.text-blue-700(class='px-2 flex-1') {{ picseeUrl }}
          div.truncate.text-gray-500(class='px-2 w-1/3') {{ Date(timestamp) }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import useGenerateHistory from '@/composables/use-generate-history'

import Title from '@/components/Title.vue'
import UserFeature from '@/components/UserFeature.vue'

export default defineComponent({
  components: {
    Title,
    UserFeature
  },
  setup () {
    const route = useRoute()
    const picseeUrl = computed(() => route.query.picseeUrl)

    const { histories } = useGenerateHistory()

    return {
      picseeUrl,
      histories
    }
  }
})
</script>
