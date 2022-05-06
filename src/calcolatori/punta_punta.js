var guadagno_book_A, contro_puntata, guadagno_book_B, profitto_book_A, profitto_book_B, guadagno_minimo;

function puntaPunta(q1, q2, importo_book_A) {
    guadagno_book_A = Number(((importo_book_A * q1) - importo_book_A).toFixed(2));
    contro_puntata = Math.floor(Number(guadagno_book_A) + 1)

    profitto_book_A = 5;
    profitto_book_B = 0;

    while (Math.abs(profitto_book_A - profitto_book_B) >= 2) {
        console.log('Puntata A: ' + importo_book_A);
        console.log('Contro puntata: ' + contro_puntata);
        console.log('Profitto book A: ' + profitto_book_A);
        console.log('Profitto book B: ' + profitto_book_B);

        guadagno_book_B = Number(((contro_puntata * q2) - contro_puntata).toFixed(2));

        profitto_book_A = Number((guadagno_book_A - contro_puntata).toFixed(2));
        profitto_book_B = Number((guadagno_book_B - importo_book_A).toFixed(2));

        if (Math.abs(profitto_book_A - profitto_book_B) < 2) {break}

        if (profitto_book_A >= profitto_book_B) {
            contro_puntata = Math.floor(Number((contro_puntata + 1)));
        }
        else {
            contro_puntata = Math.floor(Number((contro_puntata - 1)));
        };
        console.log('');
    };

    if (profitto_book_A <= profitto_book_B) { guadagno_minimo = Number((profitto_book_A).toFixed(2)) }
    else { guadagno_minimo = Number((profitto_book_B).toFixed(2)) };

};

export default puntaPunta;
export {guadagno_book_A, contro_puntata, guadagno_book_B, profitto_book_A, profitto_book_B, guadagno_minimo};