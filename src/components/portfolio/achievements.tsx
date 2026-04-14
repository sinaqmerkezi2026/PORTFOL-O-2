
import { portfolioData } from '@/app/lib/data';
import { Trophy, Award, Star } from 'lucide-react';

export function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Key <span className="gradient-text">Achievements</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Recognition for excellence in programming, engineering, and innovative problem solving.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {portfolioData.achievements.map((achievement, idx) => (
            <div 
              key={idx} 
              className="group relative flex gap-6 md:gap-12 p-6 md:p-10 rounded-3xl border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-background border-2 border-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  {idx % 3 === 0 ? <Trophy className="w-8 h-8 md:w-10 md:h-10" /> : idx % 3 === 1 ? <Award className="w-8 h-8 md:w-10 md:h-10" /> : <Star className="w-8 h-8 md:w-10 md:h-10" />}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
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
      </div>
    </section>
  );
}
