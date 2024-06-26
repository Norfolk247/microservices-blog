CREATE DATABASE apptest;
\c apptest;

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    author_id VARCHAR(12) NOT NULL,
    create_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    author_id VARCHAR(12) NOT NULL,
    create_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reply_id INT REFERENCES comments(id)
);