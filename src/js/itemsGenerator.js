function itemsGenerator(array, quantity) {
    function template(item, idx) {
        let heart = `<svg width="100%" height="100%" viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
                 <path width="100%" height="100%" class="main-heart" d="M33.7812 0.695312C31.2851 0.695312 28.9966 1.4863 26.9794 3.04634C25.0456 4.54197 23.758 6.44693 23 
                            7.83214C22.242 6.44684 20.9544 4.54197 19.0206 3.04634C17.0034 1.4863 14.7149 0.695312 
                            12.2188 0.695312C5.25298 0.695312 0 6.39293 0 13.9485C0 22.1112 6.55347 27.696 16.4746 36.1505C18.1593 
                            37.5863 20.0689 39.2138 22.0538 40.9494C22.3154 41.1785 22.6514 41.3047 23 41.3047C23.3486 
                            41.3047 23.6846 41.1785 23.9462 40.9495C25.9312 39.2136 27.8408 37.5862 29.5265 
                            36.1496C39.4465 27.696 46 22.1112 46 13.9485C46 6.39293 40.747 0.695312 33.7812 0.695312Z"
                 fill="${item.liked ? "red" : "white"}" fill-opacity="${item.liked ? "0.8" : "0.5"}" stroke="black" stroke-opacity="0.5"/>
</svg>`
        return  `<div class="main-item" id="item_${item.id}">
                      <button class="main-like" onclick="toggleFavorites(${item.id}, ${idx})">${heart}</button>
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
                            <span class="main-age block">Возраст</span>
                            <span class="main-yearsOld block">${item.age} мес.</span>
                          </div>
                          <div class="main-pawsWrapper">
                            <div class="main-paws block">Кол-во лап</div>
                            <div class="main-count block">${item.paws}</div>
                          </div>
                        </div>
                        <div class="main-price">${item.price} руб.</div>
                      </div>
                      <button class="main-buy block" ${item.isSold ? 'disabled' : ''}>${item.isSold ? 'Продано' : 'Купить'}</button>
                     </div>`
    };

    let filteredArray = array.filter(function (item, i) {
        return i < quantity
    })

    return filteredArray.map((item, idx)  => {
        console.log('generated');
        return template(item, idx);
    });

}

