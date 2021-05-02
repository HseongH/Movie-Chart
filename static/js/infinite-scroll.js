// (function () {
//     const movieDisArea = document.querySelector('.movie-display-area');
//     let movieItems = document.querySelector('.movie-items:last-child');

//     const io = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//             io.unobserve(movieItems);

//             for (let i = 0; i < 10; i++) {
//                 const movieInfo = document.createElement('li');
//                 movieInfo.setAttribute('class', 'movie-items');
//                 movieInfo.innerHTML = `
//                 <div class="movie-pos">
//                 <a href="#">
//                     <img src="../static/img/movie_image.jpg" alt="">
//                 </a>
//                 <span class="viewing-age">전체 관람가</span>
//             </div>

//             <dl class="movie__des">
//                 <dt class="movie__title">
//                     <a href="#">
//                         비와 당신의 이야기
//                     </a>
//                 </dt>

//                 <dd class="grade">
//                     <span class="grade__items">
//                         평점
//                         <strong class="items__des">
//                             7.65
//                         </strong>
//                     </span>

//                     <span class="grade__items">
//                         예매율
//                         <strong class="items__des">
//                             17.26%
//                         </strong>
//                     </span>
//                 </dd>

//                 <dd class="opening-date">2021.04.28</dd>
//             </dl>
//                 `;
            
//                 movieDisArea.appendChild(movieInfo);
//             }
//             movieItems = document.querySelector('.movie-items:last-child');

//             io.observe(movieItems);
//         }
//     }, {
//         threshold: 1
//     });

//     io.observe(movieItems);
// }());