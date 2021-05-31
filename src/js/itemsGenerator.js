function itemsGenerator(array) {
    function template(item, arrayIndex) {
        return  `<div class="main-item" id="item_${arrayIndex + 1}">
                      <button class="main-like ${item.liked ? 'activeLike' : ''}" onclick="toggleFavorites(${item.id})"></button>
                      <div class="main-discount flex j-c-center a-i-center"
                           style="${item.discount ? '' : 'display: none'}">${item.discount}</div>
                      <img class="main-picture block" src="${item.src}">
                      <div class="main-infosWrapper">
                        <div class="main-name" 
                             style="${item.name.length > 30 ?
                                'font-size: 1rem; line-height: 1.2rem;'
                                :
                                'font-size: 1.5rem; line-height: 1.875rem;' }"
                             >${item.name}</div>
                        <div class="main-info flex j-c-space-evenly">
                          <div class="main-color" title="">${item.color}</div>
                          <div class="main-agesWrapper">
                            <span class="main-yearsOld block">${item.age} мес.</span>
                            <span class="main-age block">Возраст</span>
                          </div>
                          <div class="main-pawsWrapper">
                            <div class="main-count block">${item.paws}</div>
                            <div class="main-paws block">Кол-во лап</div>
                          </div>
                        </div>
                        <div class="main-price">${item.price} руб.</div>
                      </div>
                      <button class="main-buy block" ${item.isSold ? 'disabled' : ''}>${item.isSold ? 'Продано' : 'Купить'}</button>
                     </div>`
    };

    return array.map((item, arrayIndex) => {
        return template(item, arrayIndex);
    });

}

