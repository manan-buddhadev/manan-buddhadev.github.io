/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        t: {
          bg: '#1a1a1a',
          sidebar: '#141414',
          bar: '#111111',
          input: '#0d0d0d',
          text: '#ececec',
          muted: '#888888',
          dim: '#555555',
          border: '#2a2a2a',
          orange: '#d97757',
          green: '#4caf7d',
          blue: '#5b8dd9',
          red: '#e06c75',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
