const quest = require("../models/quest")
const Answer = require("../models/answer");
const Task = require("../models/task");

const createQuest = async ({body: rq}, res) => {
    await quest.create({
        name: rq.name,
        description: rq.description,
        createdAt: rq.createdAt
    }).then((data) => {
        res.json({
            success: true, data: data,
            message: "Создан квест"
        })
    }).catch(e => console.log(e))
}


const getQuests = async (req, res) => {
    try {
        const quests = await quest.findAll({
            include: {
                model: Task,
                as: "tasks",
                include: {
                    model: Answer,
                    as: "answer"
                }
            }
        })
        return res.status(200).json(quests)
    } catch (err) {
        console.log(err)
    }
}

const updateQuest = async (req, res) => {
    try {
        const id = req.body.id
        const data = req.body

        const questUpdate = await quest.update({
            name: data.name,
            description: data.description
        }, {
            where: {id: id}
        })
        if (!questUpdate) {
            return res.status(200).send({
                status: 404,
                message: "Квест не найден"
            })
        }
        res.status(200).send({
            status: 200,
            message: "Квест обновлен"
        })
    } catch (err) {
        return res.status(400).send({
            message: "Ошибка! Данные не обновлены",
            error: error,
            status: 400
        })
    }
}

const deleteQuest = async (req, res) => {
    try {
        const id = req.params.id
        const questDelete = await quest.destroy({
            where: {id: id}
        })
        if (questDelete) {
            return res.status(204).send("Квест удалён")
        }
        return res.status(200).send({
            status: 404,
            message: "Ошибка квест не удалён"
        })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}


module.exports = {
    getQuests, createQuest,
    updateQuest, deleteQuest
}
