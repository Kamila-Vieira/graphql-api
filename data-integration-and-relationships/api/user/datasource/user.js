const { RESTDataSource } = require("apollo-datasource-rest");

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
    this.successResponse = {
      code: 200,
      message: "Operação efetuada com sucesso",
    };
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`);
    return user;
  }

  async getUsers() {
    return await this.get("/users");
  }

  async getUsersByRole(roleId) {
    return await this.get(`/users?role=${roleId}`);
  }

  async getActiveUsers() {
    return await this.get("/users?ativo=true");
  }

  async getUserRole(roleId) {
    return await this.get(`/roles/${roleId}`);
  }

  async createUser(user) {
    const [role] = await this.get(`/roles?type=${user.role}`);
    const userCreated = await this.post("/users", { ...user, role: role.id });
    return { ...this.successResponse, user: userCreated };
  }

  async updateUser(data) {
    const dataToUpdate = { ...data };

    if (data.role) {
      const [role] = await this.get(`/roles?type=${data.role}`);
      dataToUpdate.role = role.id;
    } else {
      delete dataToUpdate.role;
    }

    const userUpdated = await this.patch(`/users/${data.id}`, dataToUpdate);
    return {
      ...this.successResponse,
      user: userUpdated,
    };
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);
    return this.successResponse;
  }
}

module.exports = UsersAPI;
