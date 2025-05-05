---
sidebar_position: 2
---

# Server Initialization

This snippet shows how to load environment variables, configure authentication, set up the database connection, and start the Ratel server.

```jsx
void main() async {
  // 1. Load environment variables from the .env file
  final env = DotEnv()..load();

  // 2. Configure JWT authentication for signing and verifying tokens
  Auth.jwtKey = env['JWT_KEY'];

  // 3. Create and configure the Ratel server
  final server = RatelServer(
    // Port on which the server will listen for incoming requests
    port: 8080,
    // List of handler classes to register (endpoints)
    handlers: [
      UsersHandler,
      AuthHandler,
    ],
    // Database connection settings
    database: RatelDatabase(
      host: env['DB_HOST']!,
      databaseName: env['DB_NAME']!,
      username: env['DB_USER']!,
      password: env['DB_PASSWORD']!,
      port: env['DB_PORT']!,
    ),
    // JWT secret key passed to Ratel for automatic token verification
    jwtKey: env['JWT_KEY'],
    // Dependency injection bindings
    bindings: GlobalBindings(),
  );
  // 4. Start listening for incoming HTTP requests
  server.startServer();
}
```
1. **RatelServer Setup**  
   - **`port`**: Specifies the TCP port (e.g., `8080`).  
   - **`handlers`**: Registers your endpoint handlers (e.g., `UsersHandler`, `AuthHandler`). See [Handlers](/docs/Basic-Usage/handlers.md).  
   - **`database`**: Provides a `RatelDatabase` instance with connection details for your DB.  
   - **`jwtKey`**: Passes the same secret to Ratel so it can automatically validate `@Protected()` endpoints. See [JWT Configuration](/docs/Add-ons/jwt.md).  
   - **`bindings`**: Supplies `GlobalBindings` to wire up dependency injection.

2. **Server Startup**  
   `server.startServer()` begins listening for HTTP requests on the configured port.

By following this pattern, you ensure a clear bootstrapping process: environment → security → database → DI → HTTP server.
