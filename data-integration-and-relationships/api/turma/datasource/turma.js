const { SQLDataSource } = require("datasource-sql");

class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.customResponse = {
      code: 200,
      message: "Operação efetuada com sucesso",
    };
  }

  async getTurmas() {
    return this.db.select("*").from("turmas");
  }

  async getTurma(id) {
    const turma = await this.db.select("*").from("turmas").where("id", +id).first();
    return turma;
  }

  async createTurma(turma) {
    const [createdTurma] = await this.db
      .insert(turma)
      .returning(["id", "descricao", "docente_id", "horario", "inicio", "vagas"])
      .into("turmas");
    return createdTurma;
  }

  async updateTurma(id, turma) {
    await this.db
      .update({ ...turma })
      .where({ id: +id })
      .into("turmas");

    const updatedTurma = await this.getTurma(id);
    return {
      ...this.customResponse,
      turma: updatedTurma,
    };
  }

  async deleteTurma(id) {
    await this.db("turmas").where({ id: id }).del();

    this.customResponse.message = "Registro deletado com sucesso";

    return this.customResponse;
  }
}

module.exports = TurmasAPI;
