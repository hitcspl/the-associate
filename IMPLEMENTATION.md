# Implementation Log

## Overview

The Associate homepage is now structured as a Laravel/Inertia feature. Domain
content is loaded from Eloquent models and passed to typed React components.
The page preserves the existing luxury real-estate visual system, responsive
layout, theme switching, carousels, filters, favorites, modals, and mobile
navigation. Inquiry submissions are validated and persisted server-side.

## Database

- `properties` stores featured property records and searchable attributes.
- `property_images` stores ordered gallery images related to properties.
- `services` stores the four service cards and icon identifiers.
- `testimonials` stores testimonial copy, avatars, locations, and residence images.
- `impact_stats` stores the impact banner metrics.
- `inquiries` stores contact submissions, optional property relationships, and inquiry subjects.
- `PropertySeeder` and `ContentSeeder` use stable natural keys and are safe to rerun.
- Factories exist for every new domain model.

## Backend

- `HomeController@index` supplies properties, hero slides, services, stats,
  testimonials, and site imagery to the `welcome` Inertia page.
- `InquiryController@store` persists validated contact submissions and redirects back with a success flash message.
- `StoreInquiryRequest` validates names, email addresses, optional phone numbers,
  inquiry subjects, messages, and optional property IDs.
- `/` is controller-backed and `/inquiries` accepts POST submissions.
- The `inquiries` migration includes the `subject` column and is meant to be run via Laravel migrations in the target environment.
- The live database was missing the `subject` column even though the app code expected it; a dedicated migration was added to repair the existing table without data loss.

## Frontend Structure

- `pages/welcome.tsx` is the typed composition root and owns page-level modal and
  mobile-menu state.
- `components/welcome/site-header.tsx` owns desktop/mobile header navigation and theme controls.
- `hero-section.tsx`, `about-section.tsx`, `featured-properties.tsx`, and
  `property-card.tsx` render the primary discovery experience.
- `search-filter-bar.tsx` renders live location, type, and budget filters.
- `services-section.tsx`, `impact-banner.tsx`, `testimonials-section.tsx`, and
  `cta-banner.tsx` render content sections from backend props.
- `site-footer.tsx` and `mobile-bottom-nav.tsx` provide responsive navigation.
- `property-detail-modal.tsx` continues to support property-specific inquiry entry points.
- `contact-section.tsx` renders the new premium multi-field CTA and inquiry form with inline validation and success states.
- `site-header.tsx` now scrolls to the dedicated `#contact` section instead of opening the old modal flow.
- The form posts the expected fields: `name`, `email`, `phone`, `subject`, and `message`.
- `types/property.ts` contains shared backend-facing interfaces.
- `hooks/use-favorites.ts` persists favorites in local storage.
- `hooks/use-property-filters.ts` owns filter state and derived results.
- `lib/format-price.ts` centralizes currency formatting.

## Theming

Design tokens remain in `resources/css/app.css`, with the existing `.dark`
class strategy driven by `useAppearance`. The extracted components continue to
use the existing background, card, border, muted, gold, and display-font tokens.

## Changelog

- 2026-09-23 - Added the dedicated `#contact` CTA section, anchored header/footer navigation, and premium inquiry form with inline validation and success feedback.
- 2026-09-23 - Added the `subject` field to the existing inquiry flow and updated the model, validation, and migration to persist it server-side.
- 2026-09-23 - Fixed the live MySQL schema mismatch by adding the missing `subject` column through Laravel migration, then refreshed the autoloader and Laravel caches after repairing the malformed Composer manifest and namespace resolution issue.
- 2026-09-22 - Added real-estate migrations, models, factories, idempotent seeders,
  and inquiry persistence.
- 2026-09-22 - Added the controller-backed Inertia contract and server validation.
- 2026-09-22 - Extracted the homepage into typed React sections, hooks, and helpers.
- 2026-09-22 - Added shared section-kicker styling and documented the new structure.
- 2026-09-22 - Removed mandatory Wayfinder generation from Vite startup so the
  frontend can build with the committed route helpers while the local PHP runtime
  is upgraded to the lockfile's required PHP 8.4.1.
- 2026-09-22 - Aligned `composer.json` with the locked PHP 8.4.1 dependency graph
  and removed the missing Bhamas font-face reference so builds use the intended
  Georgia serif fallback without an unresolved asset warning.
