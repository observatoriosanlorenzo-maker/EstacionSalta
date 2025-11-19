-- Schema for Estacion Salta
create extension if not exists "uuid-ossp";

create table if not exists localidades (
  id serial primary key,
  nombre text not null,
  lat double precision not null,
  lon double precision not null,
  departamento text
);

create table if not exists forecasts (
  id bigserial primary key,
  localidad_id int not null references localidades(id) on delete cascade,
  run_time timestamptz not null default now(),
  target_time timestamptz not null,
  temp numeric,
  precip numeric,
  wind_speed numeric,
  wind_gust numeric,
  description text,
  source text not null,
  author text,
  created_at timestamptz not null default now()
);

create table if not exists alert_rules (
  id serial primary key,
  nombre text not null,
  localidad_id int references localidades(id) on delete cascade,
  expression text not null,
  level text not null,
  active boolean not null default true,
  created_by text,
  created_at timestamptz default now()
);

create table if not exists alerts (
  id bigserial primary key,
  localidad_id int references localidades(id) on delete cascade,
  nivel text not null,
  auto_generated boolean not null default true,
  razon text,
  detalle text,
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  overridden_by text,
  created_at timestamptz default now()
);

create table if not exists extremos (
  id bigserial primary key,
  localidad_id int references localidades(id) on delete cascade,
  fecha date not null,
  max_temp numeric,
  min_temp numeric,
  max_wind numeric,
  precip_acum numeric,
  notas text,
  uploaded_by text,
  created_at timestamptz default now()
);

-- Seed localidades (San Lorenzo first)
insert into localidades (nombre, lat, lon, departamento) values
('San Lorenzo', -24.79, -65.4167, 'Capital'),
('El Carril', -25.1076, -65.5141, 'La Caldera'),
('Cafayate', -26.0737, -65.9766, 'Cafayate'),
('Chicoana', -25.1083, -65.5327, 'Chicoana'),
('Cachi', -25.1205, -66.1653, 'Cachi'),
('San Antonio de los Cobres', -24.2180, -66.3186, 'Los Andes'),
('Orán', -23.1323, -64.3235, 'Orán'),
('Tartagal', -22.5164, -63.8017, 'Gral. San Martín'),
('Salvador Mazza', -22.0479, -63.6884, 'Gral. San Martín'),
('Rivadavia', -25.0967, -62.8531, 'Rivadavia'),
('Las Lajitas', -24.3286, -64.3211, 'Anta'),
('Joaquín V. González', -25.1173, -64.1067, 'Anta'),
('Metán', -25.4968, -64.9722, 'Metán'),
('Iruya', -22.7942, -65.2170, 'Iruya'),
('Tolar Grande', -24.2017, -67.3308, 'Los Andes'),
('General Güemes', -24.6707, -65.0461, 'Güemes'),
('La Candelaria', -26.0770, -65.0522, 'La Candelaria'),
('La Caldera', -24.5132, -65.4031, 'La Caldera'),
('Rosario de Lerma', -24.9833, -65.5833, 'Rosario de Lerma'),
('Rosario de la Frontera', -25.8067, -64.9723, 'Rosario de la Frontera');
