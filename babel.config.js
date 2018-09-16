module.exports = function(api) {
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
