<template>
  <main class="contactPage">
    <section class="grid contactPage__form">
      <h1 class="width-4/9">Let’s get in contact</h1>

      <form
        action="mailto:samdepanter@gmail.com?subject=Portfolio"
        method="post"
        class="width-4/9"
      >
        <div class="textInput--container">
          <input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Your Name"
            required
          />
          <label for="firstname">Your Name</label>
        </div>

        <div class="textInput--container">
          <input
            id="emailadres"
            type="email"
            name="emailadres"
            placeholder="Your Email Adress"
            required
          />
          <label for="emailadres">Your Email Adress</label>
        </div>

        <div class="textInput--container textInput--large">
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Leave a Message"
            required
          ></textarea>
          <label for="message">Leave a Message</label>
        </div>

        <button id="submitbutton" type="submit" class="button">
          Send Message
        </button>
      </form>
    </section>

    <section class="grid contactPage__social">
      <h2 class="width-4/9">Find me on other platforms</h2>

      <ul class="width-2/4-small width-4/9">
        <li>
          <a href="https://github.com/vuurvos1/">
            Github
            <svg viewBox="0 0 79 79" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M39.5 1.646C17.676 1.646 0 19.026 0 40.46 0 57.614 11.317 72.16 27.008 77.288c1.975.366 2.7-.836 2.7-1.866 0-.922-.034-3.364-.05-6.6-10.988 2.34-13.305-5.207-13.305-5.207-1.797-4.48-4.394-5.678-4.394-5.678-3.578-2.407.276-2.357.276-2.357 3.967.27 6.05 4 6.05 4 3.522 5.934 9.247 4.219 11.505 3.228.355-2.511 1.372-4.22 2.501-5.19-8.772-.972-17.992-4.31-17.992-19.181 0-4.237 1.53-7.7 4.065-10.415-.444-.981-1.777-4.928.346-10.273 0 0 3.308-1.04 10.862 3.98 3.16-.863 6.518-1.291 9.875-1.31 3.358.019 6.715.447 9.875 1.31 7.505-5.02 10.813-3.98 10.813-3.98 2.124 5.345.79 9.292.396 10.273 2.518 2.716 4.048 6.178 4.048 10.415 0 14.911-9.233 18.193-18.022 19.147 1.383 1.166 2.667 3.545 2.667 7.183 0 5.194-.05 9.368-.05 10.629 0 1.017.691 2.231 2.716 1.843C67.693 72.143 79 57.588 79 40.46 79 19.026 61.314 1.646 39.5 1.646z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://codepen.io/firefox3000">
            Codepen
            <svg viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.479 53.663l35.649 23.77c1.215.748 2.516.758 3.744 0l35.65-23.77c.912-.608 1.478-1.696 1.478-2.785V27.114c0-1.089-.566-2.178-1.479-2.785L40.872.56c-1.215-.747-2.516-.754-3.744 0L1.478 24.33C.567 24.936 0 26.025 0 27.114v23.764c0 1.089.566 2.177 1.479 2.785zm34.17 14.716L9.402 50.881l11.71-7.836 14.537 9.708V68.38zm6.702 0V52.753l14.537-9.708 11.71 7.836L42.35 68.38zm28.948-23.77l-8.402-5.613L71.3 33.38v11.229zM42.35 9.616l26.247 17.498-11.71 7.836-14.537-9.708V9.616zM39 31.072l11.84 7.924L39 46.919l-11.84-7.923L39 31.072zM35.65 9.616v15.626L21.111 34.95l-11.71-7.836L35.65 9.616zM6.704 33.386v-.003L15.106 39l-8.401 5.616V33.386z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/sam-de-kanter-b3020b1a0/">
            Linkedin
            <svg viewBox="0 0 79 79" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M78.98 79v-.003H79V50.023c0-14.173-3.052-25.092-19.622-25.092-7.965 0-13.311 4.371-15.494 8.516h-.23v-7.193H27.943v52.743h16.36V52.88c0-6.877 1.303-13.526 9.819-13.526 8.39 0 8.515 7.848 8.515 13.967V79H78.98zM1.303 26.258h16.38V79H1.303V26.258zM9.487 0C4.25 0 0 4.25 0 9.487s4.25 9.575 9.487 9.575 9.486-4.338 9.486-9.575C18.97 4.25 14.72 0 9.487 0z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  layout: "contactLayout",
  head() {
    return {
      title: "Contact Page",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Find some info about me to find me on different platforms, or contact me if you have any questions",
        },
        {
          hid: "ogtitle",
          property: "og:title",
          content: "Contact page",
        },
      ],
    };
  },
};
</script>
