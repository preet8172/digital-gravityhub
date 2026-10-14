let slideImages = document.querySelectorAll('img');

let next = document.querySelector('.next')
let prev = document.querySelector('.prev');

let counter= 0;

next.addEventListener('click',nextSlide);

function nextSlide(){
    slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
    if(counter >= slideImages.length-1){
        counter=0
    }else{
        counter++;
    }
     slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
}

//prev 

prev.addEventListener('click',prevSlide);

function prevSlide(){
    slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
    if(counter == 0){
        counter=slideImages.length-1;
    }else{
        counter--;
    }
     slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
}