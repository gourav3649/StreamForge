# StreamForge Design System (Stitch)

This document serves as the source of truth for the StreamForge visual identity. When generating new React components or UI elements for StreamForge, strictly adhere to the tokens and guidelines defined here.

## Brand Identity
- **Personality:** Professional, Sleek, Futuristic, High-End
- **Primary Domain:** Video Transcoding, AI Editing, Media Management
- **Themes:** Supported in both Light and Dark mode, prioritizing Dark Mode as default.

## Typography
We use a two-font system. 
- **Headings (H1 - H4):** `Outfit` (or `Plus Jakarta Sans`). Sans-serif, geometric, premium feel. Use font weights 500 (Medium) through 800 (Extra Bold).
- **Body & UI Elements:** `Inter`. Sans-serif, highly readable. Use font weights 400 (Regular) and 500 (Medium).

## Colors

### Light Mode
- **Background:** `#FAFAFA` (Crisp, clean off-white)
- **Foreground:** `#09090B` (Deep slate for text readability)
- **Card/Surface:** `#FFFFFF`
- **Primary Brand:** `#8B5CF6` (Violet-500)
- **Primary Gradient:** `linear-gradient(to bottom right, #8B5CF6, #4F46E5)`
- **Border:** `#E4E4E7` (Zinc-200)

### Dark Mode
- **Background:** `#09090B` (True slate/black)
- **Foreground:** `#FAFAFA` (Crisp white)
- **Card/Surface:** `#09090B` (Blend into background) or `#18181B` (Zinc-900)
- **Primary Brand:** `#8B5CF6` (Violet-500)
- **Primary Gradient:** `linear-gradient(to bottom right, #8B5CF6, #4F46E5)`
- **Border:** `#27272A` (Zinc-800)
- **Glassmorphism:** `bg-white/5` with `backdrop-blur-xl` and `border-white/10`

## Spacing & Sizing (Tailwind based)
- **Page Wrapper:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Gap/Spacing:** Use `gap-4` or `gap-8` for standard container spacing.
- **Border Radius:** Default to `rounded-xl` for cards, `rounded-lg` for buttons and inputs.
- **Micro-interactions:** Use `transition-all duration-300 ease-in-out` for hover states.

## Component Guidelines
1. **Buttons:** Primary buttons should use the primary gradient background with white text, `rounded-lg`, and slight scale up (`hover:scale-105`) or brightness increase on hover.
2. **Cards:** Cards should utilize glassmorphism or very subtle borders in dark mode to feel elevated without being visually heavy.
3. **Tooltips:** Always ensure tooltips use contrast colors (`bg-white/90 text-black` in light mode, `bg-black/80 text-white` in dark mode) with `backdrop-blur`.
4. **Icons:** Use `lucide-react`. Default icon size is `size-5`.

## Generative AI Prompting (Stitch)
When prompting Stitch to create a new component:
1. Always use Tailwind CSS.
2. Rely on Shadcn/ui conventions.
3. Incorporate Lucide icons.
4. If a card or panel is requested, default to the glassmorphic aesthetic defined above.
