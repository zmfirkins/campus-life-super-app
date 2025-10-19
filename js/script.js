/**
 * Campus Life Super App - Main JavaScript
 * Author: Zoie Firkins
 * Description: Interactive features and API integration for campus life application
 */

// Initialize app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Campus Life Super App loaded!");
  
  // Initialize features based on current page
  initializeCurrentPage();
  
  // Add smooth scrolling to all anchor links
  addSmoothScrolling();
  
  // Initialize tooltips if Bootstrap is available
  initializeBootstrapComponents();
});

/**
 * Determines current page and initializes appropriate features
 */
function initializeCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  // Initialize page-specific functionality
  if (page.includes('map.html')) {
    initializeMapPage();
  } else if (page.includes('community.html')) {
    initializeCommunityPage();
  } else if (page.includes('events.html')) {
    initializeEventsPage();
  } else if (page.includes('index.html') || page === '') {
    initializeHomePage();
  }
}

/**
 * Initialize map page functionality
 * Includes search functionality and location services
 */
function initializeMapPage() {
  const searchBtn = document.getElementById("searchBtn");
  const mapSearch = document.getElementById("mapSearch");
  
  if (searchBtn && mapSearch) {
    // Search button click handler
    searchBtn.addEventListener("click", performMapSearch);
    
    // Allow Enter key to trigger search
    mapSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performMapSearch();
      }
    });
    
    // Add sample location suggestions
    addLocationSuggestions();
  }
}

/**
 * Performs map search with user validation
 */
function performMapSearch() {
  const query = document.getElementById("mapSearch").value.trim();
  
  if (query !== "") {
    // Show loading state
    const searchBtn = document.getElementById("searchBtn");
    const originalText = searchBtn.textContent;
    searchBtn.innerHTML = '<span class="loading"></span> Searching...';
    searchBtn.disabled = true;
    
    // Simulate search delay (in production, this would be an actual API call)
    setTimeout(() => {
      alert(`Searching for "${query}"...\n\nIn a full implementation, this would:\n- Update the map view\n- Show location markers\n- Display building information`);
      
      // Restore button state
      searchBtn.textContent = originalText;
      searchBtn.disabled = false;
    }, 800);
  } else {
    alert("Please enter a location to search.");
    document.getElementById("mapSearch").focus();
  }
}

/**
 * Adds location suggestions below search bar
 */
function addLocationSuggestions() {
  const searchContainer = document.querySelector('.input-group');
  if (!searchContainer || document.getElementById('locationSuggestions')) return;
  
  const suggestions = [
    'Library', 'Student Center', 'Dining Hall', 
    'Recreation Center', 'Science Building', 'Art Gallery'
  ];
  
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.id = 'locationSuggestions';
  suggestionsDiv.className = 'mt-2';
  suggestionsDiv.innerHTML = '<small class="text-muted">Popular locations: ' + 
    suggestions.map(s => `<a href="#" class="text-decoration-none me-2" data-location="${s}">${s}</a>`).join('') + 
    '</small>';
  
  searchContainer.parentNode.insertBefore(suggestionsDiv, searchContainer.nextSibling);
  
  // Add click handlers for suggestions
  suggestionsDiv.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('mapSearch').value = e.target.dataset.location;
      performMapSearch();
    });
  });
}

/**
 * Initialize community board page functionality
 * Includes post creation and interaction features
 */
function initializeCommunityPage() {
  const postBtn = document.querySelector('.btn-primary');
  const textarea = document.querySelector('textarea');
  
  if (postBtn && textarea) {
    // Post button click handler
    postBtn.addEventListener('click', () => createPost(textarea));
    
    // Character counter for textarea
    addCharacterCounter(textarea);
    
    // Make existing posts interactive
    makePostsInteractive();
  }
}

/**
 * Creates a new community post
 * @param {HTMLTextAreaElement} textarea - The textarea element with post content
 */
function createPost(textarea) {
  const content = textarea.value.trim();
  
  if (content === "") {
    alert("Please write something before posting!");
    textarea.focus();
    return;
  }
  
  // Create new post element
  const listGroup = document.querySelector('.list-group');
  const newPost = document.createElement('a');
  newPost.href = '#';
  newPost.className = 'list-group-item list-group-item-action flex-column align-items-start community-post';
  
  const now = new Date();
  const timeAgo = 'Just now';
  
  newPost.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">New Post</h5>
      <small>${timeAgo}</small>
    </div>
    <p class="mb-1">${escapeHtml(content)}</p>
    <small>Posted by You</small>
  `;
  
  // Add to top of list
  listGroup.insertBefore(newPost, listGroup.firstChild);
  
  // Clear textarea and show success
  textarea.value = '';
  showSuccessMessage('Post created successfully!');
  
  // Scroll to new post
  newPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Escapes HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Adds character counter to textarea
 * @param {HTMLTextAreaElement} textarea - The textarea element
 */
function addCharacterCounter(textarea) {
  const maxLength = 280;
  const counter = document.createElement('small');
  counter.className = 'text-muted d-block mt-1';
  counter.textContent = `${maxLength} characters remaining`;
  
  textarea.parentNode.insertBefore(counter, textarea.nextSibling);
  
  textarea.addEventListener('input', () => {
    const remaining = maxLength - textarea.value.length;
    counter.textContent = `${remaining} characters remaining`;
    counter.className = remaining < 50 ? 'text-danger d-block mt-1' : 'text-muted d-block mt-1';
  });
  
  textarea.setAttribute('maxlength', maxLength);
}

/**
 * Makes existing posts interactive with hover effects and click handlers
 */
function makePostsInteractive() {
  const posts = document.querySelectorAll('.list-group-item');
  
  posts.forEach(post => {
    post.addEventListener('click', (e) => {
      e.preventDefault();
      alert('In a full implementation, this would:\n- Show full post details\n- Allow commenting\n- Enable reactions\n- Show author profile');
    });
  });
}

/**
 * Initialize events page functionality
 * Includes API integration for dynamic event data
 */
function initializeEventsPage() {
  // Generate dynamic calendar
  generateCalendar();
  
  // Add event filtering
  addEventFilters();
  
  // Fetch and display weather for event planning
  fetchWeatherData();
  
  // Add calendar interactivity
  makeCalendarInteractive();
}

/**
 * Generates a functional calendar for the current month
 */
function generateCalendar() {
  const calendarBody = document.querySelector('.table-bordered tbody');
  if (!calendarBody) return;
  
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const today = now.getDate();
  
  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Event data (you can expand this)
  const events = {
    18: { name: 'Music Festival', time: '6:00 PM', color: '#e3f2fd' },
    19: { name: 'Hackathon', time: '9:00 AM', color: '#f3e5f5' },
    20: { name: 'Art Show', time: '1:00 PM', color: '#fff3e0' }
  };
  
  // Clear existing calendar
  calendarBody.innerHTML = '';
  
  let date = 1;
  let hasMoreDays = true;
  
  // Create calendar rows (max 6 weeks)
  for (let week = 0; week < 6 && hasMoreDays; week++) {
    const row = document.createElement('tr');
    
    // Create cells for each day of week
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement('td');
      
      // Fill in dates only after first day of month starts
      if ((week === 0 && day < firstDay) || date > daysInMonth) {
        cell.innerHTML = '&nbsp;';
        if (date > daysInMonth) hasMoreDays = false;
      } else {
        // Create date number
        const dateNum = document.createElement('div');
        dateNum.className = 'date-number';
        dateNum.textContent = date;
        
        // Highlight today
        if (date === today) {
          dateNum.classList.add('today');
          cell.style.backgroundColor = '#e8f5e9';
        }
        
        cell.appendChild(dateNum);
        
        // Add event if exists for this date
        if (events[date]) {
          const event = events[date];
          cell.style.backgroundColor = event.color;
          
          const eventBtn = document.createElement('button');
          eventBtn.className = 'btn btn-link p-0 text-decoration-none event-link';
          eventBtn.textContent = event.name;
          eventBtn.setAttribute('aria-label', `${event.name} on ${date}`);
          eventBtn.dataset.date = date;
          eventBtn.dataset.event = event.name;
          eventBtn.dataset.time = event.time;
          
          // Add click handler
          eventBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showEventDetails(event.name, date, event.time);
          });
          
          cell.appendChild(eventBtn);
          
          const timeDiv = document.createElement('div');
          timeDiv.className = 'event-time';
          timeDiv.textContent = event.time;
          cell.appendChild(timeDiv);
        }
        
        date++;
      }
      
      row.appendChild(cell);
    }
    
    calendarBody.appendChild(row);
  }
  
  // Update month/year header
  updateCalendarHeader(currentMonth, currentYear);
}

/**
 * Updates calendar header with current month and year
 */
function updateCalendarHeader(month, year) {
  const container = document.querySelector('.table-responsive');
  if (!container || document.getElementById('calendarHeader')) return;
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const header = document.createElement('div');
  header.id = 'calendarHeader';
  header.className = 'text-center mb-3';
  header.innerHTML = `
    <h3 class="h4 mb-0">${months[month]} ${year}</h3>
    <small class="text-muted">Click on any event to see details</small>
  `;
  
  container.insertBefore(header, container.firstChild);
}

/**
 * Shows detailed information about an event
 */
function showEventDetails(eventName, date, time) {
  const eventDetails = {
    'Music Festival': {
      description: 'Join local bands for a night of live performances and food trucks. Free entry for all students!',
      location: 'Main Quad',
      duration: '4 hours'
    },
    'Hackathon': {
      description: 'Compete in coding challenges and win prizes. Open to all skill levels. Teams of 1-4 members.',
      location: 'Computer Science Building',
      duration: '24 hours'
    },
    'Art Show': {
      description: 'Showcasing student art, photography, and sculpture. Free entry! Meet the artists and enjoy refreshments.',
      location: 'Art Gallery',
      duration: '4 hours'
    }
  };
  
  const details = eventDetails[eventName] || {};
  
  // Create modal-like alert
  const message = `
📅 ${eventName}
Date: October ${date}, 2025
Time: ${time}
Location: ${details.location || 'TBA'}
Duration: ${details.duration || 'TBA'}

${details.description || 'More details coming soon!'}

Would you like to add this to your calendar?
  `;
  
  if (confirm(message)) {
    alert('Calendar integration coming soon! For now, mark your calendar manually.');
  }
}

/**
 * Adds filter buttons for event categories
 */
function addEventFilters() {
  const container = document.querySelector('main.container');
  if (!container || document.getElementById('eventFilters')) return;
  
  const filterDiv = document.createElement('div');
  filterDiv.id = 'eventFilters';
  filterDiv.className = 'mb-4 text-center';
  filterDiv.innerHTML = `
    <div class="btn-group" role="group" aria-label="Event filters">
      <button type="button" class="btn btn-outline-primary active" data-filter="all">All Events</button>
      <button type="button" class="btn btn-outline-primary" data-filter="music">Music</button>
      <button type="button" class="btn btn-outline-primary" data-filter="tech">Tech</button>
      <button type="button" class="btn btn-outline-primary" data-filter="art">Art</button>
    </div>
  `;
  
  const h1 = container.querySelector('h1');
  h1.parentNode.insertBefore(filterDiv, h1.nextSibling);
  
  // Add filter functionality
  filterDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterDiv.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Filter events (basic implementation)
      const filter = e.target.dataset.filter;
      filterEvents(filter);
    });
  });
}

/**
 * Filters visible events based on category
 * @param {string} category - Category to filter by
 */
function filterEvents(category) {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    
    if (category === 'all') {
      card.parentElement.style.display = '';
    } else if (
      (category === 'music' && title.includes('music')) ||
      (category === 'tech' && title.includes('hackathon')) ||
      (category === 'art' && title.includes('art'))
    ) {
      card.parentElement.style.display = '';
    } else {
      card.parentElement.style.display = 'none';
    }
  });
}

/**
 * Fetches weather data from weather API
 * Using Open-Meteo API (no API key required)
 */
async function fetchWeatherData() {
  const weatherContainer = document.createElement('div');
  weatherContainer.id = 'weatherWidget';
  weatherContainer.className = 'alert alert-info mb-4';
  weatherContainer.innerHTML = '<span class="loading"></span> Loading weather forecast...';
  
  const container = document.querySelector('main.container');
  const h1 = container.querySelector('h1');
  h1.parentNode.insertBefore(weatherContainer, h1.nextSibling);
  
  try {
    // Des Moines, Iowa coordinates
    const lat = 41.5868;
    const lon = -93.6250;
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago`
    );
    
    if (!response.ok) throw new Error('Weather API request failed');
    
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    const weatherDesc = getWeatherDescription(weatherCode);
    
    weatherContainer.innerHTML = `
      <strong>📅 Event Planning Weather:</strong> 
      Current conditions in Des Moines: ${temp}°F, ${weatherDesc}. 
      <small class="d-block mt-1">Perfect for planning your campus activities!</small>
    `;
  } catch (error) {
    console.error('Error fetching weather:', error);
    weatherContainer.innerHTML = `
      <strong>Weather:</strong> Unable to load current conditions. 
      <small>Check local forecast for event planning.</small>
    `;
  }
}

/**
 * Converts weather code to description
 * @param {number} code - WMO weather code
 * @returns {string} Weather description
 */
function getWeatherDescription(code) {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm'
  };
  
  return weatherCodes[code] || 'Variable conditions';
}

/**
 * Makes calendar cells interactive
 */
function makeCalendarInteractive() {
  // Calendar is now interactive through generateCalendar()
  // Add navigation controls
  addCalendarNavigation();
}

/**
 * Adds previous/next month navigation to calendar
 */
function addCalendarNavigation() {
  const container = document.querySelector('.table-responsive');
  if (!container || document.getElementById('calendarNav')) return;
  
  const nav = document.createElement('div');
  nav.id = 'calendarNav';
  nav.className = 'text-center mb-3';
  nav.innerHTML = `
    <button class="btn btn-sm btn-outline-secondary me-2" id="prevMonth" aria-label="Previous month">
      ← Previous
    </button>
    <button class="btn btn-sm btn-outline-secondary me-2" id="todayBtn" aria-label="Go to today">
      Today
    </button>
    <button class="btn btn-sm btn-outline-secondary" id="nextMonth" aria-label="Next month">
      Next →
    </button>
  `;
  
  container.appendChild(nav);
  
  // Note: Full implementation would require storing current month state
  // For now, these buttons provide UI only
  document.getElementById('prevMonth').addEventListener('click', () => {
    alert('Previous month navigation - Full implementation would show previous month');
  });
  
  document.getElementById('nextMonth').addEventListener('click', () => {
    alert('Next month navigation - Full implementation would show next month');
  });
  
  document.getElementById('todayBtn').addEventListener('click', () => {
    generateCalendar(); // Regenerate current month
    alert('Returned to current month');
  });
}

/**
 * Initialize home page functionality
 */
function initializeHomePage() {
  // Add dynamic announcement fetching
  updateAnnouncements();
  
  // Add carousel auto-play controls
  enhanceCarousel();
}

/**
 * Updates announcements with dynamic content
 */
function updateAnnouncements() {
  const announcementsList = document.querySelector('.list-group');
  if (!announcementsList) return;
  
  // Add "last updated" timestamp
  const timestamp = document.createElement('small');
  timestamp.className = 'text-muted d-block text-center mb-2';
  timestamp.textContent = `Last updated: ${new Date().toLocaleString()}`;
  announcementsList.parentNode.insertBefore(timestamp, announcementsList);
}

/**
 * Enhances carousel with additional controls
 */
function enhanceCarousel() {
  const carousel = document.getElementById('campusCarousel');
  if (!carousel) return;
  
  // Add pause/play button
  const controls = document.createElement('div');
  controls.className = 'text-center mt-2';
  controls.innerHTML = `
    <button class="btn btn-sm btn-outline-secondary" id="carouselToggle">
      <span id="carouselIcon">⏸</span> Pause
    </button>
  `;
  
  carousel.parentNode.insertBefore(controls, carousel.nextSibling);
  
  const toggleBtn = document.getElementById('carouselToggle');
  const icon = document.getElementById('carouselIcon');
  let isPaused = false;
  
  toggleBtn.addEventListener('click', () => {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    
    if (isPaused) {
      bsCarousel.cycle();
      icon.textContent = '⏸';
      toggleBtn.innerHTML = '<span id="carouselIcon">⏸</span> Pause';
    } else {
      bsCarousel.pause();
      icon.textContent = '▶';
      toggleBtn.innerHTML = '<span id="carouselIcon">▶</span> Play';
    }
    
    isPaused = !isPaused;
  });
}

/**
 * Adds smooth scrolling to all anchor links
 */
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/**
 * Initializes Bootstrap components
 */
function initializeBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

/**
 * Shows a success message to the user
 * @param {string} message - Message to display
 */
function showSuccessMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5';
  alert.style.zIndex = '9999';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.remove();
  }, 3000);
}