import React from 'react';
import { Code, Database, Server, Smartphone, Globe, Users } from 'lucide-react';

const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Full Stack Developer passionate about creating innovative solutions and building 
            meaningful digital experiences that make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Adel Kedir working"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              My Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm a passionate Full Stack Developer based in Ethiopia with expertise in the MERN stack. 
              My journey in software development began with a fascination for problem-solving and has 
              evolved into a career focused on creating impactful digital solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I specialize in building modern web applications using React.js, Node.js, Express, and MongoDB. 
              My experience includes developing complex systems like programming forums, garage management 
              systems, and e-commerce platforms inspired by industry leaders like Netflix and Amazon.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
              and sharing my knowledge with the developer community. I believe in continuous learning and 
              staying updated with the latest industry trends.
            </p>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: 'Frontend Development',
                description: 'React.js, TypeScript, HTML5, CSS3, Tailwind CSS, responsive design'
              },
              {
                icon: <Server className="h-8 w-8 text-green-600 dark:text-green-400" />,
                title: 'Backend Development',
                description: 'Node.js, Express.js, RESTful APIs, GraphQL, microservices architecture'
              },
              {
                icon: <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
                title: 'Database Management',
                description: 'MongoDB, PostgreSQL, Redis, database design, optimization'
              },
              {
                icon: <Smartphone className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: 'Mobile Development',
                description: 'React Native, progressive web apps, cross-platform development'
              },
              {
                icon: <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400" />,
                title: 'DevOps & Deployment',
                description: 'Docker, AWS, Firebase, CI/CD, version control with Git'
              },
              {
                icon: <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
                title: 'Project Management',
                description: 'Agile methodologies, team collaboration, client communication'
              }
            ].map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {skill.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Experience & Education
          </h2>
          <div className="max-w-4xl mx-auto">
            {[
              {
                period: '2023 - Present',
                title: 'Full Stack Developer',
                organization: 'Freelance',
                description: 'Building custom web applications for clients worldwide, specializing in MERN stack development and modern frontend frameworks.'
              },
              {
                period: '2022 - 2023',
                title: 'Software Developer',
                organization: 'Tech Solutions Company',
                description: 'Developed and maintained multiple web applications, implemented REST APIs, and collaborated with cross-functional teams.'
              },
              {
                period: '2020 - 2022',
                title: 'Computer Science Studies',
                organization: 'University',
                description: 'Focused on software engineering principles, data structures, algorithms, and web development technologies.'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 mb-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {item.period}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {item.organization}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <button
            onClick={() => scrollToSection('#contact')}
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;