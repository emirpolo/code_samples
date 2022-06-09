function cardTemplate(item) {
    var card_html = `<div class="card">
    <a class="title" href="${item.url}" target="blank">${item.name}</a>
    <p class="description">
        ${item.description}
    </p>
    <div class="links">
        Features used here: `;

    item.features.forEach((element, i) => {
        card_html += `<a href="${element.docUrl}" target="blank">${element.name}</a>` + (i + 1 < item.features.length ? ', ' : '');
    });

    card_html += `</div >`

    if (item.repository) {
        card_html += `<div class="links">
        Repository: <a href="${item.repository.url}"
            target="blank">${item.repository.name}</a>
    </div>`;
    }

    card_html += `</div>`;

    return card_html;
}

function buttonTemplate(item) {
    return `<a href="${item.url}" target="blank" class="q-button">${item.name}</a>`;
}

function getCards(items) {
    var cards_html = '';
    items.forEach(element => {
        if (element.type == 'card') {
            cards_html += cardTemplate(element);
        } else {
            cards_html += buttonTemplate(element);
        }
    });
    return cards_html;
}

function startCards(items) {
    var cards_element = document.getElementById("cards");
    var cards = getCards(items);
    cards_element.innerHTML = cards;
}

function startSearch(items) {
    var searchField = document.querySelector('#search');
    var cards_element = document.getElementById("cards");
    searchField.addEventListener('input', (e) => {

        if (e.target.value === '') {
            startCards(items);
            return;
        }

        const searchResults = pocs.filter(poc => {
            return (poc.type == 'button') || poc.name.toLowerCase().includes(e.target.value.toLowerCase()) || poc.description.toLowerCase().includes(e.target.value.toLowerCase());
        });

        cards_element.innerHTML = '';

        startCards(searchResults);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    startCards(pocs);
    startSearch(pocs);
})
