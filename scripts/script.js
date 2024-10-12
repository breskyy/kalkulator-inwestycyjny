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
