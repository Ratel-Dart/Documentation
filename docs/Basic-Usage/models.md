---
sidebar_position: 4
---

# Models

# `User` Entity

The `User` class represents a domain model annotated for automatic JSON serialization and database mapping.

```jsx
@Json()
class User {
  @Column(name: 'id')
  late int? id;

  @Column(name: 'username')
  late String? userName;

  @Column(name: 'password')
  late String? password;

  @Column(name: 'address_id')
  late int? address_id;

  User({
    this.id,
    this.userName,
    this.password,
    this.address_id,
  });
}
```

## Annotations Explained

- **`@Json()`**  
  Marks this class for JSON serialization/deserialization. A code generator will produce `toJson()` and `fromJson()` methods, enabling easy conversion between `User` objects and JSON maps.

- **`@Column(name: '...')`**  
  Associates each field with a database column name:
  - Used by the ORM or query builder to map SQL results into object fields.  
  - Ensures that JSON property names match the Dart fields, since the annotation name aligns with both the database column and JSON key.

## Field Mapping

| Field Name    | Database Column | JSON Key     |
|---------------|-----------------|--------------|
| `id`          | `id`            | `id`         |
| `userName`    | `username`      | `username`   |
| `password`    | `password`      | `password`   |
| `address_id`  | `address_id`    | `address_id` |

With these annotations, you ensure consistent naming across your application layers: database, domain model, and API JSON payloads.
