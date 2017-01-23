module.exports = {
  root: true,
  extends: [
    'supermind',
    'supermind/inferno',
    'supermind/jsx-a11y'
  ],
  rules: {
    'inferno/no-set-state': 'error',
    'inferno/prop-types': 'off'
  }
}
