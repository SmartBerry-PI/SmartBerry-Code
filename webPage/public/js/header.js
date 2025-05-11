window.addEventListener("scroll", function() {
    let header = this.document.querySelector('.topNav')
    header.classList.toggle('scroll', window.scrollY > 0)
})