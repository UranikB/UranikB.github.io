function popup() {
    let popup = document.getElementById("help-" + step);
    popup.classList.toggle("show");
    // if(step === 1){
    //     popup = document.getElementById("help-0");
    //     setTimeout(function(){popup.classList.toggle("show");},4000);
    // }
    setTimeout(function(){popup.classList.remove("show");},10000);
}