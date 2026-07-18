<script setup lang="ts">
import type { Glossary } from '~/composables/schemas'
import { btoa, toUint8Array } from 'js-base64'
import { uid } from 'uid/secure'

const glossary = defineModel<Glossary>({ required: true })
const media_selector = reactive({
  index: -1,
  kind: 'def' as 'def' | 'term',
  files: [] as File[],
  tab: '0'
})
const stored_media = ref<[string, string][]>([])
const fetching_stored_media = ref(true)

async function fetchStoredMedia() {
  const new_media: [string, string][] = []

  for (const key of await useMediaStorage().keys()) {
    const media = await useMediaStorage().get(key)
    if (!media) continue
    new_media.push([key, media])
  }

  stored_media.value = new_media
  fetching_stored_media.value = false
}
</script>

<template>
  <UCard
    v-for="index in glossary.terms.length"
    :key="index"
    variant="outline"
    :ui="{ root: 'group/card', body: 'flex gap-4 lg:gap-6' }"
  >
    <div class="flex flex-col gap-2">
      <span class="size-8 grid place-items-center font-semibold">
        {{ index < 10 ? `0${index}` : index }}
      </span>

      <div
        class="flex flex-col gap-2 group-hover/card:opacity-100 opacity-0 transition"
      >
        <UButton
          icon="i-ph:trash"
          color="neutral"
          variant="ghost"
          @click="
            () => {
              glossary.terms.splice(index - 1, 1)
            }
          "
        />

        <UButton
          icon="i-ph:copy"
          color="neutral"
          variant="ghost"
          @click="
            () => {
              if (!glossary.terms[index - 1]) return

              glossary.terms.splice(index, 0, glossary.terms[index - 1]!)
            }
          "
        />
      </div>
    </div>

    <UTextarea
      v-model="glossary.terms[index - 1]!.text"
      variant="ghost"
      autoresize
      :rows="5"
      :ui="{ root: 'grow group/textarea' }"
      placeholder="Enter term"
    >
      <template #trailing>
        <UButton
          v-if="!glossary.terms[index - 1]!.media.length"
          icon="i-ph:paperclip"
          variant="ghost"
          :ui="{ base: 'group-hover/textarea:opacity-100 opacity-0' }"
          @click="
            () => {
              media_selector.index = index - 1
              media_selector.kind = 'term'
            }
          "
        />
      </template>
    </UTextarea>

    <UTextarea
      v-model="glossary.terms[index - 1]!.definition.text"
      variant="ghost"
      autoresize
      :rows="5"
      :ui="{ root: 'grow group/textarea' }"
      placeholder="Enter definition"
    >
      <template #trailing>
        <UButton
          v-if="!glossary.terms[index - 1]!.definition.media.length"
          icon="i-ph:paperclip"
          variant="ghost"
          :ui="{ base: 'group-hover/textarea:opacity-100 opacity-0' }"
          @click="
            () => {
              media_selector.index = index - 1
              media_selector.kind = 'def'
            }
          "
        />
      </template>
    </UTextarea>
  </UCard>

  <UModal
    :open="media_selector.index > -1"
    :close="false"
    :ui="{ content: 'min-h-88 max-h-128' }"
    @update:open="media_selector.index = -1"
    @enter="fetchStoredMedia"
  >
    <template #body>
      <UTabs
        v-model="media_selector.tab"
        :items="[
          { label: 'Medias', icon: 'i-ph:paperclip', slot: 'medias' },
          { label: 'Upload', icon: 'i-ph:upload', slot: 'upload' }
        ]"
      >
        <template #medias>
          <div
            v-if="fetching_stored_media"
            class="h-64 flex flex-col gap-2 justify-center items-center text-primary"
          >
            <UIcon name="i-ph:spinner" class="animate-spin size-8" />

            <span>Loading. . .</span>
          </div>

          <div class="grid lg:grid-cols-3 gap-4 mt-4">
            <div
              v-for="[key, media] of stored_media"
              :key="key"
              class="aspect-square group hover:bg-muted transition rounded relative"
            >
              <img :src="media" :alt="key" />

              <UButton
                icon="i-ph:x"
                color="error"
                variant="soft"
                size="xs"
                :ui="{
                  base: 'rounded-full group-hover:opacity-100 opacity-0 transition absolute top-0 left-full -translate-1/2'
                }"
                @click="
                  async () => {
                    useMediaStorage().del(key)
                    fetchStoredMedia()
                  }
                "
              />
            </div>
          </div>
        </template>

        <template #upload>
          <UFileUpload
            v-model="media_selector.files"
            label="Drop your media here"
            description="SVG, PNG, JPG, GIF, WAV, MP3, M4A, MP4, or WEBM"
            class="mt-4 min-h-48"
            accept=".svg,.png,.jpg,.gif,.wav,.mp3,.m4a,.mp4,.webm"
            :multiple="true"
            :interactive="false"
            variant="area"
          >
            <template #actions="{ open }">
              <UButton
                label="Select media"
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
                <p class="font-bold">Files ({{ files?.length }})</p>

                <UButton
                  icon="i-ph:plus"
                  label="Add more"
                  color="neutral"
                  variant="outline"
                  class="-my-2"
                  @click="open()"
                />
              </div>
            </template>
          </UFileUpload>

          <UButton
            :disabled="!media_selector.files.length"
            type="submit"
            label="Submit"
            class="mt-4"
            @click="
              async () => {
                for (const file of media_selector.files) {
                  const b64 = `data:${file.type};base64,${btoa(toUint8Array(await file.text()).join())}`
                  useMediaStorage().set(uid(), b64)
                }

                fetchStoredMedia()
                media_selector.files = []
                media_selector.tab = '0'
              }
            "
          />
        </template>
      </UTabs>
    </template>
  </UModal>

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
</template>
