import * as  SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class User extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase('report.db')
    }

    static get tableName() {
        return 'users'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            first_name: { type: types.TEXT, not_null: true },
            last_name: { type: types.TEXT, not_null: true },
            gender: { type: types.TEXT, not_null: true },
            country: { type: types.TEXT, not_null: true },
            completed: { type: types.BOOLEAN, default: false },
            age: { type: types.NUMERIC },
            date: { type: types.INTEGER, default: () => Date.now() }
        }
    }
}