/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /^border-(red|green|blue|purple|amber)-700$/
    },
    {
      pattern: /^bg-(red|green|blue|purple|amber)-700$/,
      variants: ["hover"]
    },
    {
      pattern: /^shadow-(red|green|blue|purple|amber)-700$/,
      variants: ["hover"]
    },
    {
      pattern: /^text-(red|green|blue|purple|amber)-700$/,
      variants: ["hover", "group-hover"]
    }
  ]
}

