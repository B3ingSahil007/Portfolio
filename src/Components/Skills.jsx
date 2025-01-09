import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaPython } from 'react-icons/fa';
import { SiMui, SiExpress, SiMongodb, SiTailwindcss, SiFirebase, SiFigma, SiVercel, SiHeroku } from 'react-icons/si';
import { VscCode as VscVscode } from 'react-icons/vsc';
import Title from './Title';

const Skills = () => {
  return (
    <>
      <div className="skills">
        {/* Title Section */}
        <Title title="My Skills" />

        {/* Skills Categories */}
        <div className="skills-categories flex flex-wrap justify-center gap-16">
          {/* Frontend Skills */}
          <div className="frontend-skills text-center">
            <h2 className="text-xl font-semibold text-[#2c5364] mb-4">Frontend Development</h2>
            <div className="skills-list grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaHtml5 className="text-4xl mb-2 mx-auto text-[#E34F26]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>HTML</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaCss3Alt className="text-4xl mb-2 mx-auto text-[#1572B6]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>CSS</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaJs className="text-4xl mb-2 mx-auto text-[#F7DF1E]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>JavaScript</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaReact className="text-4xl mb-2 mx-auto text-[#61DAFB]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>ReactJS</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaBootstrap className="text-4xl mb-2 mx-auto text-[#7952B3]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Bootstrap</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiMui className="text-4xl mb-2 mx-auto text-[#007FFF]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Material-UI</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiTailwindcss className="text-4xl mb-2 mx-auto text-[#06B6D4]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Backend Skills */}
          <div className="backend-skills text-center">
            <h2 className="text-xl font-semibold text-[#2c5364] mb-4">Backend Development</h2>
            <div className="skills-list grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaNodeJs className="text-4xl mb-2 mx-auto text-[#8CC84B]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Node.js</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiExpress className="text-4xl mb-2 mx-auto text-[#000000]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Express.js</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaPython className="text-4xl mb-2 mx-auto text-[#306998]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Python</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiMongodb className="text-4xl mb-2 mx-auto text-[#47A248]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>MongoDB</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiFirebase className="text-4xl mb-2 mx-auto text-[#FFCB2B]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Firebase</span>
              </div>
            </div>
          </div>

          {/* Tools & Version Control */}
          <div className="tools-skills text-center">
            <h2 className="text-xl font-semibold text-[#2c5364] mb-4">Tools & Version Control</h2>
            <div className="skills-list grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaGitAlt className="text-4xl mb-2 mx-auto text-[#F1502F]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Git</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <FaGithub className="text-4xl mb-2 mx-auto text-[#181717]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>GitHub</span>
              </div>
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <VscVscode className="text-4xl mb-2 mx-auto text-[#0066B8]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>VS Code</span>
              </div>
            </div>
          </div>

          <div className="other-tools-skills text-center -mt-10">
            <h2 className="text-xl font-semibold text-[#2c5364] mb-4">Other Tools / Technologies</h2>
            <div className="skills-list grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* Figma */}
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiFigma className="text-4xl mb-2 mx-auto text-[#F24E1E]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Figma</span>
              </div>

              {/* Vercel */}
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiVercel className="text-4xl mb-2 mx-auto text-[#000000]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Vercel</span>
              </div>

              {/* Heroku */}
              <div className="skill text-white p-3 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:scale-110 hover:shadow-lg transition ease-linear duration-400">
                <SiHeroku className="text-4xl mb-2 mx-auto text-[#6762A6]" />
                <span style={{ textShadow: '2px 2px 5px black' }}>Heroku</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
