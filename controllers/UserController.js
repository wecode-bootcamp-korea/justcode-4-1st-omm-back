const express = require("express");
const UserService = require("../services/UserService");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("signup fail");
      error.statusCode = 400;
      throw error;
    }

    const user = await UserService.signup(name, email, password);

    res.status(201).json({
      message: "created",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signup };
