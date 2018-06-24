

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
	message_text text NOT NULL,
	create_time TIMESTAMPTZ NOT NULL DEFAULT NOW() );

GRANT all on stingray_heartbeat to stingray_user;

CREATE TABLE stingray_tenants (tenant_name text NOT NULL,
	active_flag SMALLINT NOT NULL, 
	create_time TIMESTAMPTZ NOT NULL DEFAULT NOW() );

CREATE UNIQUE INDEX stingray_tenants_index on stingray_tenants (tenant_name, active_flag);

GRANT all on stingray_tenants to stingray_user;

CREATE TABLE stingray_devices (tenant_name text NOT NULL,
	user_id text NOT NULL,
	device_name text NOT NULL,
	active_flag SMALLINT NOT NULL, 
	last_heard_from TIMESTAMPTZ NOT NULL,
	create_time TIMESTAMPTZ NOT NULL DEFAULT NOW() );

CREATE UNIQUE INDEX stingray_devices_index on stingray_devices (tenant_name, user_id, device_name, active_flag);

GRANT all on stingray_devices to stingray_user;
