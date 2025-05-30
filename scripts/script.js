function generateTable() {
    const kwotaStart = parseFloat(document.getElementById('kwota_start').value);
    const systematycznaKwota = parseFloat(document.getElementById('kwota').value);
    const czestotliwoscWplat = document.getElementById('czestotliwosc_wplat').value;
    const oprocentowanie = parseFloat(document.getElementById('oproc').value) / 100;
    const kapitalizacja = parseInt(document.getElementById('kap_typ').value);
    const okres = parseInt(document.getElementById('okres').value);

    // Dywidendy
    const dywidendaRoczna = parseFloat(document.getElementById('dywidenda').value) / 100;
    const dywCzest = document.getElementById('dyw_czest').value;
    const dywWzrost = parseFloat(document.getElementById('dyw_wzrost').value) / 100;
    const reinwestujDywidende = document.getElementById('reinwestuj_dywidende').checked;

    // Ustal co ile miesięcy jest kapitalizacja
    let miesiecyKapitalizacji;
    switch (kapitalizacja) {
        case 1: // Dzienna
            miesiecyKapitalizacji = 1; // uproszczenie: traktujemy jak miesięczna
            break;
        case 2: // Miesięczna
            miesiecyKapitalizacji = 1;
            break;
        case 3: // Kwartalna
            miesiecyKapitalizacji = 3;
            break;
        case 4: // Roczna
            miesiecyKapitalizacji = 12;
            break;
        default:
            miesiecyKapitalizacji = 1;
    }

    // Ustal co ile miesięcy jest wpłata
    let miesiecyWplaty;
    switch (czestotliwoscWplat) {
        case 'miesiecznie':
            miesiecyWplaty = 1;
            break;
        case 'kwartalnie':
            miesiecyWplaty = 3;
            break;
        case 'rocznie':
            miesiecyWplaty = 12;
            break;
        default:
            miesiecyWplaty = 1;
    }

    // Ustal co ile miesięcy jest wypłata dywidendy
    let miesiecyDywidendy;
    switch (dywCzest) {
        case 'miesiecznie':
            miesiecyDywidendy = 1;
            break;
        case 'kwartalnie':
            miesiecyDywidendy = 3;
            break;
        case 'rocznie':
            miesiecyDywidendy = 12;
            break;
        default:
            miesiecyDywidendy = 1;
    }

    let resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = '';

    let sumaKwotaPracujaca = kwotaStart;
    let calkowiteOdsetki = 0;
    let sumaWplat = kwotaStart;
    let sumaDywidend = 0;
    let sumaReinwestowanychDywidend = 0;
    let aktualnaStopaDywidendy = dywidendaRoczna;

    for (let m = 1; m <= okres * 12; m++) {
        let okresWyswietlany = `Miesiąc ${m}`;
        let kwotaPrzed = sumaKwotaPracujaca;
        let wplata = 0;
        let odsetki = 0;
        let dywidenda = 0;
        let dywidendaReinwestowana = 0;
        let dywidendaWypłacona = 0;

        // Dodaj wpłatę jeśli to miesiąc wpłaty
        if ((m - 1) % miesiecyWplaty === 0) {
            sumaKwotaPracujaca += systematycznaKwota;
            sumaWplat += systematycznaKwota;
            wplata = systematycznaKwota;
        }

        // Naliczenie odsetek tylko w miesiącach kapitalizacji
        if (m % miesiecyKapitalizacji === 0) {
            let liczbaKapitalizacjiWRoku = 12 / miesiecyKapitalizacji;
            odsetki = sumaKwotaPracujaca * (oprocentowanie / liczbaKapitalizacjiWRoku);
            sumaKwotaPracujaca += odsetki;
            calkowiteOdsetki += odsetki;
        }

        // Naliczenie dywidendy tylko w miesiącach wypłaty dywidendy
        if (m % miesiecyDywidendy === 0) {
            let liczbaDywidendWRoku = 12 / miesiecyDywidendy;
            dywidenda = kwotaPrzed * (aktualnaStopaDywidendy / liczbaDywidendWRoku);
            sumaDywidend += dywidenda;
            if (reinwestujDywidende) {
                sumaKwotaPracujaca += dywidenda;
                sumaReinwestowanychDywidend += dywidenda;
                dywidendaReinwestowana = dywidenda;
            } else {
                dywidendaWypłacona = dywidenda;
            }
        }

        // Wzrost dywidendy co rok
        if (m % 12 === 0 && dywWzrost > 0) {
            aktualnaStopaDywidendy *= (1 + dywWzrost);
        }

        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${okresWyswietlany}</td>
            <td>${wplata ? wplata.toFixed(2) + ' zł' : '0 zł'}</td>
            <td>${kwotaPrzed.toFixed(2)} zł</td>
            <td>${(oprocentowanie * 100).toFixed(2)}%</td>
            <td>${odsetki ? odsetki.toFixed(2) + ' zł' : '0 zł'}</td>
            <td>${sumaKwotaPracujaca.toFixed(2)} zł</td>
            <td>${dywidenda ? dywidenda.toFixed(2) + ' zł' : '0 zł'}</td>
            <td>${dywidendaReinwestowana ? dywidendaReinwestowana.toFixed(2) + ' zł' : '0 zł'}</td>
            <td>${dywidendaWypłacona ? dywidendaWypłacona.toFixed(2) + ' zł' : '0 zł'}</td>
        `;
        resultBody.appendChild(row);
    }

    let roi = ((sumaKwotaPracujaca - sumaWplat) / sumaWplat) * 100;
    let cagr = (Math.pow(sumaKwotaPracujaca / sumaWplat, 1 / okres) - 1) * 100;
    let yieldOnCost = (sumaDywidend / sumaWplat) * 100;
    let cagrDywidendy = (Math.pow((sumaReinwestowanychDywidend + sumaKwotaPracujaca) / sumaWplat, 1 / okres) - 1) * 100;

    document.getElementById('sumWpłaty').innerText = `${sumaWplat.toFixed(2)} zł`;
    document.getElementById('sumOdsetki').innerText = `${calkowiteOdsetki.toFixed(2)} zł`;
    document.getElementById('sumKwotaPracująca').innerText = `${sumaKwotaPracujaca.toFixed(2)} zł`;

    document.getElementById('summary').innerHTML = `
        Po <span class="highlight-period">${okres} latach</span>, przy oprocentowaniu 
        <span class="highlight-percent">${(oprocentowanie * 100).toFixed(2)}%</span> 
        i kapitalizacji <span class="highlight-period">${12 / miesiecyKapitalizacji} razy w roku</span>,<br>
        wpłacone będziesz mieć: <span class="highlight-amount">${sumaWplat.toFixed(2)} zł</span>,<br>
        uzbierasz: <span class="highlight-amount">${sumaKwotaPracujaca.toFixed(2)} zł</span>,<br>
        z czego odsetki wyniosą <span class="highlight-amount">${calkowiteOdsetki.toFixed(2)} zł</span>.<br>
        Łączna suma wypłaconych dywidend: <span class="highlight-amount">${(sumaDywidend - sumaReinwestowanychDywidend).toFixed(2)} zł</span>.<br>
        Łączna suma reinwestowanych dywidend: <span class="highlight-amount">${sumaReinwestowanychDywidend.toFixed(2)} zł</span>.<br>
        Yield on Cost (dywidendy / wpłaty): <span class="highlight-return">${yieldOnCost.toFixed(2)}%</span>.<br>
        Łączny procent zwrotu z inwestycji (ROI): <span class="highlight-return">${roi.toFixed(2)}%</span>.<br>
        Średnioroczny procent składany (CAGR): <span class="highlight-return">${cagr.toFixed(2)}%</span>.<br>
        CAGR z reinwestowanych dywidend: <span class="highlight-return">${cagrDywidendy.toFixed(2)}%</span>.
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

// Stock dividend calculation

let ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
let cena_akcji_spolki = 60;
let nazwa_spolki = "Example Company";
let dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
let rok = 0, miesiac = 0, kwartal = 0;

for (let i = 1; i <= 30; i++) {
    rok += 1;
    for (let j = 1; j <= 12; j++) {
        kwartal++;
        miesiac++;
        ilosc_posiadanych_akcji += kupowane_co_miesiac;

        zarobek_z_dywidend += ilosc_posiadanych_akcji * dywidenda;
        portfel_dywidend += dywidenda;

        console.log(`Rok: ${rok}, Miesiąc: ${miesiac}`);
        console.log(`Nazwa spółki: ${nazwa_spolki}`);
        console.log(`Zarobek z dywidend: ${zarobek_z_dywidend.toFixed(2)} zł`);
        console.log(`Portfel dywidend: ${portfel_dywidend.toFixed(2)} zł`);
    }
}

// balance = 

// const capitalization = 'monthly';
// switch (capitalization) {
//   case 'monthly':
//     balance += regIncome * divYield;
//     break;
//   case 'quartarly':
//     for(i=0; i<3; i++) {
//         balance += regIncome * divYield;
//     }
//   case 'annualy':
//     for(i=0; i<12; i++) {
//         balance += regIncome * divYield;
//     }
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // Expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default:
//     console.log(`Fault with choosing: ${capitalization}.`);
// }