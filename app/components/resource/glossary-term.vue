<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import type { Glossary } from '~/composables/schemas'

const term = defineModel<Glossary['terms'][0]>('term', { required: true })
const definition_textarea = useTemplateRef('definition_textarea')
const text_textarea = useTemplateRef('text_textarea')

useTextareaAutosize({
  element: definition_textarea,
  input: term.value.definition.text
})
useTextareaAutosize({ element: text_textarea, input: term.value.text })
</script>

<template>
  <tr>
    <td class="">
      <div class="relative">
        <textarea
          ref="text_textarea"
          v-model="term.text"
          placeholder="Enter term"
          :class="[
            'w-full outline-none h-16 bg-muted rounded p-4 resize-none',
            term.media ? '' : ''
          ]"
        ></textarea>

        <UModal></UModal>
      </div>
    </td>

    <td class="">
      <textarea
        ref="definition_textarea"
        v-model="term.definition.text"
        placeholder="Enter definition"
        class="w-full outline-none h-16 bg-muted rounded p-4 resize-none"
      />
    </td>
  </tr>

  <!-- <MediaSelector :open="true" /> -->
</template>
