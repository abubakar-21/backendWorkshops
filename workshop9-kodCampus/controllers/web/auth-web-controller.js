
module.exports = {
  hoome: async (req, res) => {
    const learningPaths = await LearningPath.find().lean();

    res.render("index", { title: "KodCampus Start", learningPaths });
  },
};