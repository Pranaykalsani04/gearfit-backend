// planController.js
export const getWorkoutPlan = (req, res) => {
  const { gender, weight, height, goal } = req.user;

  // Weekly split
  const weeklyPlan = {
    Monday: "Chest & Triceps",
    Tuesday: "Back & Biceps",
    Wednesday: "Shoulders & Arms",
    Thursday: "Chest & Triceps",
    Friday: "Back & Biceps",
    Saturday: "Legs",
    Sunday: "Rest",
  };

  res.json({
    message: `Here's your workout plan`,
    weeklySplit: weeklyPlan,
    goal,
    weight,
    height,
    gender,
  });
};

export const getDietPlan = (req, res) => {
  const { goal, weight } = req.user;

  let diet = {
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: ["", ""],
  };

  if (goal === "bulk") {
    diet = {
      breakfast: "Oats with peanut butter and banana",
      lunch: "Grilled chicken, brown rice, and veggies",
      dinner: "Salmon with sweet potatoes",
      snacks: ["Protein shake", "Nuts & Greek yogurt"],
    };
  } else if (goal === "cut") {
    diet = {
      breakfast: "Boiled eggs and black coffee",
      lunch: "Grilled fish with salad",
      dinner: "Tofu with sautéed spinach",
      snacks: ["Carrot sticks", "Protein shake (low-carb)"],
    };
  }

  const calories = goal === "bulk" ? weight * 22 : weight * 14;

  res.json({
    goal,
    suggestedCalories: calories,
    dailyDiet: diet,
  });
};
