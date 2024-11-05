const request = require('supertest');  

describe('Testes da API Star Wars (SWAPI)', () => {

    test('Deve visualizar informações de cadastro, quando buscar por uma pessoa existente', async () => {
        const resposta = await request('https://swapi.dev/api').get('/people/1');
        expect(resposta.status).toBe(200);
        expect(resposta.body.films).toBeDefined();
        expect(resposta.body.vehicles.length).toBeGreaterThan(0);
        expect(resposta.body.name).toBe('Luke Skywalker');
    });

    test('Deve retornar informações de um planeta específico', async () => {
        const resposta = await request('https://swapi.dev/api').get('/planets/1');
        expect(resposta.status).toBe(200);
        expect(resposta.body.name).toBe('Tatooine');
        expect(resposta.body.population).toBeDefined();
        expect(resposta.body.films.length).toBeGreaterThan(0);
    });

    test('Deve retornar informações de uma nave específica', async () => {
        const resposta = await request('https://swapi.dev/api').get('/starships/9');
        expect(resposta.status).toBe(200);
        expect(resposta.body.name).toBe('Death Star');
        expect(resposta.body.crew).toBeDefined();
        expect(Number(resposta.body.length)).toBeGreaterThan(9);

    });

    test('Deve retornar informações de um veículo específico', async () => {
        const resposta = await request('https://swapi.dev/api').get('/vehicles/4');
        expect(resposta.status).toBe(200);
        expect(resposta.body.name).toBe('Sand Crawler');
        expect(resposta.body.model).toBeDefined();
        expect(resposta.body.manufacturer).toContain('Corellia');
    });

    test('Deve retornar informações de uma espécie específica', async () => {
        const resposta = await request('https://swapi.dev/api').get('/species/1');
        expect(resposta.status).toBe(200);
        expect(resposta.body.name).toBe('Human');
        expect(resposta.body.classification).toBeDefined();
        expect(resposta.body.language).toBe('Galactic Basic');
    });

    test('Deve retornar informações de um filme específico', async () => {
        const resposta = await request('https://swapi.dev/api').get('/films/1');
        expect(resposta.status).toBe(200);
        expect(resposta.body.title).toBe('A New Hope');
        expect(resposta.body.director).toBeDefined();
        expect(resposta.body.characters.length).toBeGreaterThan(0);
    });

    test('Deve retornar uma lista de pessoas', async () => {
        const resposta = await request('https://swapi.dev/api').get('/people');
        expect(resposta.status).toBe(200);
        expect(resposta.body.results).toBeDefined();
        expect(resposta.body.results.length).toBeGreaterThan(0);
    });
    
    test('Deve retornar um erro ao acessar uma rota inexistente', async () => {
      const resposta = await request('https://swapi.dev/api').get('/heroes');
      expect(resposta.status).toBe(404);
  });
  

    test('Deve retornar uma quantidade limitada de resultados ao buscar pessoas', async () => {
        const resposta = await request('https://swapi.dev/api').get('/people/?page=1');
        expect(resposta.status).toBe(200);
        expect(resposta.body.results).toBeDefined();
        expect(resposta.body.results.length).toBeLessThanOrEqual(10);
    });
    test('Deve retornar uma lista de espécies', async () => {
        const resposta = await request('https://swapi.dev/api').get('/species');
        expect(resposta.status).toBe(200);
        expect(resposta.body.results).toBeDefined(); // Verifica se o campo `results` existe
        expect(Array.isArray(resposta.body.results)).toBe(true); // Verifica se `results` é um array
        expect(resposta.body.results.length).toBeGreaterThan(0); // Verifica se a lista não está vazia
        expect(resposta.body.results[0].name).toBeDefined(); // Verifica se a primeira espécie tem um nome
    });
});
test('Deve receber uma mensagem de erro, quando buscar por uma pessoa inexistente', async () => {  
  const resposta = await request('https://swapi.dev/api').get('/people/9999');  
  // verifica se o status da requisição está retornando falso com status 404  
  expect(resposta.status).toBe(404);  
  // verifica o valor do corpo vazio não encontrado  
  expect(resposta.body.detail).toBe('Not found');  
  // podemos verificar também o corpo vazio como objeto  
  expect(resposta.body).toMatchObject({  
    detail: 'Not found'  
  });  
});