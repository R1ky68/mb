var guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo;
var bancata_nuova, responsabilità_nuova;

function puntaBanca(q1, q2, importo_book) {
    guadagno_book = Number(((importo_book * q1) - importo_book).toFixed(2));
    Bancata = Number(guadagno_book) + 1

    profitto_book = 1;
    profitto_exchange = 0;

    while (Math.abs(profitto_book - profitto_exchange) < 0 || Math.abs(profitto_book - profitto_exchange) > 0.03) {
        Responsabilità = Number(((Bancata * q2) - Bancata).toFixed(2));
        guadagno_exchange = Number((Bancata - ((Bancata * 5) / 100)).toFixed(2));

        profitto_book = Number((guadagno_book - Responsabilità).toFixed(2));
        profitto_exchange = Number((guadagno_exchange - importo_book).toFixed(2));

        
        if (Math.abs(profitto_book - profitto_exchange) >= 0.5){
            if (profitto_book > profitto_exchange) {
                Bancata = Number((Bancata + 0.1).toFixed(2));
            }
            else {
                Bancata = Number((Bancata - 0.1).toFixed(2));
            };
        }
        else if (Math.abs(profitto_book - profitto_exchange) >= 0.10){
            if (profitto_book > profitto_exchange) {
                Bancata = Number((Bancata + 0.02).toFixed(2));
            }
            else {
                Bancata = Number((Bancata - 0.02).toFixed(2));
            };
        }
        else {
            if (profitto_book > profitto_exchange) {
                Bancata = Number((Bancata + 0.01).toFixed(2));
            }
            else {
                Bancata = Number((Bancata - 0.01).toFixed(2));
            };
        }

    };

    if (profitto_book <= profitto_exchange) { guadagno_minimo = Number((profitto_book).toFixed(2)) }
    else { guadagno_minimo = profitto_exchange.toFixed(2) };
};

function bancataParziale(abbinata, nuova_quota, q_banca, bancata) {
    bancata_nuova = ((bancata - abbinata) * q_banca) / nuova_quota;
    responsabilità_nuova = ((bancata_nuova * nuova_quota) - bancata_nuova).toFixed(2);

    /* var responsabilità_totale = responsabilità_nuova + responsabilità;

    var nuovo_guadagno_exchange = ((bancata_nuova - (bancata_nuova * 0.05)).toFixed(2));

    var nuovo_profitto_book = (g_book - responsabilità_nuova).toFixed(2);
    var nuovo_profitto_exchange = (nuovo_guadagno_exchange - puntata.toFixed(2)); */

}

export default puntaBanca;
export { bancataParziale };
export {guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo};
export { bancata_nuova, responsabilità_nuova };