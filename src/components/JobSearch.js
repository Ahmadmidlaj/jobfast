import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const JobSearch = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [datePosted, setDatePosted] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearchPerformed(true);
    
    try {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      const response = await fetch('http://localhost:5000/api/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          jobTitle, 
          location, 
          skills: skillsArray,
          experienceLevel,
          datePosted
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data.data || []);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600">Search across multiple job boards in one place</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Skills (comma-separated)"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Experience Levels</option>
              <option value="entry_level">Entry Level</option>
              <option value="mid_level">Mid Level</option>
              <option value="senior_level">Senior Level</option>
              <option value="executive">Executive</option>
            </select>

            <select
              value={datePosted}
              onChange={(e) => setDatePosted(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any Time</option>
              <option value="today">Last 24 hours</option>
              <option value="3days">Last 3 days</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        {searchPerformed && (
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
              Found {jobs.length} jobs matching your criteria
            </p>
          </div>
        )}
{!loading && (
  <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.job_title}</h2>
                  <p className="text-gray-600 mb-2">{job.employer_name}</p>
                </div>
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </a>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{job.job_city || 'Location N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>{job.job_employment_type || 'Type N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign size={16} className="mr-2" />
                  <span>{job.job_salary || 'Salary N/A'}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.job_description || 'No description available'}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {job.job_highlights?.qualifications?.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

)}
        

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
//works great without extra 2 inputs
// import { useState, useEffect, useCallback } from 'react';
// import { Search, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

// const JobSearch = () => {
//   const [jobTitle, setJobTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [skills, setSkills] = useState('');
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSearchPerformed(true);
    
//     try {
//       const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
//       const response = await fetch('http://localhost:5000/api/search-jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ jobTitle, location, skills: skillsArray }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch jobs');
//       }

//       const data = await response.json();
//       setJobs(data.data || []);
//     } catch (err) {
//       setError('Failed to fetch jobs. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
//           <p className="text-lg text-gray-600">Search across multiple job boards in one place</p>
//         </div>

//         <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//                 placeholder="Job Title"
//                 className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Location"
//                 className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div className="relative">
//               <input
//                 type="text"
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 placeholder="Skills (comma-separated)"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//           >
//             {loading ? 'Searching...' : 'Search Jobs'}
//           </button>
//         </form>

//         {error && (
//           <div className="max-w-4xl mx-auto mb-8 bg-red-50 text-red-700 p-4 rounded-md">
//             {error}
//           </div>
//         )}

//         {searchPerformed && (
//           <div className="text-center mb-6">
//             <p className="text-lg text-gray-700">
//               Found {jobs.length} jobs matching your criteria
//             </p>
//           </div>
//         )}

//         <div className="max-w-4xl mx-auto space-y-6">
//           {jobs.map((job, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.job_title}</h2>
//                   <p className="text-gray-600 mb-2">{job.employer_name}</p>
//                 </div>
//                 <a
//                   href={job.job_apply_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//                 >
//                   Apply Now
//                 </a>
//               </div>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 <div className="flex items-center text-gray-600">
//                   <MapPin size={16} className="mr-2" />
//                   <span>{job.job_city || 'Location N/A'}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Clock size={16} className="mr-2" />
//                   <span>{job.job_employment_type || 'Type N/A'}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <DollarSign size={16} className="mr-2" />
//                   <span>{job.job_salary || 'Salary N/A'}</span>
//                 </div>
//               </div>
              
//               <p className="text-gray-700 mb-4 line-clamp-3">
//                 {job.job_description || 'No description available'}
//               </p>
              
//               <div className="flex flex-wrap gap-2">
//                 {job.job_highlights?.qualifications?.slice(0, 5).map((skill, idx) => (
//                   <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobSearch;