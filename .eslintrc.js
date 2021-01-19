module.exports = {
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  env: {
    node: true
  },
  globals: {
    APIError: true
  }
}
