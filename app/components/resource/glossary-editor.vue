<script lang="ts">
import type { Glossary } from '~/composables/schemas'
import UndrawNoData from '../undraw-no-data.vue'
import { uid } from 'uid/secure'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export type MediaSelector = {
  kind: 'term' | 'defi'
  index: number
  tabs: string
  stored: Record<string, string>
  fetching_stored: boolean
  files: File[]
}
</script>

<script setup lang="ts">
const breakpoints = useBreakpoints(breakpointsTailwind)
const is_small_screen = breakpoints.smaller('sm')

const glossary = defineModel<Glossary>({ required: true })
const media_selector = reactive<MediaSelector>({
  kind: 'defi',
  index: -1,
  tabs: '0',
  stored: {},
  fetching_stored: true,
  files: []
})

async function fetchStoredMedia() {
  const storage = useMediaStorage()

  for (const key of await storage.keys()) {
    if (media_selector.stored[key]) continue
    media_selector.stored[key] = (await storage.get(key))!
  }

  media_selector.fetching_stored = false
}

async function uploadMedia() {
  for (const file of media_selector.files) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (!reader.result) return
      const id = uid()
      const src = reader.result.toString()

      media_selector.stored[id] = src
      useMediaStorage().set(id, src)
    }
  }

  media_selector.files = []
  media_selector.tabs = '0'
}

onMounted(fetchStoredMedia)

effect(() => {
  console.log(media_selector)
})
</script>

<template>
  <ResourceGlossaryTerm
    v-for="index of glossary.terms.length"
    :key="index - 1"
    v-model="glossary.terms[index - 1]!"
    v-model:selector="media_selector"
    :index="index - 1"
  />

  <div
    v-if="!glossary.terms.length"
    class="mx-auto flex flex-col h-42 gap-4 items-center mb-px"
  >
    <UndrawNoData class="size-32" />

    <span>You have 0 terms.</span>
  </div>

  <div class="flex justify-center">
    <UButton
      label="Create term"
      icon="i-ph:plus"
      variant="subtle"
      @click="
        () => {
          glossary.terms.push({
            categories: [],
            definition: {
              media: '',
              text: ''
            },
            media: '',
            text: ''
          })
        }
      "
    />
  </div>
  <!-- @enter="fetchStoredMedia" -->

  <UModal
    :open="media_selector.index > -1"
    :close="false"
    :ui="{
      content: 'max-w-2xl'
    }"
    @update:open="() => (media_selector.index = -1)"
    @enter="fetchStoredMedia"
    @after:leave="
      () => {
        media_selector.tabs = '0'
        media_selector.files = []
        media_selector.fetching_stored = true
      }
    "
  >
    <template #body>
      <UTabs
        v-model="media_selector.tabs"
        :items="[
          { label: 'All Media', icon: 'i-ph:paperclip', slot: 'all' },
          { label: 'Images', icon: 'i-ph:image', slot: 'images' },
          { label: 'Videos', icon: 'i-ph:film-strip', slot: 'video' },
          { label: 'Audio', icon: 'i-ph:waveform', slot: 'audio' },
          { label: 'Upload', icon: 'i-ph:upload', slot: 'upload' }
        ]"
      >
        <template #default="{ item }">
          <span v-if="is_small_screen"></span>
          <span v-else> {{ item.label }}</span>
        </template>

        <template #all>
          <div
            v-if="!media_selector.fetching_stored"
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 min-h-46"
          >
            <div
              v-for="[key, media] of Object.entries(media_selector.stored)"
              :key="key"
              role="none"
              :class="[
                'aspect-square grid place-items-center group hover:bg-primary/15 bg-accented sm:bg-transparent transition relative rounded sm:ring-2 ring-transparent hover:ring-primary'
              ]"
              @click.self="
                () => {
                  if (media_selector.kind === 'term')
                    glossary.terms[media_selector.index]!.media = key
                  else
                    glossary.terms[media_selector.index]!.definition.media = key

                  media_selector.index = -1
                }
              "
            >
              <img :src="media" :alt="key" class="pointer-events-none" />

              <button
                class="bg-inverted border border-default text-inverted rounded-full size-5 grid place-items-center group-hover:opacity-100 sm:opacity-0 transition absolute left-full top-0 -translate-1/2"
                @click="
                  () => {
                    useMediaStorage().del(key)
                    delete media_selector.stored[key]
                  }
                "
              >
                <UIcon name="i-ph:x" class="size-4" />
              </button>
            </div>
          </div>

          <div v-else class="h-48 flex flex-col items-center justify-center">
            <UIcon name="i-ph:spinner-ball" class="animate-spin" />

            Loading media. . .
          </div>
        </template>

        <template #upload>
          <UFileUpload
            v-model="media_selector.files"
            icon="i-ph:paperclip"
            label="Drop your media here"
            description="SVG, PNG, JPG, GIF, WAV, MP3, MP4, or WEBM"
            layout="grid"
            multiple
            :interactive="false"
          >
            <template #actions="{ open }">
              <UButton
                label="Select images"
                icon="i-ph:upload"
                color="neutral"
                variant="outline"
                @click="open()"
              />
            </template>

            <template #files-top="{ open, files }">
              <div
                v-if="files?.length"
                class="mb-2 flex items-center justify-between"
              >
                <p class="font-bold text-xs">Files ({{ files?.length }})</p>

                <UButton
                  icon="i-ph:plus"
                  label="Add more"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  class="-my-2"
                  @click="open()"
                />
              </div>
            </template>

            <template #files-bottom="{ files }">
              <div class="mt-4">
                <UButton
                  v-if="files?.length"
                  label="Upload selected"
                  color="neutral"
                  @click="uploadMedia"
                />
              </div>
            </template>
          </UFileUpload>
        </template>
      </UTabs>
    </template>
  </UModal>
</template>
