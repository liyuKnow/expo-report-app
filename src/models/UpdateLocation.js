import * as  SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class UpdateLocation extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase('report.db')
    }

    static get tableName() {
        return 'updatedLocation'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            user_id: { type: types.INTEGER, not_null: true },
            lat: { type: types.INTEGER, not_null: true },
            long: { type: types.INTEGER, not_null: true },
            timestamp: { type: types.TEXT, default: () => Date.now() }
        }
    }

    // MANUALLY CREATE RELATED TABLES
    static createUpdateLocation() {
        const albumTableSql = `CREATE TABLE updateLocation(
            Id     INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id   INTEGER NOT NULL,
            lat        INTEGER NOT NULL,
            long        INTEGER NOT NULL,
            updated_at TEXT DEFAULT current_timestamp NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
          )`;
        return this.repository.databaseLayer.executeSql(albumsSql).then(({ rows }) => console.log(rows))
    }
}