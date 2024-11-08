export function validaPlacaBrasil(placa) {
    const padroes = [
      /^[A-Z]{3}\d{4}$/,
      /^[a-z]{3}-\d{4}$/,
      /^[a-z]{3}\d{4}$/,
      /^[A-Z]{3}-\d{4}$/,
      /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/,
      /^[a-z]{3}\d{1}[a-z]{1}\d{2}$/,
      /^[A-Z]{3}-\d{1}[A-Z]{1}\d{2}$/,
      /^[a-z]{3}-\d{1}[a-z]{1}\d{2}$/
    ];
  
    return padroes.some(padrao => padrao.test(placa));
  }