const { SQLDataSource } = require("datasource-sql");

class MatriculasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.customResponse = {
      code: 200,
      message: "Matrícula efetuada com sucesso",
    };
  }

  async matricularEstudante({ estudanteId, turmaId }) {
    const novaMatricula = {
      estudante_id: estudanteId,
      turma_id: turmaId,
      status: "confirmado",
    };

    await this.db.insert(novaMatricula).into("matriculas");

    return this.customResponse;
  }

  async matriculasPorTurma(turmaId) {
    const matriculas = await this.db.select("*").from("matriculas").where("turma_id", +turmaId);
    return matriculas.map(({ created_at, ...matricula }) => ({
      ...matricula,
      createdAt: created_at,
    }));
  }

  async matriculasPorEstudante(estudanteId) {
    const matriculas = await this.db
      .select("*")
      .from("matriculas")
      .where("estudante_id", +estudanteId);
    return matriculas.map(({ created_at, ...matricula }) => ({
      ...matricula,
      createdAt: created_at,
    }));
  }

  async deleteMatricula(matriculaId) {
    await this.db("matriculas").where({ id: +matriculaId }).del();

    this.customResponse.message = "Matrícula deletada com sucesso";
    return this.customResponse;
  }

  async cancelMatricula(matriculaId) {
    await this.db.update({ status: "cancelado" }).where({ id: +matriculaId }).into("matriculas");

    this.customResponse.message = "Matrícula cancelada com sucesso";
    return this.customResponse;
  }
}

module.exports = MatriculasAPI;
