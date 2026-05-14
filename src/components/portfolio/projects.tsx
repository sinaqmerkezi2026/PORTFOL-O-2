
"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export function Projects() {
  const db = useFirestore();

  const projectsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbProjects, loading: dbLoading } = useCollection(projectsQuery);

  const allProjects = useMemo(() => {
    const firestoreProjects = dbProjects?.map(doc => ({
      id: doc.id,
      ...doc
    })) || [];
    return [...firestoreProjects, ...portfolioData.projects];
  }, [dbProjects]);

  return (
    <section id="projects" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">Featured <span className="gradient-text">Work</span></h2>
            <p className="text-muted-foreground">Founder roles and technical solutions from competitions and independent research.</p>
          </div>
        </div>

        {/* Founder Emphasis Section */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Founder Spotlight
          </h3>
          {portfolioData.founderProjects.map((project) => (
            <Card key={project.id} className="glass-card border-primary/40 bg-primary/5 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-black px-4 py-1">FOUNDER</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                  <div>
                    <h4 className="text-3xl lg:text-4xl font-black mb-2">{project.title}</h4>
                    <p className="text-primary font-bold uppercase tracking-tighter text-sm">{project.role}</p>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-primary/30 text-primary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button className="rounded-full px-8 gap-2 group" asChild>
                      <a href={(project as any).liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Platform
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-8">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Competition Projects</h3>
        </div>

        {dbLoading && <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project) => (
            <Card key={project.id} className="glass-card flex flex-col group overflow-hidden h-full">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <CardHeader className="p-6 pb-0">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex justify-end">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
                  <a href={(project as any).liveUrl || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
