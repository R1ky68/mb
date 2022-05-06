var nero, zero, differenza, guadagno_minimo_roulette, guadagno_minimo_baccarat;
var caso_rosso, caso_nero, caso_zero;

var caso_giocatore, caso_banco, banco;

function roulette(puntata_roulette, fiche_minima_roulette) {
    nero = puntata_roulette;
    zero = 0;

    caso_rosso = puntata_roulette - nero - zero;
    caso_nero = nero - puntata_roulette - zero;
    caso_zero = (zero * 36 - zero) - puntata_roulette - nero;

    differenza = Math.max(caso_rosso, caso_nero, caso_zero) - Math.min(caso_rosso, caso_zero, caso_zero);

    while(true){
        
        zero += fiche_minima_roulette;

        caso_rosso = puntata_roulette - nero - zero;
        caso_nero = nero - puntata_roulette - zero; 
        caso_zero = (zero * 36 - zero) - puntata_roulette - nero;

        var differenza2 = Math.max(caso_rosso, caso_nero, caso_zero) - Math.min(caso_rosso, caso_zero, caso_zero);
        
        if (differenza2 < differenza) differenza = differenza2;

        if (differenza2 > differenza) {
            zero -= fiche_minima_roulette;

            caso_rosso = puntata_roulette - nero - zero;
            caso_nero = nero - puntata_roulette - zero;
            caso_zero = (zero * 36 - zero) - puntata_roulette - nero;

            break
        }
    }

    guadagno_minimo_roulette = Number(Math.min(caso_nero, caso_rosso, caso_zero))
};

function baccarat(puntata_baccarat, fiche_minima_baccarat) {

    banco = 0;

    caso_giocatore = puntata_baccarat - banco;
    caso_banco = (banco * 0.95) - puntata_baccarat;

    differenza = Math.max(caso_giocatore, caso_banco) - Math.min(caso_giocatore, caso_banco);
    
    while(true){
        banco += fiche_minima_baccarat;

        caso_giocatore = puntata_baccarat - banco;
        caso_banco = (banco * 0.95) - puntata_baccarat;

        var differenza2 = Math.max(caso_giocatore, caso_banco) - Math.min(caso_giocatore, caso_banco);
        
        if (differenza2 < differenza) differenza = differenza2;

        if (differenza2 > differenza) {
            banco -= fiche_minima_baccarat;

            caso_giocatore = puntata_baccarat - banco;
            caso_banco = (banco * 0.95) - puntata_baccarat;

            break
        }
    }

    guadagno_minimo_baccarat = Number(Math.min(caso_giocatore, caso_banco))
}

export { roulette, baccarat };
export { caso_rosso, caso_nero, caso_zero, nero, zero, guadagno_minimo_roulette };
export { caso_giocatore, caso_banco, banco, guadagno_minimo_baccarat };