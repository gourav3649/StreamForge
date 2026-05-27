import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			},
  			sidebar: {
  				DEFAULT: 'var(--sidebar-background)',
  				foreground: 'var(--sidebar-foreground)',
  				primary: 'var(--sidebar-primary)',
  				'primary-foreground': 'var(--sidebar-primary-foreground)',
  				accent: 'var(--sidebar-accent)',
  				'accent-foreground': 'var(--sidebar-accent-foreground)',
  				border: 'var(--sidebar-border)',
  				ring: 'var(--sidebar-ring)'
  			},
        "surface-tint": "#ffb2b7",
        "secondary-fixed-dim": "#d0bcff",
        "on-primary-container": "#5b0017",
        "on-surface": "#e5e1e4",
        "on-tertiary-container": "#00311d",
        "inverse-on-surface": "#313032",
        "outline-variant": "#5b4041",
        "secondary-fixed": "#e9ddff",
        "surface-container-low": "#1c1b1d",
        "on-primary-fixed-variant": "#92002a",
        "on-secondary": "#3c0091",
        "surface-container": "#201f22",
        "tertiary-fixed": "#82f9ba",
        "white": "#FFFFFF",
        "surface-bright": "#39393b",
        "tertiary": "#64dca0",
        "on-tertiary": "#003822",
        "primary-fixed": "#ffdadb",
        "surface-container-lowest": "#0e0e10",
        "on-tertiary-fixed": "#002112",
        "surface-container-high": "#2a2a2c",
        "tertiary-fixed-dim": "#64dca0",
        "inverse-primary": "#bc0b3b",
        "surface-variant": "#353437",
        "error": "#ffb4ab",
        "on-primary": "#67001b",
        "inverse-surface": "#e5e1e4",
        "on-error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#005233",
        "secondary-container": "#571bc1",
        "border-subtle": "rgba(255, 255, 255, 0.1)",
        "on-primary-fixed": "#40000d",
        "on-error": "#690005",
        "primary-fixed-dim": "#ffb2b7",
        "error-container": "#93000a",
        "on-surface-variant": "#e3bdbf",
        "on-background": "#e5e1e4",
        "tertiary-container": "#1fa46d",
        "on-secondary-container": "#c4abff",
        "on-secondary-fixed": "#23005c",
        "outline": "#aa888a",
        "on-secondary-fixed-variant": "#5516be",
        "primary-container": "#ff516a",
        "surface": "#131315",
        "surface-dim": "#131315",
        "surface-container-highest": "#353437",
        "surface-elevated": "#18181B"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        "base": "0.25rem",
        "xl": "0.75rem",
        "full": "9999px"
  		},
      spacing: {
        "base": "8px",
        "container-max": "1280px",
        "gutter": "24px",
        "margin-mobile": "16px",
        "margin-desktop": "40px"
      },
  		keyframes: {
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			},
  			moveHorizontal: {
  				'0%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				},
  				'50%': {
  					transform: 'translateX(50%) translateY(10%)'
  				},
  				'100%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				}
  			},
  			moveInCircle: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(180deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			moveVertical: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'50%': {
  					transform: 'translateY(50%)'
  				},
  				'100%': {
  					transform: 'translateY(-50%)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: { opacity: '0' },
  				to: { opacity: '1' }
  			},
  			'slide-up': {
  				from: { opacity: '0', transform: 'translateY(10px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			}
  		},
  		animation: {
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			first: 'moveVertical 30s ease infinite',
  			second: 'moveInCircle 20s reverse infinite',
  			third: 'moveInCircle 40s linear infinite',
  			fourth: 'moveHorizontal 40s ease infinite',
  			fifth: 'moveInCircle 20s ease infinite',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'slide-up': 'slide-up 0.5s ease-out'
  		},
  		fontFamily: {
  			sans: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
  			serif: ["'DM Serif Display'", ...defaultTheme.fontFamily.serif],
        "headline-lg": ["Playfair Display"],
        "headline-lg-mobile": ["Playfair Display"],
        "body-lg": ["DM Sans"],
        "body-sm": ["DM Sans"],
        "label-md": ["DM Sans"],
        "headline-sm": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "body-md": ["DM Sans"],
        "display-lg": ["Playfair Display"]
  		},
      fontSize: {
        "headline-lg": ["48px", {"lineHeight": "56px", "fontWeight": "700"}],
        "headline-lg-mobile": ["36px", {"lineHeight": "44px", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
      }
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
