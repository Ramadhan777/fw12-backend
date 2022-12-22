CREATE DATABASE tikku;

CREATE TABLE "users" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "firstName"     VARCHAR(255),
    "lastName"      VARCHAR(255),
    "phoneNumber"   VARCHAR(255),
    "email"         VARCHAR(255),
    "password"      VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "resetPassword" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"         VARCHAR(255),
    "userId"        INT,
    "code"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);


CREATE TABLE "movies" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title"         VARCHAR(255),
    "picture"       VARCHAR(255),
    "releaseDate"   TIMESTAMPTZ,
    "director"      VARCHAR(255),
    "duration"      TIME,
    "synopsis"      TEXT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "genre" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "movieGenre" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "genreId"       INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "casts" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "movieCasts" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "castId"        INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "cinemas" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255),
    "address"       VARCHAR(255),
    "city"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "movieSchedules" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "cinemaId"      INT,
    "price"         BIGINT,
    "startDate"     DATE,
    "endDate"       DATE,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "movieSchedulesTimes" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time"          TIME,
    "movieScheduleId"   INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "status" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "transactions" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "bookingDate"   TIMESTAMPTZ,
    "userId"        INT,
    "movieId"       INT,
    "cinemaId"      INT,
    "movieScheduleID"   INT,
    "fullName"      VARCHAR(255),
    "email"         VARCHAR(255),
    "phoneNumber"   VARCHAR(255),
    "statusId"      INT,
    "paymentMethodId"     INT
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "reservedSeat" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "seatNum"       VARCHAR(255),
    "transactionId" INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "paymentMethod" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
)  ;

CREATE TABLE "subscribers" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"         VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

---INSERT DATA---

INSERT INTO "users" ("picture","firstName","lastName","phoneNumber","email","password") VALUES ('', 'John', 'Doe', '00112233', 'john@gmail.com', 'john123');

INSERT INTO "resetPassword" ("email", "userId", "code") VALUES ('john@gmail.com','2', 'secret');

INSERT INTO "movies" ("title","picture","releaseDate","director","duration","synopsis") VALUES ('John Wick', 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg', '24 October 2014', 'Chad Stahelski', '01:41:00', 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog, the last gift he got from his deceased wife.'),
('Harry Potter and the Deathly Hallows: Part 2', 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg', '24 October 2014', 'David Yates', '02:10:00', 'Harry, Ron and Hermione race against time to destroy the remaining Horcruxes. Meanwhile, students and teachers unite to defend Hogwarts against Lord Voldemort and his minions. Others are also searching'),
('Spider-Man: Homecoming', 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg', '2017-07-07 00:00:00-07', 'Jon Watts', '02:13:00', 'Peter Parker tries to balance his two very contradictory lives - stopping Adrian Toomes\'s sale of Chitauri weapons and living his days like a high school student.'),
('The Avengers', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', '2022-11-04T07:00:00.000Z', 'Joss Whedon', '02:23:00', 'When an unexpected foe appears, threatening the safety and security of the world, Nick Fury, director of the International Peace Agency, known as S.H.I.E.L.D. , need a team to save the world from disaster. Recruitment efforts begin Iron Man, Captain America, Hulk, Thor, Black Widow and Hawkeye are gathered to defeat the God of Destruction, Loki, in his quest to destroy the earth. With all the combined forces, the task seems easier. However, this is not the case! The super heroes actually fight against each other Hulk against Captain America, who will win? Can Iron Man beat Thor\'s superpowers? How will these superheroes come together to face disaster, protect society and most importantly, survive?'),
('Avatar 2', 'https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_SX300.jpg', '2022-12-14T08:00:00.000Z', 'James Cameron', '03:12:00', '“Avatar: The Way of Water” begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.'),
('Black Panther: Wakanda Forever 2022' , 'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', '2022-12-09T08:00:00.000Z', 'Ryan Coogler', '02:41:00', 'This time, the people of Wakanda will fight to protect their country from interference by world powers after the death of King T\'Challa'),
('Ant-Man', 'https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SX300.jpg', '2022-12-16T07:00:00.000Z', 'Peyton Reed', '01:58:00', 'With a costume suit with the extraordinary ability to shrink to an extreme scale and increase in strength, Scott who was once an expert thief has now turned into a superhero.'),
('Black Widow', 'https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', '2021-07-09T07:00:00.000Z', 'Cate Shortland', '02:13:00', 'In Marvel Studios action-packed film "Black Widow", Natasha Romanoff aka Black Widow must confront the dark side of her life when a dangerous conspiracy is linked to her past. Pursued by something that will stop at nothing until it destroys her life, Natasha must return to the fact that she was a spy and her family ties were shattered before she joined the Avengers.'),
('Thor', 'https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg', '2022-12-11T07:00:00.000Z', 'Kenneth Branagh', '01:54:00', 'When the arrogant Thor upset the truce between the Asgardians and the Frost Giants, Odin the king of Asgard banished him to earth. Now, Thor must prove that he is worthy of his destiny.'),
('Interstellar', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', '2022-12-06T08:00:00.000Z', 'Christopher Nolan', '02:49:00', 'A team of intergalactic explorers must pass through wormholes and get trapped in the space-time dimension in an attempt to ensure the survival of humanity on planet Earth.');

INSERT INTO "genre" ("name") VALUES ('Adventure'), ('Action'), ('Drama'), ('Romance'), ('Sci-Fi'), ('Comedy'), ('Documentary'), ('Animation'), ('Fantasy'), ('Thriller'), ('Crime'), ('Family');

INSERT INTO "movieGenre" ("movieId", "genreId") VALUES (1, 1),(1, 1),(3, 3),(17,17),(18,18),(16,16),(19,19),(3, 3),(12,12),(1, 1),(3, 3),(12,12),(1, 1),(3, 3),(8, 8),(1, 1),(3, 3),(8, 8),(1, 1),(3, 3),(13,13),(1, 1),(3, 3),(12,12),(1, 1),(3, 3),(16,16),(1, 1),(8, 8),(12, 1) ;

INSERT INTO "casts" ("name") VALUES ('Keanu Reeves');

INSERT INTO "movieCasts" ("movieId", "castsId") VALUES (1,1);

INSERT INTO "cinemas" ("picture","name","address","city") VALUES ('', 'ebv.id', 'Whatever street No.12, South Purwokerto', 'Palembang') , ('', 'CineOne21', 'Downcare street No. 21, East Purwokerto', 'Purwokerto'), ('', 'hiflix Cinema', 'Colonel street No. 2, East Purwokerto', 'Purwokerto');

INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate") VALUES (1,1, 40000, '11-11-2022', '11-20-2022'), (2, 3, 35000, '2022-11-28', '2022-12-16'), (6, 3 50000, '2022-11-30', '2022-12-11'), (7,2 ,50000, '2022-12-03', '2022-12-21'), (8,1,40000, '2022-11-22', '2022-12-15'), (10, 1, 45000, '2022-12-01', '2022-12-18'), (5,2,50000, '2022-12-02', '2022-12-23');

INSERT INTO "movieSchedulesTimes" ("time","movieScheduleId") VALUES ('01:40:00', 3);

INSERT INTO "status" ("name") VALUES ('Active'), ('Expired'), ('Used');

INSERT INTO "transactions" ("bookingDate", "movieId", "cinemaId", "movieScheduleID", "fullName", "email", "phoneNumber", "statusId") VALUES ('2022-11-13 11:13:52', 1, 1, 3, 'John Doe', 'john@gmail.com', '00112233', 1);

INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ('A5,A6', 1);

INSERT INTO "paymentMethod" ("picture", "name") VALUES ('', 'gopay');

INSERT INTO "subscribers" ("email") VALUES ('john@gmail.com');

ALTER TABLE "users" ADD CONSTRAINT "email" UNIQUE ("email");
ALTER TABLE "movies" ADD CONSTRAINT "title" UNIQUE ("title");
ALTER TABLE "genre" ADD CONSTRAINT "genreName" UNIQUE ("name");
ALTER TABLE "casts" ADD CONSTRAINT "castsName" UNIQUE ("name");
ALTER TABLE "cinemas" ADD CONSTRAINT "cinemaName" UNIQUE ("name");
ALTER TABLE "users" ADD CONSTRAINT "phoneNumber" UNIQUE ("phoneNumber")

ALTER TABLE "resetPassword" ADD CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES users
(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieGenre" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies
(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieGenre" ADD CONSTRAINT "fk_genreId" FOREIGN KEY ("genreId") REFERENCES genre (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCasts" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies
(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCasts" ADD CONSTRAINT "fk_castId" FOREIGN KEY ("castsId") REFERENCES casts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedules" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedules" ADD CONSTRAINT "fk_cinemaId" FOREIGN KEY ("cinemaId") REFERENCES cinemas (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedulesTimes" ADD CONSTRAINT "fk_movieScheduleId" FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedules" (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_cinemaId" FOREIGN KEY ("cinemaId") REFERENCES cinemas (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_movieScheduleId" FOREIGN KEY ("movieScheduleID") REFERENCES "movieSchedules" (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_statusId" FOREIGN KEY ("statusId") REFERENCES "status" (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES "users" (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_paymentId" FOREIGN KEY ("paymentId") REFERENCES "paymentMethod
" (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "reservedSeat" ADD CONSTRAINT "fk_transactionId" FOREIGN KEY ("transactionId") REFERENCES "transactions" (id) ON DELETE CASCADE ON UPDATE CASCADE;

