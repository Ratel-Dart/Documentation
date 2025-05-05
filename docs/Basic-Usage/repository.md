---
sidebar_position: 5
---

# Repository

The `UsersRepository` interface defines the abstract contract for user data persistence in the domain layer.

```jsx
abstract class UsersRepository {
  Future<List<User>> getAll();
}
```

- **Abstraction**  
  Declares the method signature for fetching users without exposing any infrastructure details.

---

# `UsersRepositoryImpl`

The `UsersRepositoryImpl` class provides a concrete implementation of the `UsersRepository` interface, using SQL to fetch data from the database.

```jsx
class UsersRepositoryImpl extends RatelRepository<User>
    implements UsersRepository {
  @override
  Future<List<User>> getAll() async {
    final sql = 'SELECT id, username, address_id FROM users';
    final result = await execute(sql);
    return result!;
  }
}
```

- **SQL Query**  
  Executes a raw SQL statement to select `id`, `username`, and `address_id` from the `users` table.

- **Adapter**  
  Extends `RatelRepository<User>` to leverage its low-level `execute` method, fulfilling the `UsersRepository` contract while decoupling the domain from database specifics.

- **Base Class**  
By extending `RatelRepository<User>`, this class inherits common database operations, such as:
  - `execute(sql)`: runs raw SQL and returns mapped results.
  - Connection pooling and transaction management.
  - Generic result mapping for `User` entities.

The generic parameter `<User>` tells the base repository to map query results into `User` objects, reducing boilerplate and centralizing shared persistence logic.


