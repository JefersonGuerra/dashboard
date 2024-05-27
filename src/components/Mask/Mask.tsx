const formatPhone = (value: any) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return (value);
};

function formatDate(val: any) {
    let pass = val;
    let expr = /[0123456789]/;
    let tst1;
    let tst2;

    let i;

    for (i = 0; i < pass.length; i++) {
        // charAt -> retorna o caractere posicionado no índice especificado
        var lchar = val.charAt(i);
        var nchar = val.charAt(i + 1);

        if (i === 0) {
            // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
            // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
            // instStr.search(expReg);
            if ((lchar.search(expr) !== 0) || (lchar > 3)) {
                val = "";
            }

        } else if (i === 1) {

            if (lchar.search(expr) !== 0) {
                // substring(indice1,indice2)
                // indice1, indice2 -> será usado para delimitar a string
                tst1 = val.substring(0, (i));
                val = tst1;
                continue;
            }

            if ((nchar !== '/') && (nchar !== '')) {
                tst1 = val.substring(0, (i) + 1);

                if (tst1 <= 31) {
                    if (nchar.search(expr) !== 0)
                        tst2 = val.substring(i + 2, pass.length);
                    else
                        tst2 = val.substring(i + 1, pass.length);


                    val = tst1 + '/' + tst2;
                } else {
                    val = "";
                }
            }

        } else if (i === 4) {

            if (lchar.search(expr) !== 0) {
                tst1 = val.substring(0, (i));
                val = tst1;
                continue;
            }

            if ((nchar !== '/') && (nchar !== '')) {
                tst1 = val.substring(0, (i) + 1);

                const dateValid = tst1.split('/');

                if (dateValid[1] <= 12) {

                    if (nchar.search(expr) !== 0)
                        tst2 = val.substring(i + 2, pass.length);
                    else
                        tst2 = val.substring(i + 1, pass.length);

                    val = tst1 + '/' + tst2;
                } else {
                    val = dateValid[0];
                }
            }
        }

        if (i >= 6) {
            if (lchar.search(expr) !== 0) {
                tst1 = val.substring(0, (i));
                val = tst1;
            }
        }
    }

    if (pass.length > 10)
        val = val.substring(0, 10);
    return val;
}

function formatCpf(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}


export { formatPhone, formatDate, formatCpf };