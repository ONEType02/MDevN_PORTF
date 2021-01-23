let next = 1;
let index = 1;

// $('body').mousemove(function(e) { // cursor
//     $('.cursor').css('left', e.pageX - 25 + 'px');
//     $('.cursor').css('top', e.pageY - 25 + 'px');
// });

$(window).scroll(function() { // nav
    let offset = window.pageYOffset || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let pageHeight = document.querySelector('footer').getBoundingClientRect().bottom;
    $('.progress').width(Math.floor(offset / windowHeight * 100) + '%');
});


let i = 1;
let tcan = 0;
$(".head .arrow").click(function() {
    if(!tcan) return 1;
    tcan = 0;
    $('.before').removeClass('anim_l');
    $('.after').removeClass('anim_r');

    if(i == 2) {
        --i;
    } else {
        ++i;
    }

    setTimeout(() => {
        $('.before').addClass('change_l');
        $('.after').addClass('change_r');
        $('.photo_hp').addClass('change_photo');
        $('.photo_hp').attr('src', 'content/' + i +'.jpg');
    }, 100);

    setTimeout(() => {
        $('.photo_m').attr('src', 'content/' + i +'.jpg');
    }, 3000);

    setTimeout(() => {
        $('.photo_m').attr('src', 'content/' + i +'.jpg');
        $('.before').removeClass('change_l');
        $('.after').removeClass('change_r');
        $('.photo_hp').removeClass('change_photo');
        tcan = 1;
    }, 3100);

    setTimeout(() => {
        $('.before').addClass('anim_l');
        $('.after').addClass('anim_r');
    }, 3000);
});


let p = 0;
let message = '';
let message2 = '';
let help = '';
function addText() {
    let letters = ["М", "о", "ё", " ", "и", "м", "я", " ", "И", "л", "ь", "я", " ", "и", " ", "я", " ", "н", "а", "ч", "и", "н", "а", "ю", "щ", "и", "й", " ", "в", "е", "б", "-", "р", "а", "з", "р", "а", "б", "о", "т", "ч", "и", "к"];
    if(p <= 13) {
        message = message.replace('|', '');
        message = message + letters[p] + '|';
        $('.msg').html(message);
        // $('.msg').replace('|', '');
        // $('.msg').append(letters[p]);
        // $('.msg').append('|');
    }

    if(p == 13) {
        message = message.replace('|', '');
        $('.msg').html(message);
    }

    if(p > 13) {
        message2 = message2.replace('|', '');
        message2 = message2 + letters[p] + '|';
        $('.change').html(message2);
    }

    ++p;
    if(letters.length !== p) {
        setTimeout(() => {
            addText();
        }, 90);
    } else {
        p = 0;
        setTimeout(() => {
            crossoutText();
        }, 1000);
    }
}

function crossoutText() {
    if(p < 17) {
        message2 = message2.replace('|', '');
    }

    if(p >= 17) {
        message2 = message2.replace('|', '\u0336'); // \u03A9
        ++p;
    }

    ++p;
    help = message2.slice(-p);
    message2 = message2.slice(0, -p);
    message2 = message2 + '|' + help;
    $('.change').html(message2);

    if(p <= 36) {
        setTimeout(() => {
            crossoutText();
        }, 100);
    } else {
        message2 = message2.replace('|', '');
        $('.change').html(message2);
    }
}


let k = true;
$('.arrow').hover(function() {
    if(k) {
        k = false;
        setTimeout(() => {
            $('.arrow').addClass('arroww');
        }, 300);
        setTimeout(() => {
            $('.arrow').addClass('arrroww');
        }, 600);
        setTimeout(() => {
            $('.arrow').addClass('arrrowww');
        }, 900);
        setTimeout(() => {
            $('.arrow').addClass('arrrowwww');
        }, 1200);
        setTimeout(() => {
            $('.arrow').addClass('arrowend');
        }, 1500);

        setTimeout(() => {
            $('.arrow').removeClass('arrowend');
            $('.arrow').removeClass('arrrowwww');
            $('.arrow').removeClass('arrrowww');
            $('.arrow').removeClass('arrroww');
            $('.arrow').removeClass('arroww');
            k = true;
        }, 1500);
    }
});



$('.button').click(function changeinfo() {
    $('.button').removeClass('active');
    $(this).addClass('active');

    if(screen.width <= 575) {
        if($('.btn-1').hasClass('active')) {
            $('.mob1 .t h1').html('Адаптивная верстка');
            $('.mob1 .t p').html('Корректное отображение сайта на любых устройствах');
            $('.mob1 .use h4').html('Используемые технологии');
            $('.mob1 .use p').replaceWith('<p style="color:magenta">[bootstrap]</p>');
        }
        if($('.btn-2').hasClass('active')) {
            $('.mob1 .t h1').html('2D / 3D');
            $('.mob1 .t p').html('Использование графического процессора для создания 3D на сайте');
            $('.mob1 .use h4').html('Используемые технологии');
            $('.mob1 .use p').replaceWith('<p style="color:green">[threeJS]</p>');
        }
        if($('.btn-3').hasClass('active')) {
            $('.mob1 .t h1').html('Кроссбраузерность');
            $('.mob1 .t p').html('Сайт выглядит в любом браузере одинаково');
            $('.mob1 .use h4').replaceWith('<h4></h4>');
            $('.mob1 .use p').replaceWith('<p style="color:gray">...</p>');
        }

        if($('.btn-4').hasClass('active')) {
            $('.mob2 .t h1').html('JavaScript');
            $('.mob2 .t p').html('В основе лежит JavaScript с использованием дополнительных технологий для ускорения работы');
            $('.mob2 .use h4').html('Используемые технологии');
            $('.mob2 .use p').replaceWith('<p style="color:blue">[jQuery, CoffeeScript, Ajax-запросы]</p>');
        }
        if($('.btn-5').hasClass('active')) {
            $('.mob2 .t h1').html('Веб-приложения');
            $('.mob2 .t p').html('Создание полноценного веб-приложения');
            $('.mob2 .use h4').html('Используемые технологии');
            $('.mob2 .use p').replaceWith('<p style="color:orange">[React, Angular, Vue]</p>');
        }
        if($('.btn-6').hasClass('active')) {
            $('.mob2 .t h1').html('Анимации');
            $('.mob2 .t p').html('Скрипты для работы с анимациями, скроллом и т.д.');
            $('.mob2 .use h4').replaceWith('<h4></h4>');
            $('.mob2 .use p').replaceWith('<p style="color:gray">...</p>');
        }

        if($('.btn-7').hasClass('active')) {
            $('.mob3 .t h1').html('Сервер');
            $('.mob3 .t p').html('Программирование полноценного сервера');
            $('.mob3 .use h4').html('Используемые технологии');
            $('.mob3 .use p').replaceWith('<p style="color:orange">[PHP, NodeJS]</p>');
        }
        if($('.btn-8').hasClass('active')) {
            $('.mob3 .t h1').html('База данных');
            $('.mob3 .t p').html('Программирование полноценной базы данных');
            $('.mob3 .use h4').html('Используемые технологии');
            $('.mob3 .use p').replaceWith('<p style="color:pink">[MySQL]</p>');
        }
        return 1;
    }

    if(index === 1) {
        if($('.btn-1').hasClass('active')) {
            $('.t h1').html('Адаптивная верстка');
            $('.t p').html('Корректное отображение сайта на любых устройствах');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:magenta">[bootstrap]</p>');
        }
        if($('.btn-2').hasClass('active')) {
            $('.t h1').html('2D / 3D');
            $('.t p').html('Использование графического процессора для создания 3D на сайте');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:green">[threeJS]</p>');
        }
        if($('.btn-3').hasClass('active')) {
            $('.t h1').html('Кроссбраузерность');
            $('.t p').html('Сайт выглядит в любом браузере одинаково');
            $('.use h4').replaceWith('<h4></h4>');
            $('.use p').replaceWith('<p style="color:gray">...</p>');
        }
    } else if(index === 2) {
        if($('.btn-1').hasClass('active')) {
            $('.t h1').html('JavaScript');
            $('.t p').html('В основе лежит JavaScript с использованием дополнительных технологий для ускорения работы');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:blue">[jQuery, CoffeeScript, Ajax-запросы]</p>');
        }
        if($('.btn-2').hasClass('active')) {
            $('.t h1').html('Веб-приложения');
            $('.t p').html('Создание полноценного веб-приложения');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:orange">[React, Angular, Vue]</p>');
        }
        if($('.btn-3').hasClass('active')) {
            $('.t h1').html('Анимации');
            $('.t p').html('Скрипты для работы с анимациями, скроллом и т.д.');
            $('.use h4').replaceWith('<h4></h4>');
            $('.use p').replaceWith('<p style="color:gray">...</p>');
        }
    } else if(index === 3) {
        if($('.btn-1').hasClass('active')) {
            $('.t h1').html('Сервер');
            $('.t p').html('Программирование полноценного сервера');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:orange">[PHP, NodeJS]</p>');
        }
        if($('.btn-2').hasClass('active')) {
            $('.t h1').html('База данных');
            $('.t p').html('Программирование полноценной базы данных');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:pink">[MySQL]</p>');
        }
    }
});


let blockX = 0;
let blockY = 0;
let centerX = 0;
let centerY = 0;
$('.block').mousemove(function(e) { // !!
    if(screen.width < 575) return 1;

    let width = $(this).innerWidth();
    let height = $(this).innerHeight();
    let pos = $(this).offset();
    let elem_left = pos.left.toFixed(0);
	let elem_top = pos.top.toFixed(0);
	blockX = event.pageX - elem_left;
	blockY = event.pageY - elem_top;
    centerX = elem_left - (blockX / 2);
    centerY = elem_top - (blockX / 2);
    let resultX = blockX - (width / 2) - 45;
    let resultY = blockY - (height / 2);

    $(this).css('transform','skewX(' + resultX / 30 + 'deg) skewY(' + resultY / 30 + 'deg)');
    if(screen.width >= 1440) $(this).css('transform','skewX(' + resultX / 50 + 'deg) skewY(' + resultY / 50 + 'deg)');
    $(this).css('transition','none');
    // skewY(' + (centerY - blockY - 700) / 30 + 'deg)'

});
// $('.block2').mousemove(function(event) {
//     $(this).css('transform','skewX(' + (blockX - centerX  - 300) / 30 + 'deg) skewY(' + (centerY - blockY - 700) / 30 + 'deg)');
// });
// $('.block3').mousemove(function(event) {
//     $(this).css('transform','skewX(' + (blockX - centerX - 100) / 30 + 'deg) skewY(' + (centerY - blockY - 800) / 40 + 'deg)');
// });

$('.block').mouseout(function(event) {
    $(this).css('transition','transform 0.2s linear');
    $(this).css('transform','skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg)');
});

$('.block').click(function() {
    $(this).toggleClass('open');
});

let g = 0;
function plusOne() {
    if(g >= 4) return 1;
    $('.q p').html(g++);
    setTimeout(() => {
        plusOne();
    }, 400);
}


let clk = 0;
let footerX = 0;
$('.grab').mousedown(function() {
    clk = 1;
});

let wdt;
$('footer').mouseup(function() {
    clk = 0;
    // if(footerX < 400) {
    //     footerX = 400;
    //     $('.grab').css('transform', 'translateX(' + footerX + 'px)');
    //     $('.rw').css('transform', 'translateX(' + (footerX + 69) + 'px)');
    // }
    // if(footerX > wdt) {
    //     $('.grab').css('transform', 'translateX(' + footerX + 'px)');
    //     $('.rw').css('transform', 'translateX(' + (footerX + 69) + 'px)');
    // }
});

$('footer').mousemove(function(event) {
    if(clk) {
        wdt = document.documentElement.clientWidth - 100;
        let pos = $('footer').offset();
        let elem_left = pos.left.toFixed(0);
        footerX = event.pageX - elem_left;

        if(footerX < 250) footerX = 250;
        if(footerX >= wdt) footerX = wdt;

        $('.grab').css('transform', 'translateX(' + footerX + 'px)');
        $('.rw').css('transform', 'translateX(' + (footerX + 69) + 'px)');

        console.log(wdt);
    }

});


/* SCROLL */

let can = 0;
let first = 1;
let fscroll = 1;
let c;
const el = document.querySelector('.dd');
$(window).scroll(function() { // My works
    if(screen.width <= 575) return 1;
    if(can === 1) return 1;

    c = el.getBoundingClientRect().top;
    if(c < 5 && index === 1) {
        $('.hd').css('display', 'none');

        can = 1;
        next = 2;
    }
    if(c < -6 && index === 3) $('.head').css('display', 'block');
    if(c > -5 && index === 3) {
        $('.progress').width(50 + '%');
        $('.head').css('display', 'none');
        $('.nope').css('display', 'none');

        can = 1;
        next = 2;
    }
});

window.addEventListener('wheel', function(e) {
    if(screen.width <= 575) return 1;
    if(can === 0) return 1;

    if((e.deltaY < 0 && index === 1) || (e.deltaY > 0 && index === 3)) {
        can = 0;
        fscroll = 1;
        return 1;
    }

    if(fscroll) {
        setTimeout(() => {
            fscroll = 0;
        }, 100);
        return 1;
    }

    can = 0;

    if(next === 1) {
        index = 1;
        $('.btn-1').html('<p>Адаптивная верстка</p>');
        $('.btn-2').html('<p>2D / 3D</p>');
        $('.btn-3').css('display', 'flex');
        $('.btn-3').html('<p>Кроссбрауз.</p>');
        $('.button').removeClass('active');
        $('.btn-1').addClass('active');
        next = 0;
        fscroll = 1;

        $('.delimiter').addClass('delchange');
        $('.right').addClass('rightchange');

        setTimeout(() => {
            $('.right').css('background', 'url(content/m'+ index +'.png) no-repeat');
            $('.right').css('background-size', 'cover');

            $('.t').css('color', 'black');
            $('.t p').css('color', 'black');
            $('.use').css('color', 'black');

            $('.t h1').html('Адаптивная верстка');
            $('.t p').html('Корректное отображение сайта на любых устройствах');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:magenta">[bootstrap]</p>');
        }, 700);

        setTimeout(() => {
            $('.delimiter').css('transition', 'all 0.5s linear');
            $('.delimiter').removeClass('delchange');
            $('.right').css('transition', 'all 0.5s linear');
            $('.right').removeClass('rightchange');

            $('.hd').css('display', 'none');
            $('.head').css('display', 'block');
            $('.nope').css('display', 'flex');
            el.scrollIntoView();
        }, 1000);
        can = 0;
    }
    if(next === 3) {
        index = 3;
        $('.btn-1').html('<p>Серверная часть</p>');
        $('.btn-2').html('<p>База данных</p>');
        $('.btn-3').css('display', 'none');
        $('.button').removeClass('active');
        $('.btn-1').addClass('active');
        next = 0;
        fscroll = 1;
        el.scrollIntoView();

        $('.delimiter').addClass('delchange');
        $('.right').addClass('rightchange');

        setTimeout(() => {
            $('.right').css('background', 'url(content/m'+ index +'.png) no-repeat');
            $('.right').css('background-size', 'cover');

            $('.t').css('color', 'white');
            $('.t p').css('color', 'black');

            $('.t h1').html('Сервер');
            $('.t p').html('Программирование полноценного сервера');
            $('.use h4').html('Используемые технологии');
            $('.use p').replaceWith('<p style="color:orange">[PHP, NodeJS]</p>');
        }, 700);

        setTimeout(() => {
            $('.delimiter').css('transition', 'all 0.5s linear');
            $('.delimiter').removeClass('delchange');
            $('.right').css('transition', 'all 0.5s linear');
            $('.right').removeClass('rightchange');

            $('.head').css('display', 'none');
            $('.nope').css('display', 'none');
            $('.hd').css('display', 'block');
        }, 1000);
        can = 0;
    }
    if(next === 2) {
        if(index === 1) {
            next = 3;
        } else {
            next = 1;
        }
        $('.btn-1').html('<p>JavaScript</p>');
        $('.btn-2').html('<p>Веб-приложения</p>');
        $('.btn-3').css('display', 'flex');
        $('.btn-3').html('<p>Анимации</p>');
        $('.button').removeClass('active');
        $('.btn-1').addClass('active');
        index = 2;
        fscroll = 1;
        $('.hd').css('display', 'none');
        $('.head').css('display', 'none');
        $('.nope').css('display', 'none');

        setTimeout(() => {
            $('.hd').css('display', 'none');
            $('.head').css('display', 'none');
            $('.nope').css('display', 'none');
        }, 0);

        //
            $('.delimiter').addClass('delchange');
            $('.right').addClass('rightchange');

            setTimeout(() => {
                $('.right').css('background', 'url(content/m'+ index +'.jpg) no-repeat');
                $('.right').css('background-size', 'cover');

                $('.t').css('color', 'white');
                $('.t p').css('color', 'white');

                $('.t h1').html('JavaScript');
                $('.t p').html('В основе лежит JavaScript с использованием дополнительных технологий для ускорения работы');
                $('.use h4').html('Используемые технологии');
                $('.use p').replaceWith('<p style="color:blue">[jQuery, CoffeeScript, Ajax-запросы]</p>');
            }, 700);

            setTimeout(() => {
                $('.delimiter').css('transition', 'all 0.5s linear');
                $('.delimiter').removeClass('delchange');
                $('.right').css('transition', 'all 0.5s linear');
                $('.right').removeClass('rightchange');
            }, 1000);
        can = 0;

        setTimeout(() => {
            can = 1;
        }, 1500);
    }
});


function starting() {
    $('.progress').css('width','0');
    $('footer .h').css('width', screen.width - 400 + 'px');

    let color = document.querySelector('.dd').getBoundingClientRect().top;

    if(screen.width <= 575) $('.photo_m').css('visibility', 'visible');
    if(screen.width > 575) {
    $('.before').addClass('change_l');
    $('.after').addClass('change_r');
    $('.photo_hp').addClass('change_photo');
    }
    setTimeout(() => {
        $('.before').removeClass('change_l');
        $('.after').removeClass('change_r');
        $('.photo_hp').removeClass('change_photo');
        $('.photo_m').css('visibility', 'visible');
        tcan = 1;
    }, 3000);

    $('.info h1').css('transform', 'translateY(0px)');
    $('.stick').css('transform', 'translateY(0px)');
    setTimeout(() => {
        $('.stick').remove();
    }, 1000);
    addText();
}

let ddplay = 0;
let worksplay = 0;
let footerplay = 1;
let calculate = 0;

// TRANSITIONS
$(window).scroll(function() {
    let head = document.querySelector('.head').getBoundingClientRect().top;
    let hd = document.querySelector('.hd').getBoundingClientRect().top;
    let n = document.querySelector('.nope').getBoundingClientRect().top;
    if(n <= 100) $('.nope span').css('transform', 'translateY(0)');
    if((n <= -100 && index === 1) || (hd >= 100 && index === 3)) { // What can I do? (есть ЛАГИ)
        if(!ddplay) {
            ddplay = 1;
            $('.delimiter').css('transition', 'all 0.5s linear');
            $('.delimiter').removeClass('delchange');
            $('.right').css('transition', 'all 0.5s linear');
            $('.right').removeClass('rightchange');
        }
    } else if((head >= -700 && index === 1) || (hd <= 0 & index === 3)) {
        ddplay = 0;
        $('.delimiter').css('transition', 'none');
        $('.delimiter').addClass('delchange');
        $('.right').css('transition', 'none');
        $('.right').addClass('rightchange');
    }
    if(hd < screen.height + 1000 && index === 3) { // Works
        if(worksplay) return 1;
        worksplay = 1;

        $('.trans').css('width', '100%');

        setTimeout(() => {
            $('.trans').css('transform', 'translateX(50%) scaleX(0)');
            $('.block img').css('visibility', 'visible');
        }, 1000);
    } else {
        $('.trans').css('transform', 'translateX(0) scaleX(1)');
        $('.trans').css('width', '0');
        $('.block img').css('visibility', 'hidden');
        worksplay = 0;
    }
});


// PARALLAX
$(window).scroll(function() {
    if(index === 1) {
        $('.info').css('transform', 'translate3d(0px, ' + -window.scrollY / 3  + 'px, 0px)');
    }
    if(index === 3) {
        // LANDSCAPE
        let ls = document.querySelector('.landscape').getBoundingClientRect().top + 120; // FOOTER
        if(ls > -100) {
            $('footer').css('transform', 'translateY(' + ls + 'px)');
        }
    }

    // $('.block').css('transform', 'translate3d(0px, ' + -window.scrollY / 70  + 'px, 0px)');
});


// MOBILE
$(window).scroll(function() {
    if(screen.width > 575) {
        $('.mobile').hide();
        $('.go').html('Свяжись со мной ->');
    } else {
        let bl1 = document.querySelector('.m1').getBoundingClientRect().top;
        let bl2 = document.querySelector('.m2').getBoundingClientRect().top;
        let bl3 = document.querySelector('.m3').getBoundingClientRect().top;
        if(bl1 <= 200) index = 1;
        if(bl2 <= 200) index = 2;
        if(bl3 <= 200) index = 3;

        $('.mobile').show();
        $('.hd').css('display', 'block');
        $('.nope').css('display', 'flex');

        $('.go').html('ilyaaasa71@gmail.com');
    }
});
