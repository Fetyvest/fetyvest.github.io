//#region main
function saveData(){
    localStorage.isDarkTheme = isDarkTheme
}

function loadData(){
    isDarkTheme = localStorage.isDarkTheme ?? 0

    update()
}

function resetData(){
    localStorage.isDarkTheme = null

    isDarkTheme = 0
}

function update(){
    toggleDarkTheme(isDarkTheme)
}
//#endregion

//#region modals
const burgerBtn = document.getElementById('burgerBtn');
const modalBurger = document.getElementById('modalBurger');

let isBurgerModal = 0


document.addEventListener('touchstart', (event) => {
    if(!event.target.closest('#modalBurger') && !event.target.closest('#burgerBtn')){
        modalBurger.style.transform = 'translate(0, -100%)'
        isBurgerModal = 0
    }
})
document.addEventListener('mousedown', (event) => {
    if(!event.target.closest('#modalBurger') && !event.target.closest('#burgerBtn')){
        modalBurger.style.transform = 'translate(0, -100%)'
        isBurgerModal = 0
    }
})
document.addEventListener('scroll', (event) => {
    modalBurger.style.transform = 'translate(0, -100%)'
    isBurgerModal = 0
})
burgerBtn.addEventListener('click', () => {
    if(!isBurgerModal){
        modalBurger.style.transform = 'translate(0, 0)'
        isBurgerModal = 1
    }
    else{
        modalBurger.style.transform = 'translate(0, -100%)'
        isBurgerModal = 0
    }
})
//#endregion

//#region gallery
const gallerySliderMain = new Swiper('.gallery__slider-main', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 100,
    allowTouchMove: false,
    autoHeight: true,
    effect: 'fade',
    wrapperClass: 'gallery__slider-group',
    slideClass: 'gallery__slide-main',
    keyboard: {enabled: false},
})

const gallerySliderGame = new Swiper('.gallery__Gslider-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    wrapperClass: 'gallery__Gslider-wrapper',
    slideClass: 'gallery__Gslider-slide',
    pagination: {
        el: '.gallery__Gslider-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery__Gslider-btnNext',
        prevEl: '.gallery__Gslider-btnPrev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false,
    },
})

const gallerySliderSites = new Swiper('.gallery__Sslider-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    wrapperClass: 'gallery__Sslider-wrapper',
    slideClass: 'gallery__Sslider-slide',
    pagination: {
        el: '.gallery__Sslider-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery__Sslider-btnNext',
        prevEl: '.gallery__Sslider-btnPrev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false,
    },
})

const galleryGames = document.getElementById('galleryGames');
const gallerySites = document.getElementById('gallerySites');
const galleryFocus = document.getElementById('galleryFocus');
const galleryGSlider = document.querySelector('.gallery__Gslider-container')
const gallerySSlider = document.querySelector('.gallery__Sslider-container')

let focusIs = 'games'

function setGalleryFocus(toFocus){
    if(toFocus != focusIs){
        focusIs = toFocus
        if(toFocus == 'sites'){
            gallerySliderMain.slideTo(1)
            galleryFocus.style.left = '100%'
            galleryFocus.style.transform = 'translate(-100%, 0)'
            // galleryGSlider.style.display = 'none'
            // gallerySSlider.style.display = 'flex'
        }
        else if(toFocus == 'games'){
            gallerySliderMain.slideTo(0)
            galleryFocus.style.left = '0'
            galleryFocus.style.transform = 'translate(0, 0)'
            // galleryGSlider.style.display = 'flex'
            // gallerySSlider.style.display = 'none'
        }
    }
}

galleryGames.addEventListener('click', () => {
    setGalleryFocus('games')
})
gallerySites.addEventListener('click', () => {
    setGalleryFocus('sites')
})
//#endregion

//#region darkTheme
const darkThemeCheckbox = document.getElementById('darkThemeCheckbox');

let isDarkTheme = 0

async function toggleDarkTheme(set){
    if(set == undefined){
        set = !isDarkTheme
    }

    for(el of document.querySelectorAll('*')){
        el.style.transition = 'all 0s'
    }

    if(set == 0){
        isDarkTheme = 0
        darkThemeCheckbox.checked = false

        const root = document.documentElement;

        root.style.setProperty('--bg-black', '#121212');
        root.style.setProperty('--bg-black-opacity', '#121212B0');
        root.style.setProperty('--black', '#1A1A1A');
        root.style.setProperty('--bg-white', '#F5F5F5');
        root.style.setProperty('--white', '#E0E0E0');
        root.style.setProperty('--dark-shadow', 'darkgray');
        root.style.setProperty('--lightgray', 'lightgray');
        root.style.setProperty('--lightgray-opacity', '#FFFFFF80');
    }
    else{
        isDarkTheme = 1
        darkThemeCheckbox.checked = true

        const root = document.documentElement;

        root.style.setProperty('--bg-black', '#050505');
        root.style.setProperty('--black', 'hsl(0, 0%, 90%)');
        root.style.setProperty('--bg-black-opacity', '#050505B0');
        root.style.setProperty('--bg-white', 'hsl(0, 0%, 4%)');
        root.style.setProperty('--white', '#FFFFFF');
        root.style.setProperty('--dark-shadow', 'hsl(0, 0%, 34%)');
        root.style.setProperty('--lightgray', 'hsl(0, 0%, 17%)');
        root.style.setProperty('--lightgray-opacity', 'hsla(0, 0%, 0%, 0.498)');
    }

    setTimeout(() => {
        for(el of document.querySelectorAll('*')){
            el.style.transition = ''
        }
    }, 500)

    saveData()
}

darkThemeCheckbox.addEventListener('click', () => {
    toggleDarkTheme()
})
//#endregion

loadData()