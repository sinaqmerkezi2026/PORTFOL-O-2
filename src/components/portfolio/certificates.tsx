
"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, Loader2 } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export function Certificates() {
  const db = useFirestore();

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

  return (
    <section id="certificates" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">Certifications & <span className="gradient-text">Badges</span></h2>
            <p className="text-muted-foreground">Official recognitions of skill mastery from top universities and global platforms.</p>
          </div>
        </div>

        {dbLoading && <div className="flex justify-center mb-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}

        <div className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCerts.map((cert) => (
              <Dialog key={cert.id}>
                <DialogTrigger asChild>
                  <Card className="glass-card cursor-pointer group hover:border-accent/50 transition-all overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 w-full bg-secondary/10">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        unoptimized={cert.image.includes('drive.google.com') || cert.image.includes('raw.githubusercontent.com')}
                      />
                      <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-all flex items-center justify-center">
                        <div className="bg-background/80 p-2 rounded-full transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Eye className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{cert.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{cert.description}</p>
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
                          unoptimized={cert.image.includes('drive.google.com') || cert.image.includes('raw.githubusercontent.com')}
                        />
                     </div>
                  </ScrollArea>
                  <div className="flex justify-end pt-4">
                     <Button variant="secondary" size="sm" asChild>
                       <a href={cert.image} target="_blank" rel="noopener noreferrer">View Original</a>
                     </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
