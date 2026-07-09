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
// const editing = useEditingState()

onMounted(async () => {
  if (resource.value !== null) return (loading.value = false)
  const data = await useResourceStorage().get(route.params.resourceid as string)
  const { success, output } = safeParse(RESOURCE, data)
  if (!success) return router.push('/')
  resource.value = output
  loading.value = false
})

watch([resource, loading], () => {
  if (!resource.value || loading.value) return
  console.log(resource.value)
  useResourceStorage().set(resource.value.id, resource.value)
})
</script>

<template>
  <Head>
    <Title> {{ !!resource ? resource.title + ' - ' : '' }}Quizbe </Title>
  </Head>

  <nav
    class="sticky w-full top-0 flex gap-4 p-4 z-10 bg-base/75 backdrop-blur border-b border-accented"
  >
    <UButton
      variant="subtle"
      color="error"
      icon="i-ph:caret-left"
      label="Exit"
      href="/{resource.current?.id}"
    />

    <span class="flex-1"></span>

    <UModal title="Settings">
      <UButton
        label="Settings"
        variant="outline"
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
