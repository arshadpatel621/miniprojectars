// EduCartoon Website JavaScript - Complete Interactive Functionality

// Global Variables
let currentClass = null;
let currentSubject = null;
let currentTopic = null;
let currentEngineeringBranch = null;
let currentEngineeringYear = null;
let currentSemester = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollReveal();
    initializeAnimations();
    initializeModals();
    initializeNavigation();
    initializePasswordToggle();
    initializeSearchFunctionality();
    initializeMobileMenu();
    console.log('✅ EduCartoon website initialized successfully!');
});

// Initialize search functionality
function initializeSearchFunctionality() {
    // Add Enter key support for search input
    const searchInput = document.getElementById('search-query');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }
    
    // Close search modal when clicking outside
    document.addEventListener('click', function(event) {
        const searchModal = document.getElementById('search-modal');
        if (searchModal && event.target === searchModal) {
            closeSearchModal();
        }
    });
    
    // Close search modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const searchModal = document.getElementById('search-modal');
            if (searchModal && !searchModal.classList.contains('hidden')) {
                closeSearchModal();
            }
        }
    });
}

// Scroll Reveal Animation
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize various animations
function initializeAnimations() {
    // Add staggered animation delays to class cards
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays to subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// Navigation and Modal Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal Functions
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const signinModal = document.getElementById('signin-modal');
        if (signinModal && event.target === signinModal) {
            closeSignInModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSignInModal();
            closeVideoModal();
        }
    });
}

// Sign-in Modal Functions
function openSignInModal() {
    const modal = document.getElementById('signin-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input after animation
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 500);
    }
}

function closeSignInModal() {
    const modal = document.getElementById('signin-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Password toggle functionality
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input && input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else if (input && input.type === 'text') {
                input.type = 'password';
                this.textContent = '👁';
            }
        });
    });
}

// Video Modal Functions
function openVideoModal() {
    alert('🎬 Sample video feature coming soon! This will show AI-generated educational videos.');
}

function closeVideoModal() {
    // Future implementation for video modal
    console.log('Video modal closed');
}

// Search Modal Functions
function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on search input after animation
        setTimeout(() => {
            const searchInput = document.getElementById('search-query');
            if (searchInput) searchInput.focus();
        }, 300);
    }
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Clear search results
        const resultsDiv = document.getElementById('search-results');
        if (resultsDiv) {
            resultsDiv.classList.add('hidden');
        }
        
        // Clear search input
        const searchInput = document.getElementById('search-query');
        if (searchInput) {
            searchInput.value = '';
        }
    }
}

function performSearch() {
    const searchQuery = document.getElementById('search-query').value.trim();
    if (!searchQuery) {
        alert('Please enter something to search!');
        return;
    }
    
    // Show search results
    const resultsDiv = document.getElementById('search-results');
    if (resultsDiv) {
        resultsDiv.classList.remove('hidden');
    }
    
    // Simulate search results
    displaySearchResults(searchQuery);
}

function quickSearch(query) {
    const searchInput = document.getElementById('search-query');
    if (searchInput) {
        searchInput.value = query;
        performSearch();
    }
}

function displaySearchResults(query) {
    const resultsList = document.getElementById('search-results-list');
    if (!resultsList) return;
    
    // Sample search results based on query
    const sampleResults = generateSearchResults(query);
    
    resultsList.innerHTML = '';
    
    sampleResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.onclick = () => selectSearchResult(result);
        
        resultItem.innerHTML = `
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-description">${result.description}</div>
            <div class="search-result-tags">
                ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

function generateSearchResults(query) {
    const lowerQuery = query.toLowerCase();
    
    // Sample search results database
    const allResults = [
        {
            title: "Linear Equations",
            description: "Learn how to solve linear equations with step-by-step AI explanations",
            tags: ["Math", "Algebra", "Grade 9"],
            class: "9",
            subject: "mathematics",
            topic: "linear-equations"
        },
        {
            title: "Photosynthesis",
            description: "Understanding how plants make food through photosynthesis",
            tags: ["Biology", "Science", "Grade 7"],
            class: "7",
            subject: "science",
            topic: "photosynthesis"
        },
        {
            title: "Chemical Bonding",
            description: "Learn about ionic and covalent bonds in chemistry",
            tags: ["Chemistry", "Science", "Grade 10"],
            class: "10",
            subject: "science",
            topic: "chemical-bonding"
        },
        {
            title: "Quadratic Equations",
            description: "Master quadratic equations and their solutions",
            tags: ["Math", "Algebra", "Grade 10"],
            class: "10",
            subject: "mathematics",
            topic: "quadratic-equations"
        },
        {
            title: "Newton's Laws",
            description: "Understanding the three laws of motion",
            tags: ["Physics", "Science", "Grade 11"],
            class: "11",
            subject: "science",
            topic: "newtons-laws"
        },
        {
            title: "Programming Basics",
            description: "Introduction to programming concepts and logic",
            tags: ["Computer Science", "Programming", "Engineering"],
            class: "engineering",
            subject: "computer-programming",
            topic: "programming-basics"
        },
        {
            title: "Calculus Derivatives",
            description: "Learn how to find derivatives using AI-powered explanations",
            tags: ["Math", "Calculus", "Grade 12"],
            class: "12",
            subject: "mathematics",
            topic: "derivatives"
        },
        {
            title: "Organic Chemistry",
            description: "Introduction to organic compounds and reactions",
            tags: ["Chemistry", "Science", "Grade 12"],
            class: "12",
            subject: "science",
            topic: "organic-chemistry"
        }
    ];
    
    // Filter results based on query
    return allResults.filter(result => {
        return result.title.toLowerCase().includes(lowerQuery) ||
               result.description.toLowerCase().includes(lowerQuery) ||
               result.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    }).slice(0, 6); // Limit to 6 results
}

function selectSearchResult(result) {
    // Close search modal
    closeSearchModal();
    
    // Navigate to the selected result
    if (result.class === 'engineering') {
        // Handle engineering results
        alert(`🎓 Engineering content coming soon: ${result.title}`);
    } else {
        // Navigate to regular class/subject/topic
        currentClass = result.class;
        currentSubject = result.subject;
        currentTopic = result.topic;
        
        // Update UI to show selected class
        document.getElementById('selected-class').textContent = `${result.class}${getOrdinalSuffix(result.class)} Grade`;
        document.getElementById('selected-class-topic').textContent = `${result.class}${getOrdinalSuffix(result.class)} Grade`;
        document.getElementById('selected-subject').textContent = result.subject.charAt(0).toUpperCase() + result.subject.slice(1);
        
        // Hide all sections first
        document.getElementById('classes').style.display = 'none';
        document.getElementById('subjects').style.display = 'none';
        document.getElementById('topics').style.display = 'none';
        
        // Show video player with selected topic
        showVideoPlayerForSearch(result.class, result.subject, result.topic, result.title);
    }
}

// Class Selection Functions
function selectClass(classNumber) {
    currentClass = classNumber;
    document.getElementById('selected-class').textContent = `${classNumber}${getOrdinalSuffix(classNumber)} Grade`;
    document.getElementById('selected-class-topic').textContent = `${classNumber}${getOrdinalSuffix(classNumber)} Grade`;
    
    // Hide classes section and show subjects section
    document.getElementById('classes').style.display = 'none';
    document.getElementById('subjects').style.display = 'block';
    
    // Scroll to subjects section
    scrollToSection('subjects');
    
    console.log(`Selected class: ${classNumber}`);
}

function backToClassSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    document.getElementById('subjects').style.display = 'none';
    document.getElementById('topics').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('engineering-branches').style.display = 'none';
    document.getElementById('engineering-years').style.display = 'none';
    document.getElementById('engineering-semesters').style.display = 'none';
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('subject-modules').style.display = 'none';
    document.getElementById('classes').style.display = 'block';
    
    // Reset selections
    currentClass = null;
    currentSubject = null;
    currentTopic = null;
    currentEngineeringBranch = null;
    currentEngineeringYear = null;
    currentSemester = null;
    
    scrollToSection('classes');
}

// Subject Selection Functions
function selectSubject(subject) {
    currentSubject = subject;
    const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById('selected-subject').textContent = subjectName;
    
    // Hide subjects section and show topics section
    document.getElementById('subjects').style.display = 'none';
    document.getElementById('topics').style.display = 'block';
    
    // Generate and display topics for the selected subject and class
    generateTopics(subject, currentClass);
    
    scrollToSection('topics');
    
    console.log(`Selected subject: ${subject} for class ${currentClass}`);
}

function backToSubjectSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    document.getElementById('topics').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('subjects').style.display = 'block';
    
    currentSubject = null;
    currentTopic = null;
    
    scrollToSection('subjects');
}

// Topic Generation and Selection
function generateTopics(subject, classNumber) {
    const topicsContainer = document.getElementById('topics-container');
    topicsContainer.innerHTML = '';
    
    const topics = getTopicsForSubject(subject, classNumber);
    
    topics.forEach((topic, index) => {
        const topicCard = document.createElement('div');
        topicCard.className = 'cursor-pointer group scroll-reveal';
        topicCard.style.animationDelay = `${index * 0.1}s`;
        topicCard.onclick = () => selectTopic(topic);
        
        topicCard.innerHTML = `
            <div class="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center topic-card">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span class="text-white font-bold">${index + 1}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${topic}</h3>
                <p class="text-sm text-gray-600">Click to generate AI video</p>
            </div>
        `;
        
        topicsContainer.appendChild(topicCard);
    });
    
    // Re-initialize scroll reveal for new elements
    initializeScrollReveal();
}

function selectTopic(topic) {
    currentTopic = topic;
    
    // Update video player with selected information
    document.getElementById('video-class').textContent = `${currentClass}${getOrdinalSuffix(currentClass)} Grade`;
    document.getElementById('video-subject').textContent = currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1);
    document.getElementById('video-topic').textContent = topic;
    document.getElementById('video-title').textContent = `${topic} - Interactive Learning`;
    
    // Hide topics section and show video player
    document.getElementById('topics').style.display = 'none';
    document.getElementById('video-player').style.display = 'block';
    
    scrollToSection('video-player');
    
    console.log(`Selected topic: ${topic}`);
}

function backToTopicSelection() {
    // Pause and reset video before hiding
    pauseAndResetVideo();
    
    // Check if we came from Songs section
    if (currentClass === 'songs') {
        // Go back to class selection for Songs
        document.getElementById('video-player').style.display = 'none';
        document.getElementById('classes').style.display = 'block';
        
        // Reset all selections
        currentClass = null;
        currentSubject = null;
        currentTopic = null;
        
        scrollToSection('classes');
    } else {
        // Regular topic back navigation
        document.getElementById('video-player').style.display = 'none';
        document.getElementById('topics').style.display = 'block';
        
        currentTopic = null;
        
        scrollToSection('topics');
    }
}

// Engineering Section Functions
function selectEngineering() {
    currentClass = 'engineering';
    
    // Hide classes section and show engineering branches
    document.getElementById('classes').style.display = 'none';
    document.getElementById('engineering-branches').style.display = 'block';
    
    scrollToSection('engineering-branches');
    
    console.log('Selected Engineering');
}

function selectEngineeringBranch(branch) {
    currentEngineeringBranch = branch;
    const branchNames = {
        'aiml': 'AI & ML',
        'cse': 'Computer Science',
        'it': 'Information Technology',
        'ece': 'Electronics & Communication',
        'ee': 'Electrical Engineering',
        'me': 'Mechanical Engineering',
        'ce': 'Civil Engineering',
        'che': 'Chemical Engineering'
    };
    
    document.getElementById('selected-branch').textContent = branchNames[branch] || branch;
    document.getElementById('selected-branch-sem').textContent = branchNames[branch] || branch;
    document.getElementById('selected-branch-sub').textContent = branchNames[branch] || branch;
    
    // Hide branches section and show years section
    document.getElementById('engineering-branches').style.display = 'none';
    document.getElementById('engineering-years').style.display = 'block';
    
    scrollToSection('engineering-years');
    
    console.log(`Selected engineering branch: ${branch}`);
}

function backToBranchSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    document.getElementById('engineering-years').style.display = 'none';
    document.getElementById('engineering-semesters').style.display = 'none';
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('engineering-branches').style.display = 'block';
    
    currentEngineeringYear = null;
    currentSemester = null;
    
    scrollToSection('engineering-branches');
}

function selectEngineeringYear(year) {
    currentEngineeringYear = year;
    document.getElementById('selected-year').textContent = `${year}${getOrdinalSuffix(year)} Year`;
    document.getElementById('selected-year-sub').textContent = `${year}${getOrdinalSuffix(year)} Year`;
    
    // Generate semester options based on year
    generateSemesters(year);
    
    // Hide years section and show semesters section
    document.getElementById('engineering-years').style.display = 'none';
    document.getElementById('engineering-semesters').style.display = 'block';
    
    scrollToSection('engineering-semesters');
    
    console.log(`Selected engineering year: ${year}`);
}

function backToYearSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    document.getElementById('engineering-semesters').style.display = 'none';
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('engineering-years').style.display = 'block';
    
    currentSemester = null;
    
    scrollToSection('engineering-years');
}

function generateSemesters(year) {
    const semesterContainer = document.getElementById('semester-cards-container');
    semesterContainer.innerHTML = '';
    
    const semesterNumber1 = (year - 1) * 2 + 1;
    const semesterNumber2 = semesterNumber1 + 1;
    
    // Create first semester card
    const semester1Card = document.createElement('div');
    semester1Card.className = 'cursor-pointer group';
    semester1Card.onclick = () => selectSemester(semesterNumber1);
    semester1Card.innerHTML = `
        <div class="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center semester-card">
            <div class="text-4xl font-bold text-blue-600 mb-2">${semesterNumber1}${getOrdinalSuffix(semesterNumber1)}</div>
            <div class="text-lg text-gray-600">Semester</div>
        </div>
    `;
    
    // Create second semester card
    const semester2Card = document.createElement('div');
    semester2Card.className = 'cursor-pointer group';
    semester2Card.onclick = () => selectSemester(semesterNumber2);
    semester2Card.innerHTML = `
        <div class="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center semester-card">
            <div class="text-4xl font-bold text-green-600 mb-2">${semesterNumber2}${getOrdinalSuffix(semesterNumber2)}</div>
            <div class="text-lg text-gray-600">Semester</div>
        </div>
    `;
    
    semesterContainer.appendChild(semester1Card);
    semesterContainer.appendChild(semester2Card);
}

function selectSemester(semester) {
    currentSemester = semester;
    document.getElementById('selected-semester').textContent = `${semester}${getOrdinalSuffix(semester)} Semester`;
    
    // Generate engineering subjects
    generateEngineeringSubjects(currentEngineeringBranch, semester);
    
    // Hide semesters section and show subjects section
    document.getElementById('engineering-semesters').style.display = 'none';
    document.getElementById('engineering-subjects').style.display = 'block';
    
    scrollToSection('engineering-subjects');
    
    console.log(`Selected semester: ${semester}`);
}

function backToSemesterSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('engineering-semesters').style.display = 'block';
    
    scrollToSection('engineering-semesters');
}

function generateEngineeringSubjects(branch, semester) {
    const subjectsContainer = document.getElementById('engineering-subjects-container');
    subjectsContainer.innerHTML = '';
    
    // Reset container to show subjects normally
    subjectsContainer.className = 'grid md:grid-cols-3 lg:grid-cols-4 gap-6';
    
    const subjects = getEngineeringSubjects(branch, semester);
    
    subjects.forEach((subject, index) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'cursor-pointer group';
        subjectCard.onclick = () => selectEngineeringSubject(subject, branch, semester);
        
        const colors = ['blue', 'green', 'purple', 'orange', 'red', 'pink', 'indigo', 'teal'];
        const color = colors[index % colors.length];
        
        subjectCard.innerHTML = `
            <div class="p-6 rounded-2xl bg-gradient-to-br from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center engineering-subject-card">
                <div class="w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span class="text-2xl">📚</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${subject}</h3>
                <p class="text-sm text-gray-600">5 modules available</p>
            </div>
        `;
        
        subjectsContainer.appendChild(subjectCard);
    });
}

// New function for module selection
function selectEngineeringModule(module, branch, semester) {
    console.log(`Selected engineering module: ${module} for ${branch} semester ${semester}`);
    
    // Set current subject for video player (using module name)
    currentSubject = module;
    currentTopic = 'Module Overview';
    
    // Update video player with engineering module information
    document.getElementById('video-class').textContent = 'Engineering';
    document.getElementById('video-subject').textContent = module;
    document.getElementById('video-topic').textContent = 'Module Overview';
    document.getElementById('video-title').textContent = `${module} - Complete Module Video`;
    
    // Update back button text for engineering flow
    const backButtonText = document.getElementById('back-button-text');
    if (backButtonText) {
        backButtonText.textContent = 'Back to Modules';
    }
    
    // Show topics sidebar and populate with module topics
    showModuleTopicsSidebar(module, branch, semester);
    
    // Load sample video for the module if available
    loadEngineeringModuleVideo(module, branch, semester);
    
    // Hide engineering subjects section and show video player
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('video-player').style.display = 'block';
    
    scrollToSection('video-player');
}

function selectEngineeringSubject(subject, branch, semester) {
    console.log(`Selected engineering subject: ${subject}`);
    
    // Set current subject for module generation
    currentSubject = subject;
    
    // Update display labels
    document.getElementById('selected-subject-modules').textContent = subject;
    
    // Generate 5 modules for this subject
    generateSubjectModules(subject, branch, semester);
    
    // Hide engineering subjects section and show modules section
    document.getElementById('engineering-subjects').style.display = 'none';
    document.getElementById('subject-modules').style.display = 'block';
    
    scrollToSection('subject-modules');
}

// Video Player Functions
function loadDefaultVideo() {
    const videoElement = document.getElementById('main-video');
    const videoSource = document.getElementById('video-source');
    const placeholder = document.getElementById('video-placeholder');
    
    // Load the ROCKSTAR video
    if (videoElement && videoSource) {
        videoSource.src = 'videos/ROCKSTAR_ Nadaan Parinde (Lyrical Video) _ Ranbir Kapoor _ A.R Rahman _ Mohit Chauhan, Irshaad Kamil.mp4';
        videoElement.load();
        
        // Hide placeholder and show video
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        videoElement.style.display = 'block';
        
        // Auto play the video
        videoElement.play().catch(e => {
            console.log('Auto-play prevented by browser. User interaction required.');
            // Show play button if autoplay fails
            showPlayButton();
        });
    }
}

// Function to load and play ROCKSTAR video directly
function playRockstarVideo() {
    const videoElement = document.getElementById('main-video');
    const videoSource = document.getElementById('video-source');
    const placeholder = document.getElementById('video-placeholder');
    
    if (videoElement && videoSource) {
        videoSource.src = 'videos/ROCKSTAR_ Nadaan Parinde (Lyrical Video) _ Ranbir Kapoor _ A.R Rahman _ Mohit Chauhan, Irshaad Kamil.mp4';
        videoElement.load();
        
        // Hide placeholder and show video
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        videoElement.style.display = 'block';
        
        // Play the video
        videoElement.play().catch(e => {
            console.log('Video play failed:', e);
            alert('Please click the play button on the video to start playback.');
        });
        
        // Update video title
        const videoTitle = document.getElementById('video-title');
        if (videoTitle) {
            videoTitle.textContent = 'ROCKSTAR - Nadaan Parinde (Official Video)';
        }
        
        // Update video info
        document.getElementById('video-class').textContent = 'Entertainment';
        document.getElementById('video-subject').textContent = 'Music';
        document.getElementById('video-topic').textContent = 'ROCKSTAR Song';
    }
}

function showPlayButton() {
    const placeholder = document.getElementById('video-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <div class="text-center text-white p-8">
                <div class="text-6xl mb-4">🎵</div>
                <h3 class="text-2xl font-bold mb-4">ROCKSTAR Video Ready!</h3>
                <p class="text-lg mb-6">Click the play button below to watch the ROCKSTAR video</p>
                <button onclick="playRockstarVideo()" class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    ▶ Play ROCKSTAR Video
                </button>
            </div>
        `;
    }
}

// Function to pause and reset video playback
function pauseAndResetVideo() {
    const videoElement = document.getElementById('main-video');
    const placeholder = document.getElementById('video-placeholder');
    
    if (videoElement) {
        // Pause the video if it's playing
        videoElement.pause();
        
        // Reset video to beginning
        videoElement.currentTime = 0;
        
        // Hide video element
        videoElement.style.display = 'none';
        
        // Show placeholder again
        if (placeholder) {
            placeholder.style.display = 'flex';
            placeholder.innerHTML = `
                <div class="text-center text-white p-8">
                    <div class="text-6xl mb-4">🎬</div>
                    <h3 class="text-2xl font-bold mb-4">Video Player Ready</h3>
                    <p class="text-lg mb-2">Select a topic or subject to watch educational content</p>
                    <p class="text-sm opacity-75">AI-generated videos for interactive learning</p>
                </div>
            `;
        }
        
        console.log('Video paused and reset');
    }
}

// Helper Functions
function getOrdinalSuffix(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

function getTopicsForSubject(subject, classNumber) {
    // Sample topics for different subjects and classes
    const topicDatabase = {
        mathematics: {
            1: ['Numbers 1-10', 'Basic Addition', 'Basic Subtraction', 'Shapes and Colors'],
            2: ['Numbers 1-100', 'Two-digit Addition', 'Two-digit Subtraction', 'Time and Clock'],
            3: ['Multiplication Tables', 'Division Basics', 'Fractions Introduction', 'Money and Change'],
            4: ['Long Multiplication', 'Long Division', 'Decimals', 'Area and Perimeter'],
            5: ['Factors and Multiples', 'Percentage', 'Geometry Basics', 'Data Handling'],
            6: ['Integers', 'Ratio and Proportion', 'Algebraic Expressions', 'Mensuration'],
            7: ['Linear Equations', 'Triangles and Properties', 'Probability', 'Statistics'],
            8: ['Quadrilaterals', 'Factorization', 'Linear Equations in Two Variables', 'Surface Areas'],
            9: ['Polynomials', 'Coordinate Geometry', 'Trigonometry', 'Statistics and Probability'],
            10: ['Real Numbers', 'Quadratic Equations', 'Circles', 'Areas Related to Circles'],
            11: ['Sets and Functions', 'Trigonometric Functions', 'Limits and Derivatives', 'Statistics'],
            12: ['Relations and Functions', 'Matrices', 'Determinants', 'Integrals']
        },
        science: {
            1: ['Living and Non-living', 'Parts of Body', 'Animals and Plants', 'Water and Air'],
            2: ['Human Body', 'Animals and Habitats', 'Plants and Trees', 'Weather and Seasons'],
            3: ['Classification of Animals', 'Plant Life Cycle', 'Matter and Materials', 'Force and Energy'],
            4: ['Digestive System', 'Reproduction in Plants', 'Light and Shadow', 'Sound and Music'],
            5: ['Circulatory System', 'States of Matter', 'Acids and Bases', 'Weather and Climate'],
            6: ['Nutrition in Plants', 'Body Movements', 'Light Reflection', 'Electricity and Circuits'],
            7: ['Transportation in Plants', 'Respiration in Organisms', 'Acids and Bases', 'Heat Transfer'],
            8: ['Cell Structure', 'Reproduction', 'Force and Pressure', 'Chemical Effects of Electric Current'],
            9: ['Matter in Our Surroundings', 'Tissues', 'Motion', 'Gravitation'],
            10: ['Chemical Reactions', 'Life Processes', 'Light Reflection', 'Electricity'],
            11: ['Chemical Bonding', 'Plant Kingdom', 'Laws of Motion', 'Thermodynamics'],
            12: ['Solutions', 'Reproduction', 'Current Electricity', 'Dual Nature of Matter']
        },
        english: {
            1: ['Alphabets', 'Simple Words', 'Rhymes and Songs', 'Story Telling'],
            2: ['Phonics', 'Simple Sentences', 'Reading Stories', 'Basic Grammar'],
            3: ['Vocabulary Building', 'Paragraph Writing', 'Comprehension', 'Parts of Speech'],
            4: ['Essay Writing', 'Grammar Rules', 'Reading Skills', 'Creative Writing'],
            5: ['Literature', 'Advanced Grammar', 'Composition', 'Public Speaking'],
            6: ['Poetry Analysis', 'Formal Writing', 'Reading Comprehension', 'Debate Skills'],
            7: ['Drama and Theatre', 'Research Writing', 'Critical Thinking', 'Media Literacy'],
            8: ['Novel Study', 'Academic Writing', 'Literary Devices', 'Presentation Skills'],
            9: ['Contemporary Literature', 'Business Writing', 'Analysis and Criticism', 'Interview Skills'],
            10: ['Classic Literature', 'Technical Writing', 'Comparative Studies', 'Communication Skills'],
            11: ['World Literature', 'Research Methods', 'Literary Theory', 'Professional Writing'],
            12: ['Advanced Literature', 'Thesis Writing', 'Critical Essays', 'Creative Projects']
        },
        history: {
            1: ['My Family', 'My School', 'Festivals', 'Our Country'],
            2: ['Our Past', 'Great Leaders', 'Monuments', 'Culture and Traditions'],
            3: ['Ancient Civilizations', 'Medieval Period', 'Freedom Struggle', 'National Symbols'],
            4: ['Mughal Empire', 'British Rule', 'Freedom Fighters', 'Constitution'],
            5: ['Vedic Period', 'Delhi Sultanate', 'Revolt of 1857', 'Modern India'],
            6: ['Harappan Civilization', 'Gupta Period', 'Nationalism', 'Post Independence'],
            7: ['Ancient India', 'Medieval India', 'British Policies', 'Partition of India'],
            8: ['Mauryan Empire', 'Mughal Administration', 'Indian National Movement', 'World Wars'],
            9: ['Early Medieval Period', 'Colonial Economy', 'Revolutionary Movements', 'Cold War'],
            10: ['Nationalism in Europe', 'Making of Global World', 'Print Culture', 'Age of Industrialization'],
            11: ['Ancient World', 'Medieval World', 'Modern World', 'Contemporary World'],
            12: ['Themes in World History', 'Kings and Chronicles', 'Colonial Cities', 'Partition Experiences']
        },
        geography: {
            1: ['My Home', 'My Neighborhood', 'Land and Water', 'Weather'],
            2: ['Maps and Directions', 'Landforms', 'Water Bodies', 'Climate'],
            3: ['Earth and Globe', 'Continents and Oceans', 'Weather Patterns', 'Natural Resources'],
            4: ['Solar System', 'Physical Features', 'Climate Zones', 'Agriculture'],
            5: ['Universe', 'Atmosphere', 'Hydrosphere', 'Biosphere'],
            6: ['Earth Movements', 'Landforms', 'Climate', 'Natural Vegetation'],
            7: ['Interior of Earth', 'Air Pressure', 'Water Cycle', 'Human Environment'],
            8: ['Resources', 'Agriculture', 'Industries', 'Human Resources'],
            9: ['India Size and Location', 'Physical Features', 'Climate', 'Natural Vegetation'],
            10: ['Resources and Development', 'Water Resources', 'Agriculture', 'Manufacturing Industries'],
            11: ['Physical Geography', 'Human Geography', 'Practical Work', 'India Physical Environment'],
            12: ['Human Geography', 'India People and Economy', 'Practical Work', 'Contemporary Issues']
        },
        computer: {
            1: ['Introduction to Computer', 'Mouse and Keyboard', 'Drawing on Computer', 'Computer Games'],
            2: ['Parts of Computer', 'Using Paint', 'Typing Practice', 'Educational Software'],
            3: ['Computer Hardware', 'MS Paint Advanced', 'Word Processing', 'Internet Basics'],
            4: ['File Management', 'MS Word', 'PowerPoint', 'Internet Safety'],
            5: ['Operating Systems', 'Spreadsheets', 'Presentations', 'Email Basics'],
            6: ['Programming Concepts', 'Excel Basics', 'Web Browsing', 'Digital Citizenship'],
            7: ['Scratch Programming', 'Database Concepts', 'Creating Websites', 'Cyber Security'],
            8: ['Python Basics', 'HTML Introduction', 'Digital Media', 'Ethics in Technology'],
            9: ['Python Programming', 'Web Development', 'Data Analysis', 'Artificial Intelligence'],
            10: ['Advanced Programming', 'Database Management', 'Mobile Apps', 'Machine Learning'],
            11: ['Computer Science Theory', 'Software Engineering', 'Network Security', 'Data Science'],
            12: ['Advanced Algorithms', 'System Design', 'Cloud Computing', 'Emerging Technologies']
        },
        arts: {
            1: ['Drawing Basics', 'Colors', 'Simple Crafts', 'Music and Rhythm'],
            2: ['Painting Techniques', 'Color Mixing', 'Paper Crafts', 'Singing'],
            3: ['Art History', 'Sculpture', 'Handicrafts', 'Musical Instruments'],
            4: ['Famous Artists', 'Clay Modeling', 'Textile Arts', 'Dance Forms'],
            5: ['Art Styles', 'Digital Art', 'Photography', 'Music Theory'],
            6: ['Renaissance Art', '3D Art', 'Film Making', 'Classical Music'],
            7: ['Modern Art', 'Animation', 'Video Editing', 'Folk Music'],
            8: ['Contemporary Art', 'Graphic Design', 'Sound Engineering', 'World Music'],
            9: ['Art Criticism', 'UI/UX Design', 'Music Production', 'Cultural Studies'],
            10: ['Art Portfolio', 'Brand Design', 'Audio Engineering', 'Performance Arts'],
            11: ['Fine Arts', 'Commercial Art', 'Music Composition', 'Art Business'],
            12: ['Art Thesis', 'Advanced Design', 'Music Direction', 'Art Career']
        },
        languages: {
            1: ['Basic Vocabulary', 'Simple Phrases', 'Numbers', 'Greetings'],
            2: ['Common Words', 'Family Terms', 'Colors and Shapes', 'Basic Conversations'],
            3: ['Grammar Basics', 'Sentence Formation', 'Storytelling', 'Cultural Context'],
            4: ['Reading Skills', 'Writing Practice', 'Poetry', 'Traditions'],
            5: ['Literature Introduction', 'Essays', 'Drama', 'History and Culture'],
            6: ['Advanced Grammar', 'Composition', 'Short Stories', 'Regional Variations'],
            7: ['Literary Analysis', 'Creative Writing', 'Novels', 'Language Evolution'],
            8: ['Comparative Literature', 'Research Skills', 'Biography', 'Modern Usage'],
            9: ['Critical Thinking', 'Advanced Writing', 'Philosophy', 'Contemporary Issues'],
            10: ['Professional Communication', 'Technical Writing', 'Debate', 'Global Perspectives'],
            11: ['Linguistic Studies', 'Research Methods', 'Translation', 'Language Technology'],
            12: ['Advanced Literature', 'Thesis Project', 'Teaching Methods', 'Career Applications']
        }
    };
    
    return topicDatabase[subject]?.[classNumber] || ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'];
}

function getEngineeringSubjects(branch, semester) {
    const engineeringSubjects = {
        aiml: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Programming in C', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Object Oriented Programming'],
            4: ['Mathematics IV', 'Algorithms', 'Database Management', 'Computer Networks', 'Operating Systems'],
            5: ['Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Python Programming', 'Statistics'],
            6: ['Natural Language Processing', 'Computer Vision', 'Neural Networks', 'Pattern Recognition', 'Data Mining'],
            7: ['Advanced Machine Learning', 'AI Ethics', 'Robotics', 'Expert Systems', 'Project Work I'],
            8: ['Advanced Deep Learning', 'AI Applications', 'Research Methods', 'Industrial Training', 'Project Work II']
        },
        cse: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Programming in C', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Object Oriented Programming'],
            4: ['Mathematics IV', 'Algorithms', 'Database Management', 'Computer Networks', 'Operating Systems'],
            5: ['Software Engineering', 'Compiler Design', 'Web Technology', 'Computer Graphics', 'System Programming'],
            6: ['Distributed Systems', 'Mobile Computing', 'Information Security', 'Human Computer Interaction', 'Elective I'],
            7: ['Project Management', 'Cloud Computing', 'Big Data Analytics', 'Blockchain Technology', 'Project Work I'],
            8: ['Advanced Topics', 'Industry Training', 'Research Methodology', 'Entrepreneurship', 'Project Work II']
        },
        it: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Programming in C', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Object Oriented Programming'],
            4: ['Mathematics IV', 'Algorithms', 'Database Management', 'Computer Networks', 'Operating Systems'],
            5: ['Web Development', 'Network Security', 'System Administration', 'IT Project Management', 'Software Testing'],
            6: ['Enterprise Systems', 'Mobile App Development', 'Cloud Technologies', 'DevOps', 'IT Service Management'],
            7: ['Advanced Networking', 'Cybersecurity', 'Digital Marketing', 'E-commerce', 'Project Work I'],
            8: ['Emerging Technologies', 'Industry Practices', 'Consultancy Project', 'Professional Ethics', 'Project Work II']
        },
        ece: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Electronic Devices', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Circuit Analysis', 'Electronic Circuits', 'Digital Electronics', 'Electromagnetic Fields'],
            4: ['Mathematics IV', 'Signals and Systems', 'Communication Systems', 'Microprocessors', 'Control Systems'],
            5: ['Analog Communication', 'Digital Signal Processing', 'Antenna Theory', 'VLSI Design', 'Embedded Systems'],
            6: ['Digital Communication', 'Microwave Engineering', 'Optical Communication', 'Mobile Communication', 'Power Electronics'],
            7: ['Satellite Communication', 'Radar Systems', 'Biomedical Electronics', 'Robotics', 'Project Work I'],
            8: ['Wireless Networks', 'Advanced Communication', 'MEMS', 'Industry Training', 'Project Work II']
        },
        ee: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Electrical Circuits', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Network Theory', 'Electronic Devices', 'Electromagnetic Fields', 'Electrical Machines I'],
            4: ['Mathematics IV', 'Control Systems', 'Power Electronics', 'Electrical Machines II', 'Analog Electronics'],
            5: ['Power Systems I', 'Electrical Drives', 'Microprocessors', 'Digital Electronics', 'Electrical Measurements'],
            6: ['Power Systems II', 'Protection Systems', 'High Voltage Engineering', 'Renewable Energy', 'Industrial Drives'],
            7: ['Smart Grid', 'Electric Vehicles', 'Power Quality', 'Energy Management', 'Project Work I'],
            8: ['Advanced Power Systems', 'Energy Audit', 'Professional Practice', 'Industry Training', 'Project Work II']
        },
        me: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Engineering Mechanics', 'Material Science', 'Environmental Science'],
            3: ['Mathematics III', 'Strength of Materials', 'Thermodynamics', 'Manufacturing Processes', 'Machine Drawing'],
            4: ['Mathematics IV', 'Fluid Mechanics', 'Heat Transfer', 'Machine Design', 'Dynamics of Machines'],
            5: ['Internal Combustion Engines', 'Refrigeration', 'CNC Machines', 'Industrial Engineering', 'CAD/CAM'],
            6: ['Automobile Engineering', 'Power Plant Engineering', 'Finite Element Analysis', 'Robotics', 'Quality Control'],
            7: ['Advanced Manufacturing', 'Mechatronics', 'Energy Systems', 'Project Management', 'Project Work I'],
            8: ['Advanced Materials', 'Automation', 'Sustainable Engineering', 'Industry Training', 'Project Work II']
        },
        ce: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Engineering Mechanics', 'Material Science', 'Environmental Science'],
            3: ['Mathematics III', 'Strength of Materials', 'Fluid Mechanics', 'Surveying', 'Building Materials'],
            4: ['Mathematics IV', 'Structural Analysis', 'Soil Mechanics', 'Concrete Technology', 'Highway Engineering'],
            5: ['Design of Structures', 'Foundation Engineering', 'Water Resources', 'Transportation Engineering', 'Construction Management'],
            6: ['Advanced Structures', 'Environmental Engineering', 'Earthquake Engineering', 'Urban Planning', 'Estimation and Costing'],
            7: ['Bridge Engineering', 'Advanced Construction', 'Remote Sensing', 'Project Planning', 'Project Work I'],
            8: ['Sustainable Construction', 'Advanced Topics', 'Professional Practice', 'Industry Training', 'Project Work II']
        },
        che: {
            1: ['Mathematics I', 'Physics I', 'Chemistry', 'Engineering Graphics', 'Basic Electrical Engineering'],
            2: ['Mathematics II', 'Physics II', 'Organic Chemistry', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Mathematics III', 'Physical Chemistry', 'Material Balance', 'Thermodynamics', 'Fluid Flow'],
            4: ['Mathematics IV', 'Chemical Kinetics', 'Heat Transfer', 'Mass Transfer', 'Chemical Process'],
            5: ['Process Equipment', 'Reaction Engineering', 'Separation Processes', 'Process Control', 'Plant Design'],
            6: ['Petrochemicals', 'Biochemical Engineering', 'Process Safety', 'Environmental Engineering', 'Industrial Chemistry'],
            7: ['Advanced Processes', 'Process Optimization', 'Energy Management', 'Project Economics', 'Project Work I'],
            8: ['Green Chemistry', 'Advanced Materials', 'Professional Ethics', 'Industry Training', 'Project Work II']
        }
    };
    
    return engineeringSubjects[branch]?.[semester] || ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];
}

// Add some visual feedback for user interactions
document.addEventListener('click', function(e) {
    // Add click ripple effect to buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('.cursor-pointer')) {
        const element = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('.cursor-pointer');
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
});

// Initialize walking animation if present
function showWalkingAnimation() {
    const overlay = document.getElementById('walking-animation');
    if (overlay) {
        overlay.classList.remove('hidden');
        
        // Hide after 3 seconds
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 3000);
    }
}

// Show walking animation on page load (optional)
window.addEventListener('load', function() {
    // Uncomment to show walking animation on page load
    // showWalkingAnimation();
});

// Function to watch ROCKSTAR directly from homepage
function watchRockstarDirectly() {
    // Show the video player section
    document.getElementById('video-player').style.display = 'block';
    
    // Hide other sections
    document.getElementById('classes').style.display = 'none';
    document.getElementById('subjects').style.display = 'none';
    document.getElementById('topics').style.display = 'none';
    
    // Set video information
    document.getElementById('video-class').textContent = 'Entertainment';
    document.getElementById('video-subject').textContent = 'Music';
    document.getElementById('video-topic').textContent = 'ROCKSTAR Song';
    document.getElementById('video-title').textContent = 'ROCKSTAR - Nadaan Parinde (Official Video)';
    
    // Load the video immediately
    playRockstarVideo();
    
    // Scroll to video player
    scrollToSection('video-player');
    
    console.log('Direct ROCKSTAR video access initiated');
}

// Songs Section Functions
function selectSongs() {
    // Set current class to songs for proper back navigation
    currentClass = 'songs';
    
    // Show the video player section directly
    document.getElementById('classes').style.display = 'none';
    document.getElementById('video-player').style.display = 'block';
    
    // Set video information with songs context
    document.getElementById('video-class').textContent = 'Songs';
    document.getElementById('video-subject').textContent = 'Educational Music';
    document.getElementById('video-topic').textContent = 'ROCKSTAR Educational Video';
    document.getElementById('video-title').textContent = 'ROCKSTAR - Musical Learning Experience';
    
    // Load and play the ROCKSTAR video
    playRockstarVideo();
    
    // Scroll to video player
    scrollToSection('video-player');
    
    console.log('Playing ROCKSTAR video for Songs class');
}

// Topics Sidebar Functions
function showTopicsSidebar(subject) {
    const sidebar = document.getElementById('topics-sidebar');
    const subjectName = document.getElementById('sidebar-subject-name');
    const topicsList = document.getElementById('sidebar-topics-list');
    
    if (sidebar && subjectName && topicsList) {
        // Show sidebar
        sidebar.style.display = 'block';
        
        // Update subject name
        subjectName.textContent = `${subject} Topics`;
        
        // Get topics for this subject
        const topics = getEngineeringTopics(subject);
        
        // Clear previous topics
        topicsList.innerHTML = '';
        
        // Add topics to sidebar
        topics.forEach((topic, index) => {
            const topicItem = document.createElement('div');
            topicItem.className = 'px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 text-sm border border-gray-100 hover:border-blue-200';
            topicItem.textContent = topic;
            topicItem.onclick = () => selectSidebarTopic(topic);
            
            // Highlight current topic
            if (topic === currentTopic) {
                topicItem.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
            }
            
            topicsList.appendChild(topicItem);
        });
    }
}

function selectSidebarTopic(topic) {
    currentTopic = topic;
    
    // Update video information
    document.getElementById('video-topic').textContent = topic;
    document.getElementById('video-title').textContent = `${currentSubject} - ${topic}`;
    
    // Update sidebar highlighting
    const topicsList = document.getElementById('sidebar-topics-list');
    if (topicsList) {
        const topicItems = topicsList.querySelectorAll('div');
        topicItems.forEach(item => {
            if (item.textContent === topic) {
                item.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
            } else {
                item.classList.remove('bg-blue-100', 'text-blue-700', 'border-blue-300');
            }
        });
    }
    
    // You can add logic here to load different video content based on topic
    console.log(`Selected topic from sidebar: ${topic}`);
}

function hidTopicsSidebar() {
    const sidebar = document.getElementById('topics-sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
}

// Generate topics for engineering subjects
function getEngineeringTopics(subject) {
    const engineeringTopics = {
        'Machine Learning': [
            'Introduction to ML',
            'Supervised Learning',
            'Unsupervised Learning',
            'Linear Regression',
            'Logistic Regression',
            'Decision Trees',
            'Random Forest',
            'Support Vector Machines',
            'K-Means Clustering',
            'Neural Networks Basics'
        ],
        'Artificial Intelligence': [
            'AI Introduction',
            'Search Algorithms',
            'Knowledge Representation',
            'Expert Systems',
            'Planning',
            'Natural Language Processing',
            'Computer Vision',
            'Robotics',
            'AI Ethics',
            'Future of AI'
        ],
        'Deep Learning': [
            'Neural Networks',
            'Backpropagation',
            'Convolutional Networks',
            'Recurrent Networks',
            'LSTM Networks',
            'Autoencoders',
            'GANs',
            'Transfer Learning',
            'Optimization',
            'Deep Learning Frameworks'
        ],
        'Python Programming': [
            'Python Basics',
            'Data Types',
            'Control Structures',
            'Functions',
            'Object Oriented Programming',
            'File Handling',
            'Exception Handling',
            'Libraries and Modules',
            'NumPy and Pandas',
            'Web Development with Python'
        ],
        'Statistics': [
            'Descriptive Statistics',
            'Probability Theory',
            'Distributions',
            'Hypothesis Testing',
            'Regression Analysis',
            'ANOVA',
            'Chi-Square Tests',
            'Correlation Analysis',
            'Time Series Analysis',
            'Bayesian Statistics'
        ],
        'Data Structures': [
            'Arrays',
            'Linked Lists',
            'Stacks',
            'Queues',
            'Trees',
            'Binary Search Trees',
            'Heaps',
            'Hash Tables',
            'Graphs',
            'Sorting Algorithms'
        ],
        'Database Management': [
            'Database Concepts',
            'Relational Model',
            'SQL Basics',
            'Advanced SQL',
            'Database Design',
            'Normalization',
            'Transactions',
            'Concurrency Control',
            'Database Security',
            'NoSQL Databases'
        ],
        'Computer Networks': [
            'Network Fundamentals',
            'OSI Model',
            'TCP/IP Protocol',
            'Network Topologies',
            'Routing Protocols',
            'Network Security',
            'Wireless Networks',
            'Network Performance',
            'Network Management',
            'Future Networks'
        ]
    };
    
    return engineeringTopics[subject] || [
        'Introduction',
        'Basic Concepts',
        'Fundamentals',
        'Advanced Topics',
        'Applications',
        'Case Studies',
        'Project Work',
        'Industry Practices'
    ];
}

// Quick action functions for sidebar
function generateNewVideo() {
    alert('🎬 Generating new AI video for: ' + currentTopic + '\n\nThis feature will create a fresh explanation with different examples and animations!');
}

function takeQuiz() {
    alert('🎯 Starting interactive quiz for: ' + currentTopic + '\n\nTest your understanding with AI-generated questions!');
}

// Module-specific functions
function getModuleSubjects(branch, semester, moduleNumber) {
    const allSubjects = getEngineeringSubjects(branch, semester);
    const subjectsPerModule = Math.ceil(allSubjects.length / 5);
    const startIndex = (moduleNumber - 1) * subjectsPerModule;
    const endIndex = startIndex + subjectsPerModule;
    
    return allSubjects.slice(startIndex, endIndex);
}

function showModuleTopicsSidebar(module, branch, semester) {
    const sidebar = document.getElementById('topics-sidebar');
    const subjectName = document.getElementById('sidebar-subject-name');
    const topicsList = document.getElementById('sidebar-topics-list');
    
    if (sidebar && subjectName && topicsList) {
        // Show sidebar
        sidebar.style.display = 'block';
        
        // Update module name
        subjectName.textContent = `${module} Topics`;
        
        // Get topics for this module
        const topics = getModuleTopics(module, branch, semester);
        
        // Clear previous topics
        topicsList.innerHTML = '';
        
        // Add topics to sidebar
        topics.forEach((topic, index) => {
            const topicItem = document.createElement('div');
            topicItem.className = 'px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 text-sm border border-gray-100 hover:border-blue-200';
            topicItem.textContent = topic;
            topicItem.onclick = () => selectSidebarTopic(topic);
            
            // Highlight current topic if it matches the overview
            if (topic === 'Module Overview' && currentTopic === 'Module Overview') {
                topicItem.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
            }
            
            topicsList.appendChild(topicItem);
        });
    }
}

function getModuleTopics(module, branch, semester) {
    // Get subjects that belong to this module
    const moduleNumber = parseInt(module.split(' ')[1]);
    const moduleSubjects = getModuleSubjects(branch, semester, moduleNumber);
    
    // Create topics based on module subjects
    let topics = ['Module Overview'];
    
    // Add each subject as a topic with subtopics
    moduleSubjects.forEach(subject => {
        topics.push(`${subject} - Introduction`);
        topics.push(`${subject} - Fundamentals`);
        topics.push(`${subject} - Applications`);
    });
    
    // Add some general topics
    topics.push('Module Quiz');
    topics.push('Module Assignment');
    topics.push('Module Review');
    
    return topics;
}

function loadEngineeringModuleVideo(module, branch, semester) {
    // For now, use the existing video loading logic
    // In the future, this could load module-specific videos
    console.log(`Loading video for ${module} in ${branch} semester ${semester}`);
    
    // Show a module-specific placeholder
    const placeholder = document.getElementById('video-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <div class="text-center text-white p-8">
                <div class="text-6xl mb-4">🎓</div>
                <h3 class="text-2xl font-bold mb-4">${module} - Complete Video</h3>
                <p class="text-lg mb-6">Comprehensive module covering all related subjects</p>
                <div class="grid grid-cols-2 gap-4 text-sm opacity-75 mb-6">
                    ${getModuleSubjects(branch, semester, parseInt(module.split(' ')[1])).map(subject => 
                        `<div class="bg-white/10 rounded-lg p-2">${subject}</div>`
                    ).join('')}
                </div>
                <button onclick="loadDefaultVideo()" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    ▶ Play ${module} Video
                </button>
            </div>
        `;
    }
}

function loadEngineeringSubjectVideo(subject) {
    // Existing function for backward compatibility
    console.log(`Loading video for engineering subject: ${subject}`);
}

// Enhanced back navigation for engineering subjects
function backToTopicSelection() {
    // Pause and reset video before hiding
    pauseAndResetVideo();
    
    // Hide topics sidebar
    hidTopicsSidebar();
    
    // Check the current flow and navigate accordingly
    if (currentClass === 'engineering' && currentEngineeringBranch) {
        // Check if we are coming from subject modules (modules per subject)
        const subjectModulesSection = document.getElementById('subject-modules');
        if (subjectModulesSection && subjectModulesSection.style.display !== 'none') {
            // Coming from subject modules - go back to subject modules
            document.getElementById('video-player').style.display = 'none';
            document.getElementById('subject-modules').style.display = 'block';
            scrollToSection('subject-modules');
        } else {
            // Regular engineering flow - go back to engineering subjects
            document.getElementById('video-player').style.display = 'none';
            document.getElementById('engineering-subjects').style.display = 'block';
            scrollToSection('engineering-subjects');
        }
    } else if (currentClass === 'songs') {
        // Songs flow - go back to class selection
        document.getElementById('video-player').style.display = 'none';
        document.getElementById('classes').style.display = 'block';
        
        // Reset all selections
        currentClass = null;
        currentSubject = null;
        currentTopic = null;
        
        scrollToSection('classes');
    } else {
        // Regular topic back navigation
        document.getElementById('video-player').style.display = 'none';
        document.getElementById('topics').style.display = 'block';
        
        currentTopic = null;
        
        scrollToSection('topics');
    }
}

// Subject Modules Functions
function generateSubjectModules(subject, branch, semester) {
    const modulesContainer = document.getElementById('subject-modules-container');
    if (!modulesContainer) {
        console.error('Subject modules container not found');
        return;
    }
    
    modulesContainer.innerHTML = '';
    
    // Always show 5 modules for any subject
    const modules = ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'];
    
    modules.forEach((module, index) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'cursor-pointer group';
        moduleCard.onclick = () => selectSubjectModule(module, subject, branch, semester);
        
        const colors = ['blue', 'green', 'purple', 'orange', 'red'];
        const color = colors[index];
        
        // Get topics for this module related to the subject
        const moduleTopics = getSubjectModuleTopics(subject, module);
        
        moduleCard.innerHTML = `
            <div class="p-6 rounded-2xl bg-gradient-to-br from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center subject-module-card">
                <div class="w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span class="text-2xl font-bold text-white">${index + 1}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${module}</h3>
                <p class="text-sm text-gray-600">Complete module video</p>
                <div class="mt-2 text-xs text-gray-500">
                    ${moduleTopics.slice(0, 2).join(', ')}
                </div>
            </div>
        `;
        
        modulesContainer.appendChild(moduleCard);
    });
}

function selectSubjectModule(module, subject, branch, semester) {
    console.log(`Selected subject module: ${module} for ${subject}`);
    
    // Set current info for video player
    currentSubject = subject;
    currentTopic = `${module} Overview`;
    
    // Update video player with module information
    document.getElementById('video-class').textContent = 'Engineering';
    document.getElementById('video-subject').textContent = `${subject} - ${module}`;
    document.getElementById('video-topic').textContent = `${module} Overview`;
    document.getElementById('video-title').textContent = `${subject} - ${module} Complete Video`;
    
    // Show topics sidebar and populate with module topics
    showSubjectModuleTopicsSidebar(module, subject, branch, semester);
    
    // Load module video
    loadSubjectModuleVideo(module, subject, branch, semester);
    
    // Hide modules section and show video player
    document.getElementById('subject-modules').style.display = 'none';
    document.getElementById('video-player').style.display = 'block';
    
    scrollToSection('video-player');
}

function getSubjectModuleTopics(subject, module) {
    // Generate topics specific to the subject and module combination
    const baseTopics = {
        'Machine Learning': ['Algorithms', 'Data Preprocessing', 'Model Training', 'Evaluation'],
        'Artificial Intelligence': ['Search', 'Knowledge', 'Learning', 'Planning'],
        'Deep Learning': ['Neural Networks', 'Backpropagation', 'CNN', 'RNN'],
        'Python Programming': ['Syntax', 'Data Structures', 'OOP', 'Libraries'],
        'Statistics': ['Descriptive', 'Probability', 'Inference', 'Regression'],
        'Data Structures': ['Arrays', 'Lists', 'Trees', 'Graphs'],
        'Database Management': ['SQL', 'Design', 'Transactions', 'NoSQL'],
        'Computer Networks': ['Protocols', 'TCP/IP', 'Security', 'Wireless']
    };
    
    // Get base topics for the subject or use defaults
    const subjectTopics = baseTopics[subject] || ['Introduction', 'Fundamentals', 'Applications', 'Advanced'];
    
    // Create module-specific topics
    const moduleNumber = parseInt(module.split(' ')[1]);
    const topicsPerModule = Math.ceil(subjectTopics.length / 5);
    const startIndex = (moduleNumber - 1) * topicsPerModule;
    const endIndex = startIndex + topicsPerModule;
    
    return subjectTopics.slice(startIndex, endIndex);
}

function showSubjectModuleTopicsSidebar(module, subject, branch, semester) {
    const sidebar = document.getElementById('topics-sidebar');
    const subjectName = document.getElementById('sidebar-subject-name');
    const topicsList = document.getElementById('sidebar-topics-list');
    
    if (sidebar && subjectName && topicsList) {
        // Show sidebar
        sidebar.style.display = 'block';
        
        // Update module name
        subjectName.textContent = `${subject} - ${module}`;
        
        // Get topics for this module
        const topics = getDetailedSubjectModuleTopics(module, subject);
        
        // Clear previous topics
        topicsList.innerHTML = '';
        
        // Add topics to sidebar
        topics.forEach((topic, index) => {
            const topicItem = document.createElement('div');
            topicItem.className = 'px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 text-sm border border-gray-100 hover:border-blue-200';
            topicItem.textContent = topic;
            topicItem.onclick = () => selectSidebarTopic(topic);
            
            // Highlight current topic if it matches
            if (topic === currentTopic || topic === `${module} Overview`) {
                topicItem.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
            }
            
            topicsList.appendChild(topicItem);
        });
    }
}

function getDetailedSubjectModuleTopics(module, subject) {
    // Create detailed topics for the specific module of a subject
    let topics = [`${module} Overview`];
    
    // Get base topics for this module
    const moduleTopics = getSubjectModuleTopics(subject, module);
    
    // Add detailed subtopics
    moduleTopics.forEach(topic => {
        topics.push(`${topic} - Introduction`);
        topics.push(`${topic} - Theory`);
        topics.push(`${topic} - Examples`);
        topics.push(`${topic} - Practice`);
    });
    
    // Add assessment topics
    topics.push(`${module} Quiz`);
    topics.push(`${module} Assignment`);
    topics.push(`${module} Review`);
    
    return topics;
}

function loadSubjectModuleVideo(module, subject, branch, semester) {
    console.log(`Loading video for ${module} of ${subject}`);
    
    // Show a subject module-specific placeholder
    const placeholder = document.getElementById('video-placeholder');
    if (placeholder) {
        const moduleTopics = getSubjectModuleTopics(subject, module);
        
        placeholder.innerHTML = `
            <div class="text-center text-white p-8">
                <div class="text-6xl mb-4">🎓</div>
                <h3 class="text-2xl font-bold mb-4">${subject} - ${module}</h3>
                <p class="text-lg mb-6">Complete module video covering all topics</p>
                <div class="grid grid-cols-2 gap-4 text-sm opacity-75 mb-6">
                    ${moduleTopics.map(topic => 
                        `<div class="bg-white/10 rounded-lg p-2">${topic}</div>`
                    ).join('')}
                </div>
                <button onclick="loadDefaultVideo()" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    ▶ Play ${module} Video
                </button>
            </div>
        `;
    }
}

function backToSubjectModuleSelection() {
    // Pause and reset video before navigation
    pauseAndResetVideo();
    
    // Hide topics sidebar
    hidTopicsSidebar();
    
    // Go back to subject modules
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('subject-modules').style.display = 'block';
    
    scrollToSection('subject-modules');
}

function backToEngineeringSubjects() {
    // Hide subject modules and show engineering subjects
    document.getElementById('subject-modules').style.display = 'none';
    document.getElementById('engineering-subjects').style.display = 'block';
    
    scrollToSection('engineering-subjects');
}

// Function to show video player from search results
function showVideoPlayerForSearch(className, subject, topic, title) {
    // Update video player information
    document.getElementById('video-class').textContent = `${className}${getOrdinalSuffix(className)} Grade`;
    document.getElementById('video-subject').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById('video-topic').textContent = topic;
    document.getElementById('video-title').textContent = title;
    
    // Show video player section
    document.getElementById('video-player').style.display = 'block';
    
    // Scroll to video player
    scrollToSection('video-player');
    
    console.log(`Showing video player for search result: ${title}`);
}

console.log('🚀 EduCartoon JavaScript loaded successfully!');

// Mobile Menu Functions
function initializeMobileMenu() {
    // Close mobile menu when clicking on overlay
    const overlay = document.getElementById('mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMobileMenuOpen()) {
            closeMobileMenu();
        }
    });
    
    // Handle touch gestures for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe right to open menu (from left edge)
        if (swipeDistance > swipeThreshold && touchStartX < 50 && !isMobileMenuOpen()) {
            openMobileMenu();
        }
        
        // Swipe left to close menu
        if (swipeDistance < -swipeThreshold && isMobileMenuOpen()) {
            closeMobileMenu();
        }
    }
}

function toggleMobileMenu() {
    if (isMobileMenuOpen()) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menu && overlay) {
        // Show overlay
        overlay.classList.remove('hidden');
        
        // Slide in menu
        menu.classList.add('mobile-menu-slide-in');
        
        // Switch icons
        if (menuIcon && closeIcon) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('📱 Mobile menu opened');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menu && overlay) {
        // Hide overlay
        overlay.classList.add('hidden');
        
        // Slide out menu
        menu.classList.remove('mobile-menu-slide-in');
        
        // Switch icons back
        if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('📱 Mobile menu closed');
    }
}

function isMobileMenuOpen() {
    const menu = document.getElementById('mobile-menu');
    return menu && menu.classList.contains('mobile-menu-slide-in');
}

// Mobile-specific helper functions
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize performance on mobile
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reduce animations on mobile
        const animatedElements = document.querySelectorAll('.animate-pulse-glow, .animate-float');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
        
        // Add mobile-friendly classes
        document.body.classList.add('mobile-device');
        
        console.log('📱 Mobile optimizations applied');
    }
}

// Help system functions
function toggleHelp() {
    alert('🎆 Help System\n\n📚 Quick Guide:\n• Select your class/grade level\n• Choose your subject\n• Pick a topic to learn\n• Watch AI-generated videos\n• Take interactive quizzes\n\n📞 Need more help? Contact support!');
}

// Initialize mobile optimizations when page loads
document.addEventListener('DOMContentLoaded', function() {
    optimizeForMobile();
});
