const { RESTDataSource } = require("apollo-datasource-rest");

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
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
}

module.exports = UsersAPI;
