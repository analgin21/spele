//no URL iegūs vārdu un ievieto virsrakstā, pārējo -> mainīgajos
let adrese = window.location.hash;
adrese = decodeURI(adrese);
adrese = adrese.replace('#','');
adrese = adrese.split(',');
vards = adrese[0];
klikski = adrese[1];
laiks = adrese[2];

let datums = new Date();
let datumsVirkne = datums.getDate()+'.'+datums.getMonth()+'.'+datums.getFullYear()+'.';

async function iegutDatusNoApi(url) {
    let response = await fetch(url);
    if(!response.ok) {
           throw new Error(`HTTP kļūda! Statuss: ${response.status}`);
            }
    return await response.json();
}

async function atlasitTop() {
      try {
        let topJson = await iegutDatusNoApi('/topData');
        console.log('Top dati:', topJson);
        let tabula = document.querySelector('.tops');
        topJson.array.forEach(ieraksts => {
            tabula.innerHTML += `
            <tr>
            <td>${ieraksts.vards}</td>
            <td>${ieraksts.kliksi}</td>
            <td>${ieraksts.laiks}</td>
            <td>${ieraksts.datums}</td>
            </tr>`;
            
        });
} catch (kluda) 
{
    console.error("Kluda iegustot top datus", kluda);

}
}

async function pievienotiesTopam(rezultats) {
    const poga = document.querySelector('#pievienotTopam');
    const Statuss = document.querySelector('#pievienotStatuss');
    try {
        if (poga) poga.disable = true;
        if (statuss) statuss.textContent = 'Saglabā...';
        const payload = {
            vards: rezultats.vards,
            klikski: rezultats.klikski,
            laiks: rezultats.laiks,
            datums: new Date().toDateString().split('T')[0]
        };
        const response = await fetch('/pievienot-rezultatu',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Neizdevas saglabāt! Statuss:${response.status}`);
        }
        if (statuss) statuss.textContent = "Rezultāts ir pievienots TOPam"
        await atlasitTop();
                
        
    } catch (e) {
        console.error(e);
        if (statuss) statuss.textContent = "Kļūda, neizdevas pievienot rezultātu topam!";
        if (poga) poga.disabled = false
    }
    
}


document.addEventListener('DOMContentLoaded', async () => {
    await atlasitTop();
    const rezultats = parseHash();
    const konteiners = document.querySelector('#rezultatsKonteiners');
    const poga = document.querySelector('#pievienotTopam');

    if (rezultats && konteiners) {
        konteiners.style.display = 'block';
        document.querySelector('#razVards'),textContent = rezultats.vards;
        document.querySelector('#rezKlikski').textContent = rezultats.klikski;
        document.querySelector('#rezLaiks').textContent = formatTime(rezultats.laiks);  

        if (poga) {
            poga.addEventListener('click', () => pievienotiesTopam(rezultats));
        }

    } else{
        //ja nav speles rezultata paga netiek radita (konteiners paliek display:none)
    }
});