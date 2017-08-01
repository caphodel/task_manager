PGDMP     -    $                 u            redmine    9.6.3    9.6.3     N           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            O           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            P           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3            �            1259    16416    projects    TABLE     3  CREATE TABLE projects (
    id integer NOT NULL,
    name character varying(30),
    description text,
    homepage character varying(255),
    is_public smallint NOT NULL,
    parent_id integer,
    created_on date,
    updated_on date,
    identifier character varying(20),
    status integer NOT NULL
);
    DROP TABLE public.projects;
       public         postgres    false    3            Q           0    0    TABLE projects    COMMENT     3   COMMENT ON TABLE projects IS 'table for prroject';
            public       postgres    false    186            �            1259    16414    projects_id_seq    SEQUENCE     q   CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.projects_id_seq;
       public       postgres    false    186    3            R           0    0    projects_id_seq    SEQUENCE OWNED BY     5   ALTER SEQUENCE projects_id_seq OWNED BY projects.id;
            public       postgres    false    185            �           2604    16419    projects id    DEFAULT     \   ALTER TABLE ONLY projects ALTER COLUMN id SET DEFAULT nextval('projects_id_seq'::regclass);
 :   ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    185    186    186            K          0    16416    projects 
   TABLE DATA               ~   COPY projects (id, name, description, homepage, is_public, parent_id, created_on, updated_on, identifier, status) FROM stdin;
    public       postgres    false    186   l       S           0    0    projects_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('projects_id_seq', 1, false);
            public       postgres    false    185            �           2606    16424    projects projects_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public         postgres    false    186    186            K      x������ � �     