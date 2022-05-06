var guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo;

var eventi = [
    {
        evento: 'Juventus - Roma',
        data: '18/11/2021 21:00',
        esito: 'Juventus',
        quota_punta: 1.28,
        quota_banca: 1.32,
        rating: 95.75,
        stato: 'A'
    },
    {
        evento: 'Sampdoria - Torino',
        data: '19/11/2021 18:30',
        esito: 'X',
        quota_punta: 2,
        quota_banca: 2.2,
        rating: 88.37,
        stato: 'A'
    },
    {
        evento: 'Barcellona - Real Madrid',
        data: '20/11/2021 18:30',
        esito: 'Real Madrid',
        quota_punta: 1.8,
        quota_banca: 1.83,
        rating: 96.07,
        stato: 'A'
    }
]

//Bancata aggiuntiva serve per avere la stessa perdita per ogni match
var Rating = 1, bancata_aggiuntiva = 0;

function puntaBancaMulti(importo_book) {

    //Calcolo il rating per sapere di quanto è la perdita/il guadagno
    for (var i=0; i<eventi.length; i++) {
        Rating = Rating * (Number(eventi[i]['rating']) / 100);
        if (i === eventi.length-1) Rating = (Rating * 100).toFixed(2);
    }

    //Itero all'interno delle partite
    for (let i = 0; i < eventi.length; i++) {

        //Calcolo il guadagno minimo in funzione del rating
        guadagno_minimo = ((((Rating - 100) * importo_book) / 100) + bancata_aggiuntiva).toFixed(2);
        guadagno_book = Number(((importo_book * eventi[i]['quota_punta']) - importo_book).toFixed(2));

        Bancata = Number(guadagno_book) + 1;

        profitto_book = 0;
        profitto_exchange = guadagno_minimo - 1;

        while (profitto_exchange > guadagno_minimo+0.01 || profitto_exchange < guadagno_minimo-0.01) {
            Responsabilità = Number(((Bancata * eventi[i]['quota_banca']) - Bancata).toFixed(2));
            guadagno_exchange = Number((Bancata - ((Bancata * 5) / 100)).toFixed(2));

            profitto_book = Number((guadagno_book - Responsabilità).toFixed(2));
            profitto_exchange = Number((guadagno_exchange - importo_book ).toFixed(2));

            if (profitto_exchange >= guadagno_minimo+0.1) {
                Bancata = Number((Bancata - 0.02).toFixed(2));
            }
            else if (profitto_exchange < guadagno_minimo-0.1){
                Bancata = Number((Bancata + 0.02).toFixed(2));
            }
            else if (profitto_exchange > guadagno_minimo+0.01) {
                Bancata = Number((Bancata - 0.01).toFixed(2));
            }
            else if (profitto_exchange < guadagno_minimo-0.01){
                Bancata = Number((Bancata + 0.01).toFixed(2));
            }
            /* console.log(
                "Profitto Book: " + profitto_book + "€\nProfitto Exchange: " + profitto_exchange + "€" + 
                "Banca: " + Bancata + "€ con Responsabilità: " + Responsabilità + "€"
                ) */
        };

        bancata_aggiuntiva += Responsabilità;

        console.log("\n" + i + ") Banca: " + Bancata + "€ a quota: @" + eventi[i]['quota_banca'] + " su Betfair\nCon responsabilità di: " + Responsabilità)
    }
};

export default puntaBancaMulti;
export {guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo};