const fs = require('fs');
const path = require('path');

const NON_COMPONENT_FOLDER = [
  'utils',
  'providers',
  'dnd-styles',
  'assets',
  'clients',
  'mixins',
  'common',
  'FieldLabelAttributes',
  'Backoffice',
  'BaseComponents',
  'Deprecated',
  'Typography',
  'Animations',
  'Foundation',
  'beta',
];

const matches = haystack => needle => haystack.some(h => needle === h);

const componentNameInvalidators = [
  fileName => /^\./.test(fileName), // skip hidden folders, if any (like .DS_STORE)
  path.extname,
  matches(NON_COMPONENT_FOLDER),
];

const listAllComponents = ({ cwd }) =>
  fs
    .readdirSync(cwd)
    .filter(file => !componentNameInvalidators.some(v => v(file)));

const cwd = path.resolve(__dirname, '..', 'src');
const componentsList = listAllComponents({
  cwd,
});

const defaultOrRoot = object => object.default || object;

const allComponents = componentsList.reduce((a, c) => {
  const ref = require(path.resolve(cwd, c));
  a[c] = defaultOrRoot(ref);
  return a;
}, {});

module.exports = allComponents;
