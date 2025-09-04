let text = document.getElementById('text');
let h1 = document.getElementById('hh');
let inp = document.getElementById('inp');
let btn = document.getElementById('btn');

let request = new XMLHttpRequest();

request.addEventListener('readystatechange', () => {
  if (request.readyState === 1) {
    h1.classList.remove('hidden'); // Yuklanmoqda
  } 
  
  if (request.readyState === 4) {
    h1.classList.add('hidden'); // Yuklanish tugadi

    if (request.status === 200) {
      if (request.responseText && request.responseText.trim() !== "") {
        try {
          let jsn = JSON.parse(request.responseText);

          jsn.forEach((itn) => {
            text.innerHTML += `
              <li class="li">
                <img src=${itn.flags.png} />
                <h2>${itn.name.common}</h2>
              </li>`;
          });

          // 🔎 Qidiruv
          inp.addEventListener('input', () => {
            let items = document.querySelectorAll('.li');
            let val = inp.value.toLowerCase();

            items.forEach((itm) => {
              if (itm.lastElementChild.textContent.toLowerCase().includes(val)) {
                itm.classList.remove('hidden');
              } else {
                itm.classList.add('hidden');
              }
            });
          });

        } catch (err) {
          console.error("❌ JSON parse xato:", err.message);
        }
      } else {
        console.error("⚠️ Server bo‘sh response yubordi");
      }
    } else {
      console.error("⚠️ Server status:", request.status);
    }
  }
});

request.open('GET', 'https://restcountries.com/v3.1/all?fields=name,flags');
request.send();
