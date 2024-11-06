export interface IEntryProvider {
  onInitialize?: () => void
  onInitialized?: () => void
}