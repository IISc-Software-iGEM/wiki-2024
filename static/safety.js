document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(navItem => {
        navItem.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent click from bubbling up

            // Toggle the dropdown visibility
            const isActive = navItem.classList.contains('active');
            navItems.forEach(item => item.classList.remove('active')); // Close all dropdowns
            if (!isActive) {
                navItem.classList.add('active'); // Open the clicked dropdown
            }
        });
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function () {
        navItems.forEach(item => item.classList.remove('active'));
    });
});
