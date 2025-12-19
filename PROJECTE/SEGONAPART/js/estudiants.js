// Treballarem sempre amb una variable global, obj, què és una taula on estan 
// guardats tots els accidents de l'any. Qualsevol altre variable que necessitem
// haurà de ser, necessàriament, una variable local.

// Com que al document html no hi ha controladors d'esdeveniments, els haurem de crear aquí:



// Teniu ja definides les funcions de cada exercici (menys del cinquè), només cal
// que ompliu el codi necessari.

function exercici01() {
    let total = obj.length;

    let div = document.getElementById("resultats");
    div.innerHTML = "Nombre total d'accidents: <strong>" + total + "</strong>";
}

function exercici02() {
    let comptador = {};

    for (let accident of obj) {
        let dia = accident.diaSet;
        if (comptador[dia]) {
            comptador[dia]++;
        } else {
            comptador[dia] = 1;
        }
    }

    let diaMax = "";
    let max = 0;

    for (let dia in comptador) {
        if (comptador[dia] > max) {
            max = comptador[dia];
            diaMax = dia;
        }
    }

    let div = document.getElementById("resultats");
    div.innerHTML = "Dia amb més accidents: <strong>" + diaMax + "</strong>";
}

function exercici03() {
    let districtes = {};

    for (let accident of obj) {
        let districte = accident.districte;

        if (districtes[districte]) {
            districtes[districte]++;
        } else {
            districtes[districte] = 1;
        }
    }

    let ul = document.createElement("ul");

    for (let d in districtes) {
        let li = document.createElement("li");
        li.textContent = "Districte " + d + ": " + districtes[d] + " accidents";
        ul.appendChild(li);
    }

    let div = document.getElementById("resultats");
    div.innerHTML = "";
    div.appendChild(ul);
}

function exercici04() {
    creaFormulari();

    let select = document.getElementById("districtes");
    if (!select) return;

    select.addEventListener("change", function () {
        let districteSeleccionat = select.value;
        let comptador = 0;

        for (let accident of obj) {
            if (accident.districte == districteSeleccionat) {
                comptador++;
            }
        }

        let p = document.createElement("p");
        p.innerHTML = "Accidents al districte " +
                      districteSeleccionat +
                      ": <strong>" + comptador + "</strong>";
        document.getElementById("resultats").appendChild(p);
    });
}

document.getElementById("exer01").addEventListener("click", exercici01);
document.getElementById("exer02").addEventListener("click", exercici02);
document.getElementById("exer03").addEventListener("click", exercici03);
document.getElementById("exer04").addEventListener("click", exercici04);