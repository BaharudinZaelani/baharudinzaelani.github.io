// Swiper setup
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,
    pagination: { el: '.swiper-pagination' },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: { el: '.swiper-scrollbar' },
});

// Typed.js setup
const typed = new Typed('#element', {
    strings: ['Web Developer', 'Front End', 'Back End', '.... Scroll down for more info'],
    typeSpeed: 50,
});

// Scroll header behavior
$(window).on('scroll', () => {
    const isScrolled = $(window).scrollTop() > 49;
    $(".wrp-header").toggleClass("scroll-true", isScrolled);
    $(".nav-zaw-list").css("top", isScrolled ? "0vh" : "20vh");
});

// Template util
function generateProjectTemplate(project, index = 0) {
    return `
        <div class="portfolio-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full rounded shadow-md h-full object-cover transition-transform duration-500 hover:scale-105">
                <div class="absolute inset-0 bg-indigo-600 bg-opacity-0 hover:bg-opacity-80 flex items-center justify-center transition-all duration-300">
                    <a target="_blank" href="${project.link || '#'}" class="opacity-0 hover:opacity-100 flex gap-2 transform translate-y-4 hover:translate-y-0 transition-all duration-300 inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-full font-medium">
                        <i class="text-indigo-600 fa-solid fa-link"></i> Visit Website
                    </a>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${project.title}</h3>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">${project.tech || 'Web Development'}</span>
                </div>
                <p class="text-gray-600 mb-4">${project.description}</p>
            </div>
        </div>
    `;
}

// Load commercial projects
async function loadCompanyProjects() {
    try {
        const res = await axios.get("/company-project.json");
        const container = $("#project-grid").empty();

        res.data.forEach((project, index) => {
            container.append($.parseHTML(generateProjectTemplate(project, index)));
        });

        initMobileCarousel();
    } catch (err) {
        console.error("Error loading company projects:", err);
    }
}

// Template dengan 3 bagian terpisah
const templatePersonalProject = `
<div class="project-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
     data-aos="<aos>">
     
    <!-- Bagian: Project Image & Basic Info -->
    <div class="relative h-60 overflow-hidden group">
        <img src="!image" alt="!title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xl font-bold text-white mb-2">!title</h3>
                <p class="text-gray-200 text-sm">!short_desc</p>
            </div>
        </div>
    </div>

    <!-- Bagian: Technologies & Actions -->
    <div class="p-6">
        <div class="flex flex-wrap gap-2 mb-4">
            <!-- Technologies Badges -->
            !tech_badges
        </div>
        <div class="flex space-x-3">
            <a href="!link" target="_blank" class="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                <i class="fas fa-external-link-alt mr-2"></i>
                Demo
            </a>
            <a href="!github" target="_blank" class="flex-1 text-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors">
                <i class="fab fa-github mr-2"></i>
                Code
            </a>
        </div>
    </div>
    
    <!-- Bagian: Detailed Description -->
    <div class="p-6 border-b border-gray-100">
        <p class="text-gray-600 mb-4">!description</p>
        <div class="flex items-center text-sm text-gray-500">
            <i class="far fa-calendar-alt mr-2"></i>
            <span>!date</span>
        </div>
    </div>
</div>
`;

// Fungsi untuk generate tech badges
function generateTechBadges(techArray) {
    return techArray.map(tech => 
        `<span class="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">${tech}</span>`
    ).join('');
}

// Load Personal Projects
async function loadPersonalProjects(limit = 6, offset = 0) {
    try {
        const response = await axios.get("/personal-project.json", {
            headers: { Accept: "application/json" }
        });
        
        const projects = response.data.slice(offset, offset + limit);
        const container = $("#personal-project");
        
        projects.forEach((project, index) => {
            let template = templatePersonalProject
                .replace(/!image/g, project.image)
                .replace(/!title/g, project.title)
                .replace(/!short_desc/g, project.short_desc || "Personal Project")
                .replace(/!description/g, project.description)
                .replace(/!date/g, project.date || "Not specified")
                .replace(/!link/g, project.link || "#")
                .replace(/!github/g, project.github || "#")
                .replace("!tech_badges", generateTechBadges(project.technologies || []))
                .replace("<aos>", index % 2 === 0 ? "fade-up-right" : "fade-up-left");
            
            container.append($.parseHTML(template));
        });

        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({ once: true });
        }

        // Toggle load more button
        $("#load-more").toggle(response.data.length > offset + limit);

    } catch (error) {
        console.error("Error loading projects:", error);
        $("#personal-project").html(`
            <div class="col-span-full text-center py-10">
                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                <p class="text-gray-600">Failed to load projects. Please try again later.</p>
            </div>
        `);
    }
}

// Initialize on load
$(document).ready(() => {
    loadPersonalProjects();
    
    // Load more handler
    $("#load-more").click(() => {
        const currentCount = $(".project-card").length;
        loadPersonalProjects(6, currentCount);
    });
});

// Mobile carousel for commercial projects
function initMobileCarousel() {
    const projects = $(".portfolio-item");
    let current = 0;

    const showProject = (idx) => {
        projects.addClass('hidden');
        $(projects[idx]).removeClass('hidden');
    };

    $("#prev-project").on('click', () => {
        current = (current - 1 + projects.length) % projects.length;
        showProject(current);
    });

    $("#next-project").on('click', () => {
        current = (current + 1) % projects.length;
        showProject(current);
    });

    if ($(window).width() < 768) showProject(0);
}

// Main
$(document).ready(async () => {
    await loadCompanyProjects();
    await loadPersonalProjects();

    $("#toggle-menu").click(() => $(".menu").toggleClass("hide"));
    $("#load-more").click(() => {
        const count = $("#personal-project .portfolio-item").length;
        loadPersonalProjects(4, count);
    });
});
