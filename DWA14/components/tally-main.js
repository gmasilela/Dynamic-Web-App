/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { html, css, LitElement } from '../libs/lit-html.js';

class TallyMain extends LitElement {
  static styles = css`
  .counter{
    background-color: #33333d;
  }
  .counter__value {
    width: 100%;
    height: 15rem;
    text-align: center;
    font-family:'Courier New', Courier, monospace;
    font-size: 6rem;
    font-weight: 900;
    background: none;
    color:#ffffff8c;
    border-width: 0;
    border-bottom: 1px solid #d2d6dc;
  }
  .counter__actions {
    display: flex;
  }
  .counter__button {
    background: none;
    width: 50%;
    border-width: 0;
    color: #fff
    columns: #fff;
    font-size: 3rem;
    border-bottom: 1px solid #d2d6dc;
    transition: transform 0.3s;
    transform: translateY(0);
  }
  .counter__button_first{
    border-right: 1px solid #d2d6dc;
  }
  .counter__button:active {
    background: #424250;
    transform: translateY(2%);
  }
  .counter__button:disabled {
    opacity: 0.2;
  }
  .reset{
    width: 100%;
  }
  .reset_actions {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #fff;
  }
  .reset_button {
    padding: 0.8rem;
    color: #fff;
    font-size: 1.5rem;
  }
  .reset-overlay{
    text-align: center;
    color: #33333d;
  }
  footer{
    text-align: center;
    line-height: 1.5rem;
    background: #33333d;
    color:#d2d6dc;
    align-self: flex-end;
    padding: 1rem;
    font-size: 0.9rem;
  }
  .footer__text{
    color:#ffffff8c;
  }
  `;

  static properties = {
    count: { type: Number },
    minReached: { type: Boolean },
    maxReached: { type: Boolean },
    reset: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 0;
    this.minReached = false;
    this.maxReached = false;
    this.overlayVisible = false;
  }

  increment() {
    if (this.count < 10) {
      this.count += 1;
      this.minReached = false;
      this.maxReached = false;
      this.reset = false;
    } else {
      this.maxReached = true;
    }
  }

  decrement() {
    if (this.count > -10) {
      this.count -= 1;
      this.minReached = false;
      this.maxReached = false;
      this.reset = false;
    } else {
      this.minReached = true;
    }
  }

  restart() {
    this.count = 0;
    this.minReached = false;
    this.maxReached = false;
    this.reset = true;
  }

  render() {
    return html`
      <main>
        <input
          readonly
          value="${this.count}"
          class="counter__value"
          size="large"
        />
        <div class="counter__actions">
          <button @click="${this.decrement}" ?disabled="${this.minReached}"
            class="counter__button"
          > - </button>
          <button @click="${this.increment}" ?disabled="${this.maxReached}"
            class="counter__button"
          > + </button>
        </div>
        <div class="reset_actions">
          <button @click="${this.showResetOverlay}" class="reset_button">Reset</button>
        </div>
      </main>
      ${this.overlayVisible
        ? html`
        <div id="overlay" class="overlay">
          <div class="overlay-content">
            <p>The counter has been reset to default</p>
            <button @click="${this.hideResetOverlay}">OK</button>
          </div>
        </div>
      `
    : ''}
`;
}
 showResetOverlay() {
  this.overlayVisible = true;
}

hideResetOverlay() {
  this.overlayVisible = false;
}

}

customElements.define('tally-main', TallyMain);