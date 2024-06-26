import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.element.setAttribute("open", true);
    this.setupFileInput();
  }

  closeModal() {
    this.element.close();
  }

  setupFileInput() {
    const input = document.getElementById("user_avatar");
    const fileNameDisplay = document.getElementById("file-name");
    const preview = document.getElementById("preview-avatar");
    const currentAvatarSrc = preview.src;

    if (!input || !fileNameDisplay || !preview) {
      console.warn("Required elements are not found in the DOM");
      return;
    }

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) {
        preview.src = currentAvatarSrc;
        fileNameDisplay.textContent = "選択されていません";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("ファイルサイズは5MB以下にしてください。");
        preview.src = currentAvatarSrc;
        fileNameDisplay.textContent = "選択されていません";
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        fileNameDisplay.textContent = file.name;
      };
      reader.onerror = () => {
        console.error("エラーが発生しました: ", reader.error);
        alert("ファイルの読み込みに失敗しました。");
        preview.src = currentAvatarSrc;
        fileNameDisplay.textContent = "選択されていません";
      };
      reader.readAsDataURL(file);
    });
  }

  submitEnd(event) {
    if (event.detail.success) {
      // キャッシュをクリアする
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          action: "clearProfileCache",
        });
      }

      // 成功時にはTurboを無効化してリダイレクトを実行する
      Turbo.session.drive = false;

      const redirectPath =
        event.detail.fetchResponse.response.headers.get("Location");
      if (redirectPath) {
        window.location.href = redirectPath;
      }
    } else {
      // 失敗時にはTurboを有効にしてエラーメッセージを表示する
      Turbo.session.drive = true;
    }
  }
}
