// scroll header
$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    // console.log();
    if (scroll > 49) {
        $(".wrp-header").addClass("scroll-true");
    } else {
        $(".wrp-header").removeClass("scroll-true");
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
    <div class="row mb-5 p-2 align-items-cemter">
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
    axios.get("/company-project.json", {
        header: {
            Accept: "application/json"
        }
    }).then(res => {
        res.data.forEach(element => {
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

    axios.get("/personal-project.json", {
        header: {
            Accept: "application/json"
        }
    }).then(res => {
        res.data.forEach(ell => {
            let tmplateHtml = templatePersonalProject
            tmplateHtml = tmplateHtml.replace("!image", ell.image)
            tmplateHtml = tmplateHtml.replace("!description", ell.description)
            tmplateHtml = tmplateHtml.replace("!title", ell.title)
            tmplateHtml = tmplateHtml.replace("!link", ell.link)
            $("#personal-project").append($.parseHTML(tmplateHtml))
        })
        console.log(res.data)
    })

    // hide menu
    $("#toggle-menu").click(() => {
        $(".menu").toggleClass("hide")
    })
})