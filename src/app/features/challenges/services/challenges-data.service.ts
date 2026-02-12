import { Injectable } from '@angular/core';
import { Challenge } from '@core/models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengesDataService {
  
  getMockChallenges(): Challenge[] {
    return [
      {
        id: '1',
        title: 'Build a Responsive Dashboard',
        description: 'Create a fully responsive admin dashboard with data visualization, interactive charts, and real-time updates. Focus on clean UI and smooth animations.',
        difficulty: 'Intermediate',
        points: 250,
        participants: 1247,
        progress: 65,
        category: 'Web Development',
        status: 'Active',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Design a Modern Landing Page',
        description: 'Design and code a modern landing page for a SaaS product with smooth animations, call-to-action sections, and mobile responsiveness.',
        difficulty: 'Beginner',
        points: 150,
        participants: 2893,
        category: 'UI/UX Design',
        status: 'Active',
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'API Integration Challenge',
        description: 'Integrate multiple third-party APIs (weather, maps, payments) and build a unified data dashboard with error handling and caching.',
        difficulty: 'Advanced',
        points: 400,
        participants: 654,
        progress: 30,
        category: 'Backend Development',
        status: 'Active',
        createdAt: new Date('2024-01-28'),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'Mobile App Prototype',
        description: 'Create an interactive prototype for a mobile fitness tracking app using Figma or similar tools. Include user flows and micro-interactions.',
        difficulty: 'Intermediate',
        points: 300,
        participants: 892,
        category: 'Mobile Development',
        status: 'Active',
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date()
      },
      {
        id: '5',
        title: 'E-commerce Checkout Flow',
        description: 'Build a complete checkout flow with cart management, payment integration, and order confirmation. Emphasize UX and security.',
        difficulty: 'Advanced',
        points: 500,
        participants: 445,
        category: 'Web Development',
        status: 'Active',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date()
      },
      {
        id: '6',
        title: 'AI Chatbot Interface',
        description: 'Create a conversational UI for an AI chatbot with natural language processing, chat history, and typing indicators.',
        difficulty: 'Advanced',
        points: 450,
        participants: 567,
        category: 'AI/ML',
        status: 'Active',
        createdAt: new Date('2024-02-07'),
        updatedAt: new Date()
      },
      {
        id: '7',
        title: 'Portfolio Website',
        description: 'Build a stunning portfolio website to showcase your work. Include project galleries, about section, and contact form.',
        difficulty: 'Beginner',
        points: 100,
        participants: 3421,
        category: 'Web Development',
        status: 'Active',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date()
      },
      {
        id: '8',
        title: 'Data Visualization Dashboard',
        description: 'Create interactive charts and graphs using D3.js or Chart.js. Display sales data, user analytics, and trends.',
        difficulty: 'Intermediate',
        points: 350,
        participants: 789,
        category: 'Data Science',
        status: 'Active',
        createdAt: new Date('2024-02-02'),
        updatedAt: new Date()
      },
      {
        id: '9',
        title: 'Social Media Clone',
        description: 'Build a simplified social media platform with posts, likes, comments, and user profiles. Focus on real-time updates.',
        difficulty: 'Advanced',
        points: 600,
        participants: 321,
        category: 'Full Stack',
        status: 'Active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date()
      },
      {
        id: '10',
        title: 'Animation Showcase',
        description: 'Create a collection of smooth CSS and JavaScript animations. Include hover effects, page transitions, and loading animations.',
        difficulty: 'Beginner',
        points: 120,
        participants: 2156,
        category: 'Frontend',
        status: 'Active',
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date()
      },
      {
        id: '11',
        title: 'Authentication System',
        description: 'Implement a secure authentication system with JWT, password reset, email verification, and OAuth integration.',
        difficulty: 'Advanced',
        points: 480,
        participants: 678,
        category: 'Backend Development',
        status: 'Active',
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date()
      },
      {
        id: '12',
        title: 'Task Management App',
        description: 'Build a Trello-like task management application with drag-and-drop, categories, deadlines, and team collaboration.',
        difficulty: 'Intermediate',
        points: 320,
        participants: 1043,
        category: 'Full Stack',
        status: 'Active',
        createdAt: new Date('2024-02-04'),
        updatedAt: new Date()
      }
    ];
  }

  getCategories(): string[] {
    return [
      'All Categories',
      'Web Development',
      'Mobile Development',
      'UI/UX Design',
      'Backend Development',
      'Frontend',
      'Full Stack',
      'Data Science',
      'AI/ML',
      'DevOps',
      'Cybersecurity'
    ];
  }

  getDifficulties(): string[] {
    return ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  }

  getPointRanges(): { label: string; min: number; max: number }[] {
    return [
      { label: 'All Points', min: 0, max: Infinity },
      { label: '100-200 pts', min: 100, max: 200 },
      { label: '200-300 pts', min: 200, max: 300 },
      { label: '300-400 pts', min: 300, max: 400 },
      { label: '400+ pts', min: 400, max: Infinity }
    ];
  }

  getSortOptions(): { label: string; value: string }[] {
    return [
      { label: 'Most Popular', value: 'popular' },
      { label: 'Highest Points', value: 'points-high' },
      { label: 'Lowest Points', value: 'points-low' },
      { label: 'Newest', value: 'newest' },
      { label: 'Oldest', value: 'oldest' }
    ];
  }
}
