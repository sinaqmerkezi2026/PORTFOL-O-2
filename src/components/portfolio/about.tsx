
import { portfolioData } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, GraduationCap, Users } from 'lucide-react';

export function About() {
  const { aboutMe, location, email, phone } = portfolioData.personalInfo;

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              A Little <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutMe}
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="glass-card border-primary/20 bg-primary/5">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-black tracking-tight">Education & Scholarships</h3>
                  </div>
                  <div className="space-y-6">
                    {portfolioData.educationDetails.map((edu, idx) => (
                      <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                        <p className="text-lg font-bold leading-tight mb-1">{edu.title}</p>
                        <p className="text-sm text-muted-foreground font-medium italic">{edu.meta}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Schooling</p>
                    <p className="font-bold text-primary">{portfolioData.personalInfo.education}</p>
                  </div>
                </CardContent>
             </Card>

             <Card className="glass-card">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-accent" />
                    <h3 className="text-2xl font-black tracking-tight">Community</h3>
                  </div>
                  {portfolioData.volunteering.map((vol, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <p className="text-lg font-bold">{vol.title}</p>
                        <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-bold">{vol.year}</span>
                      </div>
                      <p className="text-sm text-primary font-semibold">{vol.organization}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{vol.description}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t">
                    <h4 className="text-sm font-black text-muted-foreground uppercase mb-4 tracking-widest">Academic Records</h4>
                    {portfolioData.testScores.map((score, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-secondary p-4 rounded-xl border border-border">
                        <span className="text-sm font-bold">{score.exam}</span>
                        <div className="text-right">
                          <span className="text-xl font-black text-primary">{score.score}</span>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">{score.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
