
class HideOpeningSection{
    constructor(index, btns){
        this.index = index;
        this.openingDisplay = document.querySelector('.opening-section');
        this.displaySection = document.querySelector('.display-section');
        this.mainContainer =  document.querySelector('.main-container');
    }

    hideSection(){
        this.vh = document.clientHeight || window.innerHeight;
        this.openingDisplay.style.bottom = this.vh + 'px';

        for(let i = 0; i < this.btns.length; i++){ 
            if( i === this.index){
                this.openingDisplay.style.visibility = "hidden";
                this.mainContainer.style.transform = "translateY(-" + openingDisplay.style.bottom + ")";
                this.displaySection.classList.add('show');
            }
        }   
    }

}

export { HideOpeningSection }



// function hideOpeningSection(index){
//     const vh = document.clientHeight || window.innerHeight;
//     openingDisplay.style.bottom = vh + 'px';

//     for(let i = 0; i < btns.length; i++){ 
//         if(i === index){
//             openingDisplay.style.visibility = "hidden";
//             mainContainer.style.transform = "translateY(-" + openingDisplay.style.bottom + ")";
//             displaySection.classList.add('show');
//         }
//     }
// }

// export { hideOpeningSection };