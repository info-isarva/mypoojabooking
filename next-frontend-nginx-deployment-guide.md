# Next.js & PHP Co-hosting Deployment Guide (Build Locally & Upload to Hostinger VPS)

This document provides a step-by-step guide to building your new Next.js frontend locally and uploading the completed build to your **Hostinger VPS** alongside your existing PHP website under the domain `mypoojabooking.com`.

---

## Architecture Overview

1. **Legacy PHP Apps**: Run directly from your server's public HTML directory (`/home/[your-username]/public_html`).
2. **Next.js Frontend**: Runs as a live Node.js application in the background on port `3000`. It is built locally on your development machine, and the build outputs are uploaded to `/home/[your-username]/next-frontend`.
3. **Web Server (Nginx or Apache/LiteSpeed)**: Acts as a reverse proxy, checking if a path matches legacy PHP URLs. If it matches, the web server executes PHP. If not, it proxies the request to Next.js.

---

## Step 1: Keep Legacy PHP Files in Place
Ensure all your legacy PHP files and folders remain in `/home/[your-username]/public_html`. Do not move them.

---

## Step 2: Build Locally and Upload to Server

Building Next.js locally prevents high CPU usage and memory strain on your VPS during build times.

### 1. Build the project locally
On your local machine, open your terminal inside the `next-frontend` directory and run:
```bash
npm install
npm run build
```

### 2. Upload files to your Hostinger VPS
Upload the following files and folders from your local machine to `/home/[your-username]/next-frontend` on the server using FTP/SFTP (e.g., FileZilla):
*   `.next/` (The compiled production build - **Crucial**)
*   `public/` (Public assets and icons)
*   `package.json`
*   `package-lock.json`
*   `node_modules/` (Or run `npm install --omit=dev` on the server after uploading to save upload time)

---

## Step 3: Run the Next.js App on the VPS
Connect to your VPS via SSH and start/restart the Next.js application using **PM2**:

```bash
cd /home/[your-username]/next-frontend

# Start the application on port 3000
pm2 start npm --name "next-frontend" -- run start -- -p 3000

# Save PM2 state so it restarts on system reboot
pm2 save
pm2 startup
```

*(If the app was already running, simply run `pm2 restart next-frontend` to apply your uploaded build updates.)*

---

## Step 4 (Option A): Configure Nginx on the VPS
If your server is using **Nginx**, open your configuration file for the domain (typically `/etc/nginx/sites-available/mypoojabooking`) and update it with the routing rules:

```nginx
server {
    listen 80;
    server_name mypoojabooking.com www.mypoojabooking.com;

    # Point this to your Hostinger PHP website root directory
    root /home/[your-username]/public_html;
    index index.php index.html;

    # 1. Booking URLs (e.g., /booking/kashimath/5) handled by legacy PHP
    location ^~ /booking/ {
        try_files $uri $uri/ /booking/index.php?$args;

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Adjust to your PHP version
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }

    # 2. Institution URLs (e.g., /institution/kashimath) handled by legacy PHP
    location ^~ /institution/ {
        try_files $uri $uri/ /institution/index.php?$args;

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Adjust to your PHP version
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }

    # 3. Direct registration script handled by legacy PHP
    location = /bookpooja/register.php {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Adjust to your PHP version
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # 4. Route Next.js assets to the local Next.js server
    location /_next/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    # 5. Route all standard pages to Next.js if the static file doesn't exist
    location / {
        try_files $uri $uri/ @nextjs;
    }

    # Next.js fallback proxy
    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Test and Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 4 (Option B): Configure `.htaccess` (For CyberPanel / Apache / LiteSpeed)
If your server is using **Apache / LiteSpeed / CyberPanel** instead of Nginx, you do not need to modify Nginx config files. Instead, create or edit the `.htaccess` file directly inside `/home/[your-username]/public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Exclude physical files and folders (keeps direct PHP scripts and static assets working)
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 2. Exclude your specific legacy PHP URL directories
  RewriteCond %{REQUEST_URI} ^/booking/ [NC,OR]
  RewriteCond %{REQUEST_URI} ^/institution/ [NC,OR]
  RewriteCond %{REQUEST_URI} ^/bookpooja/ [NC]
  RewriteRule ^ - [L]

  # 3. Proxy all other frontend pages to Next.js running locally on port 3000
  RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>
```

---

## Step 5: Verify URL Routing
Test your setup in a web browser:
*   **Next.js pages**: `https://mypoojabooking.com` and `https://mypoojabooking.com/about`
*   **Legacy PHP scripts**: `https://mypoojabooking.com/bookpooja/register.php`
*   **Legacy directories**: `https://mypoojabooking.com/institution/kashimath` and `https://mypoojabooking.com/booking/kashimath/5`
