const typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: [
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
  ],
  output: './public/locales',
  options: {
    sort: true,
    removeUnusedKeys: true,
    lngs: ['pl', 'en'],
    defaultLng: 'pl',
    ns: 'common',
    defaultNs: 'common',
    func: {
      list: 't'
    },
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: '{{lng}}/{{ns}}.json',
    },
  },
  transform: typescriptTransform({
    extensions: [".ts", ".tsx"],
    tsOptions: {
      module: "esnext",
    },
  }),
};
