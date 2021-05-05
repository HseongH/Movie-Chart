movieChart.createObj('top');

movieChart.top.topBtn = document.querySelector('.go-to-the-top');

movieChart.top.goToTheTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

movieChart.top.topBtn.addEventListener('click', movieChart.top.goToTheTop);
