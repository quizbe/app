<script setup lang="ts">
import type { Glossary } from '~/composables/schemas'

const resource = useResourceState()
const loading = useLoadingState()
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
      <div class="container grow-w-full flex flex-col gap-4">
        <GlossaryEditor
          v-if="resource.kind === 'glossary'"
          :glossary="resource"
          @update:glossary="(v: Glossary) => (resource = v)"
        />
      </div>
    </template>
  </div>
</template>
