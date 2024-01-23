const menuMobile = document.querySelector('.menu-mobile');
const body = document.querySelector('body');

menuMobile.addEventListener('click', () => {
    if (menuMobile.classList.contains("bi-list")) {
        menuMobile.classList.replace("bi-list", "bi-x");
    } else {
        menuMobile.classList.replace("bi-x", "bi-list");
    }
    
    body.classList.toggle("menu-nav-active");
});

/*Fecha o menu quando clicar em algum item*/

const navItem = document.querySelectorAll('.nav-item')

navItem.forEach(item =>{
    item.addEventListener("click", () =>{
        if(body.classList.contains("menu-nav-active")){
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list");
        }
    })
})


//Ativar carregamento no botão de enviar formulário

const btnEnviar = document.querySelector('#btn-enviar');
const btnEnviarLoader = document.querySelector('#btn-enviar-loader');

btnEnviar.addEventListener("click", () => {
    console.log("Botão clicado");
    btnEnviarLoader.style.display = "block";
    btnEnviar.style.display = "none";
});


//Tirar a mensagem depois de 5 seg

setTimeout(() =>{
    document.querySelector('#alerta').style.display = 'none';
},5000)