const { Router } = require("express");
const express = require("express");
const { stringify } = require("uuid");
const router = express.Router();
const Notice = require("../models/noticeModels");

router.get("/notice", async (req, res) => {
  try {
    const allTodos = await Notice.findAll();
    return res.status(200).json({ data: allTodos });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.get("/notice/:id", async (req, res) => {
  try {
    const exitingTodo = await Notice.findOne({
      where: { id: req.params.id },
    });

    if (exitingTodo) {
      return res.status(200).json(exitingTodo);
    }

    if (!exitingTodo) {
      return res.status(404).json({ err: "todo not found" });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.post("/notice", async (req, res) => {
  try {
    const { author, message, date, likes } = req.body;

    if (!author) {
      return res
        .status(400)
        .json({ result: "Title Missing Please input a title " });
    }
    if (!message) {
      return res
        .status(400)
        .json({ result: "Title Missing Please input a title " });
    }

    // const dateNow = "48988"
    // const dateString = stringify(dateNow)
    // console.log(typeof(dateString),  "dateNow", dateString);

    const todo = {
      author,
      message,
      date : "monday 4 stay173",
      likes,
    };
    const createdTodo = await Notice.create(todo);

    if (createdTodo) {
      return res.status(201).send(createdTodo);
    }
    console.log("reached here");
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.put("/notice/:id/like", async (req, res) => {
  try {
    const { author, message, date, likes } = req.body;

    const exitingTodo = await Notice.findOne({
      where: { id: req.params.id },
    });

    if (!exitingTodo) {
      return res.status(404).send("Todo doesn't exits in database");
    }

    const { dataValues } = exitingTodo;
    const likeCount = dataValues.likes;

    console.log(likeCount, "data values");

    if (exitingTodo) {
      const updatedTodo = await exitingTodo.update({
        author,
        message,
        date,
        likes: likeCount + 1,
      });
      await updatedTodo.save();
      return res.status(200).send(updatedTodo);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

module.exports = router;
