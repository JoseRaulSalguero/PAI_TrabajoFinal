// Declaració de variables globales
let obj = [];
// Fi de la declaració de variables globales

/********************************************************************************/
/* Funció readSingleFile(e)                                                     */
/* Funció que permet que l'usuari recuperi un arxiu del seu disc dur            */
/********************************************************************************/

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function (e) {
    let contents = e.target.result;
    generaObj(contents);
  };
  reader.readAsText(file);
}


/********************************************************************************/
/* Funció generaObj(contents)                                                   */
/* Aquesta funció converteix les dades rebudes, en format csv en un objecte     */
/* que té els següents camps:                                                   */
/* - diaSet --> Dia de la setmana (en text)                                     */
/* - mes --> Mes (númeric)                                                      */
/* - nomMes --> Nom del mes                                                     */
/* - diaMes --> Dia del mes                                                     */
/* - hora --> hora (sense minuts). Valor enter entre 0 i 23                     */
/* - descAcc --> Descripció de l'accident                                       */
/* - districte --> Nom del districte                                            */
/* - nDist --> Número de districte                                              */
/* - barri --> Nom del barri                                                    */
/* L'arxiu original té més dades, però per a aquests exercicis s'han agafat     */
/* només aquestes.                                                              */
/********************************************************************************/

function generaObj(contents) {
  const element = document.getElementById("file-parsed");
  const json = contents.split("\r");
  const fi = json.length;
  let taula = [];
  let t = json[1].split(",");
  document.getElementById("any").innerHTML = "Any: "+t[9].replace(/['"]+/g, '');

  for (let i = 1; i < fi-1; i++) {
    let taula = json[i].split(",");
    obj[i - 1] = {};
    obj[i - 1].diaSet  = taula[8].replace(/['"]+/g, ''); 
    obj[i - 1].mes = parseInt(taula[10]);
    obj[i - 1].nomMes = taula[11].replace(/['"]+/g, '');
    obj[i - 1].diaMes = parseInt(taula[12]);
    obj[i - 1].hora = parseInt(taula[13]);
    obj[i - 1].descAcc = taula[14].replace(/['"]+/g, '');
    obj[i - 1].districte = taula[2].replace(/['"]+/g, '');
    obj[i - 1].nDist = parseInt(taula[1]); 
    obj[i - 1].barri = taula[4].replace(/['"]+/g, '');
  }
  return obj;
}

// Afegim el esdeveniment que crida a la funció que llegeix les dades quan es modifica 
// el contingut del camp d'entrada d'arxius.

document.getElementById("file-input").addEventListener("change", readSingleFile, false);

/********************************************************************************/
/* Funció creaFormulari()                                                       */
/* Crea un formulari que permet seleccionar el districte i l'opció a portar a   */
/* terme. Per a fer això es crea un select per seleccionar el districte i uns   */
/* radio buttons per seleccionar quines dades es volen obtenir                  */
/********************************************************************************/

function creaFormulari() {
  let text = document.getElementById("resultats");
  text.innerHTML = ""; // Esborro qualsevol contingut anterior
  // Recuperem els noms dels districtes de la taula obj
  // Hem de tenir present que hi ha un districte -1 que és "no conegut".
  let f = document.createElement("form"); // Creem el formulari
  f.name="formulari"; // Definim l'atribut name="formulari"

  // Creació del select
  let districtes = [];
  districtes[0] = "Altres";
  for (let i= 1; i < 11; i++) {
    districtes[i] = obj.find(element => element.nDist === i).districte;
  }
  let sel = document.createElement("select");
  sel.name="districtes"; 
  sel.id="districtes";
  for (let i = 0; i < 11; i++) {
    let op = document.createElement("option");
    op.appendChild(document.createTextNode(districtes[i]));
    op.value = districtes[i];
    sel.appendChild(op);
  }
  f.appendChild(sel); // Afegim el select al formulari.

  text.appendChild(f);

}