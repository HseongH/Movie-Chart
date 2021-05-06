movieChart.createObj('sort');

movieChart.sort.standard = {
    '예매율순': 'rate',
    '평점순': 'grade',
    '개봉일순': 'openingDate'
};

movieChart.sort.rearrangement = (data, standard) => {
    if (data.length <= 1) {
        return data;
    }
    
    const pivot = data[0][standard] ? 
    parseInt(data[0][standard].split('.').join('')) : data[0][standard];
    const left = [];
    const right = [];

    for (let i = 1; i < data.length; i++) {
        const compare = data[i][standard] ? 
        parseInt(data[i][standard].split('.').join('')) : data[i][standard];

        if (compare > pivot) {
            left.push(data[i]);
            continue
        }
        right.push(data[i]);
    }

    return movieChart.sort.rearrangement(left, standard).concat([data[0]]).concat(movieChart.sort.rearrangement(right, standard));
}

movieChart.sort.sortFuncCall = standard => {
    movieChart.showMovieTableOfContents.movieDisplayArea.innerText = '';
    movieChart.movieIndex = 0;
    movieChart.movieData = movieChart.sort.rearrangement(movieChart.movieData, standard);

    for (let i = 0; i < 5; i++) {
        movieChart.showMovieTableOfContents.makeList(movieChart.movieData[i]);
    }

    movieChart.infiniteScroll();
}
