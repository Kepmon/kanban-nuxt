module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      2,
      { singleQuote: true, trailingComma: 'none', semi: false }
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'EVENTS',
          'DEFINITION',
          'LIST_RENDERING',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'CONTENT'
        ],
        alphabetical: false
      }
    ]
  }
}
