export function addData(names, name, image, job, description) {
  names.push({
    name: { name },
    image: { image },
    job_role: { job },
    description: { description },
  });
  console.log(names);
}export const names = [
  {
    name: "Alice Johnson",
    image: '../images/image.jpg',
    job_role: "Software Engineer",
    location: { lat: 40.7128, lng: -74.0060 }, // Remove .lat from here
    description:
      "A dedicated software engineer with a passion for creating innovative solutions in web and mobile development.",
  },
  {
    name: "Bob Smith",
    image: "../images/image.jpg",
    job_role: "Project Manager",
    location: { lat: 78.7128, lng: -74.0060 },
    description:
      "An experienced project manager with expertise in leading cross-functional teams, managing timelines, and ensuring project goals are met on schedule.",
  },
  {
    name: "Carol Nguyen",
    image: "../images/image.jpg",
    job_role: "UX/UI Designer",
    location: { lat: 5.7128, lng: -74.0060 },
    description:
      "A creative UX/UI designer who excels in user-centered design, creating intuitive and visually appealing interfaces.",
  },
  {
    name: "David Lee",
    image: "../images/image.jpg",
    job_role: "Data Scientist",
    location: { lat: 40.7128, lng: -74.0060 },
    description:
      "A data scientist with strong analytical skills and experience in machine learning, data mining, and statistical modeling.",
  },
  {
    name: "Evelyn Garcia",
    image: "../images/image.jpg",
    job_role: "Marketing Specialist",
    location: { lat: 40.7128, lng: -74.0060 },
    description:
      "A results-driven marketing specialist with expertise in digital marketing, social media strategy, and content creation.",
  },
];
