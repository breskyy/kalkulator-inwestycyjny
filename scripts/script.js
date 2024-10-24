/*
function generateTable() {
    const kwotaStart = parseFloat(document.getElementById('kwota_start').value);
    const systematycznaKwota = parseFloat(document.getElementById('kwota').value);
    const czestotliwoscWplat = document.getElementById('czestotliwosc_wplat').value;
    const oprocentowanie = parseFloat(document.getElementById('oproc').value) / 100;
    const kapitalizacja = parseInt(document.getElementById('kap_typ').value);
    const okres = parseInt(document.getElementById('okres').value);

    let liczbaKapitalizacji;
    let jednostkaOkresu;

    switch (kapitalizacja) {
        case 1:
            liczbaKapitalizacji = 365; // codziennie
            jednostkaOkresu = "Dzień";
            break;
        case 2:
            liczbaKapitalizacji = 12; // miesięcznie
            jednostkaOkresu = "Miesiąc";
            break;
        case 3:
            liczbaKapitalizacji = 4; // kwartalnie
            jednostkaOkresu = "Kwartał";
            break;
        case 4:
            liczbaKapitalizacji = 1; // rocznie
            jednostkaOkresu = "Rok";
            break;
        default:
            liczbaKapitalizacji = 12; // domyślnie miesięcznie
            jednostkaOkresu = "Miesiąc";
    }

    let liczbaWplat;
    switch (czestotliwoscWplat) {
        case 'miesiecznie':
            liczbaWplat = 12;
            break;
        case 'kwartalnie':
            liczbaWplat = 4;
            break;
        case 'rocznie':
            liczbaWplat = 1;
            break;
        default:
            liczbaWplat = 12; // domyślnie miesięcznie
    }

    let resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = ''; // czyścimy wyniki

    let sumaKwotaPracujaca = kwotaStart;
    let calkowiteOdsetki = 0;
    let sumaWplat = kwotaStart;

    let ostatniaKwotaPracujaca = kwotaStart; // Inicjalizujemy ostatnią kwotę pracującą

    for (let i = 1; i <= okres * liczbaKapitalizacji; i++) {
        let okresWyswietlany;

        // Wyświetlanie odpowiednich okresów
        if (liczbaKapitalizacji >= 12 && liczbaWplat >= 12) {
            okresWyswietlany = `Miesiąc ${i}`;
        } else if (liczbaKapitalizacji >= 4 && liczbaWplat >= 4) {
            okresWyswietlany = `Kwartał ${Math.ceil(i / (12 / liczbaWplat))}`;
        } else {
            okresWyswietlany = `Rok ${Math.ceil(i / liczbaKapitalizacji)}`;
        }

        // Naliczanie odsetek na koniec okresu kapitalizacji
        let odsetki = sumaKwotaPracujaca * (oprocentowanie / liczbaKapitalizacji);
        calkowiteOdsetki += odsetki;
        sumaKwotaPracujaca += odsetki;

        // Dodanie wpłaty systematycznej zgodnie z częstotliwością wpłat
        if (i % (liczbaKapitalizacji / liczbaWplat) === 0) {
            sumaKwotaPracujaca += systematycznaKwota;
            sumaWplat += systematycznaKwota;
        }

        ostatniaKwotaPracujaca = sumaKwotaPracujaca; // Aktualizujemy ostatnią kwotę pracującą

        // Tworzenie wiersza tabeli
        let row = document.createElement('tr');

        let cell1 = document.createElement('td');
        let cell2 = document.createElement('td');
        let cell3 = document.createElement('td');
        let cell4 = document.createElement('td');
        let cell5 = document.createElement('td');
        let cell6 = document.createElement('td');

        cell1.innerText = okresWyswietlany;
        cell2.innerText = i % (liczbaKapitalizacji / liczbaWplat) === 0 ? `${systematycznaKwota.toFixed(2)} zł` : '0 zł';
        cell3.innerText = `${ostatniaKwotaPracujaca.toFixed(2)} zł`;
        cell4.innerText = `${(oprocentowanie * 100).toFixed(2)}%`;
        cell5.innerText = `${odsetki.toFixed(2)} zł`;
        cell6.innerText = `${sumaKwotaPracujaca.toFixed(2)} zł`;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);

        resultBody.appendChild(row);
    }

    let roi = (calkowiteOdsetki / sumaWplat) * 100;

    document.getElementById('sumWpłaty').innerText = `${sumaWplat.toFixed(2)} zł`;
    document.getElementById('sumOdsetki').innerText = `${calkowiteOdsetki.toFixed(2)} zł`;
    document.getElementById('sumKwotaPracująca').innerText = `${ostatniaKwotaPracujaca.toFixed(2)} zł`;

    document.getElementById('summary').innerHTML = `
        Po <span class="highlight-period">${okres} latach</span>, przy oprocentowaniu 
        <span class="highlight-percent">${(oprocentowanie * 100).toFixed(2)}%</span> 
        i kapitalizacji <span class="highlight-period">${liczbaKapitalizacji} razy w roku</span>, 
        wpłacone będziesz mieć: <span class="highlight-amount">${sumaWplat.toFixed(2)} zł</span>, 
        uzbierasz: <span class="highlight-amount">${ostatniaKwotaPracujaca.toFixed(2)} zł</span>, 
        z czego odsetki wyniosą <span class="highlight-amount">${calkowiteOdsetki.toFixed(2)} zł</span>.
        Łączny procent zwrotu z inwestycji wyniesie: <span class="highlight-return">${roi.toFixed(2)}%</span>.
    `;

    document.getElementById('resultsContainer').style.display = 'block';
}

function toggleResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const toggleButton = document.getElementById('toggleButton');
    if (resultsContainer.style.display === 'none' || resultsContainer.style.display === '') {
        resultsContainer.style.display = 'block';
        toggleButton.innerText = 'Ukryj wyniki';
    } else {
        resultsContainer.style.display = 'none';
        toggleButton.innerText = 'Pokaż wyniki';
    }
}
    */

let ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
let cena_akcji_spolki = 60;
let nazwa_spolki;
let dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
let rok = 0, miesiac = 0, kwartal = 0;
	
let i = 0, j = 0;

for(i=1; i<=30; i++) {
    rok+=1;
    for(j=0; j<12; j++) {
        kwartal++;
        miesiąc+=1;
        ilosc_posiadanych_akcji +=2;

        console.log("Rok: "+rok+", Miesiąc: "+miesiac);
        console.log("Nazwa spółki: "+nazwa_spolki)
    }
}

let ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
let cena_akcji_spolki = 60;
let nazwa_spolki;
let dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
let rok = 0, miesiac = 0, kwartal = 0;
	
let i = 0, j = 0;

for(i=1; i<=30; i++) {
    rok+=1;
    for(j=0; j<12; j++) {
        kwartal++;
        miesiąc+=1;
        ilosc_posiadanych_akcji +=2;

        console.log("Rok: "+rok+", Miesiąc: "+miesiac);
        console.log("Nazwa spółki: "+nazwa_spolki)
    }
}
/*
function generateTable() {
    const kwotaStart = parseFloat(document.getElementById('kwota_start').value);
    const systematycznaKwota = parseFloat(document.getElementById('kwota').value);
    const czestotliwoscWplat = document.getElementById('czestotliwosc_wplat').value;
    const oprocentowanie = parseFloat(document.getElementById('oproc').value) / 100;
    const kapitalizacja = parseInt(document.getElementById('kap_typ').value);
    const okres = parseInt(document.getElementById('okres').value);

    let liczbaKapitalizacji;
    let jednostkaOkresu;

    switch (kapitalizacja) {
        case 1:
            liczbaKapitalizacji = 365; // codziennie
            jednostkaOkresu = "Dzień";
            break;
        case 2:
            liczbaKapitalizacji = 12; // miesięcznie
            jednostkaOkresu = "Miesiąc";
            break;
        case 3:
            liczbaKapitalizacji = 4; // kwartalnie
            jednostkaOkresu = "Kwartał";
            break;
        case 4:
            liczbaKapitalizacji = 1; // rocznie
            jednostkaOkresu = "Rok";
            break;
        default:
            liczbaKapitalizacji = 12; // domyślnie miesięcznie
            jednostkaOkresu = "Miesiąc";
    }

    let liczbaWplat;
    switch (czestotliwoscWplat) {
        case 'miesiecznie':
            liczbaWplat = 12;
            break;
        case 'kwartalnie':
            liczbaWplat = 4;
            break;
        case 'rocznie':
            liczbaWplat = 1;
            break;
        default:
            liczbaWplat = 12; // domyślnie miesięcznie
    }

    let resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = ''; // czyścimy wyniki

    let sumaKwotaPracujaca = kwotaStart;
    let calkowiteOdsetki = 0;
    let sumaWplat = kwotaStart;

    let ostatniaKwotaPracujaca = kwotaStart; // Inicjalizujemy ostatnią kwotę pracującą

    for (let i = 1; i <= okres * liczbaKapitalizacji; i++) {
        let okresWyswietlany;

        // Wyświetlanie odpowiednich okresów
        if (liczbaKapitalizacji >= 12 && liczbaWplat >= 12) {
            okresWyswietlany = `Miesiąc ${i}`;
        } else if (liczbaKapitalizacji >= 4 && liczbaWplat >= 4) {
            okresWyswietlany = `Kwartał ${Math.ceil(i / (12 / liczbaWplat))}`;
        } else {
            okresWyswietlany = `Rok ${Math.ceil(i / liczbaKapitalizacji)}`;
        }

        // Naliczanie odsetek na koniec okresu kapitalizacji
        let odsetki = sumaKwotaPracujaca * (oprocentowanie / liczbaKapitalizacji);
        calkowiteOdsetki += odsetki;
        sumaKwotaPracujaca += odsetki;

        // Dodanie wpłaty systematycznej zgodnie z częstotliwością wpłat
        if (i % (liczbaKapitalizacji / liczbaWplat) === 0) {
            sumaKwotaPracujaca += systematycznaKwota;
            sumaWplat += systematycznaKwota;
        }

        ostatniaKwotaPracujaca = sumaKwotaPracujaca; // Aktualizujemy ostatnią kwotę pracującą

        // Tworzenie wiersza tabeli
        let row = document.createElement('tr');

        let cell1 = document.createElement('td');
        let cell2 = document.createElement('td');
        let cell3 = document.createElement('td');
        let cell4 = document.createElement('td');
        let cell5 = document.createElement('td');
        let cell6 = document.createElement('td');

        cell1.innerText = okresWyswietlany;
        cell2.innerText = i % (liczbaKapitalizacji / liczbaWplat) === 0 ? `${systematycznaKwota.toFixed(2)} zł` : '0 zł';
        cell3.innerText = `${ostatniaKwotaPracujaca.toFixed(2)} zł`;
        cell4.innerText = `${(oprocentowanie * 100).toFixed(2)}%`;
        cell5.innerText = `${odsetki.toFixed(2)} zł`;
        cell6.innerText = `${sumaKwotaPracujaca.toFixed(2)} zł`;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);

        resultBody.appendChild(row);
    }

    let roi = (calkowiteOdsetki / sumaWplat) * 100;

    document.getElementById('sumWpłaty').innerText = `${sumaWplat.toFixed(2)} zł`;
    document.getElementById('sumOdsetki').innerText = `${calkowiteOdsetki.toFixed(2)} zł`;
    document.getElementById('sumKwotaPracująca').innerText = `${ostatniaKwotaPracujaca.toFixed(2)} zł`;

    document.getElementById('summary').innerHTML = `
        Po <span class="highlight-period">${okres} latach</span>, przy oprocentowaniu 
        <span class="highlight-percent">${(oprocentowanie * 100).toFixed(2)}%</span> 
        i kapitalizacji <span class="highlight-period">${liczbaKapitalizacji} razy w roku</span>, 
        wpłacone będziesz mieć: <span class="highlight-amount">${sumaWplat.toFixed(2)} zł</span>, 
        uzbierasz: <span class="highlight-amount">${ostatniaKwotaPracujaca.toFixed(2)} zł</span>, 
        z czego odsetki wyniosą <span class="highlight-amount">${calkowiteOdsetki.toFixed(2)} zł</span>.
        Łączny procent zwrotu z inwestycji wyniesie: <span class="highlight-return">${roi.toFixed(2)}%</span>.
    `;

    document.getElementById('resultsContainer').style.display = 'block';
}

function toggleResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const toggleButton = document.getElementById('toggleButton');
    if (resultsContainer.style.display === 'none' || resultsContainer.style.display === '') {
        resultsContainer.style.display = 'block';
        toggleButton.innerText = 'Ukryj wyniki';
    } else {
        resultsContainer.style.display = 'none';
        toggleButton.innerText = 'Pokaż wyniki';
    }
}
    */

// let ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
// let cena_akcji_spolki = 60;
// let nazwa_spolki;
// let dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
// let rok = 0, miesiac = 0, kwartal = 0;
	
// let i = 0, j = 0;

// for(i=1; i<=30; i++) {
//     rok+=1;
//     for(j=0; j<12; j++) {
//         kwartal++;
//         miesiąc+=1;
//         ilosc_posiadanych_akcji +=2;

//         console.log("Rok: "+rok+", Miesiąc: "+miesiac);
//         console.log("Nazwa spółki: "+nazwa_spolki)
//     }
// }

// let ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
// let cena_akcji_spolki = 60;
// let nazwa_spolki;
// let dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
// let rok = 0, miesiac = 0, kwartal = 0;
	
// let i = 0, j = 0;

// for(i=1; i<=30; i++) {
//     rok+=1;
//     for(j=0; j<12; j++) {
//         kwartal++;
//         miesiąc+=1;
//         ilosc_posiadanych_akcji +=2;

//         console.log("Rok: "+rok+", Miesiąc: "+miesiac);
//         console.log("Nazwa spółki: "+nazwa_spolki)
//     }
// }