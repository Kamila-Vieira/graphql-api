const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

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

  matriculasPorTurma = new DataLoader(async (turmaIds) => {
    const matriculas = await this.db.select("*").from("matriculas").whereIn("turma_id", turmaIds);

    return turmaIds.map((turma_id) =>
      matriculas
        .map(({ created_at, ...matricula }) => ({
          ...matricula,
          createdAt: created_at,
        }))
        .filter((matricula) => matricula.turma_id === turma_id)
    );
  });

  matriculasPorEstudante = new DataLoader(async (estudanteIds) => {
    const matriculas = await this.db
      .select("*")
      .from("matriculas")
      .whereIn("estudante_id", estudanteIds);

    return estudanteIds.map((estudante_id) =>
      matriculas
        .map(({ created_at, ...matricula }) => ({
          ...matricula,
          createdAt: created_at,
        }))
        .filter((matricula) => matricula.estudante_id === estudante_id)
    );
  });

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
