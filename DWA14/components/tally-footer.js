/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { html, LitElement } from '../libs/lit-html.js';

class TallyFooter extends LitElement {
  render() {
    return html`
    <footer class="footer">
        Inspired by the Tally Count App. Student practice project by Glad Masilela
      </footer>
    `;
  }
}

customElements.define('tally-footer', TallyFooter)