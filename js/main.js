window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchor = document.querySelectorAll('a');

    setInterval(() => {
        transition_el.classList.remove('is-active');
    }, 500);

    for(let i=0; i < anchor.length; i++){
        const anchor = anchor[i];

        anchor.addEventListener('click', e => {
            e.preventDefault();
            let target = e.target.href;

           transition_el.classList.add('is-active');
           
           setTimeout(() => {
                window.location.href = target;
           }, 500);
        });
    }
}

console.log("enter");
var textarea = document.getElementById("input_area");
var button = document.getElementById("btn");
var clear = document.getElementById("reset");
 
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu_btn');
const closeBtn = document.getElementById('close_btn');
const darkHorse = document.querySelector('.dark_horse');


textarea.addEventListener("keydown", function(event){

    if(event.keyCode === 13){
        event.preventDefault();

        if(textarea.value.trim() !== ""){
            button.focus();
            console.log("ENterrrrss")
        }
    }
   
});
clear.addEventListener('click', function(){
    textarea.value = "";
    document.getElementById('count_tokens').value ="";

});

menuBtn.addEventListener('click', () =>{
    sideMenu.style.left = '0';
});
closeBtn.addEventListener('click', () =>{
    sideMenu.style.left = '-100%';
});

function toggleDarkMode(){
        document.body.classList.toggle('dark-mode');
        darkHorse.querySelector('span:nth-child(1)').classList.toggle('active');
        darkHorse.querySelector('span:nth-child(2)').classList.toggle('active');
    
        const isDarkmode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkmode);
    } 

    darkHorse.addEventListener('click', toggleDarkMode);
    const isDarkmodeStored = localStorage.getItem('darkMode');

    if (isDarkmodeStored !== null){
        const isDarkmode = JSON.parse(isDarkmodeStored);
        if(isDarkmode){
            toggleDarkMode();
        }
    }