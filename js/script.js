'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: {
            list: ["Логан", "Лига справедливости", "Ла-ла лэнд"],
            title: "МАРСИАНИН",
            descr: "ИСТОРИЯ ЧЕЛОВЕКА, ВЫЖИВШЕГО НА ЧУЖОЙ ПЛАНЕТЕ В ОДИНОЧКУ",
            ratings: {
                imdb: "9.5",
                kp: "9.2"
            }
        },
        series: {
            list: ["Во все тяжкие", "Игра престолов", "Офис"],
            title: "ВО ВСЕ ТЯЖКИЕ",
            descr: "ИСТОРИЯ УЧИТЕЛЯ ХИМИИ, СТАВШЕГО НАРКОБАРОНОМ",
            ratings: {
                imdb: "9.5",
                kp: "9.2"
            }
        },
        cartoons: {
            list: ["Король Лев", "Холодное сердце", "История игрушек"],
            title: "КОРОЛЬ ЛЕВ",
            descr: "ИСТОРИЯ ЦАРСТВЕННОГО ЛЬВЁНКА СИМБЫ",
            ratings: {
                imdb: "9.5",
                kp: "9.2"
            }
        }
    };

    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          title = poster.querySelector('.promo__title'),
          descr = poster.querySelector('.promo__descr'),
          menuItems = document.querySelectorAll('.promo__menu-item'),
          interactiveList = document.querySelector('.promo__interactive-list');

    // Удаление рекламы
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    // Изменение данных при переключении
    function updateContent(type = 'movies') {
        // Обновляем активный пункт меню
        menuItems.forEach(item => {
            item.classList.remove('promo__menu-item_active');
            if (item.dataset.type === type) {
                item.classList.add('promo__menu-item_active');
            }
        });

        // Обновляем основную информацию
        genre.textContent = type.toUpperCase();
        title.textContent = movieDB[type].title;
        descr.textContent = movieDB[type].descr;

        // Обновляем список
        sortArr(movieDB[type].list);
        interactiveList.innerHTML = movieDB[type].list.map((item, i) => `
            <li class="promo__interactive-item">
                ${i + 1}. ${item}
                <div class="delete"></div>
            </li>
        `).join('');

        const bgImages = {
            movies: 'url("img/bg.jpg")',
            series: 'url("img/bg.jpg")',
            cartoons: 'url("img/bg.jpg")'
        };
        poster.style.backgroundImage = bgImages[type];

        document.querySelector('.promo__ratings span:first-child').textContent = `IMDb: ${movieDB[type].ratings.imdb}`;
        document.querySelector('.promo__ratings span:last-child').textContent = `Кинопоиск: ${movieDB[type].ratings.kp}`;
    }

    // Сортировка по алфавиту
    const sortArr = (arr) => {
        arr.sort();
    };

    // Обработчики событий
    function initEventListeners() {
        // Переключение разделов
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                updateContent(e.target.dataset.type);
            });
        });

        // Удаление элемента
        interactiveList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                const type = document.querySelector('.promo__menu-item_active').dataset.type;
                const itemIndex = Array.from(e.target.parentNode.parentNode.children)
                    .indexOf(e.target.parentNode);
                
                movieDB[type].list.splice(itemIndex, 1);
                updateContent(type);
            }
        });

        // Добавление нового элемента
        document.querySelector('form.add').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.querySelector('.adding__input');
            const type = document.querySelector('.promo__menu-item_active').dataset.type;
            
            if (input.value) {
                movieDB[type].list.push(input.value.length > 21 ? 
                    `${input.value.substring(0, 22)}...` : input.value);
                updateContent(type);
                input.value = '';
            }
        });
    }

    // Первоначальная загрузка
    // deleteAdv(adv);
    initEventListeners();
    updateContent('movies');

    // Изменение фона (пример для фильмов)
    poster.style.backgroundImage = 'url("img/movies-bg.jpg")';
});