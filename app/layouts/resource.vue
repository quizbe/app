<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { safeParse } from 'valibot'
import { RESOURCE } from '~/composables/schemas'

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
const changes_state = ref<'unchange' | 'unsaved' | 'saved'>('unchange')

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
  async () => {
    if (!resource.value || loading.value) return
    if (changes_state.value !== 'unsaved') return
    await useResourceStorage().set(resource.value.id, resource.value)
    changes_state.value = 'saved'
  },
  {
    debounce: 2500,
    deep: true
  }
)

watchDebounced(
  resource,
  () => {
    if (changes_state.value !== 'saved') return
    changes_state.value = 'unchange'
  },
  {
    debounce: 3636,
    deep: true
  }
)

watchDebounced(
  resource,
  (_, previous) => {
    if (previous === null) return
    changes_state.value = 'unsaved'
  },
  {
    deep: true
  }
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
      :href="`/${resource?.id}`"
    />

    <span
      :class="[
        'transition text-sm',
        changes_state === 'unchange'
          ? 'opacity-0'
          : changes_state === 'unsaved'
            ? 'text-muted'
            : 'text-primary'
      ]"
    >
      {{ changes_state === 'unsaved' ? 'Unsaved changes' : 'Saved' }}
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
