let text = document.getElementById('text')
let h1 =document.getElementById('hh')
let inp =document.getElementById('inp')
let  btn =document.getElementById('btn')

let request =new XMLHttpRequest();
request.addEventListener('readystatechange', ()=>{
    let jsn =JSON.parse(request.responseText)
if(request.readyState == 1){
    h1.classList.remove('hidden')
}
else if(request.readyState == 4){
    h1.classList.add('hidden')
        jsn.forEach((itn)=>{
            text.innerHTML += `<li class="li">
            <img src=${itn.flags.png} />
            <h2>${itn.name.common}</h2>
            </li>`
        })
    }
     inp.addEventListener('input',() => {
        let text = document.querySelectorAll('.li')
        let val = inp.value.toLowerCase()
        text.forEach((itm)=>{
            if(itm.lastElementChild.textContent.toLowerCase().includes(val)){
                itm.classList.remove('hidden')
            }else{
                itm.classList.add('hidden')
            }
        })
    })
    })
request.open('GET','https://restcountries.com/v3.1/all?fields=name,flags')
request.send()
