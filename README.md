**Hack2skill Assignment      
**
Database Schema
**User Collection
**
**Fields**:

username: String - Username of the user.

password: String - Password of the user.

email: String - Email of the user.

tasks: Array - Array of tasks associated with the user.

subject: String - Subject of the task.

deadline: Date - Deadline for completing the task.

status: String - Status of the task (e.g., "pending", "completed").

subtasks: Array - Array of subtasks associated with the task.

subject: String - Subject of the subtask.

deadline: Date - Deadline for completing the subtask.

status: String - Status of the subtask (e.g., "pending", "completed").

deleted: Boolean - Flag indicating if the subtask has been marked for deletion.

**Working Prototype Repository:**

https://github.com/abhinavjaiswal1599/Users_and_tasks

**Code Documentation: 
**
**Controllers:

**User Controller:

Responsibility: Handles user-related operations such as user creation, retrieval, updating, and deletion.

Methods:

createUser: Creates a new user based on the provided username, email, and password. Utilizes bcrypt to hash the password for security.

getUser: Retrieves user information based on the user ID.

updateUser: Updates user information such as username and email based on the user ID.

deleteUser: Marks the user as deleted in the database.

Task Controller:

Responsibility: Manages tasks associated with users, including creation, retrieval, updating, and deletion.

Methods:

getTasks: Retrieves all tasks associated with a user, excluding deleted tasks.

addTask: Creates a new task for the user, providing details such as subject, deadline, and status.

updateTask: Updates the details of an existing task identified by its ID.

deleteTask: Marks a task as deleted without physically removing it from the database.

Subtask Controller:

Responsibility: Handles operations related to subtasks, including listing, updating, and creating subtasks for a task.

Methods:

getSubtasks: Retrieves all non-deleted subtasks associated with a specific task.

updateSubtasks: Updates the list of subtasks for a task, ensuring previously deleted subtasks are retained.

createSubtask: Creates new subtasks for a task based on the provided data.

**Models:

**User Model:

Schema: Defines the structure of the user collection in MongoDB, including fields such as username, email, password (hashed), and an array of tasks associated with the user.

Relationships: Each user document may contain multiple tasks, forming a one-to-many relationship.

Task Model:

Schema: Represents the structure of the task collection, containing fields such as subject, deadline, status, and an array of subtasks associated with the task.

Relationships: Each task document belongs to a specific user, forming a one-to-many relationship with the user collection. Each task may contain multiple subtasks.

Subtask Model:

Schema: Defines the structure of the subtask collection, including attributes such as subject, deadline, status, and a flag indicating its deletion status.

Relationships: Each subtask document belongs to a specific task, forming a one-to-many relationship with the task collection.

**Routes:

**User Routes:

Responsible for handling HTTP requests related to user operations.

Includes routes for user creation, retrieval, updating, and deletion.

Task Routes:

Handles HTTP requests related to task operations, such as task creation, retrieval, updating, and deletion.

Also includes routes for listing subtasks associated with tasks.

Subtask Routes:

Manages HTTP requests related to subtask operations, including listing, updating, and creating subtasks for tasks.



**API Documentation:
**

https://documenter.getpostman.com/view/19499307/2sA3QnhZB6










