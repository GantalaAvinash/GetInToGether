/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme"

module.exports = {
    darkMode: ["class"],
    content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	prefix: '',
  theme: {
	container: {
		center: true,
		padding: "2rem",
		screen: {
			"2xl": "1400px",
		},
	},
  	extend: {
		fontFamily: {
			sans: ["var(--font-sans)", ...fontFamily.sans],
		},
		keyframes: {
			"accordion-down": {
				from: {
					height: "0",
				},
				to: {
					height: "var(--radix-accordion-content-height)",
				},
			},
			"accordion-up": {
				from: {
					height: "var(--radix-accordion-content-height)",
				},
				to: {
					height: "0",
				},
			},
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}

