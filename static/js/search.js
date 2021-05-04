movieChart.createObj('search');

movieChart.search.searchMovie = query => {
    const xhr = new XMLHttpRequest();
    const search = JSON.stringify(query);

    xhr.open('GET', '/search?query=' + search, true);

    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}

movieChart.search.searchForm = document.getElementById('form--search');
movieChart.search.searchInput = document.getElementById('input--search');


movieChart.search.searchForm.addEventListener('submit', function() {
    const value = movieChart.search.searchInput.value;
    movieChart.search.searchMovie(value);
});
