clone: marked codemirror github-markdown-css

marked:
	git clone https://github.com/chjj/marked

codemirror:
	git clone https://github.com/marijnh/codemirror

github-markdown-css:
	curl -O https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css

pull: clone
	(cd marked; git pull)
	(cd codemirror; git pull)

package: pull
	mkdir vimdown
	rsync -R `sed -n -E -e '1,$$s/.*<script src="([^"]*)".*/\1/p' -e '1,$$s/.*<link.*href="([^"]*)".*/\1/p' vimdown.html`\
			.htaccess\
			vimdown.html\
			vimdown
	@tar zcvf vimdown.tar.gz vimdown
	#rm -rf vimdown


clean:
	rm -f vimdown.tar.gz
	rm -rf vimdown

dist-clean: clean
	rm -rf marked
	rm -rf codemirror
