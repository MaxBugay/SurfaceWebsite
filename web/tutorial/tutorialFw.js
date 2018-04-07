
function makeSlideshow(slides) {
    
            var slidePics = slides;
            console.log(slides);
            
            var slideshowObj = {};
            //var colorArray = colorA;
            //slideShowObj.divID = color;
            var slideIndex = 1;
            
            showSlides(slideIndex);
            
            /*slideshowObj.changeSlideshow = function(color){
                for (var i = 0; i < colorArray.length; i++) {
                    if (colorArray[i] === color) {
                        showSlides(slideIndex, color);
                    }
                }
            }
    
            if (!slidePics || !Array.isArray(slidePics) {
                slidePics = ["../pics/tutorialpics/Surface-Laptop-Plat1.jpg", "../pics/tutorialpics/Surface-Laptop-Plat2.jpg", "../pics/tutorialpics/Surface-Laptop-Plat3.jpg"];
                console.log(slidePics);
            }*/

            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function currentSlide(n) {
                showSlides(slideIndex = n);
            }

            function showSlides(n) {
            var i;
            var elem;
            //elem.src = '../pics/tutorialpics/Surface-Laptop-Plat1.jpg';
            //console.log(elem.src);
            
            //document.getElementById("slideshowCont").appendChild(elem);
            //var slides = document.getElementById('slideshowCont').children;
            //var slides2 = document.getElementById('slideshowCont2').children;
            //slides = document.getElementsByClassName("Platinum");
            console.log(slides);
            //console.log(slides2);
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {slideIndex = 1}    
                if (n < 1) {slideIndex = slides.length}
                    for (i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";  
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            console.log(slideIndex);
            console.log(slides[0]);
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " active";
            
            return slideshowObj;
            }
}



