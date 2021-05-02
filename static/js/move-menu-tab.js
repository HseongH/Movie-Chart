movieChart.createObj('moveTab');

movieChart.moveTab.switchSelectedElement = elem => {
    const sib = movieChart.findSiblings(elem);

    Array.prototype.forEach.call(sib, sibElem => {
        sibElem.classList.remove('selected');
    });

    elem.classList.add('selected');
}

// ELEMENTS SELECT
movieChart.moveTab.tabMenu = document.querySelectorAll('.menu-items');

// TAB MOVE WHEN MENU IS CLICKED
Array.prototype.forEach.call(movieChart.moveTab.tabMenu, tab => {
    tab.addEventListener('click', function() {
        movieChart.moveTab.switchSelectedElement(this);
    });
});
