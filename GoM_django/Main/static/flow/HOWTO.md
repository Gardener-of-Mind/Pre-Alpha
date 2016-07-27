#How To...

##Use it
All the js (es6) and related css (scss) are bundled into `bundle/bundle.js` and `bundlebundle.css`. These files are already hooked into `bundle/index.html` and are ready to be used.

##Begin development
1. Install [`nodejs`](https://nodejs.org/en/). I'd recommend using [`Node Version Manager (nvm)`](https://github.com/creationix/nvm).
2. Install required node packages. Open `Main/static/flow` in terminal (or CMD) and enter the command `npm install` (or its shorthand `npm i`). You can also check for updated packages and install them with `npm update --save` (shorthand: `npm up -S`).
3. Once done with installing packages, you can start development.

**Note**: If you are using [`Sublime Text`](https://www.sublimetext.com/3), I'd recommend using `flow.sublime-project` and installing the following Sublime Text Packages:
1. [`Babel`](https://packagecontrol.io/packages/Babel)
2. [`Babel Snippets`](https://packagecontrol.io/packages/Babel%20Snippets)
3. [`Oceanic Next Color Scheme`](https://github.com/voronianski/oceanic-next-color-scheme)

## Bundle files
To create production ready `bundle.js` and `bundle.css`, use the command `npm run build`.

For development phase, use command `npm run watch`. This will create the same files, with their source maps and will continue to watch for changes.

---
