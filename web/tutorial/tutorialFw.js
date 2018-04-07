
var imageNumber = 0;

var colorArray = ['Platinum', 'Burgundy', 'Cobalt', 'Gold'];

var images = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg"];

var imageLength = images.length - 1;

var slideshowFW = {};

(function () {
    
    function $(element) {
        return document.getElementById(element);
    }
    
    slideshowFW.makeSlideShow = function (params) {
        if (!params || !params.id) {
            alert("makeSlideShow must be passed an object with 'id' property.");
            return;
        }
        
        var slideShow = $(params.id);
        
        if (!slideShow) {
            alert("makeSlideShow must be passed an object with an 'id' property " +
                    "that references an HTML element.");
            return;
        }
        
        //Default to Platinum Slides if none are passed
        if (!params.slidePics || !Array.isArray(params.slidePics)) {
            params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg"];
        }
            
        slideShow.changeColor = function (c) {
            if (c === colorArray[0]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg"];
            }
            else if (c === colorArray[1]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Burg1.jpg", "../pics/tutorialpics/Surface-Laptop-Burg2.jpg", "../pics/tutorialpics/Surface-Laptop-Burg3.jpg"];
            }
            else if (c === colorArray[2]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Cob1.jpg", "../pics/tutorialpics/Surface-Laptop-Cob2.jpg", "../pics/tutorialpics/Surface-Laptop-Cob3.jpg"];
            }
            else if (c === colorArray[3]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Gold1.jpg", "../pics/tutorialpics/Surface-Laptop-Gold2.jpg", "../pics/tutorialpics/Surface-Laptop-Gold3.jpg"];
            }
            images = params.slidePics;
        };    
        
        slideShow.style.textAlign = "center";
        slideShow.style.padding = 10 + "px";
        
        imageLength = params.slidePics.length - 1;
        
        slideShow.changeImage = function(n) {
            imageNumber += n;
            
            //Restart slideshow at end of it
            if (imageNumber > imageLength) {
                imageNumber = 0;
            }
            //Back on slide 1 to end of array
            if (imageNumber < 0) {
                imageNumber = imageLength;
            }
            document.getElementById("slideshow").src = images[imageNumber];
            
            //return false;
        };
        console.log(slideShow);
        return slideShow;
    };
})();



