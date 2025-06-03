function getCardBrand(cardNumber) { // Função para identificar a bandeira do cartão
    if (!cardNumber || !/^\d+$/.test(cardNumber)) return null; // Verifica se o número do cartão é válido e contém apenas dígitos

    const brands = [ // Lista de bandeiras de cartões com seus respectivos BINS e regex
        {
            name: 'Elo',
            bins: [
                '401178', '401179', '401180', '401181', '401182', '401183', '401184', '401185', '401186', '401187', '401188', '401189',
                '401200', '431274', '438935', '451416', '457393', '457631', '457632', '504175', '506699', '506770', '506771', '506772',
                '506773', '506774', '506775', '506776', '506777', '506778', '506779', '509000', '509001', '509002', '509003', '509004',
                '509005', '509006', '509007', '509008', '509009', '509010', '509011', '509012', '509013', '509014', '509015', '509016',
                '509017', '509018', '509019', '509020', '627780', '636297', '636368', '650031', '650032', '650033', '650034', '650035',
                '650036', '650037', '650038', '650039', '650040', '650041', '650042', '650043', '650044', '650045', '650046', '650047',
                '650048', '650049', '650405', '650406', '650407', '650408', '650409', '650485', '650486', '650487', '650488', '650489',
                '650490', '650491', '650492', '650493', '650494', '650495', '650496', '650497', '650498', '650499', '651652', '651653',
                '651654', '651655', '651656', '651657', '651658', '651659', '655000', '655001', '655002', '655003', '655004', '655005',
                '655006', '655007', '655008', '655009'
            ]
        },
        {
            name: 'Hipercard',
            bins: [
                '606282', '384100', '384140', '384160'
            ]
        },
        {
            name: 'Aura',
            bins: [
                '5078', '507860', '507885', '507888'
            ]
        },
        {
            name: 'JCB',
            bins: [
                '3528', '3529', '353', '354', '355', '356', '357', '358'
            ]
        },
        {
            name: 'Diners Club',
            bins: [
                '300', '301', '302', '303', '304', '305', '36', '38', '39'
            ]
        },
        {
            name: 'American Express',
            bins: [
                '34', '37'
            ]
        },
        {
            name: 'Discover',
            bins: [
                '6011', '65', '644', '645', '646', '647', '648', '649'
            ]
        },
        {
            name: 'Enroute',
            bins: [
                '2014', '2149'
            ]
        },
        {
            name: 'Voyager',
            bins: [
                '8699'
            ]
        },
        {
            name: 'MasterCard',
            regex: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/
        },
        {
            name: 'Visa',
            regex: /^4(\d{12}|\d{15}|\d{18})$/
        }
    ];

    for (const brand of brands) { // Itera sobre cada bandeira
        if (brand.bins) {
            for (const bin of brand.bins) {
                if (cardNumber.startsWith(bin)) {
                    return brand.name;
                }
            }
        }
        if (brand.regex && brand.regex.test(cardNumber)) { // Verifica se o número do cartão corresponde à regex da bandeira
            return brand.name;
        }
    }
    return null;
}

function luhnAlgorithm(cardNumber) { // Função para validar o número do cartão usando o algoritmo de Luhn
    if (!/^\d+$/.test(cardNumber)) return false; // Verifica se o número do cartão contém apenas dígitos
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) { // Itera sobre os dígitos do cartão de trás para frente
        let digit = parseInt(cardNumber[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// Exemplos de uso:
const cards = [
    '3550448504530055', // JCB
    '201400000000009',  // Enroute
    '214900000000000',  // Enroute
    '869900000000000',  // Voyager
];

cards.forEach(card => { // Itera sobre cada número de cartão e exibe a bandeira e validade
    const brand = getCardBrand(card);
    const valid = luhnAlgorithm(card);
    console.log(`Número: ${card} | Bandeira: ${brand || 'Desconhecida'} | Válido: ${valid ? 'Sim' : 'Não'}`);
});