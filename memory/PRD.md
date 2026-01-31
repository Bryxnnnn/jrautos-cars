# J.R Autos - Car Dealership Website PRD

## Original Problem Statement
Build a modern, professional, mobile-friendly website for a car dealership named J.R Autos in Querétaro, Mexico. Features include: Home, Inventory, Services, About, Contact pages with bilingual support (EN/ES), WhatsApp button, Google Maps integration, contact form, and dark theme matching the logo.

## Business Details
- **Business Name**: J.R Autos
- **Industry**: Auto broker / car dealership
- **Services**: Car leasing and vehicle sales
- **Location**: La Mora, Centro, 76850, Querétaro, Querétaro, Mexico
- **Phone**: +52 448 108 5706
- **Google Rating**: 5.0 stars

## Admin Panel Access
- **URL**: `/admin`
- **Password**: `autos2026`

## What's Been Implemented

### January 31, 2026
- ✅ Complete website with 5 pages: Home, Inventory, Services, About, Contact
- ✅ Dark theme with charcoal background and silver metallic accents
- ✅ Bilingual language toggle (ES/EN) with full translations
- ✅ Hero section with 5.0 Google rating badge
- ✅ Vehicle inventory grid with MongoDB-backed data
- ✅ Services section with 4 service cards
- ✅ Contact form saving to MongoDB with Resend email notifications
- ✅ Google Maps embed on Contact page
- ✅ WhatsApp floating button
- ✅ Phone click-to-call functionality
- ✅ Responsive navigation with mobile menu
- ✅ Footer with business info and social links
- ✅ Framer Motion animations
- ✅ Vehicle detail page with multi-image gallery
- ✅ Inventory filtering by brand and body type
- ✅ Admin panel at `/admin` route for managing vehicles and messages
- ✅ Admin password: `autos2026`
- ✅ SEO with react-helmet-async, sitemap.xml, robots.txt
- ✅ **Image Upload Feature**: Drag-and-drop image uploader in admin panel
- ✅ **FAQ Chatbot**: Bilingual chatbot with pre-written responses that leads to WhatsApp for human support

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, React Router
- **Backend**: FastAPI, Motor (async MongoDB), Pydantic, aiofiles
- **Database**: MongoDB
- **Integrations**: Resend (email notifications)

## Key API Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/vehicles` - List all vehicles
- `POST /api/vehicles` - Create vehicle (admin)
- `GET /api/vehicles/{id}` - Get single vehicle
- `PUT /api/vehicles/{id}` - Update vehicle (admin)
- `DELETE /api/vehicles/{id}` - Delete vehicle (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact-messages` - List messages (admin)
- `POST /api/admin/upload` - Upload vehicle image (admin)
- `GET /api/uploads/{filename}` - Serve uploaded images

## Prioritized Backlog

### P1 (High Priority)
- [ ] Dynamic sitemap generation for SEO

### P2 (Medium Priority)
- [ ] Add "Price" field to vehicle listings
- [ ] Add "Sold" status feature for vehicles
- [ ] Move hardcoded admin email to .env variable

### P3 (Nice to Have)
- [ ] Add customer testimonials section
- [ ] Add blog/news section
- [ ] Add vehicle comparison feature
- [ ] Add financing calculator
