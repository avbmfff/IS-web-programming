document.addEventListener("DOMContentLoaded", function () {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    var links = document.querySelectorAll(".link_section");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.getAttribute("href") === filename) {
            link.classList.add("active");
        }
    }

    var preloaderWrapper = document.querySelector('.preloader-wrapper');
    var commentsList = document.getElementById('commentsList');
    var loading = false;
    var commentBatchSize = 10;
    var currentCommentIndex = 0;

    preloaderWrapper.style.display = 'none';

    function fetchComments() {
        var filterId = Math.floor(Math.random() * 100) + 1;

        preloaderWrapper.style.display = 'flex';
        loading = true;

        fetch(`https://jsonplaceholder.typicode.com/comments?postId_gte=${filterId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(comments => {
                preloaderWrapper.style.display = 'none';
                loading = false;

                for (var i = 0; i < commentBatchSize; i++) {
                    var comment = comments[currentCommentIndex];
                    if (!comment) {
                        break;
                    }

                    const li = document.createElement('li');
                    li.classList.add('comment-item');

                    const commentContent = document.createElement('div');
                    commentContent.classList.add('comment-content');

                    commentContent.innerHTML = `
                                <strong class="comment-author">${comment.name}</strong>
                                (<a href="mailto:${comment.email}" class="comment-email">${comment.email}</a>):
                                <p class="comment-body">${comment.body}</p>
                            `;

                    li.appendChild(commentContent);
                    commentsList.appendChild(li);

                    currentCommentIndex++;
                }
            })
            .catch(error => {
                preloaderWrapper.style.display = 'none';
                loading = false;

                var errorPlaceholder = document.createElement('div');
                errorPlaceholder.classList.add('error-placeholder');
                errorPlaceholder.textContent = '⚠ Что-то пошло не так';
                commentsList.appendChild(errorPlaceholder);
                console.error('Fetch error:', error);
            });
    }

    fetchComments();

    window.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY + window.innerHeight;
        var documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - 200 && !loading) {
            fetchComments();
        }
    });
});