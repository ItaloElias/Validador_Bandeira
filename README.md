# Validador de Bandeira de Cartão de Crédito

Identifica a bandeira de cartões de crédito e valida o número usando o algoritmo de Luhn.

## Como Funciona

### 1. Identificação da Bandeira

A função `getCardBrand(cardNumber)` recebe um número de cartão e retorna a bandeira correspondente:

- **BINs (prefixos):** Cada bandeira tem uma lista de BINs (primeiros dígitos) ou regex para identificação.
- **Processo:** O número é comparado com os BINs e expressões regulares.
- **Retorno:** Nome da bandeira ou `null` se não for reconhecida.

### 2. Validação com Algoritmo de Luhn

A função `luhnAlgorithm(cardNumber)` valida o cartão:

- Percorre o número da direita para a esquerda.
- Dobra cada segundo dígito; se > 9, subtrai 9.
- Soma todos os dígitos.
- Se a soma for divisível por 10, o número é válido.

### 3. Exemplo de Uso

```javascript
const cards = [
    '3550448504530055', // JCB
    '201400000000009',  // Enroute
    '214900000000000',  // Enroute
    '869900000000000',  // Voyager
];

cards.forEach(card => {
    const brand = getCardBrand(card);
    const valid = luhnAlgorithm(card);
    console.log(`Número: ${card} | Bandeira: ${brand || 'Desconhecida'} | Válido: ${valid ? 'Sim' : 'Não'}`);
});
```

### 4. Saída Esperada

```
Número: 3550448504530055 | Bandeira: JCB | Válido: Sim  
Número: 201400000000009  | Bandeira: Enroute | Válido: Sim  
Número: 214900000000000  | Bandeira: Enroute | Válido: Sim  
Número: 869900000000000  | Bandeira: Voyager | Válido: Sim  
```

### 5. Observações

- Mantenha os BINs atualizados conforme as bandeiras liberam novos intervalos.
- O projeto pode ser expandido para mais bandeiras ou validações específicas.
