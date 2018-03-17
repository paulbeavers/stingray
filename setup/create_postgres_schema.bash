#!/bin/bash

echo creating schema

psql -U postgres -f stingray_schema.sql

