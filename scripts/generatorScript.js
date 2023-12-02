document.addEventListener('DOMContentLoaded', function () {
    const tableForm = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    // Загрузка данных из localStorage
    const storedWeekdays = localStorage.getItem('weekdays') || '5';
    const storedMaxLessons = localStorage.getItem('maxLessons') || '5';
    const storedLanguage = localStorage.getItem('language') || 'Русский';

    // Установка значений формы из localStorage
    document.getElementById('weekdays').value = storedWeekdays;
    document.getElementById('maxLessons').value = storedMaxLessons;
    document.getElementById('language').value = storedLanguage;

    // Функция для генерации и отображения таблицы
    function generateAndDisplayTable() {
        // Получите значения формы
        const weekdays = parseInt(document.getElementById('weekdays').value);
        const maxLessons = document.getElementById('maxLessons').value;
        const language = document.getElementById('language').value;

        // Определите дни недели в зависимости от выбранных параметров
        const weekdaysNames = (language === 'Русский') ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Выполните генерацию таблицы
        let generatedTable = '<table>';
        generatedTable += '<tr><th>День недели</th><th>Ваши данные</th></tr>';

        for (let i = 0; i < weekdays; i++) {
            generatedTable += `<tr><td>${weekdaysNames[i]}</td><td>${generateEmptyList(maxLessons)}</td></tr>`;
        }

        generatedTable += '</table>';

        // Отобразите результат в контейнере
        tableContainer.innerHTML = generatedTable;
        tableContainer.classList.remove('hidden');

        // Сохраните параметры в localStorage
        localStorage.setItem('weekdays', weekdays);
        localStorage.setItem('maxLessons', maxLessons);
        localStorage.setItem('language', language);
    }

    // Функция для генерации пустого списка
    function generateEmptyList(count) {
        let list = '<ul>';
        for (let i = 0; i < count; i++) {
            list += '<li></li>';
        }
        list += '</ul>';
        return list;
    }

    // Обработчик события для формы
    tableForm.addEventListener('submit', function (event) {
        event.preventDefault();
        generateAndDisplayTable();
    });

    // Генерация и отображение таблицы при загрузке страницы
    generateAndDisplayTable();

    function downloadTableAsPdf() {
        const tableContainer = document.getElementById('tableContainer');

        // Создаем новый jsPDF-документ
        const pdf = new jsPDF();

        // Получаем HTML содержимое таблицы
        const tableHtml = tableContainer.innerHTML;

        // Преобразуем HTML в PDF
        pdf.fromHTML(tableHtml, 15, 15);

        // Скачиваем PDF файл
        pdf.save('table.pdf');
    }
});

