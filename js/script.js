//콜백함수 예제
// function num(callBack){
//     callBack();
// }
// num(function(){
//     console.log(123)
// })


$(document).ready(function(){
    //menu
    //마우스 올렸을 때
    $('.gnb > ul > li').on('mouseenter', function(){
        $('.snb').css({'display' : 'inline-block'});
        $('header').stop().animate({'height': '405px'});
        $('.snb').stop().animate({'opacity':'1'});
    });

    //마우스 내렸을 때
    $('.gnb > ul > li').on('mouseleave',function(){
        $('header').stop().animate({'height': '175px'});
        $('.snb').stop().animate({'opacity':'0'},300, function(){
            $('.snb').css({'display':'none'});
        });
    });
    
    //banner
    var banner = $('.main > .banner');
    
    banner.find('h2').animate({'opacity':'1', 'top':'0'},700);
    banner.find('p').delay(200).animate({'opacity':'1','top':'0'},700);
    banner.find('.img').delay(200).animate({'opacity':'1','top':'0'},700);

    //sub header
    var subHeader = $('.main > .sub-header');
    var subTop = subHeader.find('.top');
    var subHeaderTop = subHeader.offset().top;

    $(window).on('scroll', function(){
        var scroll = $(window).scrollTop();

        if(scroll > subHeaderTop){
            subHeader.addClass('fixed');
        }else{
            subHeader.removeClass('fixed');
        }
    });
    
    //화면 맨 위로 이동
    subTop.on('click',function(){
        $('html, body').stop().animate({
            'scrollTop' : '0'
        },1000);
    });

    //메뉴 설명 보기
    var menu = $('#menu ul > li');

    const menuShow = (event) => {
            var target = event.currentTarget;
            
            $(target).find('.ko_title').stop().animate({'top':'50px'},400);
            $(target).find('.en_title').stop().animate({'top':'95px'},400);
            $(target).find('.desc').stop().animate({'top':'125px', 'opacity':'1'},500);
            $(target).find('.icon').stop().animate({'bottom':'30px', 'opacity':'1'},400);
    }

    const menuHide = (event) => {
        var target = event.currentTarget;
            
            $(target).find('.ko_title').stop().animate({'top':'100px'});
            $(target).find('.en_title').stop().animate({'top':'145px'});
            $(target).find('.desc').stop().animate({'top':'200px', 'opacity':'0'});
            $(target).find('.icon').stop().animate({'bottom':'100px', 'opacity':'0'});
    }


    //menu tab
    var menuTab = $('#menu-tab ul > li');
    menuTab.on('click',function(event){
        var target = event.currentTarget;
        var menuName = $(target).data('menu');
        
        menuTab.removeClass('active');
        $(target).addClass('active');

        $(menu).stop().animate({'opacity':'0'},400,function(){
            $(menu).css({'display':'none'});
            if(menuName === 'all'){
                $(menu).stop().css({'display':'block'})
                .animate({'opacity':'1'});
            }else{
                // $('.' + menuName) //ES5 문법
                // $(`.${menuName}`) //ES6 문법
                $(`.${menuName}`).stop().css({'display':'block'})
                .animate({'opacity':'1'});
            }
        });
    });

        //ES5 : var
        //ES6 : let(var : 변하는 수), const(상수: 변하지 않는 수)
        //JSON : 데이터 교환 형식
        const data ={
            'key': 'value',
            'name': '김혜원',
        }
        data['name']
        
        const getSandwich = () => {
            // res => res.json(); 
            // 둘이 똑같음
            // function(res){
            //     return res.json();
            // }
            
            return fetch('http://localhost:3000/subway/sandwich', {
                'method' : 'GET',
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            }).then(res => res)
            .then(res => res.json())
        }
    
        const templateSandwichLabel = (label) =>{
            if(label){
                return `<div class="label">${label}</div>`;
            }else{
                return ``;
            }
        }
    
        const templateSandwich = (sandwich) =>{
            const {type, label, img, ko_title, en_title, kcal, summary, view_id} = sandwich;
    
    
            return ` <li class="${type}">
            <a href="#">
            ${templateSandwichLabel(label)}
                <div class="img">
                    <img src="${img}" alt="${ko_title}">
                </div>
                <strong class="ko_title">${ko_title}</strong>
                <span class="en_title">${en_title}</span>
                <span class="kcal">${kcal}</span>
                <p class="desc">${summary}</p>
                <div class="icon" data-id="${view_id}"></div>
            </a>
        </li>`
        ;
        }
    
        const listSandwich = async () => {
            const sandwiches = await getSandwich(); // async await을 안쓰면 데이터를 다 가져오기 전에 
            console.log(sandwiches)                 // 실행을 시키기 떄문에 async await을 써주면 순차적으로 데이터를 불러올 수 있다.
    
            const menu = document.getElementById('menu');
            const menuWrap = menu.querySelector('ul');
    
            for(const sandwich of sandwiches){
                const node = $(templateSandwich(sandwich))[0];
                $(node).on('mouseenter', menuShow);
                $(node).on('mouseleave', menuHide);
                menuWrap.append(node);
            }
        }
        listSandwich();
});


