document.addEventListener('DOMContentLoaded', function () {
    const tableForm = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    const storedWeekdays = localStorage.getItem('weekdays') || '5';
    const storedMaxLessons = localStorage.getItem('maxLessons') || '5';
    const storedLanguage = localStorage.getItem('language') || 'Русский';

    document.getElementById('weekdays').value = storedWeekdays;
    document.getElementById('maxLessons').value = storedMaxLessons;
    document.getElementById('language').value = storedLanguage;

    function generateAndDisplayTable() {
        const weekdays = parseInt(document.getElementById('weekdays').value);
        const maxLessons = document.getElementById('maxLessons').value;
        const language = document.getElementById('language').value;

        const weekdaysNames = (language === 'Русский') ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let generatedTable = '<table>';
        generatedTable += '<tr><th>День недели</th><th>Ваши данные</th></tr>';

        for (let i = 0; i < weekdays; i++) {
            generatedTable += `<tr><td>${weekdaysNames[i]}</td><td>${generateEmptyList(maxLessons)}</td></tr>`;
        }

        generatedTable += '</table>';

        tableContainer.innerHTML = generatedTable;
        tableContainer.classList.remove('hidden');

        localStorage.setItem('weekdays', weekdays);
        localStorage.setItem('maxLessons', maxLessons);
        localStorage.setItem('language', language);
    }

    function generateEmptyList(count) {
        let list = '<ul>';
        for (let i = 0; i < count; i++) {
            list += '<li></li>';
        }
        list += '</ul>';
        return list;
    }

    tableForm.addEventListener('submit', function (event) {
        event.preventDefault();
        generateAndDisplayTable();
    });

    generateAndDisplayTable();

});

