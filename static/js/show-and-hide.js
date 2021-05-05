movieChart.createObj('display');

movieChart.display.mobileSearch = document.querySelector('.mobile-search');
movieChart.display.searchArea = document.querySelector('.search-area');

movieChart.display.hide = target => {
    target.classList.remove('show');
}

movieChart.display.show = target => {
    target.classList.add('show');
}

movieChart.display.hideElementWhenClickAnywhere = function(elem) {
    const target = event.target;
    const arg = Array.prototype.slice.call(arguments, 1);

    if (target.closest(arg)) return;

    movieChart.display.hide(elem);
}

movieChart.display.mobileSearch.addEventListener('click', function() {
    movieChart.display.show(movieChart.display.searchArea);
});

// HIDE ELEMENT WHEN CLICKED ANYWHERE
document.addEventListener('click', () => {
    movieChart.display.hideElementWhenClickAnywhere(movieChart.display.searchArea, '#form--search', '.mobile-search');
});
