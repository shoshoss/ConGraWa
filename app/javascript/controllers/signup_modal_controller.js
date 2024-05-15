// app/javascript/controllers/signup_modal_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // ボタンクリック時にモーダルを開く処理
    this.element.setAttribute("open", true);
  }

  closeModal() {
    // モーダルを閉じる
    this.element.close();
  }

  redirectSubmit(event) {
    if (!event.detail.success) {
      // フォームのバリデーションエラーの場合はここで何もしない
      return;
    }
    // リダイレクトパスを取得してリダイレクトを実行する
    const redirectPath = this.data.get("redirectPath");
    Turbo.visit(redirectPath, { action: "replace" });
  }
}
