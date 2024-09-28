#include <iostream>
#include <cstdlib>
#include <cstdio>

using namespace std;

int main() {
	
	system("chcp 1250");
	system("cls");
	
	float ilosc_posiadanych_akcji = 150, kupowane_co_miesiac = 1;
	float cena_akcji_spolki = 60;
	float dywidenda = 0.44, zarobek_z_dywidend = 0, portfel_dywidend = 0;
	float rok = 0, miesiac = 0, kwartal = 0;
	
	float i = 0, j = 0;
	
//	NIE DZIAŁA 
//	float wartosc_portfela = ilosc_posiadanych_akcji * cena_akcji_spolki;
//	float wartosc_dywidendy = cena_akcji_spolki * dywidenda;


	
//	for(i=1; i<=360; i++) {
//		for(j=1; j<=12; j++) {
//			
//		}
//		if (portfel >= cena_akcji) {
//			while(portfel-cena_akcji > 0) {
//				portfel -= cena_akcji;
//				ilosc_akcji++;
//			}
//		}
//		
//		wartosc_akcji = ilosc_akcji * cena_akcji;
//		cout << "Ilosc akcji: " << ilosc_akcji << endl;
//		cout << "Wartosc akcji: " << wartosc_akcji << "$" << endl;
//		cout << "STAN PORTFELA: " << portfel << "$" << endl;
//		cout << "ZAROBIONE: " << zarobione << "$" << endl;
//		cout << endl;
//	}
	
	for (i = 1; i <= 30; i++) {
		rok += 1;
		for (j = 0; j < 12; j++) {
			kwartal++;
			miesiac += 1;
			ilosc_posiadanych_akcji += 2;
			
			
			cout<<endl;
			cout << "Rok: " << rok << ", Miesiąc: " << miesiac << endl;
			cout << "Nazwa spółki: Coca Cola, " << "Cena akcji spółki: " <<  cena_akcji_spolki << "$." << endl;
			cout << "Posiadasz " << ilosc_posiadanych_akcji << " akcji." << endl;
			cout << "Wartość portfela: " << ilosc_posiadanych_akcji * cena_akcji_spolki << "$" << endl;
			cout<<endl;
			if (kwartal == 3) {
				cout << "Mamy kwartał" << endl;
				cout << "Twoja dywidenda wynosi: " << ilosc_posiadanych_akcji * dywidenda << "$" << endl;
				
				zarobek_z_dywidend += ilosc_posiadanych_akcji * dywidenda;
				portfel_dywidend += ilosc_posiadanych_akcji * dywidenda;
				cout << "Wartość zarobionych dywidend: " << zarobek_z_dywidend << "$" << endl;
				do {
					ilosc_posiadanych_akcji += 1;
					portfel_dywidend -= cena_akcji_spolki;
				} while (portfel_dywidend >= cena_akcji_spolki);
				kwartal = 0;
			}
			cout << "Wartość portfela z dywidendą: " << ilosc_posiadanych_akcji * cena_akcji_spolki + zarobek_z_dywidend << "$" << endl;
		}
		miesiac = 0;
//		WZROST CENY AKCJI CO ROKU
//		cena_akcji_spolki -= cena_akcji_spolki * 0.05;

//		WZROST STOPY DYWIDENDY CO ROKU
//		dywidenda += dywidenda * 0.05;
	}
	
//	cout << "Rok: " << rok << ", Miesiąc: " << miesiac << endl;
//	cout << "Nazwa spółki: Coca Cola, " << "Cena akcji spółki: " <<  cena_akcji_spolki << "$." << endl;
//	cout << "Posiadasz " << ilosc_posiadanych_akcji << " akcji." << endl;
//	cout << "Wartość portfela: " << ilosc_posiadanych_akcji * cena_akcji_spolki << "$" << endl;
	
	system("PAUSE");
	return EXIT_SUCCESS;
}
