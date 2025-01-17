import fetch from "node-fetch";

export async function fetchJobsPage(query, page, experienceLevel, datePosted) {
  try {
    const params = new URLSearchParams({
      query: query,
      page: page.toString(),
      num_pages: "1",
      date_posted: datePosted,
      experience_required: experienceLevel,
    });

    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?${params}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    return null;
  }
}

export function removeDuplicates(jobs) {
  const seen = new Set();
  return jobs.filter((job) => {
    const duplicate = seen.has(job.job_apply_link);
    seen.add(job.job_apply_link);
    return !duplicate;
  });
}
