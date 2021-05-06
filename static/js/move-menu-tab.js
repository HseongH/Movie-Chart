// CREATE NAMESPACE
movieChart.createObj('moveTab');

// ELEMENTS SELECT
movieChart.moveTab.tabMenu = document.querySelectorAll('.menu-items');
movieChart.moveTab.sortMenu = document.querySelector('.sort-menu');
movieChart.moveTab.sortItems = document.querySelectorAll('.sort-items');

// FUNCTION
movieChart.moveTab.switchSelectedElement = elem => {
    movieChart.search.searchInput.value = '';

    const sib = movieChart.findSiblings(elem);

    Array.prototype.forEach.call(sib, tab => {
        tab.classList.remove('selected');
    });

    elem.classList.add('selected');
}

// TAB MOVE WHEN MENU IS CLICKED
Array.prototype.forEach.call(movieChart.moveTab.tabMenu, tab => {
    const button = tab.querySelector('a');
    const url = button.hash.substr(2);

    button.addEventListener('click', function() {
        movieChart.showMovieTableOfContents.movieDisplayArea.innerText = '';
        movieChart.search.loading.classList.add('hide');
        movieChart.moveTab.switchSelectedElement(tab);
        movieChart.moveTab.switchSelectedElement(movieChart.moveTab.sortItems[0]);
        movieChart.showMovieTableOfContents.getMovieList(url);
        
        if (url === 'being-screen') {
            movieChart.moveTab.sortMenu.classList.remove('hide');
            return;
        }

        movieChart.moveTab.sortMenu.classList.add('hide');
    });
});
Array.prototype.forEach.call(movieChart.moveTab.sortItems, sort => {
    sort.addEventListener('click', function() {
        const standard = movieChart.sort.standard[sort.innerText];

        movieChart.moveTab.switchSelectedElement(sort);
        movieChart.sort.sortFuncCall(standard);
    });
});
