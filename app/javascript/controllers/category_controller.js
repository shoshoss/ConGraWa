import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["link", "posts"];

  connect() {
    this.setActiveLink(this.defaultLink);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  switch(event) {
    event.preventDefault();
    this.setActiveLink(event.target);
  }

  setActiveLink(selectedLink) {
    this.linkTargets.forEach((link) => {
      link.classList.remove("tab-active");
    });
    selectedLink.classList.add("tab-active");
  }

  get defaultLink() {
    return this.linkTargets.find(
      (link) => link.dataset.category === this.defaultCategory
    );
  }

  get defaultCategory() {
    return this.data.get("defaultCategory") || "self";
  }
}
