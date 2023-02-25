const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.customResponse = {
      code: 200,
      message: "Operação efetuada com sucesso",
    };
  }

  async getTurmas() {
    return await this.db.select("*").from("turmas");
  }

  getTurmasCarregadas = new DataLoader(async (idsTurmas) => {
    const turmas = await this.db.select("*").from("turmas").whereIn("id", idsTurmas);

    return idsTurmas.map((id) => turmas.find((turma) => turma.id === id));
  });

  async getTurmaById(id) {
    return await this.db.select("*").from("turmas").where("id", +id).first();
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

    const updatedTurma = await this.getTurmaById(id);
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
