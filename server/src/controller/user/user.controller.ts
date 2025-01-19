import { Controller, Get } from '@nestjs/common';
import { Client } from 'pg';
import { readFileSync } from 'fs';

const TABLE_NAME = "users"

@Controller('user')
export class UserController {
    client: Client
    constructor(){
        this.client = new Client({port:5433, host:"0.0.0.0",database:'mydb'})
        var sql = readFileSync('createtable.sql').toString();
        this.client.query(sql)
    }

    @Get()
    async findAll(): Promise<Array<User>>  {
        await this.client.connect()
        const query = {
            name: 'fetch-user',
            text: `SELECT * FROM ${TABLE_NAME}`,
          }
           
          const res = await this.client.query(query)
          console.log(res.rows)
        return []
    }
}
