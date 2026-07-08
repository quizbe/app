<script setup lang="ts">
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
const editing = useEditingState()

onMounted(async () => {
  if (resource.value !== null) return (loading.value = false)
  const data = await useResourceStorage().get(route.params.resourceid as string)
  const { success, output } = safeParse(RESOURCE, data)
  if (!success) return router.push('/')
  resource.value = output
  loading.value = false
})

watch([resource, loading], ([res, loadin]) => {
  if (!res || loadin) return
  useResourceStorage().set(res.id, res)
})
</script>

<template>
  <Head>
    <Title> {{ !!resource ? resource.title + ' - ' : '' }}Quizbe </Title>
  </Head>

  <nav
    class="sticky w-full top-0 flex gap-4 p-4 z-10 bg-surface-base/75 backdrop-blur border-b border-surface-accented"
  >
    <UButton
      variant="subtle"
      color="error"
      icon="i-ph:caret-left"
      label="Exit"
      href="/{resource.current?.id}"
    />

    <span class="flex-1"></span>

    <UModal
      trigger="{ variant: 'outline', color: 'surface', icon: 'i-ph:gear', label: 'Settings' }"
      title="Settings"
    >
      {#if resource.current}
      <USelect
        v-if="resource"
        v-model="resource.storage"
        :items="Object.keys(STORAGE_OPTION)"
        :ui="{ content: 'z-9999' }"
      />
      {/if}
    </UModal>
  </nav>

  <slot />
</template>
