class User {
  constructor(id, username, email, password, role, createdAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}
module.exports = User;