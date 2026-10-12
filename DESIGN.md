---
name: 孟祥竣 Bright Meng
description: 月台上的硬紙車票：每一項經歷都是一張打了日期的票
colors:
  platform-concrete: "#d9dddb"
  platform-concrete-deep: "#cdd2cf"
  concrete-line: "#b7bdb9"
  signal-ink: "#1b1e23"
  ink-secondary: "#3f444c"
  ink-tertiary: "#50555c"
  sign-white: "#f9faf8"
  sign-band-navy: "#23364a"
  sign-band-text: "#f4f1e8"
  tactile-yellow: "#e8b923"
  stock-research-pink: "#f2bfcc"
  stock-project-blue: "#b5d3ea"
  stock-experience-orange: "#f4c88b"
  stock-skill-green: "#cbe3b3"
  ink-research: "#8a2440"
  ink-project: "#1f4f7a"
  ink-experience: "#7a4a0c"
  ink-skill: "#35611d"
  punch-stamp-red: "#c62a1f"
typography:
  display:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(52px, 7vw, 84px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.06em"
  headline:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.6vw, 42px)"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.03em"
  title:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "25px"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.02em"
  body:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.1em"
  romanized:
    fontFamily: "Barlow Semi Condensed, Noto Sans TC, sans-serif"
    fontSize: "clamp(17px, 1.6vw, 21px)"
    fontWeight: 600
    letterSpacing: "0.32em"
  machine-print:
    fontFamily: "DotGothic16, Noto Sans TC, monospace"
    fontSize: "15px"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  ticket-inner: "3px"
  window: "4px"
  ticket: "5px"
  sign: "6px"
  stub-large: "8px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "28px"
  section: "96px"
components:
  ticket-window-button:
    backgroundColor: "{colors.sign-white}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.window}"
    padding: "9px 18px"
    height: "44px"
  ticket-stub-filter:
    backgroundColor: "{colors.sign-white}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.window}"
    padding: "6px 16px 6px 22px"
    height: "42px"
  ticket-project:
    backgroundColor: "{colors.stock-project-blue}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.ticket}"
    width: "272px"
    height: "148px"
  ticket-skill:
    backgroundColor: "{colors.stock-skill-green}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.ticket}"
    width: "214px"
    height: "124px"
  link-button-dark:
    backgroundColor: "{colors.signal-ink}"
    textColor: "{colors.sign-white}"
    rounded: "{rounded.window}"
    padding: "9px 18px"
    height: "44px"
---

# Design System: 孟祥竣 Bright Meng

## Overview

**Creative North Star: "The Platform Ticket Rack"（月台硬票）**

The page is a railway platform in daylight. Every piece of work is a Taiwanese Edmondson card ticket: pastel cardboard stock, a printed serial and date, a heavy black title set like a station name, and a hole punched when you open it. The person is the journey; the route bar at the top reads like a line map from the bank to AI.

Density is low and type is large. Readability beats ornament, because the visitors are interviewers who need to find facts quickly. Color lives in the ticket stock, never in the type. The surface is light: the user explicitly rejected "too dark, too techy" and anything that reads as AI-generated.

**Key Characteristics:**
- Cool concrete ground with a fine grit texture; a yellow tactile strip marks the platform edge.
- Opaque card tickets floating on a 3D sphere; depth is shown by mixing toward concrete, never by transparency.
- Station-sign typography: Noto Sans TC Black for names, DotGothic16 for machine-printed numbers.
- A single red, reserved for the punch stamp.

## Colors

Four ticket stocks on neutral concrete, with ink that stays ink.

### Primary
- **Ticket stocks** (research pink, project blue, experience orange, skill green): the category system. They appear only as the paper of a ticket, a filter stub, or a timetable swatch.
- **Stock inks** (deep pink, navy, umber, moss): the printed fields on each stock (serial, date, category box). They keep text contrast above 4.5:1 on their own stock.

### Secondary
- **Punch Stamp Red**: used only for the "已剪票" stamp on an opened ticket.
- **Tactile Yellow**: the platform-edge strip, the next-station dot, and text selection.

### Neutral
- **Platform Concrete** and **Concrete Deep**: the page ground and the fade target for far tickets.
- **Signal Ink**: all primary text, borders on signs, windows and stubs.
- **Ink Secondary / Ink Tertiary**: supporting text. Tertiary is the floor for contrast on concrete.
- **Sign White**: station sign, ticket windows, and the large ticket stub.
- **Sign Band Navy**: the prev/next band under the station sign.

### Named Rules
**The Ink Stays Ink Rule.** Text on a ticket is always ink or that stock's ink. Color belongs to the paper.
**The One Red Rule.** Red appears only as the punch stamp. Nothing else on the page may use it.

## Typography

**Display Font:** Noto Sans TC 900 (with system-ui)
**Body Font:** Noto Sans TC 400–700
**Label/Mono Font:** DotGothic16 for serials, dates and times; Barlow Semi Condensed for romanized names.

**Character:** a station sign voice. A heavy, wide-set Chinese name sits next to dot-matrix numerals that look printed by a ticket machine.

### Hierarchy
- **Display** (900, clamp(52px, 7vw, 84px), 1): the name on the station sign only.
- **Headline** (900, clamp(30px, 4.6vw, 42px), 1.2): the large ticket stub title and the timetable heading.
- **Title** (900, 25px; 21px on mobile): ticket titles and timetable names (19px).
- **Body** (400, 17px, 1.75): detail text, capped at 62ch.
- **Label** (700, 14px, 0.1em tracking): ticket band labels, category boxes, legend stubs.

### Named Rules
**The Machine Print Rule.** Numbers that are data (serials, dates, years) are set in DotGothic16. Prose numbers stay in Noto Sans TC.
**The No Eyebrow Rule.** Nothing sits above a title as a label. Category is a field in the bottom row of a ticket.

## Layout

The first viewport is the platform: a full-width stage whose height is the viewport minus the measured route bar. On wide screens the station sign is pinned top-left and the ticket sphere is pushed right by 13% of the stage width. The legend of ticket stubs sits bottom-center above the yellow strip. On screens under 760px the sign stacks above a 58svh stage and the route bar scrolls to show the next stop. Below the platform, the timetable is a single column capped at 1120px with 96px of space above it.

## Elevation & Depth

Depth comes from the 3D projection: scale, stacking order and a color mix toward concrete as tickets move back. Shadows are soft and offset, never zero-blur blocks.

### Shadow Vocabulary
- **Ticket rest** (`0 10px 22px -10px rgba(25,35,32,.45), 0 2px 4px rgba(25,35,32,.12)`): cardboard resting above the platform.
- **Ticket near** (`0 18px 30px -12px rgba(25,35,32,.5), 0 3px 6px rgba(25,35,32,.14)`): a ticket lifted by the nearby cursor.
- **Sign** (`0 18px 40px -18px rgba(40,32,20,.35)`): the station sign standing off the wall.
- **Window** (`0 6px 16px -8px rgba(20,28,26,.45)`): ticket-window buttons.

### Named Rules
**The Hard Card Rule.** Tickets are never transparent. A far ticket fades into the concrete; its text never shows through a near ticket.

## Shapes

Small, practical corners: tickets 5px with a 3px inner printed frame, windows and stubs 4px, the sign 6px, the large stub 8px. The punch hole is the one circle on a ticket. Stubs carry a dotted perforation line on their left edge.

## Components

### Buttons
- **Ticket window (contact):** sign white with a 2px ink border and a 1px inset outline, so it reads as a framed counter window. On hover it lifts 2px and the shadow deepens.
- **Dark link (inside a stub):** ink fill with white text and an outward arrow icon; the hover color is the stock ink.

### Chips
- **Ticket stub filter:** the stock color with an ink border and a dotted perforation. When selected it gets a 2px ring of concrete and then ink.

### Signature: Ticket
Serial and date on the top row, a centered black title, then the description and a boxed category on the bottom row. Clicking punches a hole, rotates the sphere so the ticket faces front, and opens the large stub.

### Signature: Large stub
A sticky band in the stock color holds the category, serial, close button and the red stamp. Below are the title, body, the "經由" (via) line for the tech stack, and link buttons.

### Navigation
The route bar is a line map: ink track, white station dots, a yellow dot for the next stop. Dates are machine print.

## Do's and Don'ts

### Do:
- **Do** add new work as a ticket in `data.js` with a type, title, sub line and date; the stock color follows the type.
- **Do** keep every ticket opaque and fade depth through the `--k` color mix.
- **Do** set data numbers in DotGothic16 and keep body text at 17px or larger.

### Don't:
- **Don't** use red anywhere except the punch stamp.
- **Don't** add a dark theme or neon accents; the user rejected "too dark, too techy".
- **Don't** put a label above a title, use zero-blur block shadows, or use text glyphs as icons.
