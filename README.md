# Campus Life Super App

A comprehensive, responsive web application designed to enhance the college campus experience by connecting students with events, campus resources, and community engagement tools.

## 📋 Project Overview

**Campus Life Super App** is a multi-page web application that serves as a central hub for campus activities, featuring an interactive events calendar, campus map integration, community board for student interaction, and real-time weather updates to help students plan their activities.

**Author:** Zoie Firkins  
**Course:** Web Development Final Project  
**Academic Year:** 2024-2025

## 🎯 Purpose

This application aims to:
- Centralize campus information in one accessible location
- Foster student community engagement through interactive features
- Provide real-time updates on campus events and weather
- Offer an intuitive, mobile-friendly interface for on-the-go access
- Demonstrate modern web development practices and responsive design principles

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **HTML5** - Semantic markup for accessibility and SEO
- **CSS3** - Custom styling with modern features (Grid, Flexbox, animations)
- **JavaScript (ES6+)** - Interactive features and API integration
- **Bootstrap 5.3.3** - Responsive layout and pre-built components

### External APIs
- **Open-Meteo Weather API** - Real-time weather data for event planning
  - No API key required
  - Provides current conditions for Des Moines, Iowa
  - Updates temperature and weather descriptions dynamically

### Development Tools
- **Git** - Version control
- **GitHub** - Repository hosting and collaboration
- **GitHub Pages** - Static site deployment
- **VS Code** (recommended) - Code editor with HTML/CSS/JS support

### Design Resources
- **Google Maps Embed API** - Interactive campus map
- **Bootstrap Icons** - UI iconography (via CDN)
- **Custom CSS Variables** - Consistent theming with school colors

## 🚀 Features

### 1. Home Page (`index.html`)
- **Hero Section**: Welcoming banner with gradient background
- **Campus Announcements**: Important updates and notifications
- **Image Carousel**: Rotating campus photos with pause/play controls
- **Call-to-Action**: Direct link to events page
- **Responsive Navigation**: Mobile-friendly collapsible menu

### 2. Events Page (`events.html`)
- **Interactive Calendar**: Visual representation of upcoming events
- **Event Cards**: Detailed information for each campus event
- **Weather Widget**: Real-time weather via Open-Meteo API
- **Event Filtering**: Sort events by category (Music, Tech, Art)
- **Click-to-Expand**: Interactive calendar cells for event details

### 3. Campus Map (`map.html`)
- **Embedded Google Maps**: Interactive campus navigation
- **Location Search**: Find buildings and landmarks
- **Quick Suggestions**: Popular location shortcuts
- **Responsive Layout**: Full-width map on mobile devices
- **Accessibility**: Keyboard navigation support

### 4. Community Board (`community.html`)
- **Post Creation**: Students can share updates and announcements
- **Character Counter**: 280-character limit with live feedback
- **Interactive Posts**: Click to view full details (future enhancement)
- **Real-time Posting**: Instant feedback when creating posts
- **User-friendly Interface**: Clean, organized layout

### Common Features Across All Pages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 compliant with semantic HTML
- **Smooth Animations**: CSS transitions and JavaScript interactions
- **Consistent Branding**: School colors (Cardinal Red & Gold) throughout
- **Fast Loading**: Optimized images and minified resources

## 📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git installed on your computer
- Basic command line knowledge
- Text editor (VS Code, Sublime, Atom, etc.)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campus-life-super-app.git
   cd campus-life-super-app
   ```

2. **Project structure should look like this:**
   ```
   campus-life-super-app/
   ├── index.html
   ├── events.html
   ├── map.html
   ├── community.html
