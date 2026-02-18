# Tabby Checkout

A pixel-perfect replica of the [Tabby](https://tabby.ai) Buy Now, Pay Later checkout flow — built as a standalone React prototype for rapid design iteration.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-6-646cff)

## Screens

| OTP Verification | Plan Selection | Payment | Success |
|:---:|:---:|:---:|:---:|
| Auto-advancing OTP input with countdown timer | Split pay in 4/6/8/10/12 with fee breakdown | Card selection, cashback toggle, plan summary | Animated checkmark with redirect |

### Flow

```
OTP  →  Plan Selection  →  Payment  →  Success
              ↓                ↓
       Repayment Schedule   Payment Method
           (modal)             (modal)
```

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** with custom design tokens
- **React Router v6** for screen navigation
- **Framer Motion** for page transitions and modal animations
- **Inter** font (400–700) via Google Fonts

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── screens/        # OTP, Plan Selection, Payment, Success
│   ├── modals/         # Repayment Schedule, Payment Method
│   ├── ui/             # Button, Chip, OTP Input, Toggle, Badge, etc.
│   └── layout/         # Header, Card, CheckoutLayout
├── context/            # Checkout state + Theme (dark mode)
├── hooks/              # useCountdown, useOtpInput, useMediaQuery
├── lib/                # Installment calculations, currency formatting
├── config/             # Routes, constants, mock data
└── assets/icons/       # SVG icon components
```

## Features

- **Split payment plans** — Pay in 4 (0%), 6 (5%), 8 (9%), 10 (13%), or 12 (17%)
- **OTP verification** — Auto-focus, auto-advance, paste support, resend timer
- **Repayment schedule** — Visual timeline with payment dates and amounts
- **Dark mode** — Full theme toggle with `localStorage` persistence
- **Responsive** — Desktop card layout + mobile full-width
- **Skeleton loaders** — Smooth loading states on screen transitions
- **UAE Dirham symbol** — Custom font for the new Unicode glyph (`U+00EA`)

## Design Tokens

Colors, typography, and spacing follow the Tabby design system. See [CLAUDE.md](CLAUDE.md) for the full token reference.

## License

Private — for design prototyping purposes only.
