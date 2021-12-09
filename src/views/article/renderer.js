import { Renderer as Render } from 'marked'

export class Renderer extends Render {
  code(code, infostring, escaped) {
    return `<div class="code-box">${super.code(code, infostring, escaped)}</div>`
  }

  link(href, title, text) {
    return `<a href="${href}" target="_blank">${text}</a>`
  }
}
