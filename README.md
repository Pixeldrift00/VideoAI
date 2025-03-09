# VideoAI - AI-Powered Video Creation Platform

<div align="center">

![VideoAI Logo](https://api.dicebear.com/7.x/identicon/svg?seed=videoai&backgroundColor=0891b2&radius=50)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite)](https://vitejs.dev/)

</div>

## 🚀 Overview

VideoAI is a cutting-edge platform that leverages artificial intelligence to transform content creation. Our platform enables creators to generate professional video scripts, visualize content, and publish directly to social media platforms with minimal effort.

### ✨ Key Features

- **AI-Powered Script Generation**: Create compelling video scripts tailored to your niche and tone
- **Real-time Preview**: Visualize your content as it's being created
- **Multi-platform Publishing**: Seamlessly publish to YouTube, TikTok, and more
- **Customizable Templates**: Adapt content to your brand's unique style
- **Project Management**: Organize and track all your video projects in one place

## 📋 Table of Contents

- [Installation](#-installation)
- [Usage](#-usage)
- [Development](#-development)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

## 🔧 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/videoai.git
cd videoai

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🎮 Usage

### Dashboard Navigation

The VideoAI platform is organized into three main sections:

1. **Dashboard**: Your command center for creating and managing video projects
2. **My Videos**: Library of all your generated videos
3. **History**: Archive of your script iterations and changes

### Creating Your First Video

1. Click the floating action button (+ icon) in the bottom right
2. Select "New Project"
3. Configure your script settings:
   - Select an AI model
   - Choose your content niche
   - Set your preferred tone
   - Adjust the video length
4. Click "Generate Script"
5. Edit the generated script as needed
6. Use the AI improvement options for quick enhancements
7. Preview your video in the right panel
8. Save or publish your project

### Social Media Integration

Configure platform-specific settings for each social media channel:

- **YouTube**: Title, description, tags, and category
- **TikTok**: Caption and hashtags

## 💻 Development

### Project Structure

```
src/
├── components/     # UI components
│   ├── dashboard/  # Dashboard-specific components
│   └── ui/         # Shadcn UI components
├── lib/           # Utilities and store
├── stories/       # Component stories
└── types/         # TypeScript type definitions
```

### Key Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form, Zod
- **Backend Integration**: Supabase (optional)

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Architecture

VideoAI follows a component-based architecture with a central state management system:

- **Store**: Central state management using Zustand
- **Components**: Modular, reusable UI components
- **Services**: API integrations for AI and social media platforms

### Data Flow

1. User configures script parameters
2. AI service generates script content
3. Script is stored in application state
4. Video preview is generated based on script
5. User can edit, save, or publish the content

## 🤝 Contributing

We welcome contributions to VideoAI! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

We use ESLint and Prettier for code formatting. Please ensure your code follows our style guidelines by running:

```bash
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**VideoAI** - Transform your content creation workflow

[Website](https://example.com) • [Documentation](https://example.com/docs) • [Support](mailto:support@example.com)

</div>
