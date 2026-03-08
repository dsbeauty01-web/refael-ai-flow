

# Refael Sela — AI Automation Business Website

## Overview
A modern, bilingual (Hebrew/English) single-page website for Refael Sela's AI automation services. Default language: Hebrew (RTL). Clean white + deep blue + teal color palette. Focus on lead generation via WhatsApp contact.

## Color & Style
- **Primary**: Deep blue (#1e3a5f)
- **Accent**: Teal (#0d9488)
- **Background**: White with subtle light gray sections
- **Text**: Dark charcoal for readability
- **Cards**: White with soft shadows, rounded corners
- **Animations**: Fade-in on scroll, smooth hover effects on cards and buttons

## Language System
- i18n context with Hebrew (default) and English translations
- Language toggle button in header (🇮🇱/🇬🇧)
- Full RTL support: `dir="rtl"` when Hebrew is active, `dir="ltr"` for English
- All section content stored in a translations file

## Page Structure (Single Page, 10 Sections)

### 1. Header
- Logo/name: "Refael Sela"
- Navigation links to sections
- Language toggle button
- Mobile hamburger menu

### 2. Hero Section
- Bold headline about AI automation for small businesses
- Short subtitle paragraph
- Two CTA buttons: "Book a Call" (WhatsApp link) and "Try Demo Bots" (scrolls to demos)
- Subtle gradient or geometric background accent

### 3. Services Section (5 cards)
- AI Customer Support Bot
- AI Lead Qualification Bot
- AI Booking Agent
- AI Quote + Payment Automation
- AI Marketing / Content Automation
- Each card: icon, title, benefit description, key features list, "View Demo" button

### 4. Demo Bots Section (4 demo cards)
- Support Bot, Lead Bot, Booking Bot, Quote Bot
- Each card: bot name, explanation, sample use case, "Open Demo Chat" button
- Clicking opens a modal with a pre-written mock chat conversation showing how the bot works

### 5. How It Works (3 steps)
- Step 1: Understand your business
- Step 2: Build the automation
- Step 3: Launch and improve
- Numbered cards/timeline with icons

### 6. Why Work With Me
- 5 benefit points with icons: practical automation, custom workflows, fast iteration, built for small businesses, real outcomes focus

### 7. Industries Section
- E-commerce, Clinics, Salons, Consultants, Agencies
- Cards with icon, industry name, brief explanation of how AI helps

### 8. Testimonials Section
- 3 placeholder testimonials with names, roles, and quotes
- Carousel or grid layout

### 9. Portfolio Section
- 3-4 placeholder project cards showing automation projects
- Each with title, industry, brief description, results

### 10. Contact Section
- Contact form (name, email, message)
- WhatsApp button (pre-filled message)
- Email link
- Booking CTA (WhatsApp-based)
- Social media icon links

### 11. Footer
- Navigation links, contact info, copyright
- Bilingual

## Technical Approach
- Single-page React app with smooth scroll navigation
- Language context provider with RTL/LTR direction switching
- Translations object for all Hebrew/English content
- Reusable card, section, and button components
- Mobile-first responsive design with Tailwind
- Scroll-triggered fade-in animations
- Mock chat modal component for demo bots

