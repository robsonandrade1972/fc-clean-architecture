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
