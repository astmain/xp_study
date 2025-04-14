const {PrismaClient} = require("@prisma/client")
const rule_prisma = require("./rule_prisma")
const path = require("path");

let table = 'tb_account'
let db = new PrismaClient()
let tb = db[table]
let path_file = path.join(__dirname, "schema.prisma")

let tb_account = class {
    static async find_all() {
        // let list = await tb.findMany({orderBy: {order: 'asc'}})  //asc从小到大  desc从大到小
        let list = await tb.findMany()  //asc从小到大  desc从大到小
        return list
    }

    static async delete_id({id}) {
        const one = await db.tb_account.delete({where: {id: Number(id)}})
        return one
    }


    static async save_one(data) {
        let rule = new rule_prisma().table(table).file(path_file)
        let valid = await rule.check(data)
        if (!valid.success) throw Error(JSON.stringify(valid))
        let one = {}
        one = await tb.upsert({where: {partition: data.partition}, update: valid.data, create: valid.data,})
        return one
    }


    static async save_list(list) {
        let rule = new rule_prisma().table(table).file(path_file)
        for (let i = 0; i < list.length; i++) {
            let data = list[i]
            let valid = await rule.check(data)
            if (!valid.success) throw Error(JSON.stringify(valid))
            await tb.upsert({where: {partition: data.partition}, update: valid.data, create: valid.data,})
        }
        return true
    }
}
module.exports = tb_account

// tb_account.find_list()
// tb_account.save_one()