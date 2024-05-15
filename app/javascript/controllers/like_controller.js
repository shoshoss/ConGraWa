import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  animate(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const postId = button.dataset.postId;
    const action = button.dataset.actionType; // like or unlike

    // Perform the like/unlike action
    if (action === "like") {
      this.like(button, postId);
    } else {
      this.unlike(button, postId, button.dataset.likeId);
    }
  }

  like(button, postId) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/posts/${postId}/likes`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    })
      .then((response) => {
        if (response.ok) {
          this.showRipple(button);
          button.classList.add("like-animation");
          setTimeout(() => {
            button.classList.remove("like-animation");
          }, 300);
          return response.text();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((html) => {
        document.querySelector(`#post-${postId}-like`).innerHTML = html;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  unlike(button, postId, likeId) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/posts/${postId}/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          button.classList.add("unlike-animation");
          setTimeout(() => {
            button.classList.remove("unlike-animation");
          }, 300);
          return response.text();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((html) => {
        document.querySelector(`#post-${postId}-like`).innerHTML = html;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  showRipple(button) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    const rect = button.getBoundingClientRect();
    ripple.style.left = `${rect.width / 2}px`;
    ripple.style.top = `${rect.height / 2}px`;

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }
}
