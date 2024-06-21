document.addEventListener('DOMContentLoaded', function () {
    const sideNav = document.getElementById('sideNav');
    const threshold = window.innerHeight * 0.8; // 80% of the viewport height

    window.addEventListener('scroll', function () {
        if (window.scrollY < threshold) {
            sideNav.classList.add('hide-nav');
            sideNav.classList.remove('show-nav');
        } else {
            sideNav.classList.add('show-nav');
            sideNav.classList.remove('hide-nav');
        }
    });

    // Smooth scrolling for side nav links
    document.querySelectorAll('.side-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});