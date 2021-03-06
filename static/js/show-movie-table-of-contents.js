// CREATE NAMESPACE
movieChart.createObj('showMovieTableOfContents');

// VARIABLE
movieChart.showMovieTableOfContents.movieDisplayArea = document.querySelector('.movie-display-area');

// FUNCTION
// APPEND MOVIE LIST
movieChart.showMovieTableOfContents.makeList = info => {
    const movieItems = document.createElement('li');
    const poster = document.createElement('div');
    const posLink = document.createElement('a');
    const posImg = document.createElement('img');
    const movieDes = document.createElement('dl');
    const movieTit = document.createElement('dt');
    const titLink = document.createElement('a');

    movieItems.setAttribute('class', 'movie-items');
    // POSTER AREA
    poster.setAttribute('class', 'movie-pos');
    posLink.setAttribute('target', '_blank');
    posLink.href = info.link;
    posImg.src = info.image;
    posImg.alt = info.title;
    posLink.appendChild(posImg);
    poster.appendChild(posLink);

    if (info.viewingAge) {
        const viewingAge = document.createElement('span');
        const backgroundImage = movieChart.viewingAge[info.viewingAge];

        viewingAge.setAttribute('class', 'viewing-age');
        viewingAge.textContent = info.viewingAge;
        viewingAge.style.backgroundImage = `url(${backgroundImage})`;
    
        poster.appendChild(viewingAge);
    }

    // DESCRIPTION AREA
    movieDes.setAttribute('class', 'movie__des');
    // DESCRIPTION TITLE
    movieTit.setAttribute('class', 'movie__title');
    titLink.setAttribute('target', '_blank');
    titLink.href = info.link;
    titLink.innerHTML = info.title;
    movieTit.appendChild(titLink);
    movieDes.appendChild(movieTit);
    // GRADE AREA
    if (info.grade || info.rate) {
        const grade = document.createElement('dd');
        grade.setAttribute('class', 'grade');

        if (info.grade) {
            const gradeItem = document.createElement('span');
            const gradeCon = document.createElement('strong');
    
            gradeItem.setAttribute('class', 'grade__items');
            gradeCon.setAttribute('class', 'items__des');
            gradeItem.textContent = '?????? ';
            gradeCon.textContent = info.grade;
            gradeItem.appendChild(gradeCon);
    
            grade.appendChild(gradeItem);
        }
        // RATE AREA
        if (info.rate) {
            const rateItem = document.createElement('span');
            const rateCon = document.createElement('strong');
    
            rateItem.setAttribute('class', 'grade__items');
            rateCon.setAttribute('class', 'items__des');
            rateItem.textContent = '????????? ';
            rateCon.textContent = `${info.rate}%`;
            rateItem.appendChild(rateCon);
    
            grade.appendChild(rateItem);
        }

        movieDes.appendChild(grade);
    }

    // OPENING DATE AREA
    if (info.openingDate) {
        const open = document.createElement('dd');

        open.setAttribute('class', 'opening-date');
        open.textContent = info.openingDate;

        movieDes.appendChild(open);
    }

    // MOVIE ITEMS APPEND CONTENT
    movieItems.appendChild(poster);
    movieItems.appendChild(movieDes);
    movieChart.showMovieTableOfContents.movieDisplayArea.appendChild(movieItems);

    movieChart.movieIndex++;
}

// AJAX
movieChart.showMovieTableOfContents.getMovieList = url => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.overrideMimeType("application/json");

    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
            movieChart.movieData = JSON.parse(xhr.response).list.list;

            movieChart.movieIndex = 0;

            for (let i = 0; i < 5; i++) {
                movieChart.showMovieTableOfContents.makeList(movieChart.movieData[i]);
            }

            movieChart.infiniteScroll();
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}

// INITIAL SCREEN
movieChart.showMovieTableOfContents.hashBang = () => {
    if (location.hash) {
        const url = location.hash.substr(2);

        if (url === 'to-be-screen') {
            movieChart.moveTab.switchSelectedElement(movieChart.moveTab.tabMenu[1]);
        }

        movieChart.showMovieTableOfContents.getMovieList(url);
    } else {
        movieChart.showMovieTableOfContents.getMovieList('/being-screen');
    }
}

// EVENT HANDLER
window.addEventListener('load', () => {
    movieChart.showMovieTableOfContents.hashBang();
});
