export function buildSoundSrc(name: string, extension?: string): string {
  return `/sounds/${name}.${extension || "mp3"}`;
}
