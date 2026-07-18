<script setup lang="ts">
const resource = useResourceState()
const loading = useLoadingState()

definePageMeta({
  layout: 'resource'
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-var(--spacing)*16-1px)] p-4 flex flex-col gap-4 items-center justify-center"
  >
    <template v-if="loading">
      <Icon
        name="i-ph:spinner-ball"
        class="animate-spin size-10 text-primary"
      />

      <span class="text-primary font-semibold">LOADING . . .</span>
    </template>

    <template v-else-if="resource">
      <div class="container grow w-full flex flex-col gap-4">
        <ResourceGlossaryEditor
          v-if="resource.kind === 'glossary'"
          v-model="resource"
        />
      </div>
    </template>
  </div>
</template>
