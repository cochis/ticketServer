db.usuarios.updateMany({ email: "luffy@luffy.com" }, { $set: { password: "$2a$10$osQQ5XA43FwTOzt3V1WEq.CuXzh84hHK80VIh6L6SzuwgaSqZw19m" } })
db.usuarios.deleteOne({ email: "premirer@premirer.com" })