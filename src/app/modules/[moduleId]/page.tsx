
'use client';

import { useParams } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { modules } from '@/lib/modules';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, Download, FileText, Info, Link as LinkIcon, PlayCircle, Speaker } from 'lucide-react';
import Image from 'next/image';

const moduleData: { [key: string]: any } = {
  'module-2': {
    title: 'ENTENDENDO O SONO',
    subtitle: 'Fundamentos, ciclos e práticas para melhorar a qualidade do seu descanso.',
    shortDescription:
      'Neste módulo você vai entender o que acontece enquanto dormimos — os estágios do sono, por que eles importam e quais hábitos impactam a qualidade do descanso. Conteúdo prático para aplicar hoje mesmo.',
    learningObjectives: [
      'Compreender os principais estágios do sono (NREM e REM) e suas funções.',
      'Identificar fatores que prejudicam e que favorecem um sono reparador.',
      'Aplicar ao menos 4 práticas de higiene do sono na sua rotina noturna.',
      'Analisar mudanças pessoais no sono usando um checklist simples.',
    ],
    videos: [
      {
        label: 'Vídeo 1 — Introdução aos ciclos do sono',
        duration: '10–15 min',
      },
      {
        label: 'Vídeo 2 — O que atrapalha o sono (luz, hábitos, alimentação)',
        duration: '10–15 min',
      },
      {
        label: 'Vídeo 3 — Rotina prática e dicas imediatas para dormir melhor',
        duration: '10–20 min',
      },
    ],
    resources: [
      {
        type: 'PDF',
        title: 'Checklist — Higiene do Sono (passo a passo)',
        icon: FileText,
      },
      {
        type: 'Link',
        title: 'Artigo complementar — Entendendo o sono',
        icon: LinkIcon,
      },
      {
        type: 'Template',
        title: 'Diário de sono (modelo para impressão)',
        icon: FileText,
      },
    ],
    instructorNote:
      'Assista aos vídeos na ordem e realize anotações rápidas ao final de cada vídeo. Experimente as práticas por pelo menos 7 noites e registre melhorias no diário de sono. Se algo não funcionar, ajuste pequenos detalhes (luz, temperatura, horário).',
  },
  'module-3': {
    title: 'TÉCNICAS DE RELAXAMENTO',
    subtitle: 'Práticas guiadas para reduzir ansiedade e preparar o corpo para o sono',
    shortDescription: 'Aprenda técnicas simples e eficazes — respiração, relaxamento muscular e visualização — para acalmar a mente e facilitar o adormecer. Conteúdo prático com áudios e vídeos para seguir passo a passo.',
    learningObjectives: [
      'Executar 3 técnicas práticas de relaxamento: respiração guiada, relaxamento muscular progressivo e visualização.',
      'Reduzir sinais físicos de tensão em 10–15 minutos por meio de práticas guiadas.',
      'Criar uma rotina noturna de relaxamento adaptável ao seu horário.',
    ],
    videos: [
      { label: 'Vídeo 1 — Respiração guiada (técnica 4-4-6)', duration: '6–10 min', youtubeUrl: '{{YOUTUBE_URL_1}}' },
      { label: 'Vídeo 2 — Relaxamento muscular progressivo (pescoço aos pés)', duration: '10–15 min', youtubeUrl: '{{YOUTUBE_URL_2}}' },
      { label: 'Vídeo 3 — Visualização guiada para sono profundo', duration: '8–15 min', youtubeUrl: '{{YOUTUBE_URL_3}}' },
    ],
    resources: [
      { type: 'Áudio MP3', title: 'Respiração guiada — 6 minutos', icon: Speaker, url: '{{AUDIO_RESPIRACAO_URL}}' },
      { type: 'Áudio MP3', title: 'Relaxamento progressivo — 12 minutos', icon: Speaker, url: '{{AUDIO_RELAXAMENTO_URL}}' },
      { type: 'PDF', title: 'Guia prático — Rotina de relaxamento', icon: FileText, url: '{{PDF_GUIA_URL}}' },
      { type: 'Template', title: 'Modelo de diário de prática', icon: LinkIcon, url: '{{TEMPLATE_DIARIO_URL}}' },
    ],
    estimatedTime: '30–50 minutos',
    instructorNote: 'Assista aos vídeos na ordem e pratique cada técnica ao menos uma vez durante a sessão. Use fones de ouvido para os áudios. Comece em um ambiente tranquilo e segure um diário por 1 minuto após a prática para anotar sensações. Repita diariamente por 7 dias para avaliar diferenças.',
    cta: {
      primary: { label: 'Iniciar prática', action: 'startGuidedPractice' },
      secondary: { label: 'Marcar como concluído', action: 'markModuleComplete' },
    },
    practiceChecklist: [
      { id: 'tech1', label: 'Técnica de respiração guiada', completed: false },
      { id: 'tech2', label: 'Relaxamento muscular progressivo', completed: false },
      { id: 'tech3', label: 'Visualização para sono profundo', completed: false },
    ]
  }
};

const VideoCard = ({ label, duration }: { label: string; duration: string }) => (
    <Card className="overflow-hidden bg-card/70 transition-shadow hover:shadow-lg">
      <div className="relative aspect-video bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{label}</h3>
        <p className="text-xs text-muted-foreground">{duration}</p>
        <Button variant="outline" size="sm" className="mt-3 w-full">
          <PlayCircle className="mr-2 h-4 w-4" />
          Assistir
        </Button>
      </CardContent>
    </Card>
  );

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const moduleInfo = modules.find((m) => m.id === moduleId);
  const content = moduleData[moduleId];

  if (!moduleInfo) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Módulo não encontrado.</p>
      </div>
    );
  }

  // Render generic page if no specific content is available
  if (!content) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <h1 className="text-4xl font-bold">{moduleInfo.title}</h1>
            <p className="text-lg text-muted-foreground">
              Conteúdo da aula aqui...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Specific layout for Module 3
  if (moduleId === 'module-3') {
    const progressValue = content.practiceChecklist.filter((item: any) => item.completed).length / content.practiceChecklist.length * 100;
    return (
      <div className="flex min-h-screen w-full flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
        <DashboardHeader />
        <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                        {content.title}
                        </h1>
                        <p className="mt-1 text-lg text-muted-foreground">
                        {content.subtitle}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:w-1/4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className='text-muted-foreground'>Progresso</span>
                            <span className='font-semibold text-foreground'>{Math.round(progressValue)}%</span>
                        </div>
                        <Progress value={progressValue} className="mt-1 h-2" indicatorClassName="bg-[hsl(var(--progress))]"/>
                    </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column (Videos) */}
              <div className="space-y-6 lg:col-span-2">
                {content.videos.map((video: any, index: number) => (
                  <VideoCard key={index} label={video.label} duration={video.duration} />
                ))}
              </div>

              {/* Right Column (Details) */}
              <div className="space-y-6">
                <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle>Sobre este módulo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{content.shortDescription}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      Recursos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {content.resources.map((res: any, i: number) => {
                      const Icon = res.icon;
                      return (
                        <Button key={i} variant="outline" className="w-full justify-start">
                          <Icon className="mr-2 h-4 w-4" />
                          {res.title}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
                
                <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle>Checklist da Prática</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {content.practiceChecklist.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${item.completed ? 'bg-primary' : 'bg-border'}`}>
                                {item.completed && <Check className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <label className="text-sm text-foreground cursor-pointer flex-1">{item.label}</label>
                        </div>
                     ))}
                  </CardContent>
                </Card>

                <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-accent" />
                      Nota do Instrutor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{content.instructorNote}</p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button size="lg" className="w-full">
                    {content.cta.primary.label}
                  </Button>
                  <Button size="lg" variant="secondary" className="w-full">
                    {content.cta.secondary.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
      <DashboardHeader />
      <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {content.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column (Videos) */}
            <div className="space-y-6 lg:col-span-2">
              {content.videos.map((video: any, index: number) => (
                <VideoCard key={index} label={video.label} duration={video.duration} />
              ))}
            </div>

            {/* Right Column (Details) */}
            <div className="space-y-6">
              <Card className="bg-card/70">
                <CardHeader>
                  <CardTitle>Sobre este módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{content.shortDescription}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Recursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.resources.map((res: any, i: number) => {
                    const Icon = res.icon;
                    return (
                      <Button key={i} variant="outline" className="w-full justify-start">
                        <Icon className="mr-2 h-4 w-4" />
                        {res.title}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-accent" />
                    Nota do Instrutor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{content.instructorNote}</p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Continuar
                </Button>
                <Button size="lg" variant="secondary" className="w-full">
                  Marcar como concluído
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
