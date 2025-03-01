export class MusicController {
  private static volume = 0.2;
  private static mainMusicPlaying = false;

  static playMainMusic() {
    if (this.mainMusicPlaying) return;

    const audio = new Audio("/sounds/universe-space.mp3");
    audio.volume = this.volume;
    audio.play();
    audio.loop = true;
    this.mainMusicPlaying = true;
  }
}
