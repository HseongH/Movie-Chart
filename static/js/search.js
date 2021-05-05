movieChart.createObj('search');

movieChart.search.searchMovie = query => {
    if (!query) return;

    const selected = document.querySelector('.selected');
    const xhr = new XMLHttpRequest();
    
    movieChart.search.loading.classList.remove('hide');
    movieChart.display.hide(movieChart.display.searchArea);

    selected && selected.classList.remove('selected');
    movieChart.showMovieTableOfContents.movieDisplayArea.innerText = '';

    xhr.open('GET', '/search?query=' + query, true);

    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
            movieChart.search.loading.classList.add('hide');
            movieChart.showMovieTableOfContents.movieDisplayArea.innerText = '';
            movieChart.movieIndex = 0;

            movieChart.movieData = JSON.parse(xhr.response).list.list;

            if (movieChart.movieData.length === 0) {
                movieChart.showMovieTableOfContents.movieDisplayArea.innerText = `${query}에 대한 검색 결과가 없습니다.`;
                return;
            }

            while(movieChart.movieData[movieChart.movieIndex]) {
                movieChart.showMovieTableOfContents.makeList(movieChart.movieData[movieChart.movieIndex]);
            }
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}

movieChart.search.searchForm = document.getElementById('form--search');
movieChart.search.searchInput = document.getElementById('input--search');
movieChart.search.loading = document.querySelector('.loading');

movieChart.search.searchForm.addEventListener('submit', function() {
    event.preventDefault();
    const value = movieChart.search.searchInput.value;

    movieChart.search.searchMovie(value);
});
