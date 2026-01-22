-- Up Migration
create table tokens (
	id serial primary key,
	token uuid default gen_random_uuid() not null unique,
	user_id integer not null references users(id)
)

-- Down Migration
drop table tokens