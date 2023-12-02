// scripts/loadTimeScript.js

(function () {
    window.addEventListener('load', function () {
        var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        var loadTimeElement = document.createElement('div');
        loadTimeElement.innerText = 'Время загрузки страницы: ' + loadTime + 'мс';
        document.body.appendChild(loadTimeElement);
    });
})();
