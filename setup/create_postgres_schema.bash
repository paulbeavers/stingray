#!/bin/bash

echo creating schema

psql -d stingray -U postgres -f stingray_schema.sql

