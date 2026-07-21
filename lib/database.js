import fs from "fs"

const file = "./database/database.json"

export function loadDatabase() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({}, null, 2))
  }

  return JSON.parse(fs.readFileSync(file))
}

export function saveDatabase(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}
