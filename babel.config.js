module.exports = function(api) {
  /**
   * In order to enable tree-shaking in webpack, babel-loader should
   * use the setting: 'modules': false.
   * For server side, we need to set: 'modules': 'auto'.
   * So we use the caller.name to detect whether the config is called by server
   */
  const isRegister = api.caller(function(caller) {
    return !!(caller && caller.name === '@babel/register');
  });

  return {
    presets: [
      ['@babel/preset-env', { 'modules': isRegister ? 'auto' : false }],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  };
};
