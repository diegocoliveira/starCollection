import Pool from "../repository/pool.mjs";
import TeamRepository from "../repository/team-repository.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class TeamServices {
    repository = new TeamRepository();

    async list() {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            result = await this.repository.getAll(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async getById(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!id || !uuidValidate(id)) {
                result.error = new Error("id is not valid");
                result.status = 400;
                return result;
            }

            result = await this.repository.get(pool, id);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async create(team) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!team.name || team.name.length < 4) {
                result.error = new Error("name must be at least 4 characters");
                result.status = 400;
                return result;
            }

            result = await this.repository.insert(pool, team);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async update(team) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!team.id || !uuidValidate(team.id)) {
                result.error = new Error("id is not valid");
                result.status = 400;
                return result;
            }

            if (!team.name || team.name.length < 4) {
                result.error = new Error("name must be at least 4 characters");
                result.status = 400;
                return result;
            }
            result = await this.repository.update(pool, team);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async remove(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!id || !uuidValidate(id)) {
                result.error = new Error("id is not valid");
                result.status = 400;
                return result;
            }
            result = await this.repository.delete(pool, id);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
