async function currenciesApi() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();

  return response;
}

export default currenciesApi;
