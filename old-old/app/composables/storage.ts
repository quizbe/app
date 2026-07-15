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

export function useMediaStorage() {
  return prefixStorage<string>(useQuizbeStorage(), 'media')
}

export function useResourceStorage() {
  return prefixStorage<Resource>(useQuizbeStorage(), 'resource')
}
