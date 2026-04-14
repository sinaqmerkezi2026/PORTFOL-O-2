
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/app/lib/data';
import { ArrowRight, Code, Trophy, Shield, FileText } from 'lucide-react';

export function Hero() {
  const { name, title, profession, cvLink } = portfolioData.personalInfo;
  const [professionIndex, setProfessionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % profession.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [profession.length]);

  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-primary font-code tracking-widest uppercase animate-in fade-in slide-in-from-left duration-700">
              {title}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-left duration-1000">
              {name}
            </h1>
            <div className="h-12 flex items-center">
              <p className="text-xl md:text-2xl font-medium text-muted-foreground transition-all duration-500 transform opacity-0 animate-in fade-in slide-in-from-bottom fill-mode-forwards" key={professionIndex}>
                {profession[professionIndex]}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <Button size="lg" className="rounded-full group" asChild>
              <a href="#projects">
                View My Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full group" asChild>
              <a href={cvLink} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary rounded-xl mb-2">
                <Code className="text-primary w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground uppercase font-medium">Dev</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary rounded-xl mb-2">
                <Trophy className="text-primary w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground uppercase font-medium">Awards</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary rounded-xl mb-2">
                <Shield className="text-primary w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground uppercase font-medium">Cyber</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center animate-in zoom-in duration-1000">
          <div className="relative w-[450px] h-[450px]">
             {/* Floating elements animation would go here */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full border border-primary/20 flex items-center justify-center p-8 overflow-hidden">
                <div className="w-full h-full bg-secondary/50 rounded-full flex items-center justify-center relative">
                   <div className="absolute top-10 right-10 p-4 bg-background border rounded-2xl shadow-2xl animate-bounce duration-[3s]">
                      <div className="text-primary font-bold">C++</div>
                   </div>
                   <div className="absolute bottom-10 left-10 p-4 bg-background border rounded-2xl shadow-2xl animate-bounce duration-[4s] delay-700">
                      <div className="text-accent font-bold">SAF Winner</div>
                   </div>
                   <div className="text-center">
                      <div className="text-6xl font-black gradient-text">NC</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
