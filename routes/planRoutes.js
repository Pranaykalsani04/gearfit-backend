const express = require("express");
const auth = require("../middleware/authMiddleware");
const { db } = require("../firebase");

const router = express.Router();

// Get daily workout & diet plan
router.post("/daily", auth, async (req, res) => {
    const { weight, height, goal, gender } = req.body;

    try {
        const workoutPlan = getWorkoutPlan();
        const dietPlan = getDietPlan(goal, weight);

        // Optionally log this to Firestore
        await db.collection("plans").add({
            userId: req.user.id,
            date: new Date().toISOString(),
            goal,
            gender,
            weight,
            height,
            workoutPlan,
            dietPlan,
        });

        res.json({ workoutPlan, dietPlan });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate plan" });
    }
});

// Helpers
function getWorkoutPlan() {
    return {
        Monday: "Chest & Triceps",
        Tuesday: "Back & Biceps",
        Wednesday: "Shoulders & Arms",
        Thursday: "Chest & Triceps",
        Friday: "Back & Biceps",
        Saturday: "Legs",
        Sunday: "Rest",
    };
}

function getDietPlan(goal, weight) {
    if (goal === "bulk") {
        return {
            type: "Bulk",
            breakfast: "Oats + Milk + Banana",
            snack1: "Peanut butter toast",
            lunch: "Chicken breast + Rice + Veggies",
            snack2: "Protein shake",
            dinner: "Paneer/tofu + Roti + Salad",
        };
    } else {
        return {
            type: "Cut",
            breakfast: "Boiled eggs + Green tea",
            snack1: "Almonds",
            lunch: "Grilled chicken + Salad",
            snack2: "Low-fat yogurt",
            dinner: "Soup + Veggies",
        };
    }
}

module.exports = router;

