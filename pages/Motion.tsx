import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  client: string;
  director: string;
  dop: string;
  videoPoster: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Ethereal Drift",
    client: "Vogue Italia",
    director: "Alexander Riviera",
    dop: "Sarah Jenkins",
    videoPoster: "https://picsum.photos/1920/1080?random=1"
  },
  {
    id: 2,
    title: "Neon Silence",
    client: "Saint Laurent",
    director: "Alexander Riviera",
    dop: "Marcus Thorne",
    videoPoster: "https://picsum.photos/1920/1080?random=2"
  },
  {
    id: 3,
    title: "Concrete Echoes",
    client: "Adidas Y-3",
    director: "Alexander Riviera",
    dop: "Elena Kova",
    videoPoster: "https://picsum.photos/1920/1080?random=3"
  }
];

const Motion: React.FC = () => {
  return (
    <div className="flex-grow w-full min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-[80%] lg:max-w-[60%]">
        
        {projects.map((project) => (
          <div key={project.id} className="w-full mb-[100px] last:mb-0">
            {/* Video Container */}
            <div className="w-full aspect-video bg-gray-100 overflow-hidden relative group cursor-pointer">
              {/* Using an image as a placeholder for the video to ensure visual stability in this demo. 
                  In a real app, this would be a <video> tag. */}
              <img 
                src={project.videoPoster} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                 <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg backdrop-blur-sm">
                   <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1"></div>
                 </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-6 flex flex-col items-start text-left">
              {/* Title: Serif */}
              <h2 className="font-serif text-2xl md:text-3xl text-black mb-3 font-light tracking-tight">
                {project.title}
              </h2>

              {/* Credits: Sans-Serif, 10px, Tight Line Height */}
              <div className="font-sans text-[10px] leading-[1.4] tracking-widest uppercase text-gray-500 space-y-0.5">
                <p><span className="text-black font-medium">Client:</span> {project.client}</p>
                <p><span className="text-black font-medium">Director:</span> {project.director}</p>
                <p><span className="text-black font-medium">DOP:</span> {project.dop}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Motion;