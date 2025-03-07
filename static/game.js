//no URL iegūst vārdu
let adrese = window.location.hash.substring(1);
adrese = decodeURI(adrese.split(',')[0]);


//mainīgie spēles darbībai
let laiks = 0
let klikski = 0
//masīvi spēles darbībai
const laukumi = ['L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12']
const laukumiSaturs = ['👽','🤖','😇','👽','🤕','🤠','🤕','🥶','🤠','🤖','🥶','😇']
let atvertieLaukumi = []
let pedejieDivi = []

// sajauc smailikus randoma( Fisher-)
let laukumiSajaukti =  laukumiSaturs.sort(() => Math.random() - 0.5);

//genere speles laukumu dinamiski
document.addEventListener("DOMContentLoaded", function() {
    let spelesLauks = document.querySelector('.speles_lauk');
    spelesLauks.innerHTML = '';
    laukumiSajaukti.forEach((emoji,index => {
        let bloks = document.createElement("div");
        bloks.classList.add("bloks");
        bloks.setAttribute("data-index", index);
        bloks.innerText = "";
        bloks.addEventListener("click", function(){
            veiktGajienu(bloks, emoji);
        });
        spelesLauks.appendChild(bloks);
    }));
});
function veiktGajienu(bloks, emoji){
    if(bloks.classList.contains("atverts") || pedejieDivi.length === 2) {
        return //nelauj klikskinat uz jau atvertiem un ja 2 ir atvertas
    }
    // parada emiji tikai uz kilkski
    bloks.innerText = emoji;
    bloks.classList.add("atverts");
    klikski++;
    // saglaba 2 pedejas kartites
    pedejieDivi.push({bloks, emoji});

    //ja atvertas 2 kartites parbauda vai sakrit
    if (pedejieDivi.length === 2) {
        let [pirmais, otrais] = pedejieDivi;
        if (pirmais.emoji === otrais.emoji) {
            atvertieLaukumi.push(pirmais, otrais);
            pedejieDivi =[];

            //parbauda vai spele pabeigta (vai visi laukumi atverti)
            if(atvertieLaukumi.length === laukumiSajaukti.length) {
                setTimeout(() => {
                    alert(`Apsveicu, ${vards}! Tu pabeidz spēli ar ${klikski} klikšķiem!`);
                }, 500);
            }

        } else {
            //ja atvertie 2 laukumi nav vienadi
            setTimeout(() => {
                pirmais.bloks.innerText = "";
            })
        }

    }

}
