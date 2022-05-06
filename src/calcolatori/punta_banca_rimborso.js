var guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo;

function puntaBancaRimborso(q1, q2, importo_book, tot_abbinato, nuova_quota) {

    guadagno_book = Number(((importo_book * q1) - importo_book).toFixed(2));
    guadagno_exchange = Number((tot_abbinato - ((tot_abbinato * 5) / 100)).toFixed(2));
    Responsabilità = Number(((tot_abbinato * q2) - tot_abbinato).toFixed(2));

    profitto_book = Number((guadagno_book - Responsabilità).toFixed(2));
    profitto_exchange = Number((guadagno_exchange - importo_book).toFixed(2));

    Bancata = tot_abbinato

    while (Math.abs(profitto_book - profitto_exchange) < 0 || Math.abs(profitto_book - profitto_exchange) > 0.03) {
        Responsabilità = Number(((Bancata * nuova_quota) - Bancata).toFixed(2));
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
    else { guadagno_minimo = Number(profitto_exchange.toFixed(2)) };

    console.log("\nNuova responsabilità: " + Responsabilità);
    console.log("Abbinata: " + tot_abbinato);
    console.log("Nuova quota: " + nuova_quota);
    console.log("Banca: " + Bancata);
    console.log("Profitto book: " + profitto_book);
    console.log("Profitto exchange: " + profitto_exchange);
};

export default puntaBancaRimborso;
export {guadagno_book, Bancata, Responsabilità, guadagno_exchange, profitto_book, profitto_exchange, guadagno_minimo};