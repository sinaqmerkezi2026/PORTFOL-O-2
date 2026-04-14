
"use client";

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Sparkles, Upload, FileUp, Loader2 } from 'lucide-react';
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

  // Merge static data with dynamic data from Firestore
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
      
      const newProject = {
        title: "New Dynamic Project",
        description: "This project was added dynamically via the dashboard.",
        image: "https://picsum.photos/seed/" + Math.random() + "/600/400",
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
            <h2 className="text-3xl md:text-5xl font-bold">Featured <span className="gradient-text">Projects</span></h2>
            <p className="text-muted-foreground">A collection of technical solutions and creative works from competitions and independent research.</p>
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
            <Button variant="outline" size="sm" className="rounded-full h-10 px-4" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View GitHub
              </a>
            </Button>
          </div>
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
                  data-ai-hint="technology project"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="p-6 pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {summaries[project.id] || project.description}
                </p>
                
                {!summaries[project.id] && (
                  <button
                    onClick={() => handleSummarize(project.id, project.description)}
                    disabled={loading[project.id]}
                    className="mt-4 flex items-center text-xs font-bold text-primary hover:underline disabled:opacity-50"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    {loading[project.id] ? "Summarizing..." : "AI Summarize"}
                  </button>
                )}
              </CardContent>
              
              <CardFooter className="p-6 pt-0 border-t flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Project Details</span>
                <Button variant="ghost" size="icon">
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card 
            className="border-dashed border-2 bg-transparent hover:bg-primary/5 cursor-pointer transition-colors flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px] group"
            onClick={handleUploadClick}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
              <FileUp className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg mb-1">Add Project</h4>
            <p className="text-sm text-muted-foreground">Upload your latest work to the database</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
