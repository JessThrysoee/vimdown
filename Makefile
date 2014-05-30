clone: pagedown codemirror

pagedown: 
	hg clone https://code.google.com/p/pagedown/

codemirror:
	git clone https://github.com/marijnh/codemirror
	
pull: clone
	(cd pagedown; hg pull)
	(cd codemirror; git pull)

package: pull
	@tar zcvf vimdown.tar.gz\
			vimdown.html\
			vimdown.js\
			vimdown.css\
			codemirror/lib/codemirror.css\
			codemirror/lib/codemirror.js\
			codemirror/mode/markdown/markdown.js\
			codemirror/mode/xml/xml.js\
			codemirror/addon/edit/continuelist.js\
			codemirror/addon/search/searchcursor.js\
			codemirror/keymap/vim.js\
			pagedown/Markdown.Converter.js\
			pagedown/Markdown.Sanitizer.js\
			.htaccess


clean:
	rm -f vimdown.tar.gz 
	rm -rf pagedown
	rm -rf codemirror
