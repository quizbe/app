import type { Resource } from './schemas'

export const useResourceState = () => useState<Resource | null>(() => null)
export const useLoadingState = () => useState(() => true)
export const useEditingState = () => useState(() => -1)
