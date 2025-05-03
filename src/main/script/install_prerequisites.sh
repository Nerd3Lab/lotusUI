#!/bin/bash

set -e

echo "📦 Checking and installing prerequisites for Sui Node..."

install_mac() {
  echo "🛠 macOS detected..."
  command -v brew >/dev/null 2>&1 || {
    echo "❗ Homebrew not found. Please install Homebrew first: https://brew.sh/"
    exit 1
  }

  for pkg in cmake pkg-config protobuf openssl llvm; do
    if brew list --versions "$pkg" >/dev/null; then
      echo "✅ $pkg already installed"
    else
      echo "📥 Installing $pkg..."
      brew install "$pkg"
    fi
  done
}

install_linux() {
  echo "🛠 Linux (Debian/Ubuntu) detected..."
  for pkg in cmake pkg-config libssl-dev clang protobuf-compiler; do
    if dpkg -s "$pkg" >/dev/null 2>&1; then
      echo "✅ $pkg already installed"
    else
      echo "📥 Installing $pkg..."
      sudo apt-get install -y "$pkg"
    fi
  done
}

install_windows() {
  echo "🛠 Windows detected..."
  command -v choco >/dev/null 2>&1 || {
    echo "❗ Chocolatey not found. Please install Chocolatey: https://chocolatey.org/install"
    exit 1
  }

  for pkg in cmake pkgconfiglite openssl.light llvm protobuf; do
    if choco list --local-only | grep -q "$pkg"; then
      echo "✅ $pkg already installed"
    else
      echo "📥 Installing $pkg..."
      choco install -y "$pkg"
    fi
  done
}

OS="$(uname -s)"

case "$OS" in
  Darwin)
    install_mac
    ;;
  Linux)
    if [ -f /etc/debian_version ]; then
      sudo apt-get update
      install_linux
    else
      echo "❗ Unsupported Linux distribution. Please install prerequisites manually."
      exit 1
    fi
    ;;
  MINGW*|MSYS*|CYGWIN*|Windows_NT)
    install_windows
    ;;
  *)
    echo "❗ Unsupported OS: $OS"
    exit 1
    ;;
esac

echo "✅ All prerequisites are ready."
