// ===== AUTHENTICATION & LOGIN =====
let currentUser = null;
let allRosters = [];
let allUpdates = [];

// Demo officers for testing
const demoOfficers = [
    { badge: '001', password: 'password123', name: 'BLESSINGS MALIRANO', rank: 'Police Officer' },
    { badge: '002', password: 'password123', name: 'YAMIKANI SAMVA', rank: 'Police Officer' },
    { badge: '003', password: 'password123', name: 'BRIGHTON MAKUMBA', rank: 'Police Officer' },
    { badge: '004', password: 'password123', name: 'LUWIZA GONDWE', rank: 'Police Officer' },
    { badge: '005', password: 'password123', name: 'SYDNEY CHINGONDO', rank: 'Police Officer' },
    { badge: '006', password: 'password123', name: 'INNOCENT KUMUNDAYAYI', rank: 'Police Officer' },
    { badge: '007', password: 'password123', name: 'ABRAHAM CHATHA', rank: 'Police Officer' },
    { badge: '008', password: 'password123', name: 'DJ BANDA', rank: 'Police Officer' },
    { badge: '009', password: 'password123', name: 'NOEL CHIBWE', rank: 'Police Officer' },
    { badge: '010', password: 'password123', name: 'QUEEN LUNGU', rank: 'Police Officer' },
    { badge: '011', password: 'password123', name: 'VIOLET KATSACHE', rank: 'Police Officer' },
    { badge: '012', password: 'password123', name: 'STEPHANO BLESSINGS', rank: 'Police Officer' },
    { badge: '013', password: 'password123', name: 'MICHEAL CHITEKWERE', rank: 'Police Officer' },
    { badge: '014', password: 'password123', name: 'CHISOMO CHIMKWAYA', rank: 'Police Officer' },
    { badge: '015', password: 'password123', name: 'ALICE TSOKA', rank: 'Police Officer' },
    { badge: '016', password: 'password123', name: 'EVELYNE MALAITCHA', rank: 'Police Officer' },
    { badge: '017', password: 'password123', name: 'GRACE NGULUBE', rank: 'Police Officer' },
    { badge: '018', password: 'password123', name: 'GRACE CHAPOTERA', rank: 'Police Officer' },
    { badge: '019', password: 'password123', name: 'ZAMUMTIMA CHANGADEYA', rank: 'Police Officer' },
    { badge: '020', password: 'password123', name: 'MARTIN WACHEPA', rank: 'Police Officer' },
    { badge: '021', password: 'password123', name: 'PATRICK CHASWEKA', rank: 'Police Officer' },
    { badge: '022', password: 'password123', name: 'RORGERS MWALE', rank: 'Police Officer' },
    { badge: '023', password: 'password123', name: 'CHIMALIZENI CHRISTOPHER', rank: 'Police Officer' },
    { badge: '024', password: 'password123', name: 'GRECIAM WILSON', rank: 'Police Officer' },
    { badge: '025', password: 'password123', name: 'KONDWANI ZULU', rank: 'Police Officer' },
    { badge: '026', password: 'password123', name: 'JONATHAN KALOLO', rank: 'Police Officer' },
    { badge: '027', password: 'password123', name: 'ELIJA MPHINJIKA', rank: 'Police Officer' },
    { badge: '028', password: 'password123', name: 'JOSEPHY WIZILAMU', rank: 'Police Officer' },
    { badge: '029', password: 'password123', name: 'STEVEN KAMPIRA', rank: 'Police Officer' }
];

// Default badge for all users
const DEFAULT_BADGE = 'M260205';

// Load user badge mappings on page load
function loadUserBadges() {
    const saved = localStorage.getItem('mec_user_badges');
    if (saved) {
        userBadges = JSON.parse(saved);
    }
}

function saveUserBadges() {
    localStorage.setItem('mec_user_badges', JSON.stringify(userBadges));
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const badge = document.getElementById('badge').value.trim();
    const username = document.getElementById('username').value.trim().toUpperCase();
    
    // Check if using default badge
    if (badge === DEFAULT_BADGE) {
        // Look for officer by name in demoOfficers
        const officer = demoOfficers.find(o => o.name.toUpperCase() === username);
        
        if (officer) {
            currentUser = {
                badge: DEFAULT_BADGE,
                name: officer.name,
                rank: officer.rank,
                originalBadge: officer.badge
            };
            loginUser(currentUser, true); // true means first login with default badge
            return;
        } else {
            alert('Officer name not found. Please check your name and try again.');
            return;
        }
    }
    
    // Check if using a personal badge (already changed)
    const officer = demoOfficers.find(o => o.badge === badge);
    if (officer) {
        // Check if name matches
        if (officer.name.toUpperCase() === username) {
            currentUser = {
                badge: badge,
                name: officer.name,
                rank: officer.rank,
                originalBadge: officer.badge
            };
            loginUser(currentUser, false);
            return;
        } else {
            alert('Badge number and officer name do not match. Please try again.');
            return;
        }
    }
    
    // Check if it's a previously changed personal badge
    if (userBadges[badge]) {
        if (userBadges[badge].name && userBadges[badge].name.toUpperCase() === username) {
            currentUser = {
                badge: badge,
                name: userBadges[badge].name,
                rank: userBadges[badge].rank || 'Police Officer',
                originalBadge: badge
            };
            loginUser(currentUser, false);
            return;
        }
    }
    
    alert('Invalid badge number or officer name combination. Please try again.');
});

function loginUser(officer, isFirstLogin) {
    // Hide login page, show dashboard
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Update user display
    document.getElementById('username').textContent = officer.name;
    document.getElementById('currentBadge').value = officer.badge;
    
    // Show badge change modal if first login with default badge
    if (isFirstLogin && officer.badge === DEFAULT_BADGE) {
        setTimeout(() => {
            const changeBadgeModal = document.getElementById('changeBadgeModal');
            changeBadgeModal.classList.remove('hidden');
            document.getElementById('newBadge').focus();
        }, 500);
    }
    
    // Load data
    loadRosters();
    loadUpdates();
    updateDashboard();
    
    // Reset form
    document.getElementById('loginForm').reset();
    document.getElementById('badge').value = DEFAULT_BADGE;
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('loginForm').reset();
        document.getElementById('badge').value = DEFAULT_BADGE;
        document.getElementById('username').value = '';
        allRosters = [];
        allUpdates = [];
    }
});

// Change Badge functionality
document.getElementById('changeBadgeBtn').addEventListener('click', function() {
    document.getElementById('changeBadgeModal').classList.remove('hidden');
    document.getElementById('currentBadge').value = currentUser.badge;
    document.getElementById('newBadge').value = '';
    document.getElementById('newBadge').focus();
});

document.getElementById('changeBadgeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newBadge = document.getElementById('newBadge').value.trim();
    
    if (!newBadge) {
        alert('Please enter a new badge number');
        return;
    }
    
    if (newBadge === currentUser.badge) {
        alert('New badge must be different from current badge');
        return;
    }
    
    // Check if badge already exists
    if (userBadges[newBadge] || demoOfficers.find(o => o.badge === newBadge)) {
        alert('This badge number is already in use. Please choose a different one.');
        return;
    }
    
    // Update the badge mapping
    userBadges[newBadge] = {
        name: currentUser.name,
        rank: currentUser.rank
    };
    
    saveUserBadges();
    
    // Update current user
    currentUser.badge = newBadge;
    
    alert(`Badge number successfully changed to: ${newBadge}\n\nYou will need to use this badge number and your name for all future logins.`);
    
    document.getElementById('changeBadgeModal').classList.add('hidden');
    document.getElementById('currentBadge').value = newBadge;
});

// ===== NAVIGATION =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const section = this.getAttribute('data-section');
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Show selected section
        document.getElementById(section + '-section').classList.add('active');
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== DASHBOARD =====
function updateDashboard() {
    // Count officers on duty
    const today = new Date().toISOString().split('T')[0];
    const onDuty = allRosters.filter(r => r.date === today).length;
    const offDuty = demoOfficers.length - onDuty;
    
    document.getElementById('onDuty').textContent = onDuty;
    document.getElementById('offDuty').textContent = offDuty;
    document.getElementById('incidents').textContent = Math.floor(Math.random() * 5);
    
    displayRecentUpdates();
}

function displayRecentUpdates() {
    const updatesList = document.getElementById('updatesList');
    
    if (allUpdates.length === 0) {
        updatesList.innerHTML = '<p class=\"empty-message\">No updates yet</p>';
        return;
    }
    
    updatesList.innerHTML = allUpdates.slice(0, 5).map(update => `
        <div class=\"update-item ${update.priority.toLowerCase()}\">\n            <div class=\"update-header\">\n                <div class=\"update-title\">${update.title}</div>\n                <div class=\"update-priority\">${update.priority}</div>\n            </div>\n            <p>${update.content}</p>\n            <div class=\"update-time\">Posted by: ${update.author}</div>\n        </div>\n    `).join('');\n}

// ===== ROSTER MANAGEMENT =====
const rosterModal = document.getElementById('rosterModal');
const addRosterBtn = document.getElementById('addRosterBtn');
const rosterForm = document.getElementById('rosterForm');

// Route and Position Data
const routePositions = {
    'ROUTE 1 WAREHOUSE': [
        'region',
        'chnsapo roundabout',
        'aret',
        'chilimampunga',
        'bingu stadium',
        'senti',
        'central roundabout',
        'malinya',
        'airwing',
        'c company'
    ],
    'ROUTE 2 RESIDENCE': [
        'c company',
        'petroda',
        'central roundabout',
        'chipasula',
        'matchasi kamuzu barracks',
        'kauma'
    ]
};

// Handle route change to update positions
document.getElementById('route').addEventListener('change', function() {
    const route = this.value;
    const locationSelect = document.getElementById('location');
    
    locationSelect.innerHTML = '<option value="">Select Position</option>';
    
    if (route && routePositions[route]) {
        routePositions[route].forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position.toUpperCase();
            locationSelect.appendChild(option);
        });
    }
});

addRosterBtn.addEventListener('click', function() {
    rosterForm.reset();
    document.getElementById('location').innerHTML = '<option value="">Select Position</option>';
    rosterModal.classList.remove('hidden');
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.add('hidden');
    });
});

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.add('hidden');
    }
});

rosterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const route = document.getElementById('route').value;
    const location = document.getElementById('location').value;
    
    const roster = {
        id: Date.now(),
        badge: document.getElementById('officerSelect').value,
        officerName: getOfficerName(document.getElementById('officerSelect').value),
        route: route,
        location: location,
        date: document.getElementById('date').value,
        shift: document.getElementById('shift').value
    };
    
    allRosters.push(roster);
    saveRosters();
    loadRosters();
    rosterModal.classList.add('hidden');
    alert('Roster assignment added successfully!');
    updateDashboard();
});

function getOfficerName(badge) {
    const officer = demoOfficers.find(o => o.badge === badge);
    return officer ? officer.name : 'Unknown';
}

function loadRosters() {
    const rosterBody = document.getElementById('rosterBody');
    
    if (allRosters.length === 0) {
        rosterBody.innerHTML = '<tr class=\"empty-row\"><td colspan=\"7\">No roster assignments yet</td></tr>';
        return;
    }
    
    rosterBody.innerHTML = allRosters.map(roster => `
        <tr>\n            <td>${roster.badge}</td>\n            <td>${roster.officerName}</td>\n            <td>${roster.route}</td>\n            <td>${roster.location}</td>\n            <td>${roster.date}</td>\n            <td>${roster.shift}</td>\n            <td>\n                <div class=\"action-buttons\">\n                    <button class=\"btn-edit\" onclick=\"editRoster(${roster.id})\">Edit</button>\n                    <button class=\"btn-delete\" onclick=\"deleteRoster(${roster.id})\">Delete</button>\n                </div>\n            </td>\n        </tr>\n    `).join('');\n}

function deleteRoster(id) {
    if (confirm('Are you sure you want to delete this assignment?')) {\n        allRosters = allRosters.filter(r => r.id !== id);
        saveRosters();
        loadRosters();
        updateDashboard();
    }
}

function editRoster(id) {
    const roster = allRosters.find(r => r.id === id);
    if (roster) {
        document.getElementById('officerSelect').value = roster.badge;
        document.getElementById('location').value = roster.location;
        document.getElementById('date').value = roster.date;
        document.getElementById('shift').value = roster.shift;
        
        allRosters = allRosters.filter(r => r.id !== id);
        saveRosters();
        
        rosterModal.classList.remove('hidden');
    }
}

function saveRosters() {
    localStorage.setItem('mec_rosters', JSON.stringify(allRosters));
}

// ===== UPDATES/ANNOUNCEMENTS =====
const updateModal = document.getElementById('updateModal');
const addUpdateBtn = document.getElementById('addUpdateBtn');
const updateForm = document.getElementById('updateForm');

addUpdateBtn.addEventListener('click', function() {
    updateForm.reset();
    updateModal.classList.remove('hidden');
});

updateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const update = {
        id: Date.now(),
        title: document.getElementById('updateTitle').value,
        content: document.getElementById('updateContent').value,
        priority: document.getElementById('updatePriority').value,
        author: currentUser.name,
        timestamp: new Date().toLocaleString()
    };
    
    allUpdates.unshift(update);
    saveUpdates();
    loadUpdates();
    updateModal.classList.add('hidden');
    alert('Update posted successfully!');
    updateDashboard();
});

function loadUpdates() {
    const updatesList = document.getElementById('dashboardUpdates');
    
    if (allUpdates.length === 0) {
        updatesList.innerHTML = '<p class=\"empty-message\">No updates posted yet</p>';
        return;
    }
    
    updatesList.innerHTML = allUpdates.map(update => `
        <div class=\"update-item ${update.priority.toLowerCase()}\">\n            <div class=\"update-header\">\n                <div class=\"update-title\">${update.title}</div>\n                <div class=\"update-priority\">${update.priority}</div>\n            </div>\n            <p>${update.content}</p>\n            <div class=\"update-time\">By: ${update.author} | ${update.timestamp}</div>\n        </div>\n    `).join('');\n}

function saveUpdates() {
    localStorage.setItem('mec_updates', JSON.stringify(allUpdates));
}

// ===== PERSONNEL MANAGEMENT =====
function loadPersonnel() {
    const personnelBody = document.getElementById('personnelBody');
    
    if (demoOfficers.length === 0) {
        personnelBody.innerHTML = '<tr class=\"empty-row\"><td colspan=\"5\">No personnel records</td></tr>';
        return;
    }
    
    personnelBody.innerHTML = demoOfficers.map(officer => `
        <tr>\n            <td>${officer.badge}</td>\n            <td>${officer.name}</td>\n            <td>${officer.rank}</td>\n            <td><span style=\"color: #27ae60; font-weight: 600;\">Active</span></td>\n            <td>security@mec.gov.mw</td>\n        </tr>\n    `).join('');\n}

// ===== INITIALIZATION =====
window.addEventListener('load', function() {
    // Load from localStorage if available\n    const savedRosters = localStorage.getItem('mec_rosters');
    const savedUpdates = localStorage.getItem('mec_updates');
    
    if (savedRosters) allRosters = JSON.parse(savedRosters);
    if (savedUpdates) allUpdates = JSON.parse(savedUpdates);
    
    loadPersonnel();
    loadUserBadges();
});

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});

