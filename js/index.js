$(function(){

    //새로고침하면, '스크롤 바'를 가장 처음으로 이동시키기

    $("html, body").animate({"scrollTop":0}, 1);

    

    var scrollEvnt = { // 객체가 필요함

        count: 0, // 갯수

        dir:"down",

        waitScroll:false,

        len:$("section").length,

        scroll:true,

        stopPoint:0, //멈추고 싶은 section요소의 순번

        expandH:0 //확장되고 싶은 비율

    }

    $("section")

    .eq(scrollEvnt.stopPoint).css("height",100+scrollEvnt.expandH+"%");

    

    

    //네비게이터 클릭 이벤트

    $("nav").children("ul").children("li").click(function(e){
        //a요소 움직이는 걸 막기 위해
        e.preventDefault();

        //현재 몇번째를 클릭했는지 알아내서 그 번지에 해당하는

        //요소로 이동하면 된다. 

        scrollEvnt.count = $(this).index();

        scrollEvnt.scroll = false; //진행하지 마라

        moveBox();

    });

    

    

    //스크롤은 개인별로 하는 방식이 모두 다르다. 

    //스크롤은 스크롤하는 중에 이벤트가 계속 발생한다. 

    //스크롤이 끝날때마다 하나씩 (위 또는 아래로)이동시키면 된다.

    //DOMMouseScroll과 mousewheel은 스크롤 이벤트 할 때 같이 사용할 것.

    $(window).on("mousewheel DOMMouseScroll",function(e){

        scrollEvnt.scroll = true;

        var boxH = $("section").eq(0).height();

        // mousewheel 플러그인 이벤트 객체e에서 deltaY, deltaX등 여러가지를

        // 속성이 있다. 이 속성은 유저가 휠을 사용할 때!! 자동으로 나타나게 된다. 

        // 필요에 의해서 사용할 수도 있고 사용하지 않을 수도 있다. 

        // 우리가 배경이미지를 움직였을 때 이벤트 객체에서는 document위에서

        // 마우스가 위치한 x, y지점이 중요해서 이벤트 객체를 사용했듯이

        // 이번에는 내가 스크롤, 마우스휠을 움직일 때 아래로 스크롤 했는지, 

        // 위로 스크롤 했는지 판단해주는 이벤트 객체를 플러그인이 제공한다.

        if(e.deltaY == -1){

            scrollEvnt.dir = "down";

        }else{

            scrollEvnt.dir = "up";    

        }

        

        

        if(scrollEvnt.waitScroll){// null, undefined, 0은 이상 세가지는

                                 // if조건문에서 false의 값을 갖는다.   

           //자연스러운 애니메이션을 위해서

           clearTimeout(scrollEvnt.waitScroll);
                  //scrollEvnt가 생겼으면 삭제해 
        }

        

        

        //멈추는 섹션의 위치에서 확장된 크기만큼 scrollTop의 위치를 

        //알아내기 위한 변수 설정

        //var scT = $(window).scrollTop();//스크롤탑은 수치를 return

        
        var h = 0;
        var expand = 0;
        //결과가 %인 것은 수치와 비교할 수 없다. 그래서 수치로 변환한다. 
        if(scrollEvnt.stopPoint>0){
            h =  $("section").eq(scrollEvnt.stopPoint).offset().top;
            //console.log(h);
           var expand = $("section").eq(0).height()*scrollEvnt.expandH/100;
        }

        

        

        scrollEvnt.waitScroll = setTimeout(function(){

            

             if(scrollEvnt.dir == "down" && scrollEvnt.stopPoint> 0 && scrollEvnt.count == scrollEvnt.stopPoint ){
                  //수동으로 스크롤하면 스크롤 카운트를 변경할 수 없어서 카운트 크기를 stopPoint로 변경
                scrollEvnt.scroll = false;

             }

            

             if(scrollEvnt.dir == "down" && $(window).scrollTop() >= (h+expand) ){

                    //console.log("inininin");

                    scrollEvnt.scroll = true;

             }

            

             

            

             if(scrollEvnt.dir == "up"  && scrollEvnt.stopPoint> 0 && ( scrollEvnt.count == scrollEvnt.stopPoint+1 || scrollEvnt.count == scrollEvnt.stopPoint) ) {

                scrollEvnt.scroll = false;

                //console.log("들어와있음");

                //up방향일 때는 

                //수동으로 스크롤하면 스크롤 카운트를 변경할 수 없어서 

                //카운트 크기를 stopPoint로 변경

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
               //방향이 아래라면 증가시켜라
                scrollEvnt.count++;

                if(scrollEvnt.count >= scrollEvnt.len ){ //스크롤을 끝까지 내렸다면, 

                    scrollEvnt.count = scrollEvnt.len-1;//마지막에 고정한다.

                }

            }else{

                scrollEvnt.count--;

                if(scrollEvnt.count < 0){ //스크롤을 처음으로 위치시켰다면,

                   scrollEvnt.count = 0; //처음위치에 고정한다

                }

            }

        }

        

        //console.log(scrollEvnt.count);

        //jQuery요소객체.offset()은 요소의 top과 left값을 갖고 있는 객체를

        //return한다. 

        //offset() vs position() ===> offset은 body로부터의 top과 left의 값을 갖고 있는 객체 return / position은 기준점으로부터의 topr과 left 값을 갖고 있는 객체 return한다. 

        

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



});
