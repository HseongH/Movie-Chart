movieChart.infiniteScroll = () => {
    let movieItems = document.querySelector('.movie-items:last-child');

    const io = new IntersectionObserver((entries) => {
        if (!movieChart.movieData[movieChart.movieIndex]) return;

        if (entries[0].isIntersecting) {
            io.unobserve(movieItems);

            movieChart.showMovieTableOfContents.makeList(movieChart.movieData[movieChart.movieIndex]);

            movieItems = document.querySelector('.movie-items:last-child');

            io.observe(movieItems);
        }
    }, {
        threshold: 1
    });

    io.observe(movieItems);
}
