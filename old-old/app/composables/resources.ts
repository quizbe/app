import { uid } from 'uid/secure'
import type { Resource } from './schemas'

export async function createResource(kind: Resource['kind']) {
  const id = uid()
  const storage = useResourceStorage()

  if (await storage.has(id)) return createResource(kind)

  await storage.set(id, createBlankResource(kind, id))

  return id
}

export function createBlankResource(
  kind: Resource['kind'],
  id?: string
): Resource {
  return {
    ...(kind === 'glossary'
      ? {
          kind: 'glossary',
          terms: []
        }
      : {
          kind: 'quiz',
          questions: []
        }),
    id: id || uid(),
    author: '',
    created: Date.now(),
    updated: Date.now(),
    title: `Untitled ${kind === 'glossary' ? 'glossary' : 'quiz'}`,
    storage: 'localonly'
  }
}
