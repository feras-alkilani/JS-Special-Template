// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

//Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval ;

if (mainColors !== null){
    
    document.documentElement.style.setProperty('--main-color',mainColors);

    // Check for Active Class From All Colors List Item

    document.querySelectorAll(".colors-list li").forEach(element =>{

        element.classList.remove("active");
        
        // Add Active Class On Element With Data-Color === Local Storage Item 
        if (element.dataset.color === mainColors){

            // Add Active Clss
            element.classList.add("active");
        }
    });
}

// Click On Toggle Setting Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function (){

    // Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On  MAin Settings Box
    document.querySelector(".settings-box").classList.toggle("open");    
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    //Click On Every List Items
    li.addEventListener("click", (e) => {

        // set Color On Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        // Set Colotr On Local Storage
        localStorage.setItem("color_option",e.target.dataset.color );

        handleActive(e);
    });
});

// Switch Random Background Option
const randomBackEl= document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {

    //Click On Every Span
    span.addEventListener("click", (e) => {

        //Remove Active Class From All Sapns
        handleActive(e);

        if (e.target.dataset.background === 'yes') {

        backgroundOption = true;

        randomizeImgs();

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);
        }
    });
});

// Select Landing Page Element
let LandingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgsArray = ["1.jpg" , "2.jpg", "3.jpg", "4.jpg", "5.jpg","5.jpg", "6.jpg", "7.jpg","8.jpg"];

// Function To Randomize Imgs
function randomizeImgs(){

    if ( backgroundOption === true ){
    
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
            console.log(imgsArray[randomNumber]);
            // Cahnge background Image URL 
            LandingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
            
            },10000);
    }
    }

    randomizeImgs();

    // Select Skills Selector
    let ourSkills = document.querySelector(".skills");

    window.onscroll = function (){

        // Skills Offset Top
        let skillsOffsetTop = ourSkills.offsetTop;

        //Skills Outer Height
        let skillsOuterHeight = ourSkills.offsetHeight;

        // Window Height
        let windowHeight = this.innerHeight;

        // Window ScrollTop
        let windowScrollTop = this.pageYOffset;

        if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

            let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

            allSkills.forEach(skill => {

                skill.style.width = skill.dataset.progress;
            });
        }
    };


    // Create Popuo With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create OverLAy Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // Append OverLay To The Body
        document.body.appendChild(overlay);

        // Creat The Popup
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if ( img.alt !== null){

            //Create Heading
            let imgheading = document.createElement("h3");

            //Create text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text To The Heading
            imgheading.appendChild(imgText);

            //Append The Heading To The popup Box
            popupBox.appendChild(imgheading);

        }

        // Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src=img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        
        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
        

    });
    
});

// Close Popup
document.addEventListener("click", (e) => {

    if(e.target.className == 'close-button'){


        e.target.parentNode.remove();
        //Remove Overlay
        document.querySelector(".popup-overlay").remove();

         // Remove The current Popup
        // e.target.parentNode.remove();
    }
});

// Sellect All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");


// Sellect All Links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere (elements){

    elements.forEach(ele => {

        ele.addEventListener("click" , (e) => {
    
        e.preventDefault();
    
        document.querySelector(e.target.dataset.section).scrollIntoView({
    
            behavior: 'smooth'
        });
    
        });
    });
}

scrollToSomewhere(allBullets);

scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(e){

     //Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{

        element.classList.remove("active");
        
    });

    // Add Active Class On Self
    e.target.classList.add("active");
}

// Show The Bullets
let bulletsSpan = document.querySelectorAll (".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null){

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block'){

        bulletsContainer.style.display ='block';

        document.querySelector("bullets-option .yes").classList.add("active");
    }else {

        bulletsContainer.style.display ='none';

        document.querySelector("bullets-option .no").classList.add("active");
    }
}



bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {


        if (span.dataset.display === 'show') {

            bulletsContainer.style.display ='block';

            localStorage.setItem("bullets_option", 'block')

        }
        else{

            bulletsContainer.style.display ='none';
        }
        
        // Handle Active Function

        handleActive(e);
        
    });
    
});

// Reset Button
document.querySelector(".reset-options").onclick = function (){

    localStorage.clear();
//    localStorage.removeItem("bullets_option");

//    localStorage.removeItem("background_option");

//    localStorage.removeItem("color_option");


   //Reload Window
   window.location.reload();

};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let tlinks = document.querySelector(".links");

toggleBtn.onclick= function (e) {

    // Stop propagation
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tlinks.classList.toggle("open");
};

// click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

if (e.target !== toggleBtn & e.target !== tlinks ){

    // Check If Menu Is Oppen
    if (tlinks.classList.contains("open")){

    // Toggle Class "menu-active" On Button
    toggleBtn.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tlinks.classList.toggle("open");

    }
}

});

// Stop propagation On Menu

tlinks.onclick = function (e){

    e.stopPropagation();
}
