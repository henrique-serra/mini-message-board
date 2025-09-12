#! /usr/bin/env node
import 'dotenv/config';
import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username, added) VALUES 
    ('Bom dia! Como está o projeto hoje?', 'ana_dev', '2025-09-08 09:15:00'),
    ('Terminei a implementação da API de usuários', 'carlos_backend', '2025-09-08 14:30:00'),
    ('Alguém pode revisar meu pull request?', 'maria_frontend', '2025-09-08 16:45:00'),
    ('O deploy foi feito com sucesso! 🚀', 'pedro_devops', '2025-09-09 10:20:00'),
    ('Encontrei um bug na validação de formulários', 'julia_qa', '2025-09-09 11:30:00'),
    ('Vamos ter daily meeting em 10 minutos', 'rafael_scrum', '2025-09-09 14:50:00'),
    ('Documentação atualizada no Confluence', 'lucas_tech', '2025-09-10 08:45:00'),
    ('Performance da consulta melhorou 40%', 'sofia_dba', '2025-09-10 13:15:00'),
    ('Preciso de ajuda com CSS Grid', 'thiago_junior', '2025-09-10 15:20:00'),
    ('Sprint review marcada para sexta-feira', 'camila_po', '2025-09-11 09:30:00'),
    ('Hotfix aplicado no ambiente de produção', 'bruno_senior', '2025-09-11 17:45:00'),
    ('Testes automatizados passando 100%', 'leticia_qa', '2025-09-12 08:00:00'),
    ('Nova feature de notificações está pronta', 'diego_fullstack', '2025-09-12 12:30:00'),
    ('Reunião com cliente cancelada', 'amanda_pm', '2025-09-12 14:15:00'),
    ('Código refatorado seguindo clean architecture', 'gustavo_arch', '2025-09-12 16:20:00');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
    // "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
