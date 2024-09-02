/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
};

// Assume `flattenColorPalette` is a function available in your context
function flattenColorPalette(colors) {
  // Implementation to flatten color palettes (nested color objects)
  // For example purposes, let's assume it simply returns colors as-is.
  return colors;
}

function addVariablesForColors({ addBase, theme }) {
  // Flatten the color palette
  const allColors = flattenColorPalette(theme('colors'));

  // Create CSS custom properties from the flattened colors
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  // Add base styles to the root
  addBase({
    ':root': newVars,
  });
}


