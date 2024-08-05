# Recicla365

O Recicla365 é uma aplicação desenvolvida para facilitar o manejo de resíduos sólidos nas cidades. Como ele faz isso? Através da aplicação, qualquer cidadão pode criar uma conta e, a partir daí, explorar pontos de coleta seletiva próximos ao seu local utilizando mapas interativos.

Além disso, os usuários têm a capacidade de cadastrar novos pontos de coleta, contribuindo para a expansão do catálogo do aplicativo. Nosso objetivo final é tornar a separação de resíduos sólidos mais eficiente, ao mesmo tempo que aumentamos o engajamento da população na importância do descarte correto do lixo.

## Instalação

1. `npm install`

2. `cp .env_example .env`

3. `npm run start:dev`

4. `sequelize db:migrate`

5. `sequelize db:seed:all`

## Diagrama de tabelas

![drawSQL-image-export-2024-08-04](https://github.com/user-attachments/assets/82d6168f-6383-420f-80a3-8a4180bbd3fa)

## Melhorias

- aprimorar a segurança, exigindo senhas mais fortes;
- eliminar inconsistências, como permitir que usuário possa editar seu CPF;
- escalar sistema para que cada ponto de coleta trabalhe com uma capacidade máxima, para que assim empresas responsáveis pela coleta desses resíduos saibam quais são os pontos que precisam de coleta.

## Vídeo
