// Header jQuery
$('#toggle-menu').on('click', function() {
    $('#mobile-menu').toggleClass('hidden');
});

// Inisialisasi Swiper
$(document).ready(function() {
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Fungsi carousel sederhana untuk mobile
    const projects = $('.portfolio-item');
    let currentIndex = 0;

    function showProject(index) {
        projects.each(function(i) {
            $(this).toggleClass('hidden', i !== index);
        });
    }

    $('#next-project').on('click', function() {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex);
    });

    $('#prev-project').on('click', function() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex);
    });

    // Inisialisasi - tampilkan hanya proyek pertama di mobile
    if ($(window).width() < 768 && projects.length > 0) {
        showProject(0);
    }
});
