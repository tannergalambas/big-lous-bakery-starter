# Big Lou's Bakery - Next.js Project

## Overview
This is a Next.js e-commerce application for Big Lou's Bakery that integrates with Square for payments and optionally uses Sanity CMS for content management. The project has been successfully configured for the Replit environment.

## Project Architecture
- **Frontend**: Next.js 14.2.5 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Payment Processing**: Square API
- **Content Management**: Sanity CMS (optional)
- **Deployment**: Configured for Replit autoscale deployment

## Recent Changes (Sep 07, 2025)
- Imported project from GitHub
- Installed all dependencies via npm
- Configured Next.js for Replit environment with proxy compatibility
- Set up environment variables with Replit-specific URLs
- Configured development workflow to run on port 5000 with 0.0.0.0 host
- Added cache control headers for proper iframe functionality
- Configured deployment settings for production
- Updated business model references: removed store hours (home bakery), updated location to Austin, Texas
- Changed product freshness messaging from "daily" to "made to order"
- Added shipping disclaimer with asterisk notation for transparency

## Environment Configuration
The project uses environment variables for configuration:
- Square API credentials (currently using placeholder values)
- Sanity CMS configuration (optional)
- Next.js public URL configured for Replit environment

## Current Status
- ✅ Dependencies installed
- ✅ Next.js server running on port 5000
- ✅ Frontend accessible through Replit preview
- ✅ Deployment configuration complete
- ⚠️ Square API credentials need to be configured for payment functionality
- ⚠️ Sanity CMS credentials optional for content management

## Next Steps for User
1. Configure Square API credentials in environment variables for payment functionality
2. Optionally set up Sanity CMS for content management
3. Customize the bakery content and products as needed