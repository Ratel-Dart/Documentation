---
sidebar_position: 1
---

# Get Started

Discover **Ratel** in under 5 minutes.

## Prerequisites

Before you begin, make sure you have:

* A Linux-based operating system (Debian, Ubuntu, etc.)
* Dart **3.7** or later installed
* Git installed and configured

## Installation

1. Download the installer script:

   ```bash
   wget https://raw.githubusercontent.com/Ratel-Dart/Ratel/main/ratel.sh
   ```

2. Make the script executable and install Ratel:

   ```bash
   chmod +x ratel.sh
   sudo ./ratel.sh install
   ```

Ratel is now installed and ready to use.

## Creating a New Project

Generate a new backend project with Ratel:

```bash
ratel create <project-name>
```

This command scaffolds a classic backend template in the `<project-name>` directory.

## Running the Development Server

Navigate into your project directory and start the server:

```bash
cd <project-name>
dart main.dart
```

Your Ratel backend is now running locally. Happy coding!
