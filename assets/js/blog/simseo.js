// message
console.log("This Template Style like CSS/JS/Fonts (SIMSEO), hosted in my github pages, you can't modif this template if you get this template for FREE ! ");
console.log("if you want this template customize, you need purchase premium template");
console.log("@BaharDev : https://bahardev.my.id");
$(document).ready(()=>{
    // home
    // get image
    let postImage = $(".post-image");
    postImage.each(function(e) {
        $(this).css('background-image', 'url(' + $(this).children().attr('content') + ')' );
    });

    // blog post
    // add clas to separator image
    let separator = $(".separator");
    separator.each(function(e) {
        // tag img
        $(this).children().children().css("width", "100%");
        $(this).children().children().addClass("img-fluid");
        $(this).children().children().addClass("mb-2");
    });

    // Daftar isi
    let daftarisi = $(".main h1");
    daftarisi.each(function(e) {
      $(this).attr("id", "#daftar" + e);
      let tagDaftarIsi = '<li><a class="text-primary" href="#daftar'+ e +'">'+ $(this).text() +'</a></li>';
      $("#daftar-isi").append(tagDaftarIsi);
      console.log($(this).text());
    });

});

// code blocks
(function() {

    class CodeBlockComponent extends HTMLElement {
      
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      
      bindEvents() {
        const { shadowRoot } = this;
        const copyButton = shadowRoot.querySelector('#copy-button'); 
        copyButton.addEventListener("click", () => {
            this.copyCode();                   
        });
      }
      
      copyCode() {
        const { shadowRoot } = this;
        const codeNode = shadowRoot.querySelector('#code');  
        const range = document.createRange();  
        range.selectNode(codeNode);  
        window.getSelection().addRange(range); 
        try {  
          document.execCommand('copy');  
        } catch(err) {  
          console.warn('Oops, unable to copy');  
        } 
      }
      
      connectedCallback() {
        const { shadowRoot } = this;
        
        const styles = document.querySelector("#code-block-template").innerHTML;
        
        let lang = this.classList.value;
        lang = lang.replace("language-", "");
  
        const trimmed = this.innerHTML.trim();
        
        let lineNumbersClass = "";
        if (this.classList.contains("line-numbers")) {
          lineNumbersClass = "line-numbers";
        }
        
        // Line Highlighting would be something like this.
        
        // let lineHighlights = "";
        // if (this.dataset.line) {
        //   lineHighlights = this.dataset.line;
        // }
        
        // Plus data-line="${lineHighlights} on the <pre>
  
        const template = `
          <div>
            ${styles}
            <pre class="${lineNumbersClass} ${this.classList}" id="pre"><code id="code">${trimmed}</code><button id="copy-button">Copy</button></pre>
          </div>
        `;
  
        const placeholder = document.createElement('div');
        placeholder.insertAdjacentHTML('afterbegin', template);
  
        const node = placeholder.firstElementChild;
  
        shadowRoot.appendChild(node);
        
        // We could highlight it _before_ injecting with a different Prism function, but I'm not sure it does plugins then, like line numbers. Should check.
        Prism.highlightAllUnder(shadowRoot);
  
        this.bindEvents();
      }
    }
  
    customElements.define('code-block', CodeBlockComponent);
    
  })();