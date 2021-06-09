"use strict";

function openMenu() {
  document.getElementById('burgerButton').classList.toggle('openMenu');
  document.getElementById('menuWrapper').classList.toggle('openMenu');
}
"use strict";

var catsArrayFromBackend = [];
var listsElements = document.getElementById('catList');
var nextCatsButton = document.getElementById('nextCats');
var emailInput = document.getElementById('emailForNews');
var tips = document.getElementById('tips');
var favoritesModal = document.getElementById('favorites-modal');
var quantity = 0;
var favoritesCats = [];
var timer;
var scrolled;
var SCROLL_SPEED = 0.94;
var sortingPriceCriteria = "TO_HIGH_PRICE";
var sortingAgeCriteria = "TO_HIGH_AGE";
var classSettings = {
  TO_HIGH_PRICE: function TO_HIGH_PRICE() {
    document.getElementById('ageSortButton').classList.remove('sortInUse');
    document.getElementById('priceSort').classList.remove('toLow');
    document.getElementById('priceSort').classList.add('toBig');
    document.getElementById('priceSortButton').classList.add('sortInUse');
  },
  TO_LOW_PRICE: function TO_LOW_PRICE() {
    document.getElementById('ageSortButton').classList.remove('sortInUse');
    document.getElementById('priceSort').classList.remove('toBig');
    document.getElementById('priceSort').classList.add('toLow');
    document.getElementById('priceSortButton').classList.add('sortInUse');
  },
  TO_HIGH_AGE: function TO_HIGH_AGE() {
    document.getElementById('priceSortButton').classList.remove('sortInUse');
    document.getElementById('ageSort').classList.remove('toLow');
    document.getElementById('ageSort').classList.add('toBig');
    document.getElementById('ageSortButton').classList.add('sortInUse');
  },
  TO_LOW_AGE: function TO_LOW_AGE() {
    document.getElementById('priceSortButton').classList.remove('sortInUse');
    document.getElementById('ageSort').classList.remove('toBig');
    document.getElementById('ageSort').classList.add('toLow');
    document.getElementById('ageSortButton').classList.add('sortInUse');
  }
};
var emailValue;
document.addEventListener('scroll', function (e) {
  scrolled = window.pageYOffset;

  if (window.pageYOffset) {
    document.getElementById('up').style.display = 'block';
  }

  if (!window.pageYOffset) {
    document.getElementById('up').style.display = 'none';
  }
});
emailInput.addEventListener('change', updateValue);
emailInput.addEventListener('click', function () {
  emailInput.style.background = '#ffffff';
  tips.innerText = '';
}); // ie не знает метод Array.prototype.includes();

function isInclude(array, catsId) {
  return array.indexOf(catsId) > -1;
}

function randomCats(count) {
  var id = 1;

  for (var i = 0; i < count; i++) {
    var getRandomNumber = function getRandomNumber(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    };

    var catsBreeds = {
      1: "Азиатская кошка",
      2: "Той-бобтейл",
      3: "Дракон Ли, Ли Хуа ( Ли Мао )",
      4: "Американская многопалая кошка",
      5: "Кольцехвостая кошка (Американский рингтейл)",
      6: "Кохона (Гавайская бесшерстная кошка)",
      7: "Персидская кошка",
      8: "Эгейская кошка",
      9: "Рагамаффин",
      10: "Анатолийская короткошерстная кошка (Турецкая короткошерстная кошка)"
    };
    var catsColors = {
      1: "Темный окрас",
      2: "Дымчатый окрас",
      3: "Полосатый хвост",
      4: "Кольцевой окрас",
      5: "Трехцветный окрас",
      6: "Белый окрас",
      7: "Многоцветный окрас",
      8: "Полосатый окрас",
      9: "Пятнистый окрас",
      10: "Однотонный окрас"
    };
    catsArrayFromBackend.push({
      id: id++,
      discount: getRandomNumber(0, 1) ? "-".concat(getRandomNumber(1, 40), "%") : '',
      liked: false,
      src: "img/cat".concat(getRandomNumber(1, 3), ".png"),
      name: catsBreeds[getRandomNumber(1, 10)],
      color: catsColors[getRandomNumber(1, 10)],
      age: getRandomNumber(1, 24),
      paws: 4,
      price: getRandomNumber(500, 20000),
      isSold: getRandomNumber(0, 1) ? true : false
    });
  }
}

;

function showNextCats(count) {
  quantity += count;

  if (catsArrayFromBackend.length <= quantity) {
    quantity = catsArrayFromBackend.length;
    listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
    nextCatsButton.style.display = 'none';
  } else {
    listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join("");
  }
}

;

function toggleFavorites(catsId) {
  var isNeedDelete = true;

  if (!isInclude(favoritesCats, catsId)) {
    favoritesCats.push(catsId);
    favoritesCats.sort(function (a, b) {
      return a - b;
    });
    isNeedDelete = false;
    console.log('pushed', favoritesCats);
    simpleProxyForLike(catsArrayFromBackend, catsId, 'liked', true);
    favoritesModal.style.display = 'flex';
    favoritesModal.innerHTML = "<div>\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435! ".concat(favoritesCats.length ? "\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C ".concat(favoritesCats.length) : "Лист пуст.", "</div>");
  }

  if (isInclude(favoritesCats, catsId) && isNeedDelete) {
    favoritesCats.splice(favoritesCats.indexOf(catsId), 1);
    favoritesCats.sort(function (a, b) {
      return a - b;
    });
    console.log('deleted', favoritesCats);
    simpleProxyForLike(catsArrayFromBackend, catsId, 'liked', false);
    favoritesModal.style.display = 'flex';
    favoritesModal.innerHTML = "<div>\u0423\u0434\u0430\u043B\u0435\u043D\u043E \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E! ".concat(favoritesCats.length ? "\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C ".concat(favoritesCats.length) : "Лист пуст.", "</div>");
  }

  clearTimeout(timer);
  timer = setTimeout(function () {
    favoritesModal.style.display = 'none';
  }, 2000);
}

;

function simpleProxyForLike(array, catsId, property, value) {
  for (var key in array) {
    if (array[key].id === catsId) {
      array[key][property] = value;
      listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
    }
  }
}

;

function scrollToTop() {
  if (scrolled > 10) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled * SCROLL_SPEED;
    timer = setTimeout(scrollToTop, 7);
  } else {
    clearTimeout(timer);
    window.scrollTo(0, 0);
  }
}

;

function sortCats(criteria) {
  if (criteria === 'price') {
    switch (sortingPriceCriteria) {
      case "TO_HIGH_PRICE":
        {
          catsArrayFromBackend.sort(function (itemA, itemB) {
            return itemA.price - itemB.price;
          });
          classSettings[sortingPriceCriteria]();
          sortingPriceCriteria = "TO_LOW_PRICE";
        }
        ;
        break;

      case "TO_LOW_PRICE":
        {
          catsArrayFromBackend.sort(function (itemA, itemB) {
            return itemB.price - itemA.price;
          });
          classSettings[sortingPriceCriteria]();
          sortingPriceCriteria = "TO_HIGH_PRICE";
        }
        ;
        break;
    }
  }

  if (criteria === 'age') {
    switch (sortingAgeCriteria) {
      case "TO_HIGH_AGE":
        {
          catsArrayFromBackend.sort(function (itemA, itemB) {
            return itemA.age - itemB.age;
          });
          classSettings[sortingPriceCriteria]();
          sortingAgeCriteria = "TO_LOW_AGE";
        }
        ;
        break;

      case "TO_LOW_AGE":
        {
          catsArrayFromBackend.sort(function (itemA, itemB) {
            return itemB.age - itemA.age;
          });
          classSettings[sortingPriceCriteria]();
          sortingAgeCriteria = "TO_HIGH_AGE";
        }
        ;
        break;
    }
  }

  listsElements.innerHTML = itemsGenerator(catsArrayFromBackend, quantity).join('');
}

function validateEmail(email) {
  var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regexp.test(email);
}

function updateValue(e) {
  emailValue = e.target.value;
}

function subscribeToNews() {
  if (validateEmail(emailValue)) {
    document.getElementById('accept').style.display = 'block';
    document.getElementById('subscribe').disabled = true;
    document.getElementById('subscribe').innerText = 'Спасибо!';
    emailInput.style.background = '#a6e269';
  } else {
    document.getElementById('accept').style.display = 'none';
    tips.innerText = 'Введите, пожалуйста, действительный Email!';
    emailInput.style.background = '#ff8585';
  }
}

randomCats(349);
showNextCats(6); //= itemsGenerator.js
//= burgerMenu.js
"use strict";

function itemsGenerator(array, quantity) {
  function template(item, idx) {
    var heart = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 46 42\" xmlns=\"http://www.w3.org/2000/svg\">\n                 <path width=\"100%\" height=\"100%\" class=\"main-heart\" d=\"M33.7812 0.695312C31.2851 0.695312 28.9966 1.4863 26.9794 3.04634C25.0456 4.54197 23.758 6.44693 23 \n                            7.83214C22.242 6.44684 20.9544 4.54197 19.0206 3.04634C17.0034 1.4863 14.7149 0.695312 \n                            12.2188 0.695312C5.25298 0.695312 0 6.39293 0 13.9485C0 22.1112 6.55347 27.696 16.4746 36.1505C18.1593 \n                            37.5863 20.0689 39.2138 22.0538 40.9494C22.3154 41.1785 22.6514 41.3047 23 41.3047C23.3486 \n                            41.3047 23.6846 41.1785 23.9462 40.9495C25.9312 39.2136 27.8408 37.5862 29.5265 \n                            36.1496C39.4465 27.696 46 22.1112 46 13.9485C46 6.39293 40.747 0.695312 33.7812 0.695312Z\"\n                 fill=\"".concat(item.liked ? "red" : "white", "\" fill-opacity=\"").concat(item.liked ? "0.8" : "0.5", "\" stroke=\"black\" stroke-opacity=\"0.5\"/>\n</svg>");
    return "<div class=\"main-item\" id=\"item_".concat(item.id, "\">\n                      <button class=\"main-like\" onclick=\"toggleFavorites(").concat(item.id, ")\">").concat(heart, "</button>\n                      <div class=\"main-discount flex j-c-center a-i-center\"\n                           style=\"").concat(item.discount ? '' : 'display: none', "\">").concat(item.discount, "</div>\n                      <img class=\"main-picture block\" src=\"").concat(item.src, "\">\n                      <div class=\"main-infosWrapper\">\n                        <div class=\"main-name\" \n                             style=\"").concat(item.name.length > 24 ? 'font-size: 1rem; line-height: 1.2rem;' : 'font-size: 1.5rem; line-height: 1.875rem;', "\"\n                             >").concat(item.name, "</div>\n                        <div class=\"main-info flex j-c-space-around\">\n                          <div class=\"main-color\" title=\"\">").concat(item.color, "</div>\n                          <div class=\"main-agesWrapper\">\n                            <span class=\"main-age block\">\u0412\u043E\u0437\u0440\u0430\u0441\u0442</span>\n                            <span class=\"main-yearsOld block\">").concat(item.age, " \u043C\u0435\u0441.</span>\n                          </div>\n                          <div class=\"main-pawsWrapper\">\n                            <div class=\"main-paws block\">\u041A\u043E\u043B-\u0432\u043E \u043B\u0430\u043F</div>\n                            <div class=\"main-count block\">").concat(item.paws, "</div>\n                          </div>\n                        </div>\n                        <div class=\"main-price\">").concat(item.price, " \u0440\u0443\u0431.</div>\n                      </div>\n                      <button class=\"main-buy block\" ").concat(item.isSold ? 'disabled' : '', ">").concat(item.isSold ? 'Продано' : 'Купить', "</button>\n                     </div>");
  }

  ;
  var filteredArray = array.filter(function (item, i) {
    return i < quantity;
  });
  return filteredArray.map(function (item, idx) {
    return template(item, idx);
  });
}
//# sourceMappingURL=index.js.map
