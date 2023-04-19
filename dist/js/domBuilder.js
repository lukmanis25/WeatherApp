

/* DOM DISPLAY */

//Display error under searchBar and above weather icon
export const displayError = (msg) => {
    console.log(msg)
    //TODO !!!!!!!!!!
    //add new section in html for information
    //add display error func body
};



/* ANIMATIONS */

//Add load animation to element (element next sibling must be animated icon !!!)
export const addLoadAnimation = (element) => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};