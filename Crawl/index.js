const mysql = require("mysql2/promise.js");
const { getInvertKey, getKey, stringToSlug } = require("./utils.js");
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
//   const query = `SELECT book.id, book.name, book.title, book.alias, book.author, book.price, book.language, book.description, book.episode, book.stock, book.createdAt, book.updatedAt, book.deletedAt, book.imageCover, provider.name AS providerName, publisher.name as publisherName, series.name as seriesName, category.name as categoryName, book.Attributes FROM book JOIN provider ON book.providerId = provider.id LEFT  JOIN publisher ON book.publisherId = publisher.id LEFT JOIN series ON book.seriesId = series.id LEFT JOIN category ON book.categoryId = category.id WHERE categoryId = 2`;
//
async function main() {
    const [oldDatabaseConnection, newDatabaseConnection] = await Promise.all([
        oldDatabaseConnectionPromise,
        newDatabaseConnectionPromise,
    ]);
    const query = `SELECT id FROM series`;
    const [rows] = await newDatabaseConnection.query(query);
    for (const row of rows) {
        const getOldestBookQuery = `SELECT * FROM books WHERE seriesId = ? ORDER BY createdAt ASC LIMIT 1`;
        const [oldestBookRows] = await newDatabaseConnection.query(getOldestBookQuery, [row.id]);
        const oldestBook = oldestBookRows[0];
        const updateQuery = `UPDATE series SET createdAt = ?, AuthorId = ?, PublisherId = ? WHERE id = ?`;
        await newDatabaseConnection.query(updateQuery, [
            oldestBook.CreatedAt,
            oldestBook.AuthorId,
            oldestBook.PublisherId,
            row.id,
        ]);
    }
}

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
    name = name.split(",")[0].trim();
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
