const xhr = new XMLHttpRequest();

xhr.open('GET', '/search', true);

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
