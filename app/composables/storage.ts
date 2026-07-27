import { createStorage, prefixStorage } from 'unstorage'
import idb from 'unstorage/drivers/indexedb'
import type { Resource } from './schemas'

export function useQuizbeStorage() {
  return createStorage({
    driver: idb({
      dbName: 'quizbe',
      storeName: 'quizbe'
    })
  })
}

export type ResourceMedia = {
  width?: number
  height?: number
  type: string
  data: string
  length?: number
}

export function useMediaStorage() {
  return prefixStorage<ResourceMedia>(useQuizbeStorage(), 'media')
}

export function useResourceStorage() {
  return prefixStorage<Resource>(useQuizbeStorage(), 'resource')
}
