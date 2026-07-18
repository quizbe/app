<script setup lang="ts">
import type { Glossary } from '~/composables/schemas'
import type { MediaSelector } from './glossary-editor.vue'
import { imageMeta } from 'image-meta'
import { atob } from 'js-base64'

const resource = useResourceState()
const term = defineModel<Glossary['terms'][number]>({ required: true })
const selector = defineModel<MediaSelector>('selector', {
  required: true
})

defineProps<{ index: number }>()

effect(() => {
  const source = selector.value.stored[term.value.media]
  console.log(term.value.media, source)
})
</script>

<template>
  <UCard
    variant="outline"
    :ui="{
      root: 'group/card',
      body: 'flex flex-col sm:flex-row gap-4 lg:gap-6 items-center'
    }"
  >
    <div
      class="flex flex-row sm:flex-col justify-between gap-2 w-full sm:w-fit"
    >
      <span class="aspect-square grid place-items-center font-semibold">
        {{ index > 9 ? index + 1 : `0${index + 1}` }}
      </span>

      <UDropdownMenu
        :items="[
          {
            icon: 'i-ph:copy',
            label: 'Copy',
            onSelect() {
              if (resource?.kind !== 'glossary') return
              resource.terms.splice(index - 1, 0, term)
            }
          },
          {
            icon: 'i-ph:trash',
            label: 'Delete',
            color: 'error',
            onSelect() {
              if (resource?.kind !== 'glossary') return
              resource.terms.splice(index - 1, 1)
            }
          }
        ]"
      >
        <UButton
          icon="i-ph:dots-three"
          color="neutral"
          variant="ghost"
          :ui="{ base: 'group-hover/card:opacity-100 sm:opacity-0 transition' }"
        />
      </UDropdownMenu>
    </div>

    <div class="flex grow w-full">
      <UTextarea
        v-model="term.text"
        placeholder="Enter term"
        variant="ghost"
        :ui="{ root: 'grow group/textarea', base: 'resize-none' }"
      >
        <template #trailing>
          <UButton
            v-if="!term.media"
            icon="i-ph:paperclip"
            size="sm"
            variant="subtle"
            :ui="{
              base: 'group-hover/textarea:opacity-100 sm:opacity-0 transition'
            }"
            @click="
              () => {
                selector.index = index
                selector.kind = 'term'
                console.log(selector, index)
              }
            "
          />
        </template>
      </UTextarea>
    </div>

    <div v-if="selector.stored[term.media]" class="group relative">
      <img
        v-if="selector.stored[term.media]?.startsWith('data:image/')"
        :src="selector.stored[term.media]"
        :alt="term.media"
        class="h-18 rounded"
        :style="{
          // aspectRatio: imageMeta().height
        }"
      />

      <button
        class="bg-inverted border border-default text-inverted rounded-full size-5 grid place-items-center group-hover:opacity-100 sm:opacity-0 transition absolute left-full top-0 -translate-1/2"
        @click="() => (term.media = '')"
      >
        <UIcon name="i-ph:x" class="size-4" />
      </button>
    </div>

    <USeparator orientation="vertical" class="h-16 hidden sm:block" />
    <USeparator orientation="horizontal" class="sm:hidden" />

    <div class="flex grow w-full">
      <UTextarea
        v-model="term.definition.text"
        placeholder="Enter definition"
        variant="ghost"
        :ui="{ root: 'grow group/textarea', base: 'resize-none' }"
      >
        <template #trailing>
          <UButton
            icon="i-ph:paperclip"
            size="sm"
            variant="subtle"
            :ui="{
              base: 'group-hover/textarea:opacity-100 sm:opacity-0 transition'
            }"
            @click="
              () => {
                selector.index = index
                selector.kind = 'defi'
              }
            "
          />
        </template>
      </UTextarea>
    </div>
  </UCard>
</template>
