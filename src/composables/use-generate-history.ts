import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

import History from '@/interfaces/History'

export default function () {
  const route = useRoute()

  /** 當前身分（來自於 URL 參數） */
  const feature = computed(() => route.query.feature)

  /** 是否為 admin */
  const isAdmin = computed(() => feature.value === 'admin')

  /** 上限 */
  const limit = computed(() => isAdmin.value ? Infinity : 3)

  /** 是否未達到限制 */
  const isUnderLimit = computed(() =>
    histories.value.length < limit.value
  )

  /** 根據當前身分得到的 localStorage 的 key，用來模擬各登入者的資料庫 */
  const key = computed(() =>
    feature.value
      ? `history-${feature.value}` // 有身分
      : 'history' // 沒有身分（預設）
  )

  /** 儲存在本地的轉換記錄 */
  const histories = useLocalStorage<History[]>(key.value, [])

  /** 新增一筆紀錄 */
  const pushHistory = (history: History) => {
    histories.value.push(history)
  }

  return {
    feature,
    isAdmin,
    limit,
    isUnderLimit,
    histories,
    pushHistory
  }
}
