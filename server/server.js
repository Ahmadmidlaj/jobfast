
// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT =  6000;

// app.use(cors());
// app.use(express.json());

// app.post("/api/search-jobs", async (req, res) => {
//   try {
//     const { jobTitle, location, skills, experienceLevel, datePosted, page = 1 } = req.body;
    
//     // Convert experience level to API format
//     const experienceLevelMap = {
//       entry_level: "internship,entry_level",
//       mid_level: "mid_level,associate",
//       senior_level: "senior_level,director",
//       executive: "executive",
//       all: ""
//     };

//     // Convert date posted to API format
//     const datePostedMap = {
//       today: "today",
//       "3days": "3days",
//       week: "week",
//       month: "month",
//       all: "all"
//     };

//     const query = `${jobTitle} ${skills?.join(" ")} in ${location}`;

//     // Fetch multiple pages of results
//     const results = await Promise.all([
//       fetchJobsPage(query, 1, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
//       fetchJobsPage(query, 2, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
//       fetchJobsPage(query, 3, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
//       fetchJobsPage(query, 4, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
//       fetchJobsPage(query, 5, experienceLevelMap[experienceLevel], datePostedMap[datePosted]),
//     ]);

//     // Combine all results and remove duplicates
//     const allJobs = results
//       .filter((result) => result && result.data)
//       .flatMap((result) => result.data);

//     // Remove duplicates based on job URL
//     const uniqueJobs = removeDuplicates(allJobs);

//     res.json({
//       data: uniqueJobs,
//       total: uniqueJobs.length,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// async function fetchJobsPage(query, page, experienceLevel, datePosted) {
//   try {
//     const params = new URLSearchParams({
//       query: query,
//       page: page.toString(),
//       num_pages: "1",
//       date_posted: datePosted,
//       experience_required: experienceLevel,
//     });

//     const response = await fetch(
//       `https://jsearch.p.rapidapi.com/search?${params}`,
//       {
//         headers: {
//           "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
//           "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`API request failed with status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching page ${page}:`, error);
//     return null;
//   }
// }

// function removeDuplicates(jobs) {
//   const seen = new Set();
//   return jobs.filter((job) => {
//     const duplicate = seen.has(job.job_apply_link);
//     seen.add(job.job_apply_link);
//     return !duplicate;
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





//works great without 2 inputs
// // server/server.js
// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.post("/api/search-jobs", async (req, res) => {
//   try {
//     const { jobTitle, location, skills, page = 1 } = req.body;
//     const query = `${jobTitle} ${skills?.join(" ")} in ${location}`;

//     // Fetch multiple pages of results
//     const results = await Promise.all([
//       fetchJobsPage(query, 1),
//       fetchJobsPage(query, 2),
//       fetchJobsPage(query, 3),
//       fetchJobsPage(query, 4),
//       fetchJobsPage(query, 5),
//     ]);

//     // Combine all results and remove duplicates
//     const allJobs = results
//       .filter((result) => result && result.data)
//       .flatMap((result) => result.data);

//     // Remove duplicates based on job URL
//     const uniqueJobs = removeDuplicates(allJobs);

//     res.json({
//       data: uniqueJobs,
//       total: uniqueJobs.length,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// async function fetchJobsPage(query, page) {
//   try {
//     const params = new URLSearchParams({
//       query: query,
//       page: page.toString(),
//       num_pages: "1",
//       date_posted: "today", // Changed from 'today' to get more results
//     });

//     const response = await fetch(
//       `https://jsearch.p.rapidapi.com/search?${params}`,
//       {
//         headers: {
//           "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
//           "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`API request failed with status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching page ${page}:`, error);
//     return null;
//   }
// }

// function removeDuplicates(jobs) {
//   const seen = new Set();
//   return jobs.filter((job) => {
//     const duplicate = seen.has(job.job_apply_link);
//     seen.add(job.job_apply_link);
//     return !duplicate;
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
