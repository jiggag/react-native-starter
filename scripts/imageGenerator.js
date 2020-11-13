const fs = require('fs');
const path = require('path');
const endsWith = require('lodash/endsWith');
const filter = require('lodash/filter');
const map = require('lodash/map');
const replace = require('lodash/replace');

const imageFileNames = () => {
  const assetsPath = path.join(__dirname, '..', 'assets');
  const fileArray = map(
    filter(fs.readdirSync(assetsPath), (file) => endsWith(file, '.png')),
    (file) => replace(replace(replace(file, '@3x.png', ''), '@2x.png', ''), '.png', ''),
  );

  return Array.from(new Set(fileArray));
};

const generate = () => {
  const properties = map(imageFileNames(), (name) => `${name}: require('../../assets/${name}.png'),`).join('\n  ');

  const string = `const images = {
  ${properties}
};

export default images;
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'Utils', 'Images.ts'), string, 'utf8');
};

generate();
