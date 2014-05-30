clone: marked codemirror

marked:
	git clone https://github.com/chjj/marked

codemirror:
	git clone https://github.com/marijnh/codemirror
	
pull: clone
	(cd marked; git pull)
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
			marked/marked.min.js\
			.htaccess


clean:
	rm -f vimdown.tar.gz 
	rm -rf marked
	rm -rf codemirror
