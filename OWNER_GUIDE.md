# Big Lou's Bakery - Owner's Guide

Welcome to your comprehensive website management guide! This document will help you maintain and update your bakery website like a pro.

## 🏠 **Your Website Overview**

Your Big Lou's Bakery website is a modern, professional e-commerce platform with these key features:
- **Square Payments**: Secure checkout and payment processing
- **Sanity CMS**: Easy content management for pages, FAQ, and settings
- **Instagram Integration**: Real Instagram posts displayed on your site
- **Image Optimization**: Automatic image compression for fast loading
- **Health Monitoring**: Built-in system checks for all integrations

---

## 🎛️ **Content Management with Sanity CMS**

### Accessing Your CMS
1. Visit: `your-website-url/studio`
2. Sign in with your Sanity account credentials
3. You'll see your content dashboard

### What You Can Edit

#### **About Page Content**
- **Title**: Change "About Big Lou's Bakery" to anything you want
- **Content**: Update your story, description, and business details  
- **Image**: Upload a new hero image for the about page

#### **FAQ Management**
- **Add Questions**: Create new frequently asked questions
- **Edit Answers**: Update responses to customer inquiries
- **Reorder**: Drag and drop to change the order questions appear

#### **Site Settings** 
- **Site Name**: Change "Big Lou's Bakery" globally
- **Contact Information**: Update email, phone, address
- **Social Media**: Add/update Instagram, Facebook links

### How to Make Changes
1. Click on the content type you want to edit (About, FAQ, Site Settings)
2. Make your changes in the editor
3. Click **"Publish"** to make changes live
4. Changes appear on your website within a few minutes

---

## 💳 **Square Payments Setup**

### Getting Your API Keys
1. Log into your [Square Dashboard](https://squareup.com/dashboard)
2. Go to **Developer** → **My Applications**
3. Copy your **Application ID** and **Access Token**

### Adding Keys to Your Website
1. In your Replit environment, go to **Secrets** (lock icon)
2. Add these secrets:
   - `SQUARE_ACCESS_TOKEN`: Your Square access token
   - `SQUARE_LOCATION_ID`: Your Square location ID
   - `SQUARE_ENVIRONMENT`: Use `sandbox` for testing, `production` for live

### Testing Payments
- Use Square's test credit cards in sandbox mode
- Switch to production when ready to accept real payments

---

## 📸 **Instagram Integration**

### Setting Up Real Instagram Posts
1. Convert your Instagram to a Business or Creator account
2. Get your **Instagram User ID** and **Access Token** from Facebook Developer
3. Add these to your website secrets:
   - `IG_USER_ID`: Your Instagram user ID
   - `INSTAGRAM_GRAPH_TOKEN`: Your access token

### Managing Instagram Display
- Posts automatically refresh every 10 minutes
- If Instagram API fails, the site shows safe fallback content
- Images are automatically optimized for web display

---

## 🖼️ **Image Management**

### Adding New Product Images
1. Upload images to the `public` folder in your project
2. Run the optimization command: `npm run img:optimize`
3. This creates multiple sizes and formats for fast loading

### Image Best Practices
- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Size**: Original images can be large; optimization handles the rest
- **Naming**: Use descriptive filenames like `chocolate-chip-cookies.jpg`

### What Image Optimization Does
- Creates 5 different sizes (400px to 2000px wide)
- Converts to modern formats (WebP and AVIF)
- Reduces file sizes by 50-80% while maintaining quality

---

## 🔧 **System Health Monitoring**

Your website has built-in health checks to monitor all integrations:

### Health Check URLs
- **Square API**: `your-website/api/squarehealth`
- **Sanity CMS**: `your-website/api/sanityhealth`  
- **Environment Debug**: `your-website/api/envdebug`

### What Each Check Shows
- ✅ **Green status**: Everything working properly
- ⚠️ **Yellow warning**: Minor issues or missing optional features
- ❌ **Red error**: Critical problems that need attention

### How to Use Health Checks
1. Visit the URLs above to see current status
2. Check these if you notice website issues
3. Share the results with your developer for troubleshooting

---

## 📝 **Regular Maintenance Tasks**

### Weekly
- [ ] Check that new orders are coming through Square
- [ ] Review and respond to contact form submissions
- [ ] Update FAQ if you get recurring questions

### Monthly  
- [ ] Run health checks to ensure all systems are working
- [ ] Update About page content if anything changes
- [ ] Review Instagram integration is showing recent posts

### As Needed
- [ ] Add new products to your Square catalog
- [ ] Update contact information in Sanity CMS
- [ ] Run `npm run img:optimize` after adding new images

---

## 🚨 **Troubleshooting Common Issues**

### "No Products Found" on Shop Page
**Cause**: Square API connection issue
**Solution**: 
1. Check `/api/squarehealth` 
2. Verify Square credentials in Secrets
3. Ensure Square location has products

### Instagram Not Showing Recent Posts
**Cause**: API token expired or rate limit
**Solution**:
1. Check `/api/sanityhealth`
2. Refresh Instagram access token
3. Fallback content will show until fixed

### Images Loading Slowly
**Cause**: Images not optimized
**Solution**:
1. Run `npm run img:optimize`
2. Check that optimized images exist in `public/optimized/`
3. New images automatically use optimized versions

### Contact Form Not Working
**Cause**: Form submission endpoint issue
**Solution**:
1. Check console for errors
2. Verify form fields are filled correctly
3. Contact your developer if problems persist

---

## 🔐 **Security Best Practices**

### API Keys and Secrets
- ✅ **Never share** your Square access tokens
- ✅ **Use Sandbox mode** for testing
- ✅ **Rotate tokens** periodically for security
- ✅ **Monitor Square dashboard** for unusual activity

### Content Management
- ✅ **Use strong passwords** for Sanity CMS
- ✅ **Review content** before publishing
- ✅ **Keep backups** of important content
- ✅ **Only give access** to trusted team members

---

## 📞 **Getting Help**

### When to Contact Your Developer
- Setting up new integrations
- Major design changes
- Performance issues
- Security concerns
- Adding new features

### What Information to Provide
1. **Exact error messages** (copy and paste)
2. **Health check results** from monitoring URLs
3. **Steps to reproduce** the problem
4. **Screenshots** if visual issues

### Self-Service Resources
- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **Square Developer Docs**: [developer.squareup.com](https://developer.squareup.com)
- **Health Check Pages**: Use the monitoring URLs above

---

## 🎯 **Quick Reference**

### Important URLs
- **Website**: Your live bakery website
- **CMS**: `your-website/studio`
- **Square Dashboard**: [squareup.com/dashboard](https://squareup.com/dashboard)

### Key Commands
- **Optimize Images**: `npm run img:optimize`
- **Deploy Changes**: Automatic when you push to main branch
- **Check Health**: Visit the health check URLs

### Emergency Contacts
- **Developer**: [Your developer's contact info]
- **Square Support**: [Square support contact]
- **Sanity Support**: [Sanity support contact]

---

*This guide was created for Big Lou's Bakery website. Keep it handy for managing your online presence like a pro!* 🥖✨