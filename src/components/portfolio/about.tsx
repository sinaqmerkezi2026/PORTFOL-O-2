
import { portfolioData } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export function About() {
  const { aboutMe, location, email, phone, linkedin } = portfolioData.personalInfo;

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
             <Card className="glass-card">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-primary">Education</h3>
                  <p className="text-sm leading-relaxed">
                    {portfolioData.personalInfo.education}
                  </p>
                  <div className="space-y-3 pt-2">
                    {portfolioData.educationDetails.map((edu, idx) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4 py-1">
                        <p className="text-sm font-semibold">{edu.title}</p>
                        <p className="text-xs text-muted-foreground">{edu.meta}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
             </Card>

             <Card className="glass-card">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-accent">Volunteering</h3>
                  {portfolioData.volunteering.map((vol, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold">{vol.title}</p>
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">{vol.year}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{vol.organization}</p>
                      <p className="text-xs leading-relaxed italic">{vol.description}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-bold text-primary mb-2">Tests</h3>
                    {portfolioData.testScores.map((score, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded-lg">
                        <span className="text-xs font-medium">{score.exam}</span>
                        <span className="text-sm font-black text-primary">{score.score}</span>
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
