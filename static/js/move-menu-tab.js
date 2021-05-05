// CREATE NAMESPACE
movieChart.createObj('moveTab');

// ELEMENTS SELECT
movieChart.moveTab.tabMenu = document.querySelectorAll('.menu-items');

// FUNCTION
movieChart.moveTab.switchSelectedElement = elem => {
    movieChart.search.searchInput.value = '';

    const [sib] = movieChart.findSiblings(elem);

    sib.classList.remove('selected');

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
        movieChart.showMovieTableOfContents.getMovieList(url);
    });
});
