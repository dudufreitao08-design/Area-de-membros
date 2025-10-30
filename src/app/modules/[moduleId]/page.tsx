

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
import { Check, Download, FileText, Info, Link as LinkIcon, PlayCircle, Speaker, Eye, BookOpen, Music, CheckSquare, Lock, Star, Zap, Award, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const moduleData: { [key: string]: any } = {
  'bonus-1': {
      title: 'PLANILHA SEMANAL',
      subtitle: 'Organize sua semana do sono — hábitos, rotinas e progresso',
      shortDescription: 'Uma planilha prática e imprimível para planejar sua rotina semanal de sono, acompanhar hábitos, registrar horários e monitorar resultados. Use-a para aplicar o que aprendeu nos módulos e medir suas melhorias.',
      sheetImageUrl: 'https://i.imgur.com/3Z3gYwP.png',
      whatYouWillOrganize: [
        'Horários de sono e despertar para manter consistência.',
        'Hábitos pré-sono e notas sobre o que ajudou ou atrapalhou.',
        'Registro de práticas diárias do Desafio (ex.: técnica usada, duração).',
        'Observações semanais e metas para a próxima semana.',
      ],
      quickInstructions: [
          'Baixe a planilha e abra no editor de sua preferência (ou imprima).',
          'Preencha diariamente: horário de deitar, horário de acordar e 1 observação sobre a qualidade do sono.',
          'Use a seção de checklist para marcar práticas realizadas do Desafio.',
          'Ao final da semana, reveja os padrões e ajuste sua rotina para a próxima semana.',
      ],
      instructorNote: '“Preencha a planilha logo ao acordar — 1 minuto por dia. Pequenas anotações mostram padrões que ajudam a ajustar hábitos com rapidez.”',
      cta: {
        primary: { label: 'Baixar Planilha Semanal', action: 'downloadFile' },
        secondary: { label: 'Ver prévia', action: 'openPreview' },
      }
    },
   'bonus-2': {
    title: 'CHECKLIST DIÁRIO',
    subtitle: 'Pequenos hábitos, grandes resultados — acompanhe sua rotina do sono',
    sheetImageUrl: 'https://i.imgur.com/m58gcat.png',
    shortDescription: 'Uma checklist prática e imprimível para guiar suas ações diárias antes de dormir e ao acordar. Use-a para manter consistência, registrar progresso e observar melhorias semanais.',
    whatYouWillOrganize: [
      'Hábitos pré-sono essenciais (ex.: desligar telas, respiração, ambiente).',
      'Registro de hora de deitar / hora de acordar e qualidade percebida do sono.',
      'Marcação rápida das práticas do Desafio (sim/não).',
      'Observações diárias e nota para ajustar a rotina.',
    ],
    quickInstructions: [
      'Baixe ou abra a checklist no modal.',
      'Preencha todos os dias ao acordar ou antes de dormir (1–2 minutos).',
      'Marque as práticas realizadas e escreva uma observação curta.',
      'Ao final da semana, reveja os padrões e ajuste pequenas metas.',
    ],
    cta: {
      primary: { label: 'Baixar Checklist Diário' },
      secondary: { label: 'Ver prévia' },
    },
  },
  'module-1': {
    title: 'O CÓDIGO DO SONO',
    subtitle: 'O guia essencial para reconquistar noites profundas e revigorantes.',
    shortDescription: 'Baixe e leia o eBook que reúne o método, as evidências e passos práticos para melhorar sua qualidade de sono. Conteúdo direto, aplicável e projetado para resultados rápidos.',
    coverUrl: 'https://i.imgur.com/xtkaZCa.jpeg',
    ebookFileUrl: '{{EBOOK_FILE_URL}}',
    learningObjectives: [
      'Como funcionam os ciclos do sono e por que cada estágio importa.',
      'Rotina noturna prática (checklist) que prepara corpo e mente em 20–30 minutos.',
      'Quais hábitos eliminar ou ajustar para reduzir despertares noturnos.',
    ],
    instructorNote: 'Comece baixando o eBook e aplique o checklist das primeiras 7 noites. Use o diário anexo para registrar mudanças — pequenos ajustes trazem grandes resultados.',
    resources: [
      { label: 'Checklist imprimível (PDF)', url: '{{PDF_CHECKLIST_URL}}' },
      { label: 'Diário de sono (template)', url: '{{TEMPLATE_DIARIO_URL}}' },
      { label: 'Leitura complementar', url: '{{ARTIGO_URL}}' },
    ],
    ebookInfo: {
      author: 'Seu Nome',
      format: 'PDF',
      readingTime: '60-90 minutos',
      version: 'v1.0.0',
    }
  },
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
        youtubeUrl: 'https://www.youtube.com/embed/RqLWkYz8j18'
      },
      {
        label: 'Vídeo 2 — O que atrapalha o sono (luz, hábitos, alimentação)',
        duration: '10–15 min',
        youtubeUrl: 'https://www.youtube.com/embed/0FVaGM8LjkM'
      },
      {
        label: 'Vídeo 3 — Rotina prática e dicas imediatas para dormir melhor',
        duration: '10–20 min',
      },
    ],
  },
    'module-3': {
    version: '1.0.0',
    createdAt: '2025-10-26',
    title: 'TÉCNICAS DE RELAXAMENTO',
    subtitle: 'Práticas guiadas para reduzir ansiedade e preparar o corpo para o sono',
    shortDescription: 'Aprenda técnicas simples e eficazes — respiração, relaxamento muscular e visualização — para acalmar a mente e facilitar o adormecer. Conteúdo prático com áudios e vídeos para seguir passo a passo.',
    videos: [
      { label: 'Vídeo 1 — Respiração guiada (técnica 4-4-6)', duration: '6–10 min', youtubeUrl: '{{YOUTUBE_URL_1}}' },
      { label: 'Vídeo 2 — Relaxamento muscular progressivo (pescoço aos pés)', duration: '10–15 min', youtubeUrl: '{{YOUTUBE_URL_2}}' },
      { label: 'Vídeo 3 — Visualização guiada para sono profundo', duration: '8–15 min', youtubeUrl: '{{YOUTUBE_URL_3}}' },
    ],
    estimatedTime: '30–50 minutos',
    cta: {
      primary: { label: 'Iniciar prática', action: 'startGuidedPractice' },
      secondary: { label: 'Marcar como concluído', action: 'markModuleComplete' },
    },
  },
   'module-4': {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    title: 'PREPARANDO PARA DORMIR',
    subtitle: 'Transforme sua noite em um ritual de relaxamento profundo.',
    shortDescription: 'Descubra técnicas práticas para preparar corpo e mente para um sono restaurador. Este módulo guia você passo a passo até o momento ideal de descanso, criando uma rotina noturna eficaz.',
    videos: [
      { label: 'Vídeo 1: Criando o ambiente ideal', duration: '8-12 min', youtubeUrl: '{{YOUTUBE_URL_1}}' },
      { label: 'Vídeo 2: Desacelerando a mente', duration: '10-15 min', youtubeUrl: '{{YOUTUBE_URL_2}}' },
      { label: 'Vídeo 3: O ritual do sono', duration: '7-10 min', youtubeUrl: '{{YOUTUBE_URL_3}}' },
    ],
    cta: {
      primary: { label: 'Começar rotina', action: 'startRoutine' },
      secondary: { label: 'Marcar como concluído', action: 'markModuleComplete' },
    },
  },
  'module-5': {
    title: 'DESAFIO DE 7 DIAS',
    subtitle: 'Transforme suas noites em 7 dias — prática guiada, simples e comprovada.',
    shortDescription: 'Programa guiado e comprovado — 7 passos diários, PDF completo com exercícios, áudios guiados e checklist diário. Resultados visíveis em uma semana. Acesso pago e imediato após a confirmação da compra.',
    coverUrl: 'https://i.imgur.com/QZA35kk.png',
    conquests: [
        'Dormir mais rápido e com menos despertares.',
        'Acordar com mais energia após 7 noites.',
        'Rotina prática e aplicável mesmo em dias corridos.',
        'Ferramentas fáceis: PDF imprimível e áudios para seguir passo a passo.'
    ],
    benefits: [
        { icon: Zap, title: 'Benefícios Imediatos', description: 'Redução do tempo para adormecer e menor ansiedade noturna.' },
        { icon: Award, title: 'Resultados em 7 Dias', description: 'Sono mais contínuo e sensação de recuperação ao acordar.' }
    ],
    cta: {
        locked: 'Desbloquear Agora',
        unlocked: 'Baixar'
    }
  }
};

const VideoCard = ({ label, duration, youtubeUrl }: { label: string; duration: string, youtubeUrl?: string }) => (
  <Card className="overflow-hidden bg-card/70 transition-shadow hover:shadow-lg">
    <div className="relative aspect-video bg-muted">
      {youtubeUrl ? (
        <iframe
          src={`${youtubeUrl}?rel=0&modestbranding=1&showinfo=0`}
          className="absolute h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={label}
          style={{ border: 0 }}
        ></iframe>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold">{label}</h3>
      <p className="text-xs text-muted-foreground">{duration}</p>
      {!youtubeUrl && (
        <Button variant="outline" size="sm" className="mt-3 w-full">
          <PlayCircle className="mr-2 h-4 w-4" />
          Assistir
        </Button>
      )}
    </CardContent>
  </Card>
);

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const [isLocked, setIsLocked] = useState(true);

  const moduleInfo = modules.find((m) => m.id === moduleId);
  const content = moduleData[moduleId];

  if (!moduleInfo && !moduleId.startsWith('bonus')) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Módulo não encontrado.</p>
      </div>
    );
  }
  
    // Render Bonus pages
  if (moduleId.startsWith('bonus-')) {
    const { title, subtitle, sheetImageUrl, whatYouWillOrganize, quickInstructions, cta } = content;
    return (
      <div className="flex min-h-screen w-full flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
        <DashboardHeader />
        <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden bg-card/70 shadow-lg">
                  <div className="relative aspect-[3/4]">
                    <Image src={sheetImageUrl} alt={`Imagem da planilha: ${title}`} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Button size="lg" className="w-full">
                      <Download className="mr-2 h-5 w-5" />
                      {cta.primary.label}
                    </Button>
                     <Button variant="outline" size="sm" className="mt-2 w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        {cta.secondary.label}
                    </Button>
                    <p className="mt-2 text-center text-xs text-muted-foreground">PDF — Gratuito</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 lg:col-span-3">
                 <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle>O que você vai organizar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {whatYouWillOrganize.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <ClipboardCheck className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="bg-card/70">
                    <CardHeader>
                        <CardTitle>Instruções Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {quickInstructions.map((instruction: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{index + 1}</div>
                            <p className="text-sm text-muted-foreground">{instruction}</p>
                        </div>
                        ))}
                    </CardContent>
                </Card>
                
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleUnlock = () => {
    setIsLocked(false);
  };
  
  // Render Module 5 (Locked Challenge)
  if (moduleId === 'module-5') {
    if (isLocked) {
      return (
         <div className="flex min-h-screen w-full flex-col">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
          <DashboardHeader />
          <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {/* Header */}
              <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{content.title}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{content.subtitle}</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border/20 bg-card/50 p-6 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-12 lg:p-10">
                  {/* Locked Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                      <Lock className="h-16 w-16 text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.7)]" />
                      <h2 className="mt-4 text-2xl font-bold text-white">Módulo Bloqueado</h2>
                      <p className="text-muted-foreground">Adquira o acesso para desbloquear este desafio.</p>
                      <Button size="lg" className="mt-6 bg-primary font-bold text-primary-foreground hover:bg-primary/90" onClick={handleUnlock}>
                         {content.cta.locked}
                      </Button>
                  </div>

                  {/* Background Content (Blurred) */}
                  {/* Left Column */}
                  <div className="flex flex-col justify-center">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                          <Image src={content.coverUrl} alt={`Capa do Desafio: ${content.title}`} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="mt-6 space-y-6 lg:mt-0">
                      <Card className="bg-transparent border-none">
                          <CardHeader className="p-0">
                            <CardTitle className="text-xl">O que você vai conquistar:</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 p-0 pt-4">
                              {content.conquests.map((objective: string, index: number) => (
                              <div key={index} className="flex items-start gap-3">
                                  <Star className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                  <p className="text-sm text-muted-foreground">{objective}</p>
                              </div>
                              ))}
                          </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {content.benefits.map((benefit: any, index: number) => (
                             <Card key={index} className="bg-card/70 border-border/50 p-4">
                               <benefit.icon className="h-6 w-6 text-accent mb-2"/>
                               <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                               <p className="text-xs text-muted-foreground">{benefit.description}</p>
                             </Card>
                          ))}
                      </div>
                  </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
    // Render Unlocked state for Module 5
    return (
       <div className="flex min-h-screen w-full flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
        <DashboardHeader />
        <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
             <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{content.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{content.subtitle}</p>
            </div>
             <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <div className="relative w-full overflow-hidden rounded-lg">
                    <Image src={content.coverUrl} alt={`Capa do Desafio: ${content.title}`} width={1080} height={1080} className="object-contain" />
                  </div>
                  <Button size="lg" className="mt-6 w-full" asChild>
                    <Link href="https://pay.cakto.com.br/32swn5d_577400" target="_blank">
                      <Download className="mr-2" />
                      {content.cta.unlocked}
                    </Link>
                  </Button>
                </div>
                <div className="space-y-6">
                   <Card className="bg-card/70">
                        <CardHeader>
                          <CardTitle className="text-xl">O que você vai conquistar:</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                            {content.conquests.map((objective: string, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                                <Star className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <p className="text-muted-foreground">{objective}</p>
                            </div>
                            ))}
                        </CardContent>
                    </Card>
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {content.benefits.map((benefit: any, index: number) => (
                           <Card key={index} className="bg-card/70 border-border/50 p-4">
                             <benefit.icon className="h-6 w-6 text-accent mb-2"/>
                             <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                             <p className="text-xs text-muted-foreground">{benefit.description}</p>
                           </Card>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render Module 1 (eBook)
  if (moduleId === 'module-1') {
    const { title, subtitle, shortDescription, coverUrl, ebookInfo, learningObjectives } = content;
    return (
      <div className="flex min-h-screen w-full flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
        <DashboardHeader />
        <main className="flex-1 p-4 pb-28 md:p-6 md:pb-32 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Left Column (eBook Download) */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden bg-card/70 shadow-lg">
                  <div className="relative aspect-[3/4]">
                    <Image src={coverUrl} alt={`Capa do eBook: ${title}`} fill className="object-cover" />
                    <div className="absolute top-2 right-2 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-sm">
                      Ebook oficial
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="https://heyzine.com/flip-book/910b9a0b14.html" target="_blank">
                        <Download className="mr-2 h-5 w-5" />
                        Baixar agora
                      </Link>
                    </Button>
                    <p className="mt-2 text-center text-xs text-muted-foreground">PDF — 12 MB</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column (Details) */}
              <div className="space-y-6 lg:col-span-3">
                 <Card className="bg-card/70">
                  <CardHeader>
                    <CardTitle>Sobre o eBook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{shortDescription}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/70">
                    <CardHeader>
                        <CardTitle>O que você vai aprender</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {learningObjectives.map((objective: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <p className="text-sm text-muted-foreground">{objective}</p>
                        </div>
                        ))}
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
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

  // Common Layout for Modules with specific content (2, 3, 4)
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
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column (Videos) */}
              <div className="space-y-6 lg:col-span-2">
                {content.videos.map((video: any, index: number) => (
                  <VideoCard key={index} label={video.label} duration={video.duration} youtubeUrl={video.youtubeUrl} />
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

                {content.cta && (
                    <div className="space-y-3">
                    </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}
