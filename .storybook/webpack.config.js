const merge = require('lodash/merge');
const path = require('path');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

const makeTestkitTemplate = platform =>
  `import { <%= utils.toCamel(component.displayName) %>TestkitFactory } from 'wix-style-react/dist/testkit${platform}';`;

const testkitsWarning = `
To learn how to initialize and use testkits, see <a href="/?selectedKind=Introduction&selectedStory=Testing" target="_blank">Testing guide</a>
`;

module.exports = ({ config }) => {
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');
  config.plugins.find(
    plugin => plugin.constructor.name === 'ProgressPlugin',
  ).handler = () => undefined;

  const newConfig = wixStorybookConfig(config);

  return merge(newConfig, {
    context: path.resolve(__dirname, '..', 'src'),
    resolve: {
      alias: {
        'wix-style-react': path.resolve(__dirname, '..', 'src'),
      },
    },
    module: {
      rules: newConfig.module.rules.concat({
        test: /\.story\.js$/,
        loader: 'wix-storybook-utils/loader',
        options: {
          storyConfig: {
            moduleName: 'wix-style-react',
            repoBaseURL:
              'https://github.com/wix/wix-style-react/tree/master/src/',
            issueURL:
              'https://github.com/wix/wix-style-react/issues/new/choose',
            testkitsWarning,
            importFormat:
            "import { %componentName } from '%moduleName'",
            testkits: {
              vanilla: {
                template: makeTestkitTemplate(''),
              },
              enzyme: {
                template: makeTestkitTemplate('/enzyme'),
              },
              puppeteer: {
                template: makeTestkitTemplate('/puppeteer'),
              },
              protractor: {
                template: makeTestkitTemplate('/protractor'),
              },
            },
          },
        },
      }),
    },
  });
};
