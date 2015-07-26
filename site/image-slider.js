/**
 * Created by tam on 7/20/15.
 */
var imgSldr = new Object();
imgSldr.ul =0;
imgSldr.liItems;
imgSldr.imageNumber;
imgSldr.imageWidth;
imgSldr.prev
imgSldr.next;
imgSldr.currentPosition = 0;
imgSldr.currentImage = 0;

imgSldr.pager_ul = 0;
imgSldr.pager_lis = 0;

imgSldr.id = undefined;
imgSldr.idAnimation = undefined;

function imgSldr_init(){
    //init image slider
    imgSldr.ul = document.getElementById('image_slider');
    imgSldr.liItems = imgSldr.ul.children;
    imgSldr.imageNumber = imgSldr.liItems.length;
    imgSldr.imageWidth = imgSldr.liItems[0].children[0].clientWidth;
    imgSldr.ul.style.width = parseInt(imgSldr.imageWidth * imgSldr.imageNumber) + 'px';
    imgSldr.prev = document.getElementById("prev");
    imgSldr.next = document.getElementById("next");
    imgSldr.prev.onclick = function(){ imgSldr_onClickPrev();};
    imgSldr.next.onclick = function(){ imgSldr_onClickNext();};

    //init pager
    //generatePager(imageNumber);
    imgSldr.pager_ul = document.getElementById('pager');
    imgSldr.pager_lis = imgSldr.pager_ul.children;
    imgSldr.pager_lis[0].class = "activePage";
    imgSldr_slideTo(0);
}

function imgSldr_animate(opts){
    var opDirection = 1;
    imgSldr.id = setInterval(function(){
        if (parseFloat(imgSldr.ul.style.opacity) <= 0.1){
            opDirection = -1;
            imgSldr.ul.style.left = parseInt(-imgSldr.imageWidth * opts.imageToGo) + 'px';
        }
        var newOpacity = parseFloat(imgSldr.ul.style.opacity) - opDirection * 0.05;
        if (newOpacity >= 1){
            clearInterval(imgSldr.id);
            imgSldr.ul.style.opacity = "1";
            var nextImage = imgSldr.currentImage+1;
            if (nextImage>=(imgSldr.imageNumber)){
                nextImage = 0;
            }
            imgSldr_slideTo(nextImage);
        }
        else{
            imgSldr.ul.style.opacity = newOpacity.toString();
        }
    }, opts.duration);
}



function imgSldr_slideTo(imageToGo){
    imgSldr_resetSlide();
    imgSldr_FireDot(imageToGo);
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - imgSldr.currentImage);
    direction = imgSldr.currentImage > imageToGo ? 1 : -1;
    imgSldr.currentPosition = -1 * imgSldr.currentImage * imgSldr.imageWidth;
    var opts = {
        duration:75,
        dir:direction,
        imageCurr:imgSldr.currentImage,
        imageToGo:imageToGo
    }
    imgSldr_animate(opts);
    imgSldr.currentImage = imageToGo;
}

function imgSldr_resetSlide(){
    if(imgSldr.id != undefined) {
        clearInterval(imgSldr.id);
        imgSldr.ul.style.opacity = "1";
        imgSldr.ul.style.left = parseInt(-1 * imgSldr.imageWidth * imgSldr.currentImage) + 'px';
    }
}

function imgSldr_onClickPrev(){
    if (imgSldr.currentImage == 0){
        imgSldr_slideTo(imgSldr.imageNumber - 1);
    }
    else{
        imgSldr_slideTo(imgSldr.currentImage - 1);
    }
}

function imgSldr_onClickNext(){
    if (imgSldr.currentImage == imgSldr.imageNumber - 1){
        imgSldr_slideTo(0);
    }
    else{
        imgSldr_slideTo(imgSldr.currentImage + 1);
    }
}

function imgSldr_FireDot(numDot){
    var elm = document.getElementById("pager");
    var elems = elm.children;
    for (var i =0; i < elems.length; i++){
        elems[i].className = "";
    }
    elems[numDot].className = "activePage";
}