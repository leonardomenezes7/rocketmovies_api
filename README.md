# RocketMovies API 📓

## 📁Project

The API is designed to provide functionality for managing users, notes, and tags, allowing the creation, and deletion of notes, as well as the association of tags with those notes. Additionally, the API offers user authentication using JWT tokens to ensure the security of operations.

[Frontend Repository](https://github.com/leonardomenezes7/rocketmovies_frontend)

## 🧱Structure
![Client (1)](https://github.com/leonardomenezes7/API-node/assets/145611761/37dd5d91-ecf0-4f61-bed2-323b931a4bbe)


## ➡️Key features:

👤User Management:
- Registration of new users with basic information such as username, email, password (encrypted), and the option to upload a profile picture.
- Update of user data, including password change (encrypted) and personal information.

📓Note Management:
- Creation of notes associated with specific users.
- Deletion of existing notes.
- Tag Relationship:
- Association of tags with notes to facilitate organization and categorization.

🔐User Authentication:
- Generation of JWT tokens to authenticate users during API requests.
- Protection of sensitive routes and operations, requiring valid authentication by JWT token.
- The API architecture is developed using Node.js, leveraging frameworks such as Express.js for routing and middleware control, and JWT for user authentication. Data is stored in a SQLite , to ensure persistence and scalability.

## 💻Technologies Used:
- Node.js
- SQLite
- Express.js
- JWT
- knex.js
- bcrypt
- Multer
- cors
- Jest

## 💾Database Structure
![Captura de tela 2024-04-09 035053](https://github.com/leonardomenezes7/rocketmovies_api/assets/145611761/a71c7105-2cb8-4cb8-9832-51437b5b82c3)


### Developed by Leonardo Menezes

