
"use client";

import { portfolioData } from '@/app/lib/data';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export function Skills() {
  const { technical, soft, languages } = portfolioData.skills;

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">My <span className="gradient-text">Skillset</span></h2>
          <p className="text-muted-foreground">A blend of technical expertise and essential soft skills developed through rigorous training and competitions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">01</span>
              Technical Proficiency
            </h3>
            <div className="grid gap-6">
              {technical.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-1.5" />
                </div>
              ))}
            </div>
            
            <div className="pt-8 space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm">02</span>
                Languages
              </h3>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border border-border">
                    <span className="font-medium text-sm">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">03</span>
              Soft Skills & Attributes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {soft.map((skill) => (
                <div key={skill} className="flex items-center gap-3 p-4 bg-secondary/50 border rounded-xl hover:border-primary/50 transition-colors">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] group-hover:bg-primary/20 transition-all" />
               <h4 className="text-lg font-bold mb-4">Constant Learner</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">
                 I believe that staying curious and adaptable is the key to success in technology. Currently exploring deeper concepts in space engineering and cybersecurity.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
