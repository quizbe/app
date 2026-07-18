<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { safeParse } from 'valibot'
import { RESOURCE } from '~/composables/schemas'
import { cloneDeep, flattenObject, isEqual } from 'es-toolkit'
import { diffChars } from 'diff'

const STORAGE_OPTION = {
  localfirst: 'Local First',
  localonly: 'Local Only',
  serverfirst: 'Server First',
  serveronly: 'Server Only'
}

const route = useRoute()
const router = useRouter()
const resource = useResourceState()
const loading = useLoadingState()
// const editing = useEditingState()
const changes = ref<'unchange' | 'unsaved' | 'saved'>('unchange')

onMounted(async () => {
  if (resource.value !== null) return (loading.value = false)
  const data = await useResourceStorage().get(route.params.resourceid as string)
  const { success, output } = safeParse(RESOURCE, data)
  if (!success) return router.push('/')
  resource.value = output
  loading.value = false
})

watchDebounced(
  resource,
  async (newval, oldval) => {
    if (
      !newval ||
      !oldval ||
      loading.value ||
      JSON.stringify(newval) === JSON.stringify(oldval)
    ) {
      return
    }
    newval.updated = Date.now()
    await useResourceStorage().set(newval.id, newval)
    changes.value = 'saved'
  },
  {
    deep: true,
    debounce: 2500
  }
)

watchDebounced(resource, () => (changes.value = 'unchange'), {
  deep: true,
  debounce: 3636
})
watch(
  resource,
  (newval, oldval) => {
    const newv = flattenObject(cloneDeep({ ...newval }))
    const oldv = flattenObject(cloneDeep({ ...oldval }))

    console.log(newv, oldv)
    if (!oldval || loading.value || isEqual(newval, oldval)) return
    console.log('Unsaved')
    changes.value = 'unsaved'
  },
  { deep: true }
)
</script>

<template>
  <Head>
    <Title> {{ !!resource ? resource.title + ' - ' : '' }}Quizbe </Title>
  </Head>

  <nav
    class="sticky w-full top-0 flex items-center gap-4 p-4 z-10 bg-base/75 backdrop-blur border-b border-accented"
  >
    <UButton
      v-if="resource"
      variant="subtle"
      color="error"
      icon="i-ph:caret-left"
      label="Exit"
      :href="`/${resource.id}`"
    />

    <span
      v-if="changes !== 'unchange'"
      :class="[
        'text-sm',
        changes === 'saved' ? 'text-primary' : 'text-neutral/25'
      ]"
    >
      {{ changes === 'unsaved' ? 'Unsaved changes' : 'Saved' }}
    </span>

    <span class="flex-1"></span>

    <UModal title="Settings">
      <UButton
        label="Settings"
        variant="soft"
        color="neutral"
        icon="i-ph:gear"
      />

      <template #body>
        <USelect
          v-if="resource"
          v-model="resource.storage"
          :items="Object.keys(STORAGE_OPTION)"
        />
      </template>
    </UModal>
  </nav>

  <slot />
</template>
