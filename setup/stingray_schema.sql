

CREATE DATABASE stingraydb;

\c stingraydb

CREATE TABLE stingray_users (
	    tenant_name text NOT NULL,
	    user_id text NOT NULL,
	    password text NOT NULL,
	    user_type text NOT NULL
);

CREATE user stingray_user with password 'stingraypw';

GRANT all on stingray_users to stingray_user;


