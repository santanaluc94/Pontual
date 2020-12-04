console.log('funfou o js');

let buttonOpen = document.getElementById('btn_login_modal'),
    modalLogin = document.getElementById('modal_entrar');

document.onload = function () {
    modalLogin.classList.add('is-hidden');
}

buttonOpen.onclick = function () {
    if (modalLogin.classList.contains('is-visible')) {
        modalLogin.classList.remove('is-visible');
        modalLogin.classList.add('is-hidden');
    } else {
        modalLogin.classList.remove('is-hidden');
        modalLogin.classList.add('is-visible');
    }
};