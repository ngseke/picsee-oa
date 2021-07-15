<template lang='pug'>
.container.mx-auto.py-4
  .space-y-4
    router-link(:to='{ name: "Result", query: { feature: $route.query.feature } }') Result &gt;

    UserFeature

    form
      Title 產生短網址

      span.font-bold.text-red-700(v-if='!isUnderLimit') 已超過限制！
      span.text-gray-500(v-else-if='isSubmitting') 送出中...
      .space-x-4(v-else)
        input.border.border-gray-600.rounded.p-2(v-model='url' :disabled='isSubmitting')
        button.border.border-gray-600.rounded.p-2(type='button' @click='submit' :disabled='isSubmitting') 送出

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { generate } from '@/modules/generate'
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
    const router = useRouter()

    const url = ref('https://google.com')
    const isSubmitting = ref(false)

    const { pushHistory, isUnderLimit } = useGenerateHistory()

    const submit = async () => {
      isSubmitting.value = true
      const picseeUrl = await generate(url.value)
      isSubmitting.value = false

      pushHistory({
        url: url.value,
        timestamp: 123,
        picseeUrl
      })

      router.push({
        name: 'Result',
        query: {
          ...route.query,
          picseeUrl
        }
      })
    }

    return {
      isUnderLimit,
      url,
      isSubmitting,
      submit
    }
  }
})
</script>
