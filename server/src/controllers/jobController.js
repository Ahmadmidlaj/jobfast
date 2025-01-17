import { fetchJobsPage, removeDuplicates } from "../services/jobService.js";

export const searchJobs = async (req, res) => {
  try {
    const { jobTitle, location, skills, experienceLevel, datePosted } = req.body;

    const experienceLevelMap = {
      entry_level: "internship,entry_level",
      mid_level: "mid_level,associate",
      senior_level: "senior_level,director",
      executive: "executive",
      all: "",
    };

    const datePostedMap = {
      today: "today",
      "3days": "3days",
      week: "week",
      month: "month",
      all: "all",
    };

    const query = `${jobTitle} ${skills?.join(" ")} in ${location}`;

    const results = await Promise.all([
      fetchJobsPage(query, 1, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
      fetchJobsPage(query, 2, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
      fetchJobsPage(query, 3, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
      fetchJobsPage(query, 4, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
      fetchJobsPage(query, 5, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
    ]);

    const allJobs = results.filter((result) => result && result.data).flatMap((result) => result.data);

    const uniqueJobs = removeDuplicates(allJobs);

    res.json({
      data: uniqueJobs,
      total: uniqueJobs.length,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
