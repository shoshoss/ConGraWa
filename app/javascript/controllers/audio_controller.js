import { Controller } from "@hotwired/stimulus";
import { getFromCache, openDatabase } from "../utils/indexedDB"; // パスを適切に設定

export default class extends Controller {
  static targets = ["playButton"];

  connect() {
    this.updateAllIconsToPlay(); // 初期化時に全アイコンを再生ボタンに設定
  }

  updateAllIconsToPlay() {
    document.querySelectorAll(".audio-icon").forEach((icon) => {
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
    });
  }

  async playPause(event) {
    const button = event.currentTarget;
    const audioId = button.dataset.audioId;
    const audio = document.getElementById(`audio-${audioId}`);
    const icon = document.getElementById(`audio-icon-${audioId}`);
    const seekBar = document.querySelector(`input[data-audio-id="${audioId}"]`);

    // すべての他の音声を停止し、そのアイコンを更新
    document.querySelectorAll("audio").forEach((a) => {
      if (a.id !== `audio-${audioId}` && !a.paused) {
        a.pause();
        this.updateIcon(
          document.getElementById(`audio-icon-${a.id.replace("audio-", "")}`),
          false // 他の音声アイコンを「再生」状態に戻す
        );
      } else if (a.id !== `audio-${audioId}` && a.paused) {
        // 再生されていない他の音声のアイコンも再生状態に戻す
        this.updateIcon(
          document.getElementById(`audio-icon-${a.id.replace("audio-", "")}`),
          false
        );
      }
    });

    // 音声が添付されていない場合はキャッシュから取得して再生
    if (!audio) {
      await this.playAudioFromCache(audioId, icon, seekBar);
      return;
    }

    // 音声の再生状態を切り替える
    if (audio.paused) {
      try {
        await audio.play();
        this.updateIcon(icon, true);
      } catch (error) {
        console.error("Playback failed:", error);
        alert(`音声の再生に失敗しました: ${error.message}`);
        this.updateIcon(icon, false);
      }
    } else {
      audio.pause();
      this.updateIcon(icon, false);
    }

    audio.addEventListener("timeupdate", () => {
      this.updateCurrentTimeDisplay(audioId, audio.currentTime);
      seekBar.value = audio.currentTime;
    });

    seekBar.addEventListener("input", () => {
      audio.currentTime = seekBar.value;
    });

    audio.addEventListener("ended", () => {
      this.updateCurrentTimeDisplay(audioId, 0);
      seekBar.value = 0;
    });
  }

  // キャッシュから音声を再生するメソッド
  async playAudioFromCache(audioId, icon, seekBar) {
    try {
      const audioBlob = await getFromCache(audioId);
      if (audioBlob) {
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.controls = true;

        // アイコンとシークバーの更新
        audio.addEventListener("timeupdate", () => {
          this.updateCurrentTimeDisplay(audioId, audio.currentTime);
          seekBar.value = audio.currentTime;
        });

        audio.addEventListener("ended", () => {
          this.updateCurrentTimeDisplay(audioId, 0);
          seekBar.value = 0;
        });

        await audio.play();
        this.updateIcon(icon, true);
        console.log("キャッシュから音声を再生中...");
      } else {
        console.log("キャッシュに音声データが見つかりませんでした。");
      }
    } catch (error) {
      console.error("キャッシュから音声の再生に失敗しました:", error);
    }
  }

  seek(event) {
    const seekBar = event.currentTarget;
    const audioId = seekBar.dataset.audioId;
    const audio = document.getElementById(`audio-${audioId}`);
    if (audio) {
      audio.currentTime = seekBar.value;
    }
  }

  updateIcon(icon, isPlaying) {
    icon.classList.toggle("fa-play", !isPlaying);
    icon.classList.toggle("fa-pause", isPlaying);
  }

  updateCurrentTimeDisplay(audioId, currentTime) {
    const currentElem = document.getElementById(`current-time-${audioId}`);
    if (currentElem) {
      currentElem.textContent = this.formatTime(currentTime);
    }
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  hoverEffect() {
    this.playButtonTarget.classList.remove("text-blue-500");
    this.playButtonTarget.classList.add("text-sky-400");
  }

  unhoverEffect() {
    this.playButtonTarget.classList.remove("text-sky-400");
    this.playButtonTarget.classList.add("text-blue-500");
  }
}
