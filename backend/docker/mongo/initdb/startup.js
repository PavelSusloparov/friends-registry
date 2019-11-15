conn = new Mongo();
db = conn.getDB("admin");
db.auth("admin", "root");

db.createUser(
    {
        user: "sa",
        pwd: "sa",
        roles: ["readWriteAnyDatabase", {role: "readWrite", db: "friends"}]
    }
);
