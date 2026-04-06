import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import connectDB from "./config/db.js";
import Course from "./models/Course.js";
import User from "./models/User.js";

dotenv.config();

const teacherEmail = "demo.teacher@lms.local";
const seededCourseTitles = [
  "Next.js Mastery From Zero to Production",
  "UI/UX Design Essentials for Modern Products",
  "Data Science Fundamentals With Python",
];

const sampleCourses = [
  {
    title: "Next.js Mastery From Zero to Production",
    description:
      "Build fast, SEO-friendly web apps with the App Router, server components, data fetching, and deployment workflows.",
    image:
      "https://res.cloudinary.com/de7s0tsv2/image/upload/v1730111287/ilqklsln69kailzfw7t7.jpg",
    price: 49,
    category: "Next.js",
    whatWillYouLearn: [
      "Structure modern Next.js apps with the App Router",
      "Use server and client components correctly",
      "Fetch and cache data with practical patterns",
      "Deploy a production-ready Next.js project",
    ],
    duration: "8h 30m",
    skillLevel: "Intermediate",
    lectures: [
      {
        lectureNumber: 1,
        title: "Introduction to Next.js Architecture",
        videoUrl: "https://www.youtube.com/watch?v=wrn0P2p5mnA",
        isFree: true,
        duration: "18m",
      },
      {
        lectureNumber: 2,
        title: "Routing, Layouts, and Server Components",
        videoUrl: "https://www.youtube.com/watch?v=vrn1n3aB9vM",
        isFree: true,
        duration: "24m",
      },
      {
        lectureNumber: 3,
        title: "Fetching Data and Building Dynamic Pages",
        videoUrl: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
        isFree: false,
        duration: "31m",
      },
      {
        lectureNumber: 4,
        title: "Deployment and Performance Best Practices",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        isFree: false,
        duration: "22m",
      },
    ],
  },
  {
    title: "UI/UX Design Essentials for Modern Products",
    description:
      "Learn product thinking, wireframing, visual hierarchy, and design systems to create polished digital experiences.",
    image:
      "https://res.cloudinary.com/de7s0tsv2/image/upload/v1730888703/vbqac24y8q3koggkp3mc.jpg",
    price: 39,
    category: "UI/UX Design",
    whatWillYouLearn: [
      "Turn ideas into wireframes and user flows",
      "Design accessible interfaces that feel consistent",
      "Build a simple design system in Figma",
      "Present your work in a strong portfolio case study",
    ],
    duration: "7h 15m",
    skillLevel: "Beginner",
    lectures: [
      {
        lectureNumber: 1,
        title: "Principles of Modern UI/UX",
        videoUrl: "https://www.youtube.com/watch?v=YqQx75OPRa0",
        isFree: true,
        duration: "16m",
      },
      {
        lectureNumber: 2,
        title: "Wireframing and User Flows",
        videoUrl: "https://www.youtube.com/watch?v=GQQs7ZPFBQs",
        isFree: true,
        duration: "21m",
      },
      {
        lectureNumber: 3,
        title: "Visual Design and Component Systems",
        videoUrl: "https://www.youtube.com/watch?v=3fumBcKC6RE",
        isFree: false,
        duration: "28m",
      },
      {
        lectureNumber: 4,
        title: "Usability Testing and Portfolio Presentation",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isFree: false,
        duration: "20m",
      },
    ],
  },
  {
    title: "Data Science Fundamentals With Python",
    description:
      "Explore Python, data cleaning, visualization, and basic machine learning with practical mini-projects.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    price: 59,
    category: "Data Science",
    whatWillYouLearn: [
      "Work with Python notebooks and core data libraries",
      "Clean, transform, and analyze datasets confidently",
      "Create useful charts and communicate insights clearly",
      "Train your first machine learning model",
    ],
    duration: "10h",
    skillLevel: "Intermediate",
    lectures: [
      {
        lectureNumber: 1,
        title: "Python Setup and Data Workflow Basics",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        isFree: true,
        duration: "19m",
      },
      {
        lectureNumber: 2,
        title: "Cleaning and Preparing Data",
        videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        isFree: true,
        duration: "26m",
      },
      {
        lectureNumber: 3,
        title: "Visualizing Patterns and Trends",
        videoUrl: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
        isFree: false,
        duration: "27m",
      },
      {
        lectureNumber: 4,
        title: "Intro to Machine Learning Models",
        videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
        isFree: false,
        duration: "33m",
      },
    ],
  },
];

const seedCourses = async () => {
  await connectDB();

  const passwordHash = await bcrypt.hash("DemoTeacher123!", 10);
  const teacher = await User.findOneAndUpdate(
    { email: teacherEmail },
    {
      $set: {
        firstName: "Demo",
        lastName: "Teacher",
        password: passwordHash,
        role: "teacher",
        picture:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        bio: "Demo instructor account used for sample LMS course content.",
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  await Course.deleteMany({ title: { $in: seededCourseTitles } });

  await Course.insertMany(
    sampleCourses.map((course) => ({
      ...course,
      teacher: teacher._id,
    }))
  );

  console.log(`Seeded ${sampleCourses.length} demo courses for ${teacherEmail}`);

  await mongoose.disconnect();
};

seedCourses().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});