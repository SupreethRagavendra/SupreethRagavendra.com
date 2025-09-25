#!/usr/bin/env python3
"""
Image Downloader for Portfolio Skills Section
Downloads all technology icons from CDN sources and saves them locally
"""

import os
import requests
from urllib.parse import urlparse
import time

def create_images_folder():
    """Create images folder if it doesn't exist"""
    images_folder = "images/skills"
    os.makedirs(images_folder, exist_ok=True)
    return images_folder

def download_image(url, filename, folder):
    """Download image from URL and save to local folder"""
    try:
        print(f"Downloading {filename}...")
        
        # Add headers to avoid blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save the image
        filepath = os.path.join(folder, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Successfully downloaded: {filename}")
        return filepath
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to download {filename}: {e}")
        return None
    except Exception as e:
        print(f"❌ Error saving {filename}: {e}")
        return None

def main():
    """Main function to download all skill images"""
    print("🚀 Starting image download for portfolio skills...")
    
    # Create images folder
    images_folder = create_images_folder()
    
    # Define all images with their URLs and desired filenames
    images_to_download = [
        # Existing images (from Cloudinary)
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1724221811/c573ff5552d6da9a1d28ec4e27cd1445-removebg-preview_w2hkck.png",
            "filename": "html.png"
        },
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1724222003/ac262626eb1e924c85b8b68fe97c2213-removebg-preview_kihgsi.png",
            "filename": "css.png"
        },
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472150/Bootstrap-removebg-preview_opsbke.png",
            "filename": "bootstrap.png"
        },
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1712139571/10_Best_Cheat_Sheets_That_A_Programmer_Must_Have-removebg-preview_daf4wt.png",
            "filename": "javascript.png"
        },
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472150/SQL_Basics___Hands-On_Beginner_SQL_Tutorial_Analyzing_Bike-Sharing-removebg-preview_a0aug6.png",
            "filename": "sql.png"
        },
        {
            "url": "https://res.cloudinary.com/do40wkay9/image/upload/v1733040925/tailwindcss_tynm1s.svg",
            "filename": "tailwind.svg"
        },
        {
            "url": "https://res.cloudinary.com/do40wkay9/image/upload/v1735139876/java-icon-1511x2048-6ikx8301_jmm7hc.png",
            "filename": "java.png"
        },
        {
            "url": "https://res.cloudinary.com/do40wkay9/image/upload/v1733040536/firebsae-removebg-preview_rq7im1.png",
            "filename": "firebase.png"
        },
        {
            "url": "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472151/download__2_-removebg-preview_sjc7gv.png",
            "filename": "python.png"
        },
        {
            "url": "https://res.cloudinary.com/do40wkay9/image/upload/v1735140104/Spring_Boot_oka8ll.svg",
            "filename": "spring-boot.svg"
        },
        
        # New skill images (from CDN)
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
            "filename": "php.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
            "filename": "android-studio.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            "filename": "mysql.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            "filename": "git.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
            "filename": "figma.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "filename": "docker.svg"
        },
        {
            "url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "filename": "responsive-design.svg"
        },
        {
            "url": "https://img.icons8.com/color/48/000000/scrum.png",
            "filename": "agile.png"
        }
    ]
    
    # Download all images
    downloaded_count = 0
    failed_count = 0
    
    for image_info in images_to_download:
        result = download_image(
            image_info["url"], 
            image_info["filename"], 
            images_folder
        )
        
        if result:
            downloaded_count += 1
        else:
            failed_count += 1
        
        # Small delay to be respectful to servers
        time.sleep(0.5)
    
    # Summary
    print(f"\n📊 Download Summary:")
    print(f"✅ Successfully downloaded: {downloaded_count} images")
    print(f"❌ Failed downloads: {failed_count} images")
    print(f"📁 Images saved to: {images_folder}/")
    
    if downloaded_count > 0:
        print(f"\n🎉 Images are ready! You can now update your HTML to use local paths like:")
        print(f"   <img src=\"{images_folder}/html.png\" ... />")

if __name__ == "__main__":
    main()