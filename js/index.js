function getStyle(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }else{
    return getComputedStyle(obj, false)[attr];
  }
}
var oMainImg = document.getElementById('mainImg');
var oSelector = document.getElementById('selector');
var aSelector = oSelector.getElementsByTagName('li');
var oPre = document.getElementById('pre');
var oNext = document.getElementById('next');
var aImg = oMainImg.getElementsByTagName('img');
//alert(aImg.length)

var oImgUl = oMainImg.getElementsByTagName('ul')[0];
//alert(oImgUl)
var now = 0;
for(i=0 ; i<aSelector.length ; i++){
	aSelector[i].index = i;
	aSelector[i].onclick = function(){
		
		$(this).siblings().removeClass('active');
		this.className = 'active';
		
		$('ul').animate({left: -600 * this.index + "px"});
		//oImgUl.style.left = -600 * this.index + "px";
		now = this.index;
		
		
		for(i=0 ; i<aImg.length ; i++){
			$(aImg[i]).removeClass('scale');
		}
		$(aImg[now]).addClass("scale");
		
	}
	 
}

var preClick = function(){
	$("#pre").click(function(){
		
		$(aImg[now]).removeClass("scale");

		if(parseInt(getStyle(oImgUl, 'left')) >= 0){
			$('ul').animate({left: "-2400px" }, function(){
				$(aImg[now]).addClass("scale");
			});	
		}else{
			$('ul').animate({left: "+=600px" }, function(){
				$(aImg[now]).addClass("scale");
			});
		}
		(now==0) ? (now=4) : (--now);
		//alert(now)
		
		$(this).unbind();	
		setTimeout(function(){
			preClick();
		}, 500);		
		
		for(i=0 ; i<aSelector.length ; i++){
			aSelector[i].className = "";
		}
		aSelector[now].className = 'active';
		
	});	
}
preClick();



var nextClick = function(){
	//alert(now)
	$("#next").click(function(){
			
		$(aImg[now]).removeClass("scale unScale");
		
		if(parseInt(getStyle(oImgUl, 'left')) <= -2400){
			$('ul').animate({left: "0px" }, function(){
				$(aImg[now]).addClass("scale");
			});
		}else{
			$('ul').animate({left: "+=-600px" }, function(){
				$(aImg[now]).addClass("scale");
			});			
		}
		(now<4) ? (++now) : (now=0);
		//alert(now2);
		$(this).unbind();	
		setTimeout(function(){
			nextClick();
		}, 500);
		
		for(i=0 ; i<aSelector.length ; i++){
			aSelector[i].className = "";
		}
		aSelector[now].className = 'active';
		
	});
}
nextClick();



oImgUl.onmouseover = oPre.onmouseover = oNext.onmouseover = oSelector.onmouseover = function(){
	for(i=0 ; i<aImg.length ; i++){
		$(aImg[i]).removeClass('scale unScale');
	}
	$(aImg[now]).addClass("scale");
	clearInterval(tab);
}
/*
function tab(){
	if(parseInt(getStyle(oImgUl, 'left')) == -2400){
		$(oImgUl).animate({left: "0"});
	}else{
		$(oImgUl).animate({left: "-=600"});
	}
}*/

oImgUl.onmouseout = oPre.onmouseout = oNext.onmouseout = oSelector.onmouseout = function(){
	for(i=0 ; i<aImg.length ; i++){
		$(aImg[i]).removeClass('scale');
		$(aImg[now]).addClass("unScale");	
	}
	tab = setInterval(timer, 4000);
}

function timer(){
	$("#next").click();
}
var tab = setInterval(timer, 4000);

//*
$(aImg[0]).addClass('scale');

//marginTop

var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//alert(getStyle(oMainImg, 'height'));
//oMainImg.style.marginTop = ( clientHeight - parseInt(getStyle(oMainImg, 'height')) )/2 + 'px';