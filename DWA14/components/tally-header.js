import { html, css, LitElement } from '../libs/lit-html.js';

class TallyHeader extends LitElement {
  static styles = css`
  header{
    text-align: center;
  }
  .header__title{
    font-size: 3rem;
    color:#ffffff8c;
  }
  `;

  render() {
    return html`
      <header>
        <h1>Tally App Counter</h1>
      </header>
    `;
  }
}

customElements.define('tally-header', TallyHeader);