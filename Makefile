PATH := ./node_modules/.bin:${PATH}

.PHONY : init clean build test dist

init:
				npm install

clean:
				rm -rf tasks/

build:
				coffee -b -o tasks/ -c src/ 

dist: clean init build

publish: dist
			npm publish