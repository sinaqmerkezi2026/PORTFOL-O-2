
"use client";

import { portfolioData } from '@/app/lib/data';
import { Trophy, Award, Star, Binary, Code2, Hammer, School } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export function Achievements() {
  const categories = ["All", "Hackathons", "Programming", "Making", "Academic"];

  const getIcon = (category: string) => {
    switch (category) {
      case "Programming": return <Code2 className="w-8 h-8 md:w-10 md:h-10" />;
      case "Hackathons": return <Code2 className="w-8 h-8 md:w-10 md:h-10" />;
      case "Making": return <Hammer className="w-8 h-8 md:w-10 md:h-10" />;
      case "Academic": return <School className="w-8 h-8 md:w-10 md:h-10" />;
      default: return <Trophy className="w-8 h-8 md:w-10 md:h-10" />;
    }
  };

  return (
    <section id="achievements" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Key <span className="gradient-text">Achievements</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Recognition for excellence in programming, engineering, and innovative problem solving.</p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-secondary/50 p-1 rounded-full h-auto flex-wrap justify-center">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="space-y-8 animate-in fade-in duration-500">
              <div className="max-w-4xl mx-auto space-y-8">
                {portfolioData.achievements
                  .filter(ach => cat === "All" || ach.category === cat)
                  .map((achievement, idx) => (
                    <div 
                      key={idx} 
                      className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-6 md:p-10 rounded-3xl border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center">
                        {achievement.image ? (
                           <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:scale-105 transition-transform duration-500">
                             <Image 
                               src={achievement.image}
                               alt={achievement.title}
                               fill
                               className="object-cover"
                             />
                           </div>
                        ) : (
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-background border-2 border-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                            {getIcon(achievement.category)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow space-y-3 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
                            {achievement.year}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground italic">
                            {achievement.organization}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{achievement.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
