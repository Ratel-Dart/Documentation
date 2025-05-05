---
sidebar_position: 1
---

# Example structure

This is an example of how you can organize your Dart backend following Hexagonal/Clean Architecture principles. 
You are free to adapt this structure to suit your project's needs.

```plaintext
app/
├── config/                                     # Application configuration and composition root
│   └── global_bindings.dart                    # Dependency injection (IoC)
└── internal/
    ├── application/                            # Application layer: use cases and DTOs
    │   ├── DTOs/                               # Data Transfer Objects
    │   │   └── auth_dto.dart                   # Authentication DTOs (login, logout, etc.)
    │   └── usecases/                           # Use cases: orchestration of business rules
    │       └── users_usecase.dart
    ├── database/                               # Data access and domain
    │   ├── models/                             # Database Models 
    │   │   └── user.dart                       # Pure user model, without infrastructure dependencies
    │   ├── repository/                         # Outbound adapters (persistence)
    │   │   └── user_repository/
    │   │       ├── users_repository.dart       # Persistence interface (Port)
    │   │       └── users_repository_impl.dart  # Concrete implementation (Adapter)
    │   └── db.dart                             # Database configuration and client
    ├── http/                                   # HTTP inbound and outbound adapters
    │   ├── handlers/                           # Inbound: routes/handlers calling the use cases
    │   │   └── users_handler.dart
    │   └── client_http.dart                    # Outbound: HTTP client for external APIs
    └── shared/                                 # Shared code and generic helpers
        └── utils.dart                          # Utility functions (formatting, parsing, etc.)
