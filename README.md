# Figma Custom Tokens

### Configuração com figma

1. Instale as dependências
    ```bash
    npm install
    ```

1. Crie o `.env`
    ```bash
    echo "FIGMA_TOKEN= \nFIGMA_FILE=" > .env
    ```

1. Crie seu token do figma

1. Pegue o arquivo no diretório `resources`
    1. Abra no figma
    1. Pegue a URL de `Share` dele com o `ID` do arquivo

1. Adicione os 2 ao `.env`
    ```bash
    FIGMA_TOKEN=xxxxx-xxxxxxxxx-xxxxx-xxxx-xxx-xxxxxxxxxxx
    FIGMA_FILE=xxxxxxxxxxxxxxxxxxxxx
    ```

1. Então execute
    ```bash
    npm start
    ```