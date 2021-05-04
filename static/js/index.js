const movieChart = {
    createObj: ns => {
        let parent = movieChart;
        let newObj = ns.split('.');
        
        if (newObj[0] === 'movieChart') {
            newObj = newObj.slice(1);
        }

        const loop = newObj.length;

        for (let i = 0; i < loop; i++) {
            if (!parent[newObj[i]]) {
                parent[newObj[i]] = {};
            }

            parent = parent[newObj[i]];
        }

        return parent;
    }
};

// FIND SIBLING ELEMENTS
movieChart.findSiblings = elem => {
    const siblings = [];
    let navElem = elem.parentNode.firstChild;

    while (navElem) {
        if (navElem.nodeType === 1 && navElem !== elem) {
            siblings.push(navElem);
        }

        navElem = navElem.nextSibling;
    }

    return siblings;
}

// MOVIE DATA
movieChart.movieData;
movieChart.movieIndex = 0;
movieChart.viewingAge = {
    '전체 관람가': '../static/img/all.png',
    '12세 관람가': '../static/img/12.png',
    '15세 관람가': '../static/img/15.png',
    '청소년 관람불가': '../static/img/19.png',
}
