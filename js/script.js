// Menu Hover visible //////////////////////////////////////////
function letMenuVisible(){
    var NAV_LIST = $('#one_step').children();

    $(NAV_LIST).each(function(i, item){
        $(this).hover(function(){
            $(item).children('dl').show();
        }, function(){
            $(item).children('dl').hide();
        });
    });
};


// Slide Banner
function doSlideBanner(){
    var BANNER_LIST = $('.titles');
    var BANNER_WIDTH = "100%";
    var setIntervalId = undefined;
    var BANNER_PAGERS = $('.banner_pager');
    var active_banner = 'active_banner';
   
    function moveToNext(){
        var FIRST_SLIDE = BANNER_LIST.find('li:first');
        var LAST_SLIDE = BANNER_LIST.find('li:last');

        BANNER_LIST.stop().animate({marginLeft: '-' + BANNER_WIDTH}, 500, function(){
            
            // Pager, titles의 Class 제어
            for(var i=0; i<BANNER_LIST.children().length; i++){
                if(BANNER_LIST.children().eq(i).hasClass(active_banner)){
                    BANNER_LIST.children().removeClass(active_banner);
                    if(i===BANNER_LIST.children().length-1){
                        BANNER_LIST.children().eq(0).addClass(active_banner);
                    } else{
                        BANNER_LIST.children().eq(i+1).addClass(active_banner);
                    }
                    break;
                }
            }
            for(var i=0; i<BANNER_PAGERS.children().length; i++){
                if(BANNER_PAGERS.children().eq(i).hasClass(active_banner)){
                    BANNER_PAGERS.children().removeClass(active_banner);
                    if(i===BANNER_PAGERS.children().length-1){
                        BANNER_PAGERS.children().eq(0).addClass(active_banner);
                    } else{
                        BANNER_PAGERS.children().eq(i+1).addClass(active_banner);
                    }
                    break;
                }
            }

            FIRST_SLIDE.insertAfter(LAST_SLIDE);
            BANNER_LIST.css({marginLeft: 0});
        });
    }
    
    function moveToPrev(){
        var FIRST_SLIDE = BANNER_LIST.find('li:first');
        var LAST_SLIDE = BANNER_LIST.find('li:last');

        LAST_SLIDE.insertBefore(FIRST_SLIDE);
        BANNER_LIST.css({marginLeft: '-' + BANNER_WIDTH});
        BANNER_LIST.stop().animate({marginLeft: 0}, 500, function(){
            
            // Pager, titles의 Class 제어
            for(var i=0; i<BANNER_LIST.children().length; i++){
                if(BANNER_LIST.children().eq(i).hasClass(active_banner)){
                    BANNER_LIST.children().removeClass(active_banner);
                    if(i===0){
                        BANNER_LIST.children().eq(BANNER_LIST.children().length-1).addClass(active_banner);
                    } else{
                        BANNER_LIST.children().eq(i-1).addClass(active_banner);
                    }
                    break;
                }
            }
            for(var i=0; i<BANNER_PAGERS.children().length; i++){
                if(BANNER_PAGERS.children().eq(i).hasClass(active_banner)){
                    BANNER_PAGERS.children().removeClass(active_banner);
                    if(i===0){
                        BANNER_PAGERS.children().eq(BANNER_PAGERS.children().length-1).addClass(active_banner);
                    } else{
                        BANNER_PAGERS.children().eq(i-1).addClass(active_banner);
                    }
                    break;
                }
            }
        });
    }
    
    function clickBtn(){
        var NEXT_BTN = $('.arrow_title_r');
        var PREV_BTN = $('.arrow_title_l');

        NEXT_BTN.click(moveToNext);
        PREV_BTN.click(moveToPrev);
    }

    function doAutoSlide(){
        setIntervalId = setInterval(moveToNext, 6000);
    }

    function stopAutoSlide(){
        var PLAY_BTN = $('.btn_control_Slide'); 
        PLAY_BTN.click(function(){
            $(this).toggleClass('play');
            var hasPlayClass = $(this).hasClass('play');
            if(hasPlayClass){
                clearInterval(setIntervalId);
            } else{
                doAutoSlide();
            }
        });
    }

    clickBtn();
    doAutoSlide();
    stopAutoSlide();
}


// NewsBox slide ///////////////////////////////////////////////////////
function doSlideNewsbox(){
    var NEWS_LIST = $('.newslist');
    var ARROW_L = $('.arrow_news_l');
    var ARROW_R = $('.arrow_news_r');
    var NEWS_WIDTH = 294 + 8;
    var PLAY_BTN = $('.cont_02 .container>button');
    var NEWS_PAGER = $('.cont_02 .news_pager');
    var setIntervalID = undefined;

    NEWS_PAGER.find('.whole_pg').html(NEWS_LIST[0].childElementCount);
    NEWS_PAGER.find('.current_pg').html(NEWS_LIST[0].childElementCount);


    function doAutoSlide(){
        setIntervalID = setInterval(function(){
            var FIRST_LI = NEWS_LIST.find('.newsbox:first');
            var LAST_LI = NEWS_LIST.find('.newsbox:last');
            
            
            NEWS_LIST.stop().animate({marginLeft: -NEWS_WIDTH}, 1000, function(){
                FIRST_LI.insertAfter(LAST_LI);
                $(this).css({marginLeft: 0});
            });
            
            var firstIndex = Number(NEWS_LIST.find('.newsbox:first .news_textbox .index').html());
            function controlPager(){
                NEWS_PAGER.find('.current_pg').html(firstIndex);
            }
            controlPager();

        }, 4000);
    }
    
    function stopAutoslide(){   
        PLAY_BTN.click(function(){
            $(this).toggleClass('play');
            var hasPlayClass = $(this).hasClass('play');
            if(hasPlayClass){
                clearInterval(setIntervalID);
            } else{
                doAutoSlide();
            }
        });
    }

    function doSlideClickArrow(){
        ARROW_R.click(function(){
            var FIRST_LI = NEWS_LIST.find('.newsbox:first');
            var LAST_LI = NEWS_LIST.find('.newsbox:last');
            
            NEWS_LIST.stop().animate({marginLeft: -NEWS_WIDTH}, 1000, function(){
                FIRST_LI.insertAfter(LAST_LI);
                $(this).css({marginLeft: 0});
            });

            var firstIndex = Number(NEWS_LIST.find('.newsbox:first .news_textbox .index').html());
            function controlPager(){
                NEWS_PAGER.find('.current_pg').html(firstIndex);
            }
            controlPager();

            return false;
        });
        ARROW_L.click(function(){
            var FIRST_LI = NEWS_LIST.find('.newsbox:first');
            var LAST_LI = NEWS_LIST.find('.newsbox:last');

            LAST_LI.insertBefore(FIRST_LI);
            NEWS_LIST.css({marginLeft: -NEWS_WIDTH})
            NEWS_LIST.stop().animate({marginLeft: 0}, 1000);

            var firstIndex = Number(NEWS_LIST.find('.newsbox:first .news_textbox .index').html());
            function controlPager(){
                NEWS_PAGER.find('.current_pg').html(firstIndex-1);
                if(firstIndex-1 === 0){
                    NEWS_PAGER.find('.current_pg').html(NEWS_LIST[0].childElementCount);
                }
            }
            controlPager();

            return false;
        });
    }

    doAutoSlide();
    stopAutoslide();
    doSlideClickArrow();
};


// Service Slide /////////////////////////////////////////////////////////////////////////////
function controlServiceCont(){
    
    function switchTapMenu(){
        var ACTIVE_CLASS = 'active_ser';
        var SER_MENU_LIST = $('.tab_menu li');
        var SER_CONTS = $('.ser_cont>div');
        
        SER_MENU_LIST.on('click', function(e){
            e.preventDefault();
            var tg = $(this).index();
            
            SER_MENU_LIST.removeClass(ACTIVE_CLASS)
            $(this).addClass(ACTIVE_CLASS);

            SER_CONTS.removeClass(ACTIVE_CLASS);
            SER_CONTS.eq(tg).addClass(ACTIVE_CLASS);
        });
    }

    function doServiceSlide(){
        var ARROW_R = $('.arrow_ser_r');
        var ARROW_L = $('.arrow_ser_l');
        var SER_LIST = $('.ser_tab1 .ser_list');
        var NEWS_WIDTH = 98 + 22;

        ARROW_R.click(function(){
            var FIRST_LI = SER_LIST.find('.ser_list_slide:first');
            var LAST_LI = SER_LIST.find('.ser_list_slide:last');
            
            SER_LIST.stop().animate({marginLeft: -NEWS_WIDTH}, 1000, function(){
                FIRST_LI.insertAfter(LAST_LI);
                $(this).css({marginLeft: 0});
            });

            return false;
        });
        ARROW_L.click(function(){
            var FIRST_LI = SER_LIST.find('.ser_list_slide:first');
            var LAST_LI = SER_LIST.find('.ser_list_slide:last');

            LAST_LI.insertBefore(FIRST_LI);
            SER_LIST.css({marginLeft: -NEWS_WIDTH})
            SER_LIST.stop().animate({marginLeft: 0}, 1000);

            return false;
        }); 
    }
    
    switchTapMenu();
    doServiceSlide();
}


// Notice visible ////////////////////////////////////////////////////
function letNoticeVisible(){
    var MENU1 = $('.notice1 dl'); 
    MENU1.on("click", function(){
        $(MENU1).removeClass('active_noti') 
        $(this).addClass('active_noti');

        return false;
    });

    var MENU2 = $('.notice2 dl'); 
    MENU2.on("click", function(){
        $(MENU2).removeClass('active_noti') 
        $(this).addClass('active_noti');

        return false;
    });
};


// Notice Slide ////////////////////////////////////////////////////
function doSlideNotice(){
    var NOTICE_LIST = $('.slides');
    var NOTICE_WIDTH = 280;
    var setIntervalId = undefined;
   
    function moveToNext(){
        var FIRST_SLIDE = NOTICE_LIST.find('li:first');
        var LAST_SLIDE = NOTICE_LIST.find('li:last');
        
        NOTICE_LIST.stop().animate({marginLeft: -NOTICE_WIDTH}, 500, function(){
            FIRST_SLIDE.insertAfter(LAST_SLIDE);
            NOTICE_LIST.css({marginLeft: 0});
        });
    }
    
    function moveToPrev(){
        var FIRST_SLIDE = NOTICE_LIST.find('li:first');
        var LAST_SLIDE = NOTICE_LIST.find('li:last');

        LAST_SLIDE.insertBefore(FIRST_SLIDE);
        NOTICE_LIST.css({marginLeft: -NOTICE_WIDTH});
        NOTICE_LIST.stop().animate({marginLeft: 0}, 500);
    }
    
    function clickBtn(){
        var NEXT_BTN = $('.remote_r');
        var PREV_BTN = $('.remote_l');

        NEXT_BTN.click(moveToNext);
        PREV_BTN.click(moveToPrev);
    }

    function doAutoSlide(){
        setIntervalId = setInterval(moveToNext, 4000);
    }

    function stopAutoSlide(){
        var PLAY_BTN = $('.remote_p'); 
        PLAY_BTN.click(function(){
            $(this).toggleClass('play');
            var hasPlayClass = $(this).hasClass('play');
            if(hasPlayClass){
                clearInterval(setIntervalId);
            } else{
                doAutoSlide();
            }
        });
    }

    clickBtn();
    doAutoSlide();
    stopAutoSlide();
}

// Location tab ////////////////////////////////////////////////////////////
function controlLocationTab(){
    var LO_MENU_LIST = $('.howToCome_cont');
    var activeClass = 'active_location';

    LO_MENU_LIST.on('click', function(e){ 
        e.preventDefault(); 
        LO_MENU_LIST.removeClass(activeClass);
        $(this).addClass(activeClass);
    });
}

// init //////////////////////////////////////////////////////////////////////
function init(){
    letMenuVisible();
    doSlideBanner();
    doSlideNewsbox();
    controlServiceCont();
    letNoticeVisible();
    doSlideNotice();
    controlLocationTab();   
    createMap();
};

init();
