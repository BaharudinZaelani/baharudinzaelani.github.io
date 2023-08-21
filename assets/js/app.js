// scroll header
$(window).scroll(function() {
    let scroll = $(window).scrollTop();
    // console.log();
    if ( scroll > 49 ) {
        $(".wrp-header").addClass("scroll-true");
    }else {
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
            <h2>!title</h2>
            <p>!description</p>
            <div>
                <a target="_blank" class="d-inline-block btn btn-light btn-sm"
                    href="!link">
                    <i class="bi bi-link-45deg"></i>
                    <span>Link Webiste</span>
                </a>
            </div>
        </div>
    </div>
</div>
`

$(document).ready(()=>{ 
    axios.get("/project.json", {
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
        if ( $(".section.max").hasClass("hide") && res.data.length > 0 ) {
            $(".section.max").removeClass('hide')
        }

        // add active to first child
        $("#project .carousel-item:first-child").addClass("active")
    })
})