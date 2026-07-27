<script setup lang="ts">
import type { Glossary } from '~/composables/schemas'
import type { MediaSelector } from './glossary-editor.vue'

const resource = useResourceState()
const term = defineModel<Glossary['terms'][number]>({ required: true })
const selector = defineModel<MediaSelector>('selector', {
  required: true
})
const edit_categories = ref(false)

const media = computed(() => selector.value.stored[term.value.media])

defineProps<{ index: number }>()
</script>

<template>
  <UCard
    variant="outline"
    :ui="{
      root: 'group/card',
      body: 'flex flex-col gap-4 items-center'
    }"
  >
    <div class="flex gap-2 w-full">
      <span class="grow font-semibold">
        {{ index > 9 ? index + 1 : `0${index + 1}` }}
      </span>

      <UTooltip text="Copy">
        <UButton
          icon="i-ph:copy"
          color="neutral"
          variant="ghost"
          size="sm"
          :ui="{ base: 'group-hover/card:opacity-100 sm:opacity-0 transition' }"
          @click="
            () => {
              if (resource?.kind !== 'glossary') return
              resource.terms.splice(index - 1, 0, term)
            }
          "
        />
      </UTooltip>

      <UTooltip text="Edit Categories">
        <UButton
          icon="i-ph:tag"
          color="neutral"
          variant="ghost"
          size="sm"
          :ui="{ base: 'group-hover/card:opacity-100 sm:opacity-0 transition' }"
          @click="() => void (edit_categories = true)"
        />
      </UTooltip>

      <UTooltip text="Delete">
        <UButton
          icon="i-ph:trash"
          color="error"
          variant="ghost"
          size="sm"
          :ui="{ base: 'group-hover/card:opacity-100 sm:opacity-0 transition' }"
          @click="
            () => {
              if (resource?.kind !== 'glossary') return
              resource.terms.splice(index - 1, 1)
            }
          "
        />
      </UTooltip>

      <!-- <UDropdownMenu
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
            icon: 'i-ph:tag',
            label: 'Categories',
            onSelect: () => (edit_categories = true)
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
      </UDropdownMenu> -->
    </div>

    <div class="flex w-full gap-4">
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
                }
              "
            />
          </template>
        </UTextarea>
      </div>

      <div
        v-if="media"
        class="group relative h-18"
        :style="{ aspectRatio: `${media.width || 1}/${media.height || 1}` }"
      >
        <img
          v-if="media.type.startsWith('image')"
          :src="media.data"
          :alt="term.media"
          class="h-18 rounded"
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
    </div>
  </UCard>

  <UModal v-model:open="edit_categories" title="Edit Categories">
    <template #body>
      <UInputTags
        v-model="term.categories"
        variant="soft"
        placeholder="Enter categories"
        size="xl"
        class="w-full"
      />
    </template>
  </UModal>
</template>
