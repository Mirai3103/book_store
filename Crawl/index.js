const mysql = require("mysql2/promise.js");
const { getInvertKey, getKey } = require("./utils.js");
const bluebird = require("bluebird");
let oldDatabaseConnectionPromise = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testbook",
    port: 3306,
    Promise: bluebird,
});
let newDatabaseConnectionPromise = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookstore",
    port: 3306,
    Promise: bluebird,
});

// old table: book, image
// id;
// name;
// title;
// alias;
// author;
// bookCoverType;
// price;
// language;
// description;
// episode;
// stock;
// discount;
// createdAt;
// updatedAt;
// deletedAt;
// imageCover;
// providerId;
// publisherId;
// seriesId;
// categoryId;
// Attributes;
// new table: book, BookImage, BookAttribute
// 	Id	Title	Name	Slug	AuthorId	ProviderId	PublisherId	ThumbnailUrl	Price	PublishDate	Language	Description	SeriesId	Episode	Stock	CategoryId	CreatedAt	DeletedAt
//
//
async function main() {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    const query = `select * from image`;
    const [rows] = await oldDatabaseConnection.query(query);
    const queryInsert = `INSERT INTO bookimages (BookId, Url) VALUES (?,?)`;
    for await (const row of rows) {
        const bookId = row.BookId;
        const url = row.url;
        const queryIsExist = `SELECT * FROM bookimages WHERE BookId = ? AND Url like ?`;
        const [rowsexisted] = await newDatabaseConnection.query(queryIsExist, [bookId, url]);
        if (rowsexisted.length > 0) {
            continue;
        }
        const [rows] = await newDatabaseConnection.query(queryInsert, [bookId, url]);
    }
}
// 2,172 hours
const insertNewBook = async ({
    Id,
    Title,
    Name,
    Slug,
    AuthorId,
    ProviderName,
    PublisherName,
    ThumbnailUrl,
    Price,
    Attributes,
    Language,
    Description,
    SeriesName,
    Episode,
    Stock,
    CategoryId,
    CreatedAt,
}) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);

    const query = `INSERT INTO books (id, title, name, slug, authorId, providerId, publisherId, thumbnailUrl, price, PublishDate, language, description, seriesId, episode, stock, categoryId, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const publishDate = findPublishDate(Attributes);
    const providerId = await findProviderIdByName(ProviderName);
    const publisherId = await findPublisherIdByName(PublisherName);
    const seriesId = await findSeriesIdByName(SeriesName);
    const [rows] = await newDatabaseConnection.query(query, [
        Id,
        Title,
        Name,
        Slug,
        AuthorId,
        providerId,
        publisherId,
        ThumbnailUrl,
        Price,
        publishDate,
        Language || "Tiếng Việt",
        Description,
        seriesId,
        Episode,
        Stock,
        CategoryId,
        CreatedAt,
    ]);
    await insertBookAttribute(Id, Attributes);
};

const insertBookAttribute = async (bookId, Attributes) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    const query = `INSERT INTO bookattribute (BookId, AttributeName, AttributeValue) VALUES (?,?,?)`;
    Attributes = JSON.parse(Attributes);
    for (const attribute of Attributes) {
        const key = attribute.Key || attribute.key;
        const value = attribute.Value || attribute.value;
        const [rows] = await newDatabaseConnection.query(query, [bookId, key, value]);
    }
};
const findPublishDate = (Attributes) => {
    Attributes = JSON.parse(Attributes);
    const publishDate = Attributes.find((attribute) => {
        const key = attribute.key;
        const Key = attribute.Key;
        let keyName = key || Key;
        keyName = keyName.toLowerCase();
        return keyName === "năm xb" || keyName === "năm xuất bản";
    });
    if (publishDate) {
        return publishDate.value || publishDate.Value;
    }
    return Math.floor(Math.random() * (2023 - 2018 + 1) + 2018) + "";
};
const findAuthorIdByName = async (name) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    if (!name) {
        return 2325;
    }
    name = name.replaceAll(`"`, ``);
    const query = `SELECT id FROM authors WHERE name like "%${name}%"`;
    const [rows] = await newDatabaseConnection.query(query);
    if (rows.length > 0) {
        return rows[0].id;
    }
    return 2325;
};

const findPublisherIdByName = async (name) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    if (!name) {
        return 291;
    }
    name = name.replaceAll(`"`, ``);
    const query = `SELECT id FROM publishers WHERE name like "%${name}"`;
    const [rows] = await newDatabaseConnection.query(query);
    if (rows.length > 0) {
        return rows[0].id;
    }
    return 291;
};

const findProviderIdByName = async (name) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    if (!name) {
        return 136;
    }
    name = name.replaceAll(`"`, ``);
    const query = `SELECT id FROM providers WHERE name like "%${name}"`;
    const [rows] = await newDatabaseConnection.query(query);
    if (rows.length > 0) {
        return rows[0].id;
    }
    return 136;
};

const findSeriesIdByName = async (name) => {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    //Quán Rượu Dị Giới "Nobu" to Quán Rượu Dị Giới \"Nobu\".
    if (!name) {
        return null;
    }
    name = name.replaceAll(`"`, ``);
    const query = `SELECT id FROM series WHERE name like "%${name}%"`;
    const [rows] = await newDatabaseConnection.query(query);
    if (rows.length > 0) {
        return rows[0].id;
    }
    return null;
};

main().then(() => {
    console.log("Done");
    process.exit(0);
});
