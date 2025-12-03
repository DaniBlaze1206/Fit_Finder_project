class User {
  constructor(id, username, email, password, role, createdAt, bio = "", profilePicUrl = "") {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;


    this.bio = bio;
    this.profilePicUrl = profilePicUrl;
  }
}
module.exports = User;
