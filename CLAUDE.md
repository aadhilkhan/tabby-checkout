# Tabby Checkout UI Replica

## Context

Building a pixel-perfect replica of the Tabby Checkout BNPL flow as a standalone React prototype. The goal is to give a product designer a maintainable, componentized codebase that can be rapidly iterated on with Claude - editing individual components to test visual changes with live code. All screens are based on the Figma designs provided.

**Phase 2 (deferred):** Arabic/RTL toggle support - components will need RTL layout variants.

---

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (using `@tailwindcss/vite` plugin, `@theme` directive for tokens)
- **React Router v6** for page navigation
- **Framer Motion** for page transitions, modal animations, success animation
- **`new-dirham-symbol`** npm package for the new UAE Dirham glyph (Unicode `U+00EA`)
- **Inter** font (weights 400, 500, 600, 700) via Google Fonts

---

## Screens & Flow

```
OTP Screen  -->  Plan Selection  -->  Payment Page  -->  Success
                    |                     |
              [Repayment Schedule]  [Payment Method]
                   (modal)              (modal)
```

---

## Design Tokens (from Figma)

### Colors (Light / Dark)
| Token | Light | Dark |
|---|---|---|
| bg-general | `#f2f5f7` | `#0f1215` |
| bg-card | `#ffffff` | `#1d2329` |
| front-primary | `#1d2329` | `#f2f5f7` |
| front-secondary | `#7f8b99` | `#9aa5b0` |
| front-tertiary | `#b8c3d1` | `#5a6570` |
| front-positive | `#179958` | `#22c96e` |
| accent-link | `#5d21de` | `#8b5cf6` |
| line-primary | `#b8c3d1` | `#3a4550` |
| line-disabled | `#e9eff5` | `#2a3038` |
| overlay | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.7)` |

### Typography (all Inter)
| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| H1 | 35px | 600 | 36px | -0.7px |
| H2 | 30px | 600 | 32px | -0.3px |
| H3 | 22px | 600 | 24px | -0.22px |
| H4 | 16px | 700 | 20px | -0.16px |
| Body 1 | 16px | 500 | 20px | -0.16px |
| Body 2 | 14px | 500 | 18px | -0.16px |
| Caption | 12px | 500 | 16px | -0.13px |

### Key Measurements
- Card: `w-500px` desktop, full-width mobile, `rounded-24px`, `py-32 px-32`
- Header: `px-24 py-16`, merchant logo `40px` circle
- Chips: `gap-8`, selected = `#1d2329` bg + white text, unselected = border only
- OTP inputs: `48x56px`, `rounded-16`, border `#b8c3d1`, focused = `1.5px #1d2329`
- Buttons: full-width, `#1d2329` bg, white text, large rounded

---

## File Structure

```
tabby-checkout/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css                      # Tailwind + tokens + dark mode + typography
    ├── types/
    │   └── checkout.ts                # All TS interfaces
    ├── config/
    │   ├── routes.ts                  # Route path constants
    │   └── constants.ts               # Fee rates, timing, mock data
    ├── context/
    │   ├── CheckoutContext.tsx         # useReducer-based checkout state
    │   └── ThemeContext.tsx            # Dark mode toggle + localStorage
    ├── hooks/
    │   ├── useCountdown.ts            # OTP resend timer
    │   ├── useOtpInput.ts             # Focus management for OTP boxes
    │   ├── useMediaQuery.ts           # Responsive breakpoint detection
    │   └── useBodyScrollLock.ts       # Lock scroll when modal open
    ├── lib/
    │   ├── calculations.ts            # Installment math, fee computation
    │   ├── formatCurrency.ts          # Number formatting
    │   └── dateUtils.ts               # Repayment date generation
    ├── assets/
    │   └── icons/                     # ~12 SVG icon components
    ├── components/
    │   ├── layout/
    │   │   ├── CheckoutLayout.tsx     # Header + Card + Outlet (layout route)
    │   │   ├── Header.tsx             # Merchant info + dark toggle + close
    │   │   └── Card.tsx               # White rounded container
    │   ├── ui/
    │   │   ├── Button.tsx             # Primary CTA with loading state
    │   │   ├── Chip.tsx + ChipGroup.tsx
    │   │   ├── OtpInput.tsx + OtpInputGroup.tsx
    │   │   ├── PhonePill.tsx
    │   │   ├── RadioButton.tsx
    │   │   ├── ToggleSwitch.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Divider.tsx
    │   │   ├── Spinner.tsx
    │   │   ├── DirhamSymbol.tsx + CurrencyAmount.tsx
    │   │   ├── LegalText.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── DarkModeToggle.tsx
    │   ├── modals/
    │   │   ├── ModalOverlay.tsx
    │   │   ├── ModalSheet.tsx         # Popup (desktop) / Bottom sheet (mobile)
    │   │   ├── RepaymentScheduleModal.tsx
    │   │   ├── PaymentMethodModal.tsx
    │   │   └── TimelineTracker.tsx
    │   └── screens/
    │       ├── OtpScreen.tsx
    │       ├── PlanSelectionScreen.tsx
    │       ├── PaymentScreen.tsx
    │       └── SuccessScreen.tsx
    └── animations/
        ├── pageTransitions.ts
        └── modalTransitions.ts
```

---

## Calculation Logic

```
Pay in 4:  total / 4,  no fees
Pay in 6:  (total * 1.05) / 6,  ~5% service fee
Pay in 8:  (total * 1.09) / 8,  ~9% service fee
Pay in 10: (total * 1.13) / 10, ~13% service fee
Pay in 12: (total * 1.17) / 12, ~17% service fee (matches Figma's 272 AED on 1600)
```

---

## Screen-by-Screen Nuances

### 1. OTP Screen
- Auto-focus first input on mount, auto-advance on digit, backspace moves back
- Paste support for 4-digit code
- Countdown timer 00:59, "Send another code" clickable when expired
- "Continue" disabled until 4 digits, simulated verification

### 2. Plan Selection Screen
- Skeleton loader on mount (1.5s), chips: 12/10/8/6/4, default = 4
- Pay in 4: "No interest. No fees." green; Pay in 6+: shows total service fee
- Plan detail row clickable -> Repayment Schedule modal

### 3. Repayment Schedule Modal
- Clock icon + "Pay in [N]", vertical timeline, first entry green, rest gray
- "Got it" button dismisses; responsive: popup desktop, bottom sheet mobile

### 4. Payment Page
- Skeleton on mount, card row clickable -> Payment Method modal
- Cashback toggle, plan summary with badge, amount breakdown, legal text
- CTA: "Pay [dirham] [due today amount]"

### 5. Payment Method Modal
- Radio selection: Apple Pay, Debit Card (pre-selected), Add new card
- "Continue" confirms

### 6. Success Screen
- Animated checkmark (SVG stroke-dashoffset), spinner, redirect message

---

## Implementation Order

1. Project scaffolding (Vite + deps + Tailwind v4 + fonts + tokens)
2. Types & config (interfaces, routes, constants)
3. Lib functions (calculations, formatting, dates)
4. Context providers (CheckoutContext + ThemeContext)
5. Custom hooks (countdown, OTP, media query, scroll lock)
6. Icon components
7. UI primitives
8. Layout components
9. Modal system
10. Screen: OTP
11. Screen: Plan Selection + RepaymentScheduleModal
12. Screen: Payment + PaymentMethodModal
13. Screen: Success with animation
14. Skeleton loaders
15. Dark mode
16. Animations (page transitions, modals)
17. Responsive polish
18. Deploy (GitHub + Vercel)
