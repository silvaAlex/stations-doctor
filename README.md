# ![logo](.github/logo.jpg) <br/> Teste Técnico Stations (Nodejs Developer - Pleno)

## Descrisção do projeto

Trata-se de uma aplicação que permite o agendamento de Consultas Médicas

![author](https://img.shields.io/badge/autor-Alex%20Junior-brightgreen)
![languages](https://img.shields.io/github/languages/count/silvaAlex/stations-doctor)
![last-commit](https://img.shields.io/github/last-commit/silvaAlex/stations-doctor)

## Detalhes do Desafio

- [ ] Cada consulta tem uma duração média de 20 a 60 minutos, dependendo da especialidade.
- [ ] Consultas só podem ser agendadas durante o horário de trabalho do médico.
- [ ] Um médico não pode ter duas consultas marcadas para o mesmo horário.
- [ ] Não é permitido cadastrar consultas em feriados.

## Funcionalidades a serem entregues

### Rota de Listagem de Médicos Disponíveis

- [x] Deve exibir os médicos disponíveis para consulta.
- [x] Pode incluir informações como nome, CRM (Cadastro de Registro Médico) e especialidade.
 
### Rota de Cadastro de Consulta

- [x] Permite agendar uma consulta.
- [x] Deve validar se o horário está dentro do expediente do médico e se não há conflito com outras consultas.

### Rota de Listagem de Consultas por Médico

- [ ] Exibe as consultas agendadas para um médico específico.
- [ ] Pode incluir informações sobre o paciente, data e horário da consulta.

### Rota de Listagem de Consultas por Paciente

- [ ] Mostra as consultas agendadas para um paciente específico.
- [ ] Pode incluir informações sobre o médico, data e horário da consulta.

## Entidades

### Paciente

- [x] Atributos nome, CPF, data de nascimento.

### Médico

- [x] Atributos nome, CRM, especialidade.

### Consulta

- [x] Atributos paciente, médico, data e horário da consulta
