// app/javascript/controllers/profile_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["link", "posts"];

  connect() {
    this.setActiveLink(this.defaultLink);
    this.observeScroll();
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
    if (!selectedLink) return;
    this.linkTargets.forEach((link) => {
      link.classList.remove("tab-active");
    });
    selectedLink.classList.add("tab-active");
  }

  observeScroll() {
    const nextPage = document.getElementById("next-page");
    if (nextPage) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.observer.unobserve(entries[0].target);
          entries[0].target.src = entries[0].target.src; // Trigger the lazy loading
        }
      });
      this.observer.observe(nextPage);
    }
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
