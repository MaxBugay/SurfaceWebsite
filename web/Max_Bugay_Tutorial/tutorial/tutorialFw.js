var slideShowFW = {};

(function () {
    
    var slideShow;
    var slidesLength = 0;
    
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
        
        //Default to Platinum Slides on load
        slidesLength = params.slidePics[0].slides.length - 1;
        params.color = "Platinum";
        
        //Changes slideshow to desired color
       slideShow.setColor = function(color) {
           params.color = color;
           //console.log(params.slideIndex);
           for (i = 0; i < params.slidePics.length; i++)
           {
               if (params.slidePics[i].color === color)
               {
                   slidesLength = params.slidePics[i].slides.length - 1;
                   params.slideIndex = 0;
                   console.log(slidesLength);
                   console.log(params.slidePics[i].slides);
                   console.log(params.slideIndex);
                   document.getElementById(params.id).src = params.slidePics[i].slides[params.slideIndex];
               }
           }
        };
        
        slideShow.style.textAlign = "center";
        slideShow.style.padding = 10 + "px";
        
        //Next or Previous Slides
        slideShow.changeSlide = function(n) {
            
            params.slideIndex += n;
            console.log(params.slideIndex);
            
            //Restart slideshow at end of it
            if (params.slideIndex > slidesLength) {
                params.slideIndex = 0;
            }
            //Back on slide 1 to end of array
            if (params.slideIndex < 0) {
                params.slideIndex = slidesLength;
            }
            for (i = 0; i < params.slidePics.length; i++)
            {
               if (params.slidePics[i].color === params.color)
               {
                    document.getElementById(params.id).src = params.slidePics[i].slides[params.slideIndex];
            }
         }
            
        };

        return slideShow;
    };
})();