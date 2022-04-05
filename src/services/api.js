async function currenciesApi() {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();

    return response;
  } catch (error) {
    return error;
  }
}

export default currenciesApi;
