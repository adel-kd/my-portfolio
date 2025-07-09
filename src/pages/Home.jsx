import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Adel Kedir"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Adel Kedir</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer & Problem Solver
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              I build modern web applications using the MERN stack, create intuitive user experiences, 
              and solve complex problems with clean, efficient code. Based in Ethiopia, working globally.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('#portfolio')}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center px-8 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="mailto:adel@adelkedir.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <Mail className="h-6 w-6" />
            </a>
            <a href="https://github.com/adelkedir" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/adelkedir" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Technologies I Work With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React.js', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' },
              { name: 'Node.js', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' },
              { name: 'MongoDB', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300' },
              { name: 'Express.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
              { name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' },
              { name: 'JWT Auth', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' },
              { name: 'Docker', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300' },
              { name: 'Git & GitHub', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' },
            ].map((skill, index) => (
              <div key={index} className={`${skill.color} rounded-lg p-4 text-center font-medium`}>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Phone className="h-5 w-5 mr-2" />
              +251 921 806 620
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="h-5 w-5 mr-2" />
              adel@adelkedir.com
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5 mr-2" />
              Ethiopia
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;