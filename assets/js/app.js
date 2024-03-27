// scroll header
$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    // console.log();
    if (scroll > 49) {
        $(".wrp-header").addClass("scroll-true");
        $(".nav-zaw-list").css("top", "0vh");
    } else {
        $(".wrp-header").removeClass("scroll-true");
        $(".nav-zaw-list").css("top", "20vh");
    }
});

const templatePortofolia = `
<div class="carousel-item">
    <div class="portofolio">
        <div class="img">
            <img src="!image" class="img-fluid" height="180">
        </div>
        <div class="description">
            <div class="mb-3">
                <a target="_blank" class="d-inline-block btn btn-light btn-sm"
                    href="!link">
                    <i class="bi bi-link-45deg"></i>
                    <span>Link Webiste</span>
                </a>
            </div>
            <h2>!title</h2>
            <p>!description</p>
        </div>
    </div>
</div>
`

const templatePersonalProject = `
    <div class="row mb-5 p-2 align-items-center" 
        data-aos="<aos>"
        data-aos-offset="200"
        data-aos-duration="500">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <div class="image-personal rounded img">
                        <img src="!image" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md">
            <h2>!title</h2>
            <p>!description</p>
            <a target="_blank" class="d-inline-block btn btn-light btn-sm" href="!link">
                <i class="bi text-dark bi-link-45deg"></i>
                <span class="text-dark">Link Webiste</span>
            </a>
        </div>
    </div>
`

$(document).ready(() => {
    // Company Project
    axios.get("/company-project.json", {
        header: {
            Accept: "application/json"
        }
    }).then(res => {
        res.data.forEach((element) => {
            let tagHtml = templatePortofolia
            tagHtml = tagHtml.replace("!image", element.image)
            tagHtml = tagHtml.replace("!description", element.description)
            tagHtml = tagHtml.replace("!title", element.title)
            tagHtml = tagHtml.replace("!link", element.link)
            $("#project").append($.parseHTML(tagHtml))
        })
        if ($(".section.max").hasClass("hide") && res.data.length > 0) {
            $(".section.max").removeClass('hide')
        }

        // add active to first child
        $("#project .carousel-item:first-child").addClass("active")
    })

    // Personal Project
    axios.get("/personal-project.json", {
        header: {
            Accept: "application/json"
        }
    }).then(res => {
        res.data.forEach((ell, key) => {
            let tmplateHtml = templatePersonalProject
            tmplateHtml = tmplateHtml.replace("!image", ell.image)
            tmplateHtml = tmplateHtml.replace("!description", ell.description)
            tmplateHtml = tmplateHtml.replace("!title", ell.title)
            tmplateHtml = tmplateHtml.replace("!link", ell.link)
            if ((key % 2) == 0) {
                tmplateHtml = tmplateHtml.replace("<aos>", "fade-left");
            } else {
                tmplateHtml = tmplateHtml.replace("<aos>", "fade-right");
            }

            $("#personal-project").append($.parseHTML(tmplateHtml))
        })
    })

    // hide menu
    $("#toggle-menu").click(() => {
        $(".menu").toggleClass("hide")
    })

    // Setup Library
    const typed = new Typed('#element', {
        strings: [
            'Web Developer',
            'Front End',
            'Back End',
            '.... Scroll down for more info'
        ],
        typeSpeed: 50,
    })
})