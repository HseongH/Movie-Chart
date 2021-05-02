movieChart.createObj('curBeingScreen');

movieChart.curBeingScreen.getMovieInfo = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/current', true);

    xhr.overrideMimeType("application/json");

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

window.addEventListener('load', movieChart.curBeingScreen.getMovieInfo);
