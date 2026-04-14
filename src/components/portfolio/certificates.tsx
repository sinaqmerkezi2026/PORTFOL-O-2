
"use client";

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Upload, FileUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, errorEmitter } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';

export function Certificates() {
  const { toast } = useToast();
  const db = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["All", "Education", "Programming", "Leadership"];

  const certsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'certificates'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbCerts, loading: dbLoading } = useCollection(certsQuery);

  const allCerts = useMemo(() => {
    const firestoreCerts = dbCerts?.map(doc => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      image: doc.image,
      category: (doc as any).category || "Education"
    })) || [];
    return [...firestoreCerts, ...portfolioData.certificates];
  }, [dbCerts]);

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
        const newCert = {
          title: file.name.split('.')[0].replace(/-/g, ' '),
          description: `Certification verification for ${file.name}. Stored persistently in Firestore.`,
          image: dataUrl,
          category: "Education",
          createdAt: serverTimestamp()
        };

        addDoc(collection(db, 'certificates'), newCert)
          .then(() => {
            setIsUploading(false);
            toast({
              title: "Certificate Saved",
              description: `${file.name} has been added to your collection.`,
            });
          })
          .catch(async (error) => {
            setIsUploading(false);
            const permissionError = new FirestorePermissionError({
              path: 'certificates',
              operation: 'create',
              requestResourceData: newCert
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="certificates" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">Certifications & <span className="gradient-text">Badges</span></h2>
            <p className="text-muted-foreground">Official recognitions of skill mastery and training program completions, including Coursera and Technest verified certifications.</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="application/pdf,image/*" 
              onChange={handleFileChange}
            />
            <Button 
              onClick={handleUploadClick} 
              variant="outline" 
              className="rounded-full border-primary/50 hover:bg-primary/10 group"
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />}
              {isUploading ? "Saving..." : "Upload New Cert"}
            </Button>
          </div>
        </div>

        {dbLoading && <div className="flex justify-center mb-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-background/50 p-1 rounded-full h-auto border">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allCerts
                  .filter(cert => cat === "All" || cert.category === cat)
                  .map((cert) => (
                    <Dialog key={cert.id}>
                      <DialogTrigger asChild>
                        <Card className="glass-card cursor-pointer group hover:border-accent/50 transition-all overflow-hidden h-full">
                          <div className="relative h-48 w-full">
                            <Image
                              src={cert.image}
                              alt={cert.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-all flex items-center justify-center">
                              <div className="bg-background/80 p-2 rounded-full transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <Eye className="w-6 h-6 text-accent" />
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{cert.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{cert.description}</p>
                            <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-tighter text-accent bg-accent/10 px-2 py-0.5 rounded">
                              {cert.category}
                            </span>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>{cert.title}</DialogTitle>
                          <DialogDescription>{cert.description}</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] w-full mt-4">
                           <div className="relative aspect-[4/3] w-full bg-secondary/20 rounded-xl overflow-hidden">
                             <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-contain"
                              />
                           </div>
                        </ScrollArea>
                        <div className="flex justify-end pt-4">
                           <Button variant="secondary" size="sm">Download PDF</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}

                {cat === "All" && (
                  <Card 
                    className="border-dashed border-2 bg-transparent hover:bg-primary/5 cursor-pointer transition-colors flex flex-col items-center justify-center p-12 text-center"
                    onClick={handleUploadClick}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                      <FileUp className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg mb-1">Add Another</h4>
                    <p className="text-sm text-muted-foreground">Save your certificate to the cloud</p>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
