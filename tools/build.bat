:build
	node r.js -o build.js
	lessc ../build/less/styles.less ../build/css/styles.css --clean-css
	goto end

:end
	prompt
	popd