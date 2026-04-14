
import { portfolioData } from '@/app/lib/data';
import { Mail, Linkedin, Instagram, Phone } from 'lucide-react';

export function Contact() {
  const { email, linkedin, instagram, phone } = portfolioData.personalInfo;

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Let&apos;s <span className="gradient-text">Connect</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Whether you have a project in mind, an internship opportunity, or just want to chat about technology, I&apos;m always open to new connections!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <a href={`mailto:${email}`} className="flex items-center gap-6 p-6 bg-secondary/50 rounded-3xl border border-border group hover:border-primary/50 transition-all">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Mail className="w-7 h-7" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Email</p>
                <p className="text-lg font-medium">{email}</p>
              </div>
            </a>

            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-secondary/50 rounded-3xl border border-border group hover:border-primary/50 transition-all">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Linkedin className="w-7 h-7" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">LinkedIn</p>
                <p className="text-lg font-medium">Nicat Huseynli</p>
              </div>
            </a>

            <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-secondary/50 rounded-3xl border border-border group hover:border-primary/50 transition-all">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Instagram className="w-7 h-7" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Instagram</p>
                <p className="text-lg font-medium">@nijathuseynli</p>
              </div>
            </a>

            <div className="flex items-center gap-6 p-6 bg-secondary/50 rounded-3xl border border-border">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary">
                <Phone className="w-7 h-7" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Phone</p>
                <p className="text-lg font-medium">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
