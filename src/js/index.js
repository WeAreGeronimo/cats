const catsArrayFromBackend = [];
const listsElements = document.getElementById('catList');
const nextCatsButton = document.getElementById('nextCats');
const emailInput = document.getElementById('emailForNews');
const tips = document.getElementById('tips');
const favoritesModal = document.getElementById('favorites-modal');
let quantity = 0;
let favoritesCats = [];
let timer;
let scrolled;
const SCROLL_SPEED = 0.94;
let sortingPriceCriteria = "TO_HIGH_PRICE";
let sortingAgeCriteria = "TO_HIGH_AGE";
const classSettings = {
    TO_HIGH_PRICE: function () {
        document.getElementById('ageSortButton').classList.remove('sortInUse');
        document.getElementById('priceSort').classList.remove('toLow');
        document.getElementById('priceSort').classList.add('toBig');
        document.getElementById('priceSortButton').classList.add('sortInUse');
    },
    TO_LOW_PRICE: function () {
        document.getElementById('ageSortButton').classList.remove('sortInUse');
        document.getElementById('priceSort').classList.remove('toBig');
        document.getElementById('priceSort').classList.add('toLow');
        document.getElementById('priceSortButton').classList.add('sortInUse');
    },
    TO_HIGH_AGE: function () {
        document.getElementById('priceSortButton').classList.remove('sortInUse');
        document.getElementById('ageSort').classList.remove('toLow');
        document.getElementById('ageSort').classList.add('toBig');
        document.getElementById('ageSortButton').classList.add('sortInUse');
    },
    TO_LOW_AGE: function () {
        document.getElementById('priceSortButton').classList.remove('sortInUse');
        document.getElementById('ageSort').classList.remove('toBig');
        document.getElementById('ageSort').classList.add('toLow');
        document.getElementById('ageSortButton').classList.add('sortInUse');
    },
};
let emailValue;


document.addEventListener('scroll', function(e) {
    scrolled = window.pageYOffset;
    if(window.pageYOffset) {
        document.getElementById('up').style.display = 'block';

    }

    if(!window.pageYOffset) {
        document.getElementById('up').style.display = 'none';
    }
});

emailInput.addEventListener('change', updateValue);

emailInput.addEventListener('click', () => {
    emailInput.style.background = '#ffffff';
    tips.innerText = '';
});

// ie не знает метод Array.prototype.includes();
function isInclude (array, catsId) {
    return array.indexOf(catsId) > -1
}

function randomCats(count) {
    let id = 1;

    const catsBreeds = {
        1: "Азиатская кошка",
        2: "Той-бобтейл",
        3: "Дракон Ли, Ли Хуа ( Ли Мао )",
        4: "Американская многопалая кошка",
        5: "Кольцехвостая кошка (Американский рингтейл)",
        6: "Кохона (Гавайская бесшерстная кошка)",
        7: "Персидская кошка",
        8: "Эгейская кошка",
        9: "Рагамаффин",
        10: "Анатолийская короткошерстная кошка (Турецкая короткошерстная кошка)",
    };

    const catsColors = {
        1: "Темный окрас",
        2: "Дымчатый окрас",
        3: "Полосатый хвост",
        4: "Кольцевой окрас",
        5: "Трехцветный окрас",
        6: "Белый окрас",
        7: "Многоцветный окрас",
        8: "Полосатый окрас",
        9: "Пятнистый окрас",
        10: "Однотонный окрас",
    };

    function getRandomNumber(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    for(let i = 0; i < count; i++) {
        catsArrayFromBackend.push({
            id: id++,
            discount: getRandomNumber(0, 1) ? `-${getRandomNumber(1, 40)}%` : '',
            liked: false,
            src: `img/cat${getRandomNumber(1, 3)}.png`,
            name: catsBreeds[getRandomNumber(1, 10)],
            color: catsColors[getRandomNumber(1, 10)],
            age: getRandomNumber(1, 24),
            paws: 4,
            price: getRandomNumber(500, 20000),
            isSold: getRandomNumber(0, 1) ? true : false,
        });
    }

};

function showNextCats(count) {
    quantity += count;
    if(catsArrayFromBackend.length <= quantity) {
        quantity = catsArrayFromBackend.length;
        listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
        nextCatsButton.style.display = 'none';
    } else {
        listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
    }

};

function toggleFavorites(catsId) {
    let isNeedDelete = true;
    if(!isInclude(favoritesCats, catsId)) {
        favoritesCats.push(catsId);
        favoritesCats.sort(function (a,b) {
            return a - b;
        });
        isNeedDelete = false;
        console.log('pushed', favoritesCats);
        simpleProxyForLike(catsArrayFromBackend, catsId, 'liked', true);
        favoritesModal.style.display = 'flex';
        favoritesModal.innerHTML = `<div>Добавлено в избранное! ${favoritesCats.length ? `В избранном ${favoritesCats.length}` : "Лист пуст."}</div>`;
    }

    if(isInclude(favoritesCats, catsId) && isNeedDelete) {
        favoritesCats.splice(favoritesCats.indexOf(catsId), 1);
        favoritesCats.sort(function (a,b) {
            return a - b;
        });
        console.log('deleted', favoritesCats);
        simpleProxyForLike(catsArrayFromBackend, catsId, 'liked', false);
        favoritesModal.style.display = 'flex';
        favoritesModal.innerHTML = `<div>Удалено из избранного! ${favoritesCats.length ? `В избранном ${favoritesCats.length}` : "Лист пуст."}</div>`;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        favoritesModal.style.display = 'none';
    }, 2000);

};

function simpleProxyForLike(array, catsId, property, value) {
    for(let key in array) {
        if(array[key].id === catsId) {
            array[key][property] = value;
            listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
        }
    }
};

function scrollToTop(){

    if(scrolled > 10) {
        window.scrollTo(0, scrolled);
        scrolled = scrolled * SCROLL_SPEED;
        timer = setTimeout(scrollToTop, 7);
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
};

function sortCats(criteria) {

    if(criteria === 'price') {
        switch (sortingPriceCriteria) {
            case "TO_HIGH_PRICE": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemA.price - itemB.price;
                });
                classSettings[sortingPriceCriteria]();
                sortingPriceCriteria = "TO_LOW_PRICE";
            };
                break;
            case "TO_LOW_PRICE": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemB.price - itemA.price;
                });
                classSettings[sortingPriceCriteria]();
                sortingPriceCriteria = "TO_HIGH_PRICE";
            };
                break;
        }
    }

    if(criteria === 'age') {
        switch (sortingAgeCriteria) {
            case "TO_HIGH_AGE": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemA.age - itemB.age;
                });
                classSettings[sortingAgeCriteria]();
                sortingAgeCriteria = "TO_LOW_AGE";

            };
                break;
            case "TO_LOW_AGE": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemB.age - itemA.age;
                });
                classSettings[sortingAgeCriteria]();
                sortingAgeCriteria = "TO_HIGH_AGE";
            };
                break;
        }
    }

    listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
}

function validateEmail(email) {
    let regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(email);
}

function updateValue(e) {
    emailValue = e.target.value;
}

function subscribeToNews() {
    if(validateEmail(emailValue)) {
        document.getElementById('accept').style.display = 'block';
        document.getElementById('subscribe').disabled = true;
        document.getElementById('subscribe').innerText = 'Спасибо!'
        emailInput.style.background = '#a6e269';
    } else {
        document.getElementById('accept').style.display = 'none';
        tips.innerText = 'Введите, пожалуйста, действительный Email!';
        emailInput.style.background = '#ff8585';
    }
}


randomCats(349);

showNextCats(6);

//= itemsGenerator.js
//= burgerMenu.js