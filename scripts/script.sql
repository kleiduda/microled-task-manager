-- Database: DB_TASK_MANAGER

-- DROP DATABASE IF EXISTS "DB_TASK_MANAGER";

CREATE DATABASE "DB_TASK_MANAGER"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.projects

-- DROP TABLE IF EXISTS public.projects;

CREATE TABLE IF NOT EXISTS public.projects
(
    id integer NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    os character varying(50) COLLATE pg_catalog."default" NOT NULL,
    cliente character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT projects_pkey PRIMARY KEY (id),
    CONSTRAINT projects_nome_key UNIQUE (nome)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.projects
    OWNER to postgres;

-- Table: public.tasks

-- DROP TABLE IF EXISTS public.tasks;

CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    dia date NOT NULL,
    periodo character varying(100) COLLATE pg_catalog."default",
    horas numeric(10,2),
    descricao text COLLATE pg_catalog."default",
    custeio character varying(10) COLLATE pg_catalog."default",
    status character varying(50) COLLATE pg_catalog."default",
    os character varying(50) COLLATE pg_catalog."default",
    projeto character varying(255) COLLATE pg_catalog."default",
    cliente character varying(50) COLLATE pg_catalog."default",
    despesas_autorizadas character varying(255) COLLATE pg_catalog."default",
    alimentacao character varying(255) COLLATE pg_catalog."default",
    viagem character varying(255) COLLATE pg_catalog."default",
    in_loco character(1) COLLATE pg_catalog."default",
    tipo_atendimento text COLLATE pg_catalog."default",
    executavel_alterado character varying(255) COLLATE pg_catalog."default",
    versao character varying(50) COLLATE pg_catalog."default",
    solicitante character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tasks
    OWNER to postgres;