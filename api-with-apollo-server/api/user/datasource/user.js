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

  async getUsersUseCase(endpoint = "/users") {
    const users = await this.get(endpoint);
    return users.map(async (user) => ({
      ...user,
      role: await this.get(`/roles/${user.role}`),
    }));
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`);
    return { ...user, role: await this.get(`/roles/${user.role}`) };
  }

  async getUsers() {
    return await this.getUsersUseCase();
  }

  async getUsersByRole(roleId) {
    return await this.getUsersUseCase(`/users?role=${roleId}`);
  }

  async getActiveUsers() {
    return await this.getUsersUseCase("/users?ativo=true");
  }

  async createUser(user) {
    const [role] = await this.get(`/roles?type=${user.role}`);
    const userCreated = await this.post("/users", { ...user, role: role.id });
    return { ...this.successResponse, user: { ...userCreated, role } };
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
      user: { ...userUpdated, role: await this.get(`/roles/${userUpdated.role}`) },
    };
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);
    return this.successResponse;
  }
}

module.exports = UsersAPI;
