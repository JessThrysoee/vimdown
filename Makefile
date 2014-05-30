clone: marked codemirror

marked:
	git clone https://github.com/chjj/marked

codemirror:
	git clone https://github.com/marijnh/codemirror
	
pull: clone
	(cd marked; git pull)
	(cd codemirror; git pull)

package: pull
	mkdir vimdown
	@rsync -R\
			vimdown.html\
			vimdown.js\
			vimdown.css\
			gfm.css\
			codemirror/lib/codemirror.css\
			codemirror/lib/codemirror.js\
			codemirror/mode/markdown/markdown.js\
			codemirror/mode/gfm/gfm.js\
			codemirror/mode/xml/xml.js\
			codemirror/addon/edit/continuelist.js\
			codemirror/addon/search/searchcursor.js\
			codemirror/addon/mode/overlay.js\
			codemirror/keymap/vim.js\
			marked/marked.min.js\
			.htaccess\
			vimdown
	@tar zcvf vimdown.tar.gz vimdown
	rm -rf vimdown


clean:
	rm -f vimdown.tar.gz 
	rm -rf vimdown

dist-clean: clean
	rm -rf marked
	rm -rf codemirror
