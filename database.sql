CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "coffee" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80),
	"roast_date" VARCHAR (80),
	"user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "feedback" (
	"id" SERIAL PRIMARY KEY,
	"timing" INTEGER,
	"temp" INTEGER,
	"target" INTEGER,
	"taste" INTEGER,
	"comment" VARCHAR (200),
	"date" DATE NOT NULL default CURRENT_DATE,
	"user_id" INTEGER REFERENCES "user"
);


-- sample data after creating first user
INSERT INTO coffee (name, roast_date, user_id)
VALUES
('Spyhouse, Women Coffee Produceers', '8/1/20', 1),
('Dogwood, Bearhug', '7/30/20',1),
('Dogwood, Neon','7/21/20',1),
('Intelligentsia, Costa Rica Las Nubes','8/1/20',1)
('Intelligentsia, Black Cat', '7/6/20',1),
('Spyhouse, Otilio Leiva', '7/15/20',1);