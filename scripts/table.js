window.onload = function () {
    var savedTableData = localStorage.getItem('timetableData');
    if (savedTableData) {
        document.getElementById("timetable").getElementsByTagName('tbody')[0].innerHTML = savedTableData;
        document.getElementById("lessonMenu").classList.add("visible");
    }

    document.getElementById("addSubjectBtn").addEventListener("click", addSubject);
    document.getElementById("deleteSubjectBtn").addEventListener("click", deleteSubject);
};

function generateTable() {
    var weekdays = document.getElementById("weekdays").value;
    var language = document.getElementById("language").value;
    var lessons = document.getElementById("lessons").value;

    document.getElementById("timetable").getElementsByTagName('tbody')[0].innerHTML = "";

    var tableBody = document.getElementById("timetable").getElementsByTagName('tbody')[0];
    for (var i = 1; i <= weekdays; i++) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = getDayName(i, language);

        var cell2 = row.insertCell(1);
        cell2.innerHTML = generateLessonList(lessons);
    }

    var daySelect = document.getElementById("day");
    daySelect.innerHTML = "";
    for (var i = 1; i <= weekdays; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = getDayName(i, language);
        daySelect.add(option);
    }

    document.getElementById("lessonMenu").classList.add("visible");

    var savedTableData = localStorage.getItem('timetableData');
    if (savedTableData) {
        tableBody.innerHTML = savedTableData;
    }

    document.getElementById("addSubjectBtn").addEventListener("click", addSubject);
    document.getElementById("deleteSubjectBtn").addEventListener("click", deleteSubject);

    localStorage.setItem('timetableData', tableBody.innerHTML);
}

function clearTable() {
    localStorage.removeItem('timetableData');

    document.getElementById("timetable").getElementsByTagName('tbody')[0].innerHTML = "";
    document.getElementById("lessonMenu").classList.remove("visible");
    document.getElementById("lessonWarning").innerText = "";
}

function getDayName(dayNumber, language) {
    var days = {
        "ru": ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        "en": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    return days[language][dayNumber - 1];
}

function generateLessonList(lessons) {
    var list = "<ul>";
    for (var i = 1; i <= lessons; i++) {
        list += "<li></li>";
    }
    list += "</ul>";
    return list;
}

function addSubject() {
    var subject = document.getElementById("subject").value;
    var day = document.getElementById("day").value;
    var lessonNumber = document.getElementById("lessonNumber").value;

    var lessons = document.getElementById("lessons").value;

    if (lessonNumber < 1 || lessonNumber > lessons) {
        showModal("Введите корректный номер урока.");
        return;
    }

    var table = document.getElementById("timetable");
    var cell = table.rows[day].cells[1].getElementsByTagName("li")[lessonNumber - 1];

    if (cell.innerHTML.trim() !== "") {
        showModal("Урок уже установлен в данной ячейке.");
        return;
    }

    cell.innerHTML = subject;
    closeModal();
    localStorage.setItem('timetableData', table.getElementsByTagName('tbody')[0].innerHTML);
}

function deleteSubject() {
    var day = document.getElementById("day").value;
    var lessonNumber = document.getElementById("lessonNumber").value;

    var lessons = document.getElementById("lessons").value;

    if (lessonNumber < 1 || lessonNumber > lessons) {
        showModal("Введите корректный номер урока.");
        return;
    }

    var table = document.getElementById("timetable");
    var cell = table.rows[day].cells[1].getElementsByTagName("li")[lessonNumber - 1];

    if (cell.innerHTML.trim() === "") {
        showModal("В данной ячейке нет урока для удаления.");
        return;
    }

    cell.innerHTML = "";
    closeModal();
    localStorage.setItem('timetableData', table.getElementsByTagName('tbody')[0].innerHTML);
}

function showModal(text) {
    document.getElementById("modalText").innerText = text;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function printTable() {
    var printWindow = window.open('', '_blank');
    var tableContent = document.getElementById("timetable").outerHTML;

    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Table</title></head><body>');
    printWindow.document.write(tableContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();
}