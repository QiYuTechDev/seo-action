.FORCE:

build: .FORCE
	npm run build

package: build
	npm run package
