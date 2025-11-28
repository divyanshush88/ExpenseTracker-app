// backend/routes/transactionRoutes.js
import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Create transaction
router.post("/", async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all transactions with filters
router.get("/", async (req, res) => {
  try {
    const { from, to, type, category } = req.query;
    const query = {};

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    if (type) query.type = type;
    if (category) query.category = category;

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tx) return res.status(404).json({ message: "Not found" });
    res.json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Monthly summary using Aggregation
router.get("/summary/monthly", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ];

    const summary = await Transaction.aggregate(pipeline);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yearly summary
router.get("/summary/yearly", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: { year: { $year: "$date" } },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1 } },
    ];

    const summary = await Transaction.aggregate(pipeline);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Category-wise summary (expenses only)
router.get("/summary/by-category", async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = { type: "expense" };

    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ];

    const result = await Transaction.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Daily summary (last 30 days by default)
router.get("/summary/daily", async (req, res) => {
  try {
    const days = Number(req.query.days) || 30;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const pipeline = [
      {
        $match: {
          date: { $gte: fromDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ];

    const summary = await Transaction.aggregate(pipeline);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
