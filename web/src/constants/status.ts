import { EResourceStatus } from '../types'

export const RESOURCE_STATUS_NAMES = {
  [EResourceStatus.Backlog as string]: 'To do',
  [EResourceStatus.Plan as string]: 'In progress',
  [EResourceStatus.Done as string]: 'Complete',
}
