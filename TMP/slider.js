/**
 * Created by tam on 7/21/15.
 */
/*function generatePager(imageNumber){
 var pageNumber;
 var pagerDiv = document.getElementById('pager');
 for (i = 0; i < imageNumber; i++){
 var li = document.createElement('li');
 pageNumber = document.createTextNode(parseInt(i + 1));
 li.appendChild(pageNumber);
 pagerDiv.appendChild(li);
 // add event inside a loop, closure issue.
 li.onclick = function(i){
 return function(){
 slideTo(i);
 }
 }(i);
 }
 var computedStyle = document.defaultView.getComputedStyle(li, null);
 //border width 1px; offsetWidth = 22
 var liWidth = parseInt(li.offsetWidth);
 var liMargin = parseInt(computedStyle.margin.replace('px',""));
 pagerDiv.style.width = parseInt((liWidth + liMargin * 2) * imageNumber) + 'px';
 }
 */

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

function imgSldr_init(){
    //init image slider
    imgSldr.ul = document.getElementById('image_slider');
    imgSldr.liItems = imgSldr.ul.children;
    imgSldr.imageNumber = imgSldr.liItems.length;
    imgSldr.imageWidth = imgSldr.liItems[0].children[0].clientWidth;
    imgSldr.ul.style.width = parseInt(imgSldr.imageWidth * imgSldr.imageNumber) + 'px';
    imgSldr.prev = document.getElementById("prev");
    imgSldr.next = document.getElementById("next");
    imgSldr.prev.onclick = function(){ onClickPrev();};
    imgSldr.next.onclick = function(){ onClickNext();};

    //init pager
    //generatePager(imageNumber);
    imgSldr.pager_ul = document.getElementById('pager');
    imgSldr.pager_lis = imgSldr.pager_ul.children;
    imgSldr.pager_lis[0].class = "activePage";

}

function imgSldr_animate(opts){
    var start = new Date;
    var id = setInterval(function(){
        var timePassed = new Date - start;
        var progress = timePassed / opts.duration;
        if (progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
            opts.callback();
        }
    }, opts.delay || 17);
    //return id;
}

function imgSldr_slideTo(imageToGo){
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - imgSldr.currentImage);
    // slide toward left

    direction = imgSldr.currentImage > imageToGo ? 1 : -1;
    imgSldr.currentPosition = -1 * imgSldr.currentImage * imgSldr.imageWidth;
    var opts = {
        duration:1000,
        delta:function(p){return p;},
        step:function(delta){
            imgSldr.ul.style.left = parseInt(imgSldr.currentPosition + direction * delta * imgSldr.imageWidth * numOfImageToGo) + 'px';
        },
        callback:function(){imgSldr.currentImage = imageToGo;}
    };
    animate(opts);
}

function imgSldr_onClickPrev(){
    if (imgSldr.currentImage == 0){
        slideTo(imgSldr.imageNumber - 1);
    }
    else{
        slideTo(imgSldr.currentImage - 1);
    }
}

function imgSldr_onClickNext(){
    if (imgSldr.currentImage == imgSldr.imageNumber - 1){
        slideTo(0);
    }
    else{
        slideTo(imgSldr.currentImage + 1);
    }
}

window.onload = imgSldrInit;