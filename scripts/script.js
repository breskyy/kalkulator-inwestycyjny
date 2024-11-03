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
            liczbaKapitalizacji = 365;
            jednostkaOkresu = "Dzień";
            break;
        case 2:
            liczbaKapitalizacji = 12;
            jednostkaOkresu = "Miesiąc";
            break;
        case 3:
            liczbaKapitalizacji = 4;
            jednostkaOkresu = "Kwartał";
            break;
        case 4:
            liczbaKapitalizacji = 1;
            jednostkaOkresu = "Rok";
            break;
        default:
            liczbaKapitalizacji = 12;
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
            liczbaWplat = 12;
    }

    let resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = '';

    let sumaKwotaPracujaca = kwotaStart;
    let calkowiteOdsetki = 0;
    let sumaWplat = kwotaStart;
    let ostatniaKwotaPracujaca = kwotaStart;

    for (let i = 1; i <= okres * liczbaKapitalizacji; i++) {
        let okresWyswietlany;

        if (liczbaKapitalizacji >= 12 && liczbaWplat >= 12) {
            okresWyswietlany = `Miesiąc ${i}`;
        } else if (liczbaKapitalizacji >= 4 && liczbaWplat >= 4) {
            okresWyswietlany = `Kwartał ${Math.ceil(i / (12 / liczbaWplat))}`;
        } else {
            okresWyswietlany = `Rok ${Math.ceil(i / liczbaKapitalizacji)}`;
        }

        let odsetki = sumaKwotaPracujaca * (oprocentowanie / liczbaKapitalizacji);
        calkowiteOdsetki += odsetki;
        sumaKwotaPracujaca += odsetki;

        if (i % (liczbaKapitalizacji / liczbaWplat) === 0) {
            sumaKwotaPracujaca += systematycznaKwota;
            sumaWplat += systematycznaKwota;
        }

        ostatniaKwotaPracujaca = sumaKwotaPracujaca;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${okresWyswietlany}</td>
            <td>${i % (liczbaKapitalizacji / liczbaWplat) === 0 ? `${systematycznaKwota.toFixed(2)} zł` : '0 zł'}</td>
            <td>${ostatniaKwotaPracujaca.toFixed(2)} zł</td>
            <td>${(oprocentowanie * 100).toFixed(2)}%</td>
            <td>${odsetki.toFixed(2)} zł</td>
            <td>${sumaKwotaPracujaca.toFixed(2)} zł</td>
        `;
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