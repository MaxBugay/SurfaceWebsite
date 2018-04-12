var slideShowFW = {};

(function () {
    
    var slideShow;
    var colorArray = ['Platinum', 'Burgundy', 'Cobalt', 'Gold'];
    var slides = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg", "../pics/tutorialpics/Surface-Laptop-Plat4.jpg", "../pics/tutorialpics/Surface-Laptop-Plat5.jpg"];
    var slidesLength = slides.length - 1;
    
    function $(element) {
        return document.getElementById(element);
    }
    
    slideShowFW.makeSlideShow = function (params) {
        
        //Checks parameters
        if (!params || !params.id) {
            alert("makeSlideShow must be passed an object with 'id' property.");
            return;
        }
        
        slideShow = $(params.id);
        
        //Checks id
        if (!slideShow) {
            alert("makeSlideShow must be passed an object with an 'id' property " +
                    "that references an HTML element.");
            return;
        }
        
        //Default to Platinum Slides if none are passed
        if (!params.slidePics || !Array.isArray(params.slidePics)) {
            params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg", "../pics/tutorialpics/Surface-Laptop-Plat4.jpg", "../pics/tutorialpics/Surface-Laptop-Plat5.jpg"];
        }
        
        //Changes slideshow to desired color
        slideShow.changeColorSlides = function (colorSlides) {
            params.slidePics = colorSlides;
            slides = colorSlides;
            slidesLength = slides.length - 1;
        };
        
        //The changeColorFW function is optional if you want to put your pictures in the framework. 
        slideShow.changeColorFW = function (color) {
            if (color === colorArray[0]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg", "../pics/tutorialpics/Surface-Laptop-Plat4.jpg", "../pics/tutorialpics/Surface-Laptop-Plat5.jpg"];
            }
            else if (color === colorArray[1]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Burg1.jpg", "../pics/tutorialpics/Surface-Laptop-Burg2.jpg", "../pics/tutorialpics/Surface-Laptop-Burg3.jpg", "../pics/tutorialpics/Surface-Laptop-Burg4.jpg", "../pics/tutorialpics/Surface-Laptop-Burg5.jpg"];
            }
            else if (color === colorArray[2]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Cob1.jpg", "../pics/tutorialpics/Surface-Laptop-Cob2.jpg", "../pics/tutorialpics/Surface-Laptop-Cob3.jpg", "../pics/tutorialpics/Surface-Laptop-Cob4.jpg", "../pics/tutorialpics/Surface-Laptop-Cob5.jpg"];
            }
            else if (color === colorArray[3]) {
                params.slidePics = ["../pics/tutorialpics/Surface-Laptop-Gold1.jpg", "../pics/tutorialpics/Surface-Laptop-Gold2.jpg", "../pics/tutorialpics/Surface-Laptop-Gold3.jpg", "../pics/tutorialpics/Surface-Laptop-Gold4.jpg", "../pics/tutorialpics/Surface-Laptop-Gold5.jpg"];
            }
            slides = params.slidePics;
            slidesLength = slides.length - 1;
        };    
        
        slideShow.style.textAlign = "center";
        slideShow.style.padding = 10 + "px";
        
        //Next or Previous Slides
        slideShow.changeSlide = function(n) {
            params.slideIndex += n;
            
            //Restart slideshow at end of it
            if (params.slideIndex > slidesLength) {
                params.slideIndex = 0;
            }
            //Back on slide 1 to end of array
            if (params.slideIndex < 0) {
                params.slideIndex = slidesLength;
            }
            
            document.getElementById(params.id).src = params.slidePics[params.slideIndex];
            
        };
     
        
        return slideShow;
    };
})();