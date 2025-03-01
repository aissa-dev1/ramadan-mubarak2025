import { buildSoundSrc } from "../utils/build-sound-src";

export class SFXController {
  private static volume = 0.4;

  static playExplosion() {
    this.playSFX("explosion");
  }

  static playNotification() {
    this.playSFX("notification");
  }

  static playClick() {
    this.playSFX("click");
  }

  private static playSFX(name: string) {
    const audio = new Audio(buildSoundSrc(name));
    audio.volume = this.volume;
    audio.play();
  }
}
