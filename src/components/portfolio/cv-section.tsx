
"use client";

import { portfolioData } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function CVSection() {
  const { name, email, linkedin, aboutMe, location, cvLink } = portfolioData.personalInfo;

  return (
    <section id="cv" className="section-padding bg-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Curriculum <span className="gradient-text">Vitae</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Access my professional records and detailed technical background for recruitment and collaboration purposes.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left Panel: Preview/Info */}
                <div className="p-8 bg-primary/5 border-r border-border">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                      <FileText className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{name}</h3>
                      <p className="text-sm text-muted-foreground">{location}</p>
                    </div>
                    <div className="w-full space-y-3 pt-4">
                      <Button className="w-full rounded-xl gap-2" size="lg" asChild>
                        <a href={cvLink} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl gap-2" asChild>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Highlights */}
                <div className="lg:col-span-2 p-8 lg:p-12 space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Executive Summary</h4>
                    <p className="text-muted-foreground leading-relaxed italic">
                      &quot;{aboutMe}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Top Qualifications</h4>
                      <ul className="space-y-3">
                        {portfolioData.achievements.slice(0, 3).map((ach, idx) => (
                          <li key={idx} className="flex gap-3 text-sm">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span>{ach.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Core Technology</h4>
                      <div className="flex flex-wrap gap-2">
                        {portfolioData.skills.technical.map(skill => (
                          <span key={skill.name} className="text-xs font-bold bg-secondary px-3 py-1 rounded-md border border-border">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {email}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                        Last Updated: May 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
