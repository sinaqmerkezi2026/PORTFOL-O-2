
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye } from 'lucide-react';

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof portfolioData.certificates[0] | null>(null);

  return (
    <section id="certificates" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Certifications & <span className="gradient-text">Badges</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Official recognitions of skill mastery and training program completions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.certificates.map((cert) => (
            <Dialog key={cert.id}>
              <DialogTrigger asChild>
                <Card className="glass-card cursor-pointer group hover:border-accent/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 w-full">
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
                    <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{cert.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>{cert.title}</DialogTitle>
                  <DialogDescription>{cert.description}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-full w-full">
                   <div className="relative aspect-[4/3] w-full">
                     <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                   </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
