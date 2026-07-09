<script setup lang="ts">
import dayjs from 'dayjs'
import relative_time from 'dayjs/plugin/relativeTime'
import { createResource } from '~/composables/resources'
import type { Resource } from '~/composables/schemas'

dayjs.extend(relative_time)

const KINDS: {
  kind: Resource['kind']
  text: string
  icon: string
  class: string
}[] = [
  {
    kind: 'quiz',
    text: 'Interactive questions',
    icon: 'i-ph:list-checks',
    class: 'bg-green-600'
  },
  {
    kind: 'glossary',
    text: 'Terms and their definition',
    icon: 'i-ph:cards-three-fill',
    class: 'bg-red-600'
  }
]
const resources = ref<Resource[]>([])
const loading = ref(true)
const router = useRouter()

const resolveResourceSubtext = computed(() => {
  return (resource: Resource) => {
    const is_glossary = resource.kind === 'glossary'

    const amount = is_glossary
      ? `${resource.terms.length} terms`
      : `${resource.questions.length} questions`

    const timestamp = `${resource.updated === resource.created ? 'Created' : 'Updated'} ${dayjs(resource.updated).fromNow()}`

    return `${amount} •  ${timestamp}`
  }
})

onMounted(async () => {
  for (const key of await useResourceStorage().getKeys()) {
    const resource = await useResourceStorage().get(key)
    if (!resource || resources.value.find((v) => v.id === resource.id)) continue
    resources.value.push(resource)
  }

  loading.value = false
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-var(--spacing)*16)] p-4 flex flex-col gap-4 items-center justify-center"
  >
    <template v-if="loading">
      <UIcon
        name="i-ph:spinner-ball"
        class="animate-spin size-10 text-primary"
      />

      <span class="text-primary font-semibold">LOADING . . .</span>
    </template>

    <template v-else-if="resources.length">
      <div class="grow w-full container space-y-4">
        <header class="flex gap-4 justify-between">
          <h1 class="text-2xl font-semibold">Resources</h1>

          <UModal :close="false">
            <UButton label="Create" icon="i-ph:plus" />

            <template #body> Hello </template>
          </UModal>
        </header>

        <div class="grid md:grid-cols-2 xl:grid-cols-3">
          <a
            v-for="resource in resources"
            :key="resource.id"
            class="p-4 border rounded-md border-accented hover:bg-muted transition flex items-center gap-4"
            :href="`/${resource.id}`"
          >
            <img
              class="size-12 rounded border border-accented"
              :src="`https://api.dicebear.com/10.x/shapes/svg?seed=${resource.id}`"
              :alt="resource.id"
            />

            <div class="grow grid grid-rows-2">
              <span class="font-semibold flex items-center">
                {{ resource.title }}
              </span>

              <span class="flex items-center text-sm text-label-muted">
                {{ resolveResourceSubtext(resource) }}
              </span>
            </div>

            <span class="flex gap-2">
              <UButton
                color="neutral"
                variant="outline"
                label="Edit"
                :href="`/${resource.id}/edit`"
                @click="
                  (e) => {
                    e.preventDefault()
                    router.push(`/${resource.id}/edit`)
                  }
                "
              />

              <UButton
                color="neutral"
                variant="outline"
                icon="i-ph:dots-three"
                @click="
                  (e) => {
                    e.preventDefault()
                  }
                "
              />
            </span>
          </a>
        </div>
      </div>
    </template>

    <template v-else>
      <h1 class="py-8 text-lg">
        Let's get started by creating a brand new resource!
      </h1>

      <div class="grid grid-cols-2 gap-8 container w-full">
        <button
          v-for="kind of KINDS"
          :key="kind.kind"
          class="border border-transparent rounded-lg transition hover:border-accented p-8"
          @click="
            async () => {
              router.push(`/${await createResource(kind.kind)}/edit`)
            }
          "
        >
          <div
            :class="[
              'size-16 grid place-items-center mx-auto rounded-lg',
              kind.class
            ]"
          >
            <UIcon :name="kind.icon" class="size-12 text-white" />
          </div>

          <p class="capitalize pt-4 font-semibold">
            {{ kind.kind }}
          </p>

          <p class="text-sm text-muted">
            {{ kind.text }}
          </p>
        </button>
      </div>
    </template>
  </div>
</template>
