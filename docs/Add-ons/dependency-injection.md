---
sidebar_position: 1
---

# Dependency Injection

This section explains how dependencies are registered and injected in the application, including nested injections within repositories and use cases.

## 1. Registering Dependencies (`GlobalBindings`)

All dependencies are declared in a single composition root (`GlobalBindings`). Here, each binding defines how to create and resolve instances.

```jsx
class GlobalBindings extends Bindings {
  @override
  void dependencies() {
    // Register UsersRepository with nested AddressRepository injection
    Injector().put<UsersRepository>(
      () => UsersRepositoryImpl(
        addressRepository: Injector().get<AddressRepository>(),
      ),
    );

    // Register UsersUseCase with both repository dependencies
    Injector().put<UsersUseCase>(
      () => UsersUseCase(
        repository: Injector().get<UsersRepository>(),
        addressRepository: Injector().get<AddressRepository>(),
      ),
    );
  }
}
```

- **Nested Injection**: `UsersRepositoryImpl` itself depends on `AddressRepository`, so `AddressRepository` must be registered before or alongside.
- **Factory Closures**: Each `put<T>` call provides a closure that returns a new instance when `get<T>()` is invoked.

## 2. Retrieving Dependencies (`UsersHandler`)

Handlers (or any consumer) obtain dependencies via `Injector().get<T>()`. This keeps them decoupled from concrete implementations.

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

- **Handler Construction**: The constructor fetches `UsersUseCase` from the injector.
- **Decoupling**: `UsersHandler` knows only about the `UsersUseCase` interface, not its implementation details.

## 3. Chaining Dependencies

1. **`UsersHandler`** requests `UsersUseCase`.  
2. **`UsersUseCase`** requires `UsersRepository` and `AddressRepository`.  
3. **`UsersRepositoryImpl`** requires `AddressRepository`.  

The injector resolves this chain automatically based on registered factories:

```
GlobalBindings
 ├─ UsersRepositoryImpl(addressRepository: ...)    // Factory for UsersRepository
 ├─ UsersUseCase(repository: ..., addressRepository: ...)  // Factory for UsersUseCase
 └─ Other bindings...
```
