document.addEventListener('DOMContentLoaded', function () {
    var currentPage = document.location.pathname.split('/').pop().split('.')[0];
    var menuItems = document.querySelectorAll('.link_section');

    menuItems.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            if (item.id !== currentPage) {
                item.classList.add('hover');
            }
        });

        item.addEventListener('mouseout', function () {
            item.classList.remove('hover');
        });
    });

    menuItems.forEach(function (item) {
        if (item.id === currentPage) {
            item.classList.add('active');
        }
    });
});