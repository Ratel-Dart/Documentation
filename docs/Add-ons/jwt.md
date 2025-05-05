---
sidebar_position: 2
---

# JWT Configuration

To enable JWT-based authentication in your Ratel server, you only need to pass the `jwtKey` when instantiating `RatelServer`. All handlers annotated with `@Protected()` will automatically require a Bearer token.

```jsx
void main() async {
  final env = DotEnv()..load();

  final server = RatelServer(
    // JWT secret key used to sign and verify tokens
    jwtKey: env['JWT_KEY'],

    // List your handlers here; annotated ones will be protected
    handlers: [
      UsersHandler,
      AuthHandler,
    ],

    // Other server configuration omitted
  );

  server.startServer();
}
```

## Protecting Handlers

Annotate any handler class with `@Protected()` to require a valid JWT Bearer token:

```jsx
@Protected()
class UsersHandler extends RatelHandler {
  // ...
}
```

- **`@Protected()`**  
  Marks the entire handler (and its routes) as requiring authentication.  
- **Bearer Token**  
  Clients must include an `Authorization: Bearer <token>` on Auth API.  

With this setup, Ratel will automatically validate the token on each request to protected endpoints. Make sure the same `jwtKey` is used both to sign tokens (e.g., in your `AuthHandler`) and to verify them at runtime.

## Generating Tokens with the JWT Library

You can use the built-in `dart_jsonwebtoken` library to sign and validate tokens. Here's an example of issuing a JWT in your `AuthHandler`:

```jsx
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

final payload = {
  'username': credentials.userName,
  'password': credentials.password,
};

// Create the token
final jwt = JWT(payload);
final token = jwt.sign(
  SecretKey(Auth.jwtKey!),
);

return Response(
  statusCode: HttpStatus.ok,
  data: {'token': token},
);
```

- **`JWT(payload)`**: Creates a new token with the given payload.  
- **`jwt.sign(SecretKey(...))`**: Signs the token using your secret key.  

On protected endpoints, Ratel will automatically verify the Bearer token in incoming requests using the same `jwtKey`.
