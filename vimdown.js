/*globals Markdown, CodeMirror */

(function() {
   "use strict"; 

   main();

   function main() {
      var editor, convert, preview, code;

      function storedCode() {
         var item = localStorage.getItem('code');
         if (item) {
            code.innerHTML = item;
         }
      }

      function previewUpdate() {
         var code, html;

         code = editor.getValue();
         localStorage.setItem('code', code);

         html = convert(code);
         preview.innerHTML = html;
      }

      function previewScroll() {
         var percent, info;

         info = editor.getScrollInfo();
         if (info.top === 0) {
            percent = 0;
         } else {
            percent = (info.height - info.clientHeight) / info.top;
         }

         preview.scrollTop = percent * preview.scrollHeight;
      }

      code = $('#code');
      preview = $('#preview');
      convert = new Markdown.getSanitizingConverter().makeHtml;

      storedCode();

      editor = getEditor(code);
      editor.on('change', previewUpdate);
      editor.on('scroll', previewScroll);

      previewUpdate();
      resizerBind();

      editor.focus();
   }

   function getEditor(div) {
      return CodeMirror.fromTextArea(div, {
         mode: 'markdown',
         vimMode: true,
         lineNumbers: true,
         viewportMargin: Infinity,
         extraKeys: {
            'Enter': 'newlineAndIndentContinueMarkdownList'
         }
      });
   }

   function resizerBind() {
      var resizer, preview, editor;

      resizer = $('#resizer');
      preview = $('#preview-wrapper');
      editor = $('.CodeMirror');

      resizer.addEventListener('mousedown', function begin(e) {
         var x, body, bodyWidth;

         x = e.pageX;
         body = document.body;
         bodyWidth = body.clientWidth;

         function move(e) {
            var percent;

            resizer.style.left = (e.pageX - x) + 'px';

            percent = 100 * e.pageX / bodyWidth;
            editor.style.width = percent + '%';
            preview.style.width = (100 - percent) + '%';
            resizer.style.left = 0;
         }

         function end() {
            body.removeEventListener('mouseup', end);
            body.removeEventListener('mousemove', move);
            body.classList.remove('resizer');
         }

         body.classList.add('resizer');
         body.addEventListener('mousemove', move);
         body.addEventListener('mouseup', end);
      });
   }

   function $(query) {
      return document.querySelector(query);
   }

}());
