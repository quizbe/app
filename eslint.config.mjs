// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
      'vue/no-multiple-template-root': 'off',
      '@stylistic/semi': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@stylistic/arrow-parens': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/block-tag-newline': 'off'
    }
  }
])
