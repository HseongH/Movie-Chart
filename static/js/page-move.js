movieChart.createObj('pageMove');

movieChart.pageMove.movePageByPage = elem => {
    const arrow = [movieChart.pageMove.leftArrow, movieChart.pageMove.rightArrow];
    if (arrow.includes(elem)) return;

    movieChart.moveTab.switchSelectedElement(elem);
    movieChart.pageMove.currentPage = elem;
    movieChart.pageMove.arrowActivate();
}

movieChart.pageMove.arrowActivate = () => {
    movieChart.pageMove.leftArrow.classList.remove('disabled');
    movieChart.pageMove.rightArrow.classList.remove('disabled');

    if (movieChart.pageMove.currentPage.innerText === '1') {
        movieChart.pageMove.leftArrow.classList.add('disabled');
    }

    if (movieChart.pageMove.currentPage.innerText === movieChart.pageMove.pageNum[movieChart.pageMove.pageNum.length - 1].innerText) {
        movieChart.pageMove.rightArrow.classList.add('disabled');
    }
}

// ELEMENTS SELECT
movieChart.pageMove.pageMove = document.querySelector('.page-move');
movieChart.pageMove.currentPage = movieChart.pageMove.pageMove.querySelector('.selected');
movieChart.pageMove.leftArrow = document.querySelector('.left-arrow');
movieChart.pageMove.rightArrow = document.querySelector('.right-arrow');
movieChart.pageMove.pageNum = document.querySelectorAll('.page-num');

// GO TO PAGE BY NUMBER
Array.prototype.forEach.call(movieChart.pageMove.pageNum, num => {
    num.addEventListener('click', function() {
        movieChart.moveTab.switchSelectedElement(this);
        movieChart.pageMove.currentPage = this;
        movieChart.pageMove.arrowActivate();
    });
});

// GO TO PAGE BY ARROW
movieChart.pageMove.leftArrow.addEventListener('click', function() {
    movieChart.pageMove.movePageByPage(movieChart.pageMove.currentPage.previousElementSibling);
});
movieChart.pageMove.rightArrow.addEventListener('click', function() {
    movieChart.pageMove.movePageByPage(movieChart.pageMove.currentPage.nextElementSibling);
});
