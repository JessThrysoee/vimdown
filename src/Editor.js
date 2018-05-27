import CodeMirror from "codemirror";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/mode/overlay";
import "codemirror/mode/xml/xml";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/edit/continuelist";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/search/searchcursor";
import "codemirror/keymap/vim";
import marked from "marked";
import splash from "./splash.txt";

const MarkdownKey = "vimdown:markdown";

class Editor {
  constructor() {
    const markdownElement = document.getElementById("markdown");
    markdownElement.innerHTML = this.savedMarkdown;

    this.codeMirror = this.createCodeMirror(markdownElement);
    this.previewElement = document.getElementById("preview");

    this.codeMirror.on("change", this.handleChange);
    this.codeMirror.on("scroll", this.handleScroll);

    this.updateMarkdown();
    this.resizerBind();

    this.codeMirror.focus();
  }

  createCodeMirror(textarea) {
    return CodeMirror.fromTextArea(textarea, {
      mode: "gfm",
      vimMode: true,
      lineNumbers: true,
      viewportMargin: Infinity,
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList"
      }
    });
  }

  updateMarkdown = () => {
    const markdown = this.codeMirror.getValue();
    this.savedMarkdown = markdown;

    const html = marked(markdown);
    this.previewElement.innerHTML = html;
  };

  handleChange = () => {
    this.updateMarkdown();
  };

  handleScroll = () => {
    let percent = 0;

    const info = this.codeMirror.getScrollInfo();
    if (info.top !== 0) {
      percent = (info.height - info.clientHeight) / info.top;
    }

    this.previewElement.scrollTop = percent * this.previewElement.scrollHeight;
  };

  resizerBind() {
    const resizerElement = document.getElementById("resizer");
    const previewWrapperElement = document.getElementById("preview-wrapper");
    const codeMirrorWrapperElement = this.codeMirror.getWrapperElement();

    resizerElement.addEventListener("mousedown", e => {
      const x = e.pageX;
      const body = document.body;
      const bodyWidth = body.clientWidth;

      function move(e) {
        const percent = 100 * e.pageX / bodyWidth;

        resizerElement.style.left = e.pageX - x + "px";

        codeMirrorWrapperElement.style.width = `${percent}%`;
        previewWrapperElement.style.left = `${percent}%`;
        previewWrapperElement.style.width = `${100 - percent}%`;

        resizerElement.style.left = 0;
      }

      function end() {
        body.removeEventListener("mouseup", end);
        body.removeEventListener("mousemove", move);
        body.classList.remove("resizer");
      }

      body.classList.add("resizer");
      body.addEventListener("mousemove", move);
      body.addEventListener("mouseup", end);
    });
  }

  get savedMarkdown() {
    return localStorage.getItem(MarkdownKey) || splash;
  }

  set savedMarkdown(markdown) {
    if (markdown && markdown.trim() !== "") {
      localStorage.setItem(MarkdownKey, markdown);
    } else {
      localStorage.removeItem(MarkdownKey);
    }
  }
}

export default function EditorFactory() {
  new Editor();
}
