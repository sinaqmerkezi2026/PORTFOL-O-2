
"use client";

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Sparkles, Upload, FileUp, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { summarizeProjectDescription } from '@/ai/flows/summarize-project-description';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, errorEmitter } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';

export function Projects() {
  const { toast } = useToast();
  const db = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && db) {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const newProject = {
          title: "New Project: " + file.name.split('.')[0],
          description: "This project was added dynamically. It showcases my latest work and technical skills.",
          image: dataUrl,
          github: "https://github.com",
          tags: ["New", "Dynamic"],
          createdAt: serverTimestamp()
        };

        addDoc(collection(db, 'projects'), newProject)
          .then(() => {
            setIsUploading(false);
            toast({
              title: "Project Added",
              description: `${file.name} has been saved to the database.`,
            });
          })
          .catch(async (error) => {
            setIsUploading(false);
            const permissionError = new FirestorePermissionError({
              path: 'projects',
              operation: 'create',
              requestResourceData: newProject
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSummarize = async (projectId: string, description: string) => {
    setLoading(prev => ({ ...prev, [projectId]: true }));
    try {
      const result = await summarizeProjectDescription({ projectDescription: description, maxLengthWords: 30 });
      setSummaries(prev => ({ ...prev, [projectId]: result.summary }));
    } catch (error) {
      console.error("Failed to summarize:", error);
    } finally {
      setLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  return (
    <section id="projects" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">Featured <span className="gradient-text">Work</span></h2>
            <p className="text-muted-foreground">Founder roles and technical solutions from competitions and independent research.</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <Button 
              onClick={handleUploadClick} 
              variant="outline" 
              className="rounded-full border-primary/50 hover:bg-primary/10 group"
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />}
              {isUploading ? "Adding..." : "Add Project"}
            </Button>
          </div>
        </div>

        {/* Founder Emphasis Section */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
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
                    <Button className="rounded-full px-8 gap-2 group">
                      Live Platform
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="rounded-full px-8 gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
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
                  {summaries[project.id] || project.description}
                </p>
                
                {!summaries[project.id] && (
                  <button
                    onClick={() => handleSummarize(project.id, project.description)}
                    disabled={loading[project.id]}
                    className="mt-4 flex items-center text-xs font-bold text-primary hover:underline disabled:opacity-50"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    {loading[project.id] ? "Summarizing..." : "AI Summarize Description"}
                  </button>
                )}
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex justify-end">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card 
            className="border-dashed border-2 bg-transparent hover:bg-primary/5 cursor-pointer transition-colors flex flex-col items-center justify-center p-12 text-center h-full min-h-[300px] group"
            onClick={handleUploadClick}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
              <FileUp className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-1">Add Another Project</h4>
            <p className="text-sm text-muted-foreground">Showcase your latest competition entry</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
