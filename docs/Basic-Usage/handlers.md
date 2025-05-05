---
sidebar_position: 3
---

# Handlers

The `UsersHandler` class extends `RatelHandler` to expose user-related endpoints over HTTP.

```jsx
class UsersHandler extends RatelHandler {
  final UsersUseCase useCase;

  UsersHandler() : useCase = Injector().get<UsersUseCase>();

  @Get('/list')
  Future<List<User>> list() async {
    return await useCase.listUsers();
  }
}
```

- **`final UsersUseCase useCase;`**  
  Declares a dependency on the application-layer use case that encapsulates your business logic for users.

- **Constructor & Dependency Injection**  
  ```jsx
  UsersHandler() : useCase = Injector().get<UsersUseCase>();
  ```  
  Here, `Injector().get<UsersUseCase>()` resolves and injects an instance of `UsersUseCase`. This keeps the handler decoupled from concrete implementations.  
  > Learn more about dependency injection in our [Dependency Injection guide](/docs/Add-ons/dependency-injection.md).

- **Route Definition**  
  ```jsx
  @Get('/list')
  Future<List<User>> list() async {
    return await useCase.listUsers();
  }
  ```  
  - `@Get('/list')` maps HTTP GET `/list` to this method.  
  - The method delegates to `useCase.listUsers()`, returning a list of `User` entities.


The `UsersUseCase` class implements the application-layer business logic for user operations.

```jsx
class UsersUseCase {
  final UsersRepository repository;

  UsersUseCase({
    required this.repository,
  });

  Future<List<User>> listUsers() async {
    return await repository.getAll();
  }
}
```

- **Dependencies**  
  - `UsersRepository` are injected via the constructor to fulfill data-access needs.

- **`listUsers()`**  
  Fetches all users by delegating to `repository.getAll()` and returns a list of `User` entities.
