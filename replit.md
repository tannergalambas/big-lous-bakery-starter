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

## Recent Changes (Sep 26, 2025)
### Major Website Transformation Complete
- **Instagram Graph API Integration**: Real Instagram posts with 10-minute refresh, fallback content system
- **Sanity CMS Integration**: Dynamic content management for About page, FAQ, site settings, and navigation
- **Health Monitoring System**: API endpoints for Square (/api/squarehealth), Sanity (/api/sanityhealth), and environment (/api/envdebug) status
- **Advanced Image Optimization**: 160 variant generation script with WebP/AVIF formats and 5 responsive sizes
- **Breadcrumb Navigation**: Professional navigation system across all pages with hierarchy support
- **Dynamic Navigation**: CMS-managed navigation with intelligent icon mapping and reliable fallbacks
- **Owner Documentation**: Comprehensive 83-section guide for independent website management

### Previous Changes (Sep 07, 2025)
- Imported project from GitHub and installed dependencies
- Configured Next.js for Replit environment with proxy compatibility
- Set up environment variables and development workflow on port 5000
- Added cache control headers and deployment configuration
- Updated business model for Austin home bakery with made-to-order messaging

## Environment Configuration
The project uses environment variables for configuration:
- Square API credentials (currently using placeholder values)
- Sanity CMS configuration (optional)
- Next.js public URL configured for Replit environment

## Current Status
- ✅ All starter repository features successfully integrated
- ✅ Next.js server running on port 5000 with comprehensive feature set
- ✅ Sanity CMS fully integrated with dynamic content management
- ✅ Instagram Graph API integration ready for live credentials
- ✅ Health monitoring system operational
- ✅ Image optimization pipeline configured
- ✅ Professional navigation system with CMS control
- ✅ Owner documentation complete for independent management
- ⚠️ Square API credentials needed for live payment functionality
- ⚠️ Instagram API credentials needed for real posts (fallback content active)

## Next Steps for User
1. Configure Square API credentials in environment variables for payment functionality
2. Optionally set up Sanity CMS for content management
3. Customize the bakery content and products as needed