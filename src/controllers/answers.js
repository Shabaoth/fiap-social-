const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
  async index(req, res) {
    try {
      const answers = await Answer.findAll();

      res.send(answers);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  //função que adiciona uma resposta a uma pergunta
  async store(req, res) {
    const questionId = req.params.id;

    const { studentId } = req;

    const { description } = req.body;

    console.log(req);

    try {

      //verifica se a questão existe
      const question = await Question.findByPk(questionId);

      //se não existir retorna erro 404
      if (!question)
        return res.status(404).send({ error: "Pergunta não encontrada" });

      //cria a resposta para a pergunta com o aluno do token
      const answer = await question.createAnswer({ description, student_id: studentId });

      //responde com status de sucesso
      res.status(201).send(answer);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

  },

  find(req, res) {

  },

  async update(req, res) {

  },

  async delete(req, res) {

  }

}