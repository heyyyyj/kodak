$(function(){


    $("html, body").animate({"scrollTop":0}, 1);

    

    var scrollEvnt = {

        count: 0,

        dir:"down",

        waitScroll:false,

        len:$("section").length,

        scroll:true,

        stopPoint:0,

        expandH:0

    }

    $("section")

    .eq(scrollEvnt.stopPoint).css("height",100+scrollEvnt.expandH+"%");

    

    $(window).on("mousewheel DOMMouseScroll",function(e){

        scrollEvnt.scroll = true;

        var boxH = $("section").eq(0).height();

        if(e.deltaY == -1){

            scrollEvnt.dir = "down";

        }else{

            scrollEvnt.dir = "up";    

        }

        

        

        if(scrollEvnt.waitScroll){

           clearTimeout(scrollEvnt.waitScroll);

        }

        
        //var scT = $(window).scrollTop();//수치를 return

        
        var h = 0;
        var expand = 0;

        if(scrollEvnt.stopPoint>0){
            h =  $("section").eq(scrollEvnt.stopPoint).offset().top;
            //console.log(h);
           var expand = $("section").eq(0).height()*scrollEvnt.expandH/100;
        }

        

        

        scrollEvnt.waitScroll = setTimeout(function(){

            

             if(scrollEvnt.dir == "down" && scrollEvnt.stopPoint> 0 && scrollEvnt.count == scrollEvnt.stopPoint ){
                
                scrollEvnt.scroll = false;

             }

             if(scrollEvnt.dir == "down" && $(window).scrollTop() >= (h+expand) ){

                    //console.log("inininin");

                    scrollEvnt.scroll = true;

             }

            

             

            

             if(scrollEvnt.dir == "up"  && scrollEvnt.stopPoint> 0 && ( scrollEvnt.count == scrollEvnt.stopPoint+1 || scrollEvnt.count == scrollEvnt.stopPoint) ) {

                scrollEvnt.scroll = false;

                //console.log("들어와있음");

                scrollEvnt.count = scrollEvnt.stopPoint;

                lightNow();

             }

            

             //console.log(scT + "/" +h);

             if(scrollEvnt.dir == "up" && $(window).scrollTop() <= h ){

                scrollEvnt.scroll = true;

                

             }

             

             if(scrollEvnt.scroll){

                moveBox();      

             }

             

        },100);//setTimeout 끝

        

    });

    

    function moveBox(){

        

        if(scrollEvnt.scroll){
              
           if(scrollEvnt.dir == "down"){
               
                scrollEvnt.count++;

                if(scrollEvnt.count >= scrollEvnt.len ){

                    scrollEvnt.count = scrollEvnt.len-1;

                }

            }else{

                scrollEvnt.count--;

                if(scrollEvnt.count < 0){

                   scrollEvnt.count = 0;

                }

            }

        }

        

        //console.log(scrollEvnt.count);
        

        var nextTop = $("section").eq(scrollEvnt.count).offset().top;

        //console.log(nextTop);

        $("html, body").animate({"scrollTop":nextTop},300,"linear");

        

        lightNow();

    }//moveBox 함수 끝

    

    function lightNow(){

        $("nav>ul").children("li")

            .eq(scrollEvnt.count).addClass("on")

            .siblings().removeClass("on");

    }//lightNow 함수 끝

    $('.box3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1800,
    });

});
