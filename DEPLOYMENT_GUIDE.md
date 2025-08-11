# Deployment Guide for bebitterbebetter.com.br

## 🚀 Your website is ready for deployment

### Files Ready for Upload

Your build is complete and all files are in the `dist/` folder:

- `index.html` - Main HTML file
- `assets/` - CSS and JavaScript files
- `.htaccess` - Server configuration for React Router
- `favicon.ico` - Website icon
- `placeholder.svg` - Placeholder image
- `robots.txt` - SEO configuration

## 📋 Deployment Steps

### Option 1: Hostinger File Manager (Recommended)

1. **Login to Hostinger**
   - Go to <https://hpanel.hostinger.com/>
   - Login with your credentials

2. **Access File Manager**
   - In your hosting panel, click on "File Manager"
   - Navigate to your domain folder (bebitterbebetter.com.br)
   - Open the `public_html` folder (or similar)

3. **Upload Files**
   - Delete any existing files in the public_html folder
   - Upload ALL files from the `dist/` folder:
     - `index.html`
     - `assets/` folder (entire folder)
     - `.htaccess`
     - `favicon.ico`
     - `placeholder.svg`
     - `robots.txt`

### Option 2: Using the Deployment Package

1. **Download the package**
   - The file `bebitter-final-deployment.tar.gz` contains all necessary files

2. **Upload and Extract**
   - Upload the tar.gz file to your domain's public_html folder
   - Extract it using File Manager or terminal access

### Option 3: FTP Upload

1. **Get FTP credentials from Hostinger**
   - In your hosting panel, find FTP accounts
   - Use the main FTP account for your domain

2. **Upload files**
   - Connect with an FTP client (FileZilla, WinSCP, etc.)
   - Upload all contents of the `dist/` folder to public_html

## ⚙️ Important Configuration

### Domain DNS Settings

Make sure your domain `bebitterbebetter.com.br` is pointing to your Hostinger server:

- A record should point to your server's IP
- You can check this in your domain management area

### SSL Certificate

- Enable SSL/HTTPS in your Hostinger panel
- Your site should be accessible via <https://bebitterbebetter.com.br>

## 🔧 The .htaccess File

The included `.htaccess` file ensures:

- React Router works correctly (all routes redirect to index.html)
- Security headers are set
- Static assets are cached for better performance
- File compression is enabled

## 🚀 After Deployment

1. **Test your website**
   - Visit <https://bebitterbebetter.com.br>
   - Test all navigation links
   - Check that the site loads correctly on mobile

2. **Clear browser cache** if you see old content

## 🔄 Future Updates

To update your website:

1. Make changes to your code
2. Run `pnpm build`
3. Upload the new files from `dist/` folder
4. Or use the `deploy.sh` script for automated packaging

## 🆘 Troubleshooting

- **404 errors on page refresh**: Make sure `.htaccess` file is uploaded
- **Broken styling**: Ensure the `assets/` folder is uploaded completely
- **Site not loading**: Check DNS settings and SSL configuration

---

Your React application should now be live at <https://bebitterbebetter.com.br>! 🎉
