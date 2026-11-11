# FC Clean Architecture

Projeto TypeScript com casos de uso de Customer e Product, persistência SQLite e testes com Jest.

## Requisitos

- Node.js e npm

## Instalação

Na raiz do repositório, instale as dependências:

```powershell
npm ci
```

## Testes

Execute a verificação de tipos e toda a suíte de testes:

```powershell
npm.cmd test
```

No Prompt de Comando do Windows ou em um terminal macOS/Linux, use `npm test`.
O comando executa `tsc --noEmit` e, em seguida, todos os testes Jest.

Para executar somente os testes de Product:

```powershell
npx jest src/usecase/product
```

Os testes de integração usam SQLite em memória e não precisam de um banco externo.

## API

Inicie a API na raiz do projeto:

```powershell
npm.cmd run dev
```

O endpoint `GET http://localhost:3000/product` lista os produtos cadastrados em JSON.
Também é possível solicitar XML enviando o cabeçalho `Accept: application/xml`.

Para consultar a resposta JSON, com a API em execução, use outro terminal:

```powershell
curl.exe -H "Accept: application/json" http://localhost:3000/product
```

A resposta contém a lista no campo `products`:

```json
{
	"products": [
		{ "id": "...", "name": "...", "price": 100 }
	]
}
```

Se ainda não houver produtos cadastrados, o retorno será `{ "products": [] }`.

Para executar somente o teste E2E da listagem de produtos:

```powershell
node node_modules/jest/bin/jest.js src/infrastructure/api/__tests__/product.e2e.spec.ts
```
