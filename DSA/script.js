document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile nav if open
            const nav = document.querySelector('header nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.nav-toggle i').classList.remove('fa-times');
                document.querySelector('.nav-toggle i').classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Update active state of nav link
            updateNavLinkActiveState(targetId);
        });
    });

    // Function to update active state of nav links
    const updateNavLinkActiveState = (currentHash) => {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    };

    // Observer to update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNavLinkActiveState(`#${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    sections.forEach(section => {
        observer.observe(section);
    });

    // Module Tab Functionality
    const tabButtons = document.querySelectorAll('.module-tabs .tab-button');
    const moduleContents = document.querySelectorAll('.module-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            moduleContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Show the corresponding module content
            const targetModuleId = button.dataset.module + '-module';
            document.getElementById(targetModuleId).classList.add('active');
        });
    });

    // Activate the first tab on page load
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add 'scrolled' class after 50px scroll
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // 'X' icon when open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Hamburger icon when closed
        }
    });

    // Close mobile nav when clicking outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.remove('fa-times');
            navToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});