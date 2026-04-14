
import { portfolioData } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin, Instagram, Phone, Send } from 'lucide-react';

export function Contact() {
  const { email, linkedin, instagram, phone } = portfolioData.personalInfo;

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Let&apos;s <span className="gradient-text">Connect</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you have a project in mind, an internship opportunity, or just want to chat about technology, I&apos;m always open to new connections!
              </p>
            </div>

            <div className="grid gap-6">
              <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Email</p>
                  <p className="text-lg font-medium">{email}</p>
                </div>
              </a>

              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">LinkedIn</p>
                  <p className="text-lg font-medium">Nicat Huseynli</p>
                </div>
              </a>

              <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Instagram</p>
                  <p className="text-lg font-medium">@nicathuseynli</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Phone</p>
                  <p className="text-lg font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input type="text" className="w-full p-3 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Email</label>
                    <input type="email" className="w-full p-3 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input type="text" className="w-full p-3 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows={4} className="w-full p-3 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="How can I help you?"></textarea>
                </div>
                <Button className="w-full rounded-full py-6 group" size="lg">
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
