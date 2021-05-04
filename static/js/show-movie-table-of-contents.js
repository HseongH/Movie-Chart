movieChart.createObj('showMovieTableOfContents');

movieChart.showMovieTableOfContents.movieDisplayArea = document.querySelector('.movie-display-area');

movieChart.showMovieTableOfContents.makeList = info => {
    const movieItems = document.createElement('li');
    const poster = document.createElement('div');
    const posLink = document.createElement('a');
    const posImg = document.createElement('img');
    const viewingAge = document.createElement('span');
    const movieDes = document.createElement('dl');
    const movieTit = document.createElement('dt');
    const titLink = document.createElement('a');
    const grade = document.createElement('dd');
    const gradeItem = document.createElement('span');
    const gradeCon = document.createElement('strong');
    const rateItem = document.createElement('span');
    const rateCon = document.createElement('strong');
    const open = document.createElement('dd');

    movieItems.setAttribute('class', 'movie-items');
    // POSTER AREA
    poster.setAttribute('class', 'movie-pos');
    posLink.href = '#';
    posImg.src = info.image;
    posImg.alt = info.title;
    viewingAge.setAttribute('class', 'viewing-age');
    viewingAge.textContent = info.viewingAge;
    
    posLink.appendChild(posImg);
    poster.appendChild(posLink);
    poster.appendChild(viewingAge);

    // DESCRIPTION AREA
    movieDes.setAttribute('class', 'movie__des');
    // DESCRIPTION TITLE
    movieTit.setAttribute('class', 'movie__title');
    titLink.href = '#';
    titLink.textContent = info.title;
    movieTit.appendChild(titLink);
    // GRADE AREA
    grade.setAttribute('class', 'grade');
    gradeItem.setAttribute('class', 'grade__items');
    gradeCon.setAttribute('class', 'items__des');
    gradeItem.textContent = '평점 ';
    gradeCon.textContent = info.grade;
    gradeItem.appendChild(gradeCon);
    // RATE AREA
    rateItem.setAttribute('class', 'grade__items');
    rateCon.setAttribute('class', 'items__des');
    rateItem.textContent = '예매율 ';
    rateCon.textContent = `${info.rate}%`;
    rateItem.appendChild(rateCon);

    grade.appendChild(gradeItem);
    grade.appendChild(rateItem);
    // OPENING DATE AREA
    open.setAttribute('class', 'opening-date');
    open.textContent = info.openingDate;

    movieDes.appendChild(movieTit);
    movieDes.appendChild(grade);
    movieDes.appendChild(open);

    // MOVIE ITEMS APPEND CONTENT
    movieItems.appendChild(poster);
    movieItems.appendChild(movieDes);
    movieChart.showMovieTableOfContents.movieDisplayArea.appendChild(movieItems);
}

movieChart.showMovieTableOfContents.getMovieList = url => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.overrideMimeType("application/json");

    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response).list.list);
            const movieList = JSON.parse(xhr.response).list.list;

            movieList.forEach(list => {
                movieChart.showMovieTableOfContents.makeList(list);
            });
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}

window.addEventListener('load', () => {
    movieChart.showMovieTableOfContents.getMovieList('/current');
});
