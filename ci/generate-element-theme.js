const fs = require('fs');
const path = require('path');
const et = require('element-theme');

function resolve(root, name) {
  return path.join(root, name);
}

const projectRootDir = resolve(__dirname, '../');
const themeConfig = resolve(projectRootDir, 'plugins/element-variables.scss');
const themeOutDir = resolve(projectRootDir, 'assets/theme');

function copyIcons() {
  const minimizedIcons = resolve(projectRootDir, 'assets/element-icons');
  fs.readdir(minimizedIcons, (err, paths) => {
    if (err) {
      throw err;
    }
    paths.forEach((path) => {
      fs.copyFile(
        resolve(minimizedIcons, path),
        resolve(resolve(themeOutDir, 'fonts'), path),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(path + ' copied.');
          }
        });
    });
  });
}

et.run({
  config: themeConfig,
  out: themeOutDir,
  minimize: true
}, copyIcons);
