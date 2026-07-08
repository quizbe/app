<script setup lang="ts">
import type { Glossary } from '~/composables/schemas'
import UndrawNoData from '../undraw-no-data.vue'

const glossary = defineModel<Glossary>({ required: true })
</script>

<template>
  <UCard
    v-for="index of glossary.terms.length"
    :key="index"
    variant="outline"
    :ui="{ root: 'group' }"
  >
    <table
      class="w-full text-left border-separate border-spacing-2 border-spacing-x-4"
    >
      <thead>
        <tr>
          <th class="font-semibold text-md">{{ index + 1 }}. TERM</th>
          <th>
            <div class="flex items-center">
              <span class="font-semibold text-md grow">DEFINITION</span>

              <div
                class="flex gap-2 group-hover:opacity-100 opacity-0 transition"
              >
                <Button
                  icon="i-ph:trash"
                  color="surface"
                  variant="ghost"
                  @click="() => glossary.terms.splice(index, 1)"
                />

                <Button
                  icon="i-ph:copy"
                  color="surface"
                  variant="ghost"
                  @click="
                    () => {
                      if (!glossary.terms[index]) return
                      glossary.terms.splice(index, 0, glossary.terms[index])
                    }
                  "
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <GlossaryTerm bind:term="glossary.terms[idx]" />
      </tbody>
    </table>
  </UCard>

  <div
    v-if="glossary.terms.length"
    class="mx-auto flex flex-col h-42 gap-4 items-center mb-px"
  >
    <img class="size-32" :src="UndrawNoData" alt="No data" />

    <span>You have 0 terms.</span>
  </div>

  <div class="flex justify-center">
    <Button
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
