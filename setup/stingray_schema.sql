

CREATE DATABASE stingraydb;

\c stingraydb

CREATE TABLE stingray_users (
	    tenant_name text NOT NULL,
	    user_id text NOT NULL,
	    password text NOT NULL,
	    user_type text NOT NULL
);

CREATE UNIQUE INDEX stingray_users_index ON stingray_users (user_id, tenant_name);

CREATE user stingray_user with password 'stingraypw';

GRANT all on stingray_users to stingray_user;

INSERT into stingray_users (tenant_name, user_id, password, user_type) 
	VALUES ('MASTER', 'STINGRAY', 'stingraypw', 'SUPERADMIN');

CREATE TABLE stingray_heartbeat (tenant_name text NOT NULL,
	user_id text NOT NULL,
	device_name text NOT NULL,
	create_time TIMESTAMPTZ NOT NULL DEFAULT NOW() );

GRANT all on stingray_heartbeat to stingray_user;



