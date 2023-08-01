window.onload = function() {

    //Service
    addServiceClickHandler();
    addPriceClickHandler();
    addHandlerCityInContact();
}
const gardensService = document.querySelectorAll('.service-item.garden__link');
const lawnService = document.querySelector('.service-item.lawn_link');
const plantingsService = document.querySelectorAll('.service-item.planting_link');
const buttonBasics = document.querySelector('.accordion-prices.button-basics')
const burgerBtn = document.querySelector('.burger-btn');
const nav = document.querySelector('.nav');
const accordionButton = document.querySelector('.accordion-button');
const containerCities = document.querySelector('.container-cities');
const sectionContactUs = document.querySelector('.contact-us');

// get button id in service section
const getServiceItemsByButtonId = (id) => {
    const map = {
    'button-service-garden': '.garden__link',
    'button-service-lawn': '.lawn_link',
    'button-service-planting': '.planting_link',
    }
    const className = map[id];
    return document.querySelectorAll(className);
}

// Handler buttons in services
const addServiceClickHandler = () => {
    document.querySelector('.service').addEventListener('click', (event) => {
    const button = event.target;
    const serviceItems = getServiceItemsByButtonId(button.id);
    selectItemsSection(button.id);
    });
}

//Selection items in service
const selectItemsSection = (id) => {
    const buttonGarden = document.querySelector('#button-service-garden');
    const buttonLawn = document.querySelector('#button-service-lawn');
    const buttonPlanting = document.querySelector('#button-service-planting');

    if (id === 'button-service-garden') {
        const buttonGarden = document.querySelector('#button-service-garden');
        buttonGarden.classList.toggle('active');
        blurAllItemService();
        const gardens = document.querySelectorAll('.service-item.garden__link');
        gardens.forEach(element => {
            element.classList.toggle('active');
        });
    }
    if (id === 'button-service-lawn') {
        const buttonLawn = document.querySelector('#button-service-lawn');
        buttonLawn.classList.toggle('active');
        blurAllItemService();
        const lawn = document.querySelector('.service-item.lawn_link');
        lawn.classList.toggle('active');
    }
    if (id === 'button-service-planting') {
        const buttonPlanting = document.querySelector('#button-service-planting');
        buttonPlanting.classList.toggle('active');
        blurAllItemService();
        const planting = document.querySelectorAll('.service-item.planting_link');
        planting.forEach(element => {
            element.classList.toggle('active');
        });
    }
    if (id !== 'button-service-garden' && id !== 'button-service-lawn' && id !== 'button-service-planting') {
        noBlurAllItemService();
        deActiveButtonService();
    }
    if (
        buttonGarden.classList.contains('active') &&
        buttonLawn.classList.contains('active') &&
        buttonPlanting.classList.contains('active')
    ) {
        noBlurAllItemService();
        deActiveButtonService();
    }
    if (
        !buttonGarden.classList.contains('active') &&
        !buttonLawn.classList.contains('active') &&
        !buttonPlanting.classList.contains('active')
    ) {
        noBlurAllItemService();
        deActiveButtonService();
    }
}
//function for active button in service section
const deActiveButtonService = () => {
    const buttonGarden = document.querySelector('#button-service-garden');
        buttonGarden.classList.remove('active');
    const buttonLawn = document.querySelector('#button-service-lawn');
        buttonLawn.classList.remove('active');
    const buttonPlanting = document.querySelector('#button-service-planting');
        buttonPlanting.classList.remove('active');
}
//blur function for all service
const blurAllItemService = () => {
    let AllItemService = document.querySelector('.main .service .service-pictures');
    AllItemService.classList.add('active');
}

const noBlurAllItemService = () => {
    let AllItemService = document.querySelector('.main .service .service-pictures');
    AllItemService.classList.remove('active');

    let gardens = document.querySelectorAll('.service-item.garden__link');
        gardens.forEach(element => {
            element.classList.remove('active');
        });

    let lawn = document.querySelector('.service-item.lawn_link');
        lawn.classList.remove('active');

    let planting = document.querySelectorAll('.service-item.planting_link');
        planting.forEach(element => {
            element.classList.remove('active');
        });
}

// discovery of accardions in prices section
const addPriceClickHandler = () => {
    document.querySelector('.prices-item').addEventListener('click', (event) => {
    const button = event.target;
    openedPriceBlock(button.id);
    });
}

//function for opened blocks with price

const openedPriceBlock = (id) => {
    if (id === 'button-basics') {
        closedAllPriceBlock()
        const openBasic = document.querySelector('.basics-price');
        openBasic.classList.toggle('open');
    }else if (id !== 'button-basics') {
        const openBasic = document.querySelector('.basics-price');
        openBasic.classList.remove('open');
    }
    if (id === 'button-standard') {
        closedAllPriceBlock()
        const openStandard = document.querySelector('.standard-price');
        openStandard.classList.toggle('open');
    }else if (id !== 'button-standard') {
        const openStandard = document.querySelector('.standard-price');
        openStandard.classList.remove('open');
    }
    if (id === 'button-procare') {
        closedAllPriceBlock()
        const openProCare = document.querySelector('.procare-price');
        openProCare.classList.toggle('open');
    }else if (id !== 'button-procare') {
        const openProCare = document.querySelector('.procare-price');
        openProCare.classList.remove('open');
    }
}

// function closed all block whit price
const closedAllPriceBlock = () => {
    const openBasic = document.querySelector('.basics-price');
    openBasic.classList.remove('open');
    const openStandard = document.querySelector('.standard-price');
    openStandard.classList.remove('open');
    const openProCare = document.querySelector('.procare-price');
    openProCare.classList.remove('open');
}

//open custom selector on the contact section
accordionButton.addEventListener('click', event => {
    const button = document.querySelector('.accordion-button');
    button.classList.toggle('active');
    containerCities.classList.toggle('open');
});

//closed custom selector on the contact section
const closedSelectorContactUs = () => {
    document.querySelector('.container-cities.open').addEventListener('click', (event) => {
        containerCities.classList.remove('open');
        const button = document.querySelector('.accordion-button');
        button.classList.remove('active');
    });
}

//add handler city
const addHandlerCityInContact = () => {
    document.querySelector('.container-with-buttons').addEventListener('click', (event) => {
        const button = event.target;
        closedSelectorContactUs();
        openingCityCard(button.id);
    })
}

sectionContactUs.addEventListener('click', (event) => {
    closedAllCityCard();
})

//open city card
const openingCityCard = (id) => {
    if (id === 'button-Canandaigua') {
        closedAllCityCard();
        hideImageInContact();
        const canandaigua = document.querySelector('.city-card.Canandaigua');
        canandaigua.classList.add('active');
    }
    if (id === 'button-new-york') {
        closedAllCityCard();
        hideImageInContact();
        const newYork = document.querySelector('.city-card.york');
        newYork.classList.add('active');
    }
    if (id === 'button-yonkers') {
        closedAllCityCard();
        hideImageInContact();
        const yonkers = document.querySelector('.city-card.yonkers');
        yonkers.classList.add('active');
    }
    if (id === 'button-sherrill') {
        closedAllCityCard();
        hideImageInContact();
        const sherrill = document.querySelector('.city-card.sherrill');
        sherrill.classList.add('active');
    }
}
//Removes the image
const hideImageInContact = () => {
    const image = document.querySelector('.contacts-image');
    image.classList.add('active');
}

const showImageInContact = () => {
    const image = document.querySelector('.contacts-image');
    image.classList.remove('active');
}

//Closed All city card
const closedAllCityCard = () => {
    const canandaigua = document.querySelector('.city-card.Canandaigua');
        canandaigua.classList.remove('active');
    const newYork = document.querySelector('.city-card.york');
        newYork.classList.remove('active');
    const yonkers = document.querySelector('.city-card.yonkers');
        yonkers.classList.remove('active');
    const sherrill = document.querySelector('.city-card.sherrill');
        sherrill.classList.remove('active');
}

//Hamburger-menu to layout 380px
burgerBtn.addEventListener('click', function(){
    burgerBtn.classList.toggle('active');
    nav.classList.toggle('active');
});

nav.addEventListener('click', function(){
    burgerBtn.classList.toggle('active');
    nav.classList.toggle('active');
});