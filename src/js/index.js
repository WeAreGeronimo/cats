const catsArrayFromBackend = [];

const listsElements = document.getElementById('catList');
const nextCatsButton = document.getElementById('nextCats')

function randomCats(count) {
    let id = 1;
    for(let i = 0; i < count; i++) {
        function getRandomNumber(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        }

        let name = null;
        let color = null;
        let age = getRandomNumber(1, 24);
        let price = getRandomNumber(500, 20000);
        let isSold = getRandomNumber(0, 1) ? true : false;
        let discount = getRandomNumber(0, 1) ? `-${getRandomNumber(1, 40)}%` : '';

        switch (getRandomNumber(1, 10)) {
            case 1: name = "Азиатская кошка";
                break;
            case 2: name = "Той-бобтейл";
                break;
            case 3: name = "Дракон Ли, Ли Хуа ( Ли Мао )";
                break;
            case 4: name = "Американская многопалая кошка";
                break;
            case 5: name = "Кольцехвостая кошка (Американский рингтейл)";
                break;
            case 6: name = "Кохона (Гавайская бесшерстная кошка)";
                break;
            case 7: name = "Той-бобтейл";
                break;
            case 8: name = "Эгейская кошка";
                break;
            case 9: name = "Рагамаффин";
                break;
            case 10: name = "Анатолийская короткошерстная кошка (Турецкая короткошерстная кошка)";
                break;
        }

        switch (getRandomNumber(1, 10)) {
            case 1: color = "Темный окрас";
                break;
            case 2: color = "Дымчатый окрас";
                break;
            case 3: color = "Полосатый хвост";
                break;
            case 4: color = "Кольцевой окрас";
                break;
            case 5: color = "Трехцветный окрас";
                break;
            case 6: color = "Белый окрас";
                break;
            case 7: color = "Многоцветный окрас";
                break;
            case 8: color = "Полосатый окрас";
                break;
            case 9: color = "Пятнистый окрас";
                break;
            case 10: color = "Однотонный окрас";
                break;
        }
        catsArrayFromBackend.push({
            id: id++,
            discount: discount,
            liked: false,
            src: `img/cat${getRandomNumber(1, 3)}.png`,
            name: name,
            color: color,
            age: age,
            paws: 4,
            price: price,
            isSold: isSold,
        });
    }

}
randomCats(349);
let quantity = 0;


function showNextCats(count) {
    quantity += count;
    console.log('quantity', quantity);
    console.log('catsArrayFromBackend', catsArrayFromBackend);
    if(catsArrayFromBackend.length <= quantity) {
        quantity = catsArrayFromBackend.length;
        listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
        console.log('end massive')
        nextCatsButton.style.display = 'none';
    } else {
        listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
        console.log('not end massive')
    }

}

showNextCats(6);


let favoritesCats = [];
let timer;

function toggleFavorites(idFromObject, indexInArray) {
    let isNeedDelete = true;
    const favoritesModal = document.getElementById('favorites-modal');
    if(!(favoritesCats.indexOf(idFromObject) > -1)) {
        favoritesCats.push(idFromObject);
        favoritesCats.sort(function (a,b) {
            return a - b;
        });
        isNeedDelete = false;
        console.log('pushed', favoritesCats);
        simpleProxyForLike(catsArrayFromBackend, idFromObject, 'liked', true);
        favoritesModal.style.display = 'flex';
        favoritesModal.innerHTML = `<div>Добавлено в избранное! ${favoritesCats.length ? `В избранном ${favoritesCats.length}` : "Лист пуст."}</div>`;
    }

    if((favoritesCats.indexOf(idFromObject) > -1) && isNeedDelete) {
        favoritesCats.splice(favoritesCats.indexOf(idFromObject), 1);
        favoritesCats.sort(function (a,b) {
            return a - b;
        });
        console.log('deleted', favoritesCats);
        simpleProxyForLike(catsArrayFromBackend, idFromObject, 'liked', false);
        favoritesModal.style.display = 'flex';
        favoritesModal.innerHTML = `<div>Удалено из избранного! ${favoritesCats.length ? `В избранном ${favoritesCats.length}` : "Лист пуст."}</div>`;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        favoritesModal.style.display = 'none';
    }, 2000);

}

function simpleProxyForLike(array, objId, property, value) {
    for(let key in array) {
        if(array[key].id == objId) {
            array[key][property] = value;
            listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
        }

    }
}

let scrolled;

document.addEventListener('scroll', function(e) {
    scrolled = window.pageYOffset;
    if(window.pageYOffset) {
        document.getElementById('up').style.display = 'block';

    }

    if(!window.pageYOffset) {
        document.getElementById('up').style.display = 'none';
    }
});
let scrollSpeed = 0.94;
function scrollToTop(){

    if(scrolled > 10) {
        window.scrollTo(0, scrolled);
        scrolled = scrolled * scrollSpeed;
        timer = setTimeout(scrollToTop, 7);
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // });
}

let sortingPriceCriteria = "toHighPrice";
let sortingAgeCriteria = "toHighAge";

function sortCats(criteria) {

    if(criteria == 'price') {
        switch (sortingPriceCriteria) {
            case "toHighPrice": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemA.price - itemB.price;
                });
                sortingPriceCriteria = "toLowPrice";
                document.getElementById('ageSortButton').classList.remove('sortInUse');
                document.getElementById('priceSort').classList.remove('toLow');
                document.getElementById('priceSort').classList.add('toBig');
                document.getElementById('priceSortButton').classList.add('sortInUse');
            };
            break;
            case "toLowPrice": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemB.price - itemA.price;
                });
                sortingPriceCriteria = "toHighPrice";
                document.getElementById('ageSortButton').classList.remove('sortInUse');
                document.getElementById('priceSort').classList.remove('toBig');
                document.getElementById('priceSort').classList.add('toLow');
                document.getElementById('priceSortButton').classList.add('sortInUse');
            };
            break;
        }
    }

    if(criteria == 'age') {
        switch (sortingAgeCriteria) {
            case "toHighAge": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemA.age - itemB.age;
                });
                sortingAgeCriteria = "toLowAge";
                document.getElementById('priceSortButton').classList.remove('sortInUse');
                document.getElementById('ageSort').classList.remove('toLow');
                document.getElementById('ageSort').classList.add('toBig');
                document.getElementById('ageSortButton').classList.add('sortInUse');

            };
                break;
            case "toLowAge": {
                catsArrayFromBackend.sort(function (itemA, itemB) {
                    return itemB.age - itemA.age;
                });
                sortingAgeCriteria = "toHighAge";
                document.getElementById('priceSortButton').classList.remove('sortInUse');
                document.getElementById('ageSort').classList.remove('toBig');
                document.getElementById('ageSort').classList.add('toLow');
                document.getElementById('ageSortButton').classList.add('sortInUse');
            };
                break;
        }
    }

    listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
}

function validateEmail(email) {
    let regexp = /\S+@\S+\.\S+/;
    return regexp.test(email);
}

const emailInput = document.getElementById('emailForNews');
const tips = document.getElementById('tips');
emailInput.addEventListener('change', updateValue);

emailInput.addEventListener('click', () => {
    emailInput.style.background = '#ffffff';
    tips.innerText = '';
});

let emailValue;

function updateValue(e) {
   emailValue = e.target.value;
}

function subscribeToNews() {
    if(validateEmail(emailValue)) {
        console.log('correct email');
        emailInput.style.background = '#a6e269';
    } else {
        console.log('incorrect email');
        tips.innerText = 'Введите, пожалуйста, действительный Email!';
        emailInput.style.background = '#ff8585';
    }
}





//= itemsGenerator.js
//= burgerMenu.js